import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState,useEffect } from "react";
import Papa from 'papaparse';
import { DataGrid } from '@mui/x-data-grid';
import './style.css'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function WhatsappForm() {
    const [email, setEmail] = useState("");
    const [whatsappdata, setData] = useState([]);
    const [apiData,setApiData] = useState([])


    useEffect(()=>{
      console.log(apiData)

    },[apiData])


  const handleSubmit = async(event) => {
    event.preventDefault();
    const datas = new FormData(event.currentTarget);
    let messagesAll = datas.get('message')
   
    sendWhatsAppMessage(messagesAll,whatsappdata);
    
 
  };

    // parse CSV data & store it in the component state

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data.map((x)=>{
          return x["phone"]
        }));
      },
    });
   
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(data);
  //     const reader = response.body.getReader();
  //     const result = await reader.read();
  //     const decoder = new TextDecoder("utf-8");
  //     const csvData = decoder.decode(result.value);
  //     const parsedData = Papa.parse(csvData, { 
  //       header: true, 
  //       skipEmptyLines: true 
  //     }).data;
  //     console.log(parsedData);
  //   };
  //   fetchData();
  // }, []);
  const sendWhatsAppMessage = async (datas,recipient) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/whatsapp/sendmessage`, {
        recipient: recipient,
        message: datas
      });
  
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error); // Handle any errors
    }
  };
 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send WhatsApp messages
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="message"
                  label="message"
                  name="message"
                />
              </Grid>
              <Grid>

<input type="file" className='btn-grad' accept=".csv" onChange={handleFileUpload} />
</Grid>
<Grid>
</Grid>



             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

