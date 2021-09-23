import * as React from 'react';
import axios from "axios"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Container, CssBaseline, TextField, Link, Typography, Collapse, Alert, IconButton } from '@mui/material';


const api = axios.create({
    baseURL: 'http://localhost:5000/api/url/shorten'
})

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          FleetingLink
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


class Create extends React.Component {
    state = {
        longUrl: '',
        shortUrl: '',
        urlCode: '',
        err: false,
        errMessage: ''
    };

    /* This is where the magic happens 
    */
    handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await api.post('/', { longUrl: data.get('longUrl'), urlCode: data.get('urlCode') })
        .then(res=>{
            if(res.data.shortUrl == null) {
                this.setState({ shortUrl: 'Error' })
                console.log(this.state.shortUrl)
            }
            else {
                this.setState({ shortUrl: res.data.shortUrl })
                console.log(this.state.shortUrl)
            }
            this.setState.longUrl = '';
        })
        .catch(error => { 
            console.error(error);
            this.setState({ err: true });
            this.setState({ errorMessage: error.message });
        });
    }

    handleChange = event =>{
        this.setState({ longUrl: event.target.value});
    }

    render() {
        return (
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Collapse in={ this.state.err }>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            this.setState({ err: false });
                        }}
                        >
                        X
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity="error"
                    >
                    {this.state.errorMessage}
                    </Alert>
                </Collapse>
                <Box
                    sx = {{
                        marginTop: 8, 
                        display: 'flex',
                        flexDirection: 'column',
                    }} 
                    textAlign='center'
                    >

                    <Typography variant="h1" align="center">
                        FleetingLink
                    </Typography>

                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="longUrl"
                            label="Your Long URL"
                            name="longUrl"
                            autoFocus
                        />
                        <TextField 
                            margin="normal"
                            fullWidth
                            id="urlCode"
                            label="Your Custom Slug"
                            name="urlCode"
                        />
                        <Button
                            type="submit"
                            fullwidth
                            variant="contained"
                            sx = {{ mt: 2, mb: 2}}
                        > Submit </Button>
                    </Box>

                <Typography variant="h5" align="center" sx ={{ mt: 4 }}>
                    New Link:
                </Typography>

                <Link color="inherit" href={this.state.shortUrl}>
                    {this.state.shortUrl}
                </Link>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        );
    }
}
export default Create;