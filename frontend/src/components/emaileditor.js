import React, { Component } from 'react';
import EmailEditor from "react-email-editor";
import sample from './sample2.json';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';


const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(1), // Add margin using theme.spacing
  '&:hover': {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));

class EmailEditors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      design: null, // Added state variable to hold the design
      exportedHtml: "", // Added state variable to hold the exported HTML
      isSaving: false,
    };
  }

  componentDidMount() {
    this.loadDesign();
  }

  loadDesign = () => {
    const savedDesign = localStorage.getItem('savedDesign');
    if (savedDesign) {
      this.editor.loadDesign(JSON.parse(savedDesign));
    } else {
      this.editor.loadDesign(this.props.defaultDesign || sample);
    }
  };

  saveDesign = () => {
    this.editor.saveDesign((design) => {
      this.setState({ design });
      console.log('saveDesign', design);
      localStorage.setItem('savedDesign', JSON.stringify(design)); // Save the design in localStorage
      
    });
  };

  exportHtml = () => {
    this.setState({ isSaving: true });
    this.saveDesign(); // Save the design before exporting HTML
    this.editor.exportHtml((data) => {
      const { html } = data;
      console.log('exportHtml', html);
      if (this.props.onExportHtml) {
        this.props.onExportHtml(html); // Pass the exported HTML to the callback function
      }
    });
    setTimeout(() => {
      this.setState({ isSaving: false });
      console.log('HTML saved!');
    }, 2000);
  };
  

  sendEmail = async () => {
    const { exportedHtml } = this.state;
    // Send the email using the exported HTML
  };

  onLoad = () => {
    if (this.state.design) {
      this.editor.loadDesign(this.state.design);
    } else {
      this.loadDesign();
    }
  };

  render() {
    const { isSaving } = this.state;
    return (
      <div>
       

        <EmailEditor
          ref={(editor) => (this.editor = editor)}
          onLoad={this.onLoad}
          onDesignLoad={this.onDesignLoad}
        />
         <div>
        <StyledButton
        variant="contained"
        onClick={this.exportHtml}
        disabled={isSaving}
        startIcon={isSaving ? <CircularProgress size={20} /> : null}
      >
        {isSaving ? 'Saving...' : 'Save HTML'}
      </StyledButton>
        </div>
      </div>
    );
  }
}

export default EmailEditors;
