import React, { Component } from 'react';
import EmailEditor from 'react-email-editor';
import sample from './design.json';
import sample2 from './sample2.json';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import axios from 'axios';

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
      design: null,
      exportedHtml: '',
      isSaving: false,
      isToggled: false,
    };
  }

  componentDidMount() {
    this.loadDesign();
  }

  loadDesign = () => {
    const { isToggled } = this.state;
    const savedDesign = localStorage.getItem('savedDesign');
    if (savedDesign) {
      this.editor.loadDesign(JSON.parse(savedDesign));
    } else {
      const design = isToggled ? sample : sample2;
      this.setState({ design }, () => {
        this.editor.loadDesign(design);
      });
    }
  };

  saveDesign = () => {
    this.editor.saveDesign((design) => {
      this.setState({ design });
      console.log('saveDesign', design);
      localStorage.setItem('savedDesign', JSON.stringify(design));
    });
  };

  exportHtml = async () => {
    this.setState({ isSaving: true });
    this.saveDesign();
    this.editor.exportHtml(async (data) => {
      const { html } = data;
      this.setState({ exportedHtml: html });

      try {
        // Send the design and exported HTML to the server
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/design`, {
          design: this.state.design,
          exportedHtml: html,
        });
        console.log('Design saved:', response.data);
      } catch (error) {
        console.error('Error saving design:', error);
      }

      if (this.props.onExportHtml) {
        this.props.onExportHtml(html);
      }

      this.setState({ isSaving: false });
      console.log('HTML saved!');
    });
  };

  handleClick = () => {
    this.setState(
      (prevState) => ({
        isToggled: !prevState.isToggled,
      }),
      () => {
        this.loadDesign();
      }
    );
  };

  onLoad = () => {
    if (this.state.design) {
      this.editor.loadDesign(this.state.design);
    } else {
      this.loadDesign();
    }
  };

  render() {
    const { isSaving, isToggled } = this.state;
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
          <StyledButton variant="contained" onClick={this.handleClick}>
            {isToggled ? 'Change to Sample 2' : 'Change to Sample 1'}
          </StyledButton>
        </div>
      </div>
    );
  }
}

export default EmailEditors;
