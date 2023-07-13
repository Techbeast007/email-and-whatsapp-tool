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
import { useState, useEffect } from "react";
import Papa from 'papaparse';
import { DataGrid } from '@mui/x-data-grid';
import './style.css';
import EmailEditors from './emaileditor';
import { useMediaQuery } from '@mui/material';



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Set primary color to blue
    },
  },
});
const dataTableStyles = {
  height: 400,
  width: '100%',
  fontFamily: 'Arial, sans-serif',
  '& .MuiDataGridCell': {
    fontSize: '16px', // Adjust the font size as needed
    color: '#fff', // Set the font color to white
  },
  '& .MuiDataGridRrow': {
    backgroundColor: '#333', // Set the row background color to a dark color
  },
  '& .MuiDataGridRow.MuiSelected': {
    backgroundColor: '#555', // Set the background color for selected rows
  },
  '& .MuiDataGridColumnHeader': {
    backgroundColor: '#222', // Set the column header background color
    color: '#fff', // Set the column header font color to white
  },
};

function Form() {
  const [email, setEmail] = useState("");
  const [emaildata, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [exportedHtml, setExportedHtml] = useState(""); // Added state variable for exported HTML
  const isMobile = useMediaQuery('(max-width: 1001px)');

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const datas = new FormData(event.currentTarget);

    const data = {
      subjects: datas.get('subject'),
      email: emaildata,
      body: exportedHtml, // Pass the exported HTML to the body
    };

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/sendemail`,
      data
    );
    console.log(response.data);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data.map((x) => {
          return x["Login email"];
        }));
      },
    });
  };

  const handleExportedHtml = (html) => {
    setExportedHtml(html); // Save the exported HTML in state
  };

    const rows = emaildata.map((email, index) => ({ id: index + 1, email }));
 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" fullWidth="true">
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
            Send Email
          </Typography>
          <Grid item xs={12}>
         {isMobile?null: <EmailEditors onExportHtml={handleExportedHtml} />}
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="subject"
                  label="Subject"
                  name="subject"
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" accept=".csv" onChange={handleFileUpload} className='btn-grad' />
              </Grid>
            </Grid>
            { rows.length? 
      <DataGrid
      style={dataTableStyles}
        rows={rows}
        columns={columns}
        autoHeight
        columnBuffer={8}
        pageSize={5}
        checkboxSelection
      />
    : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                color: 'white',
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Form;
