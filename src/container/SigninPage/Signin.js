import {React, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Signup from '../SignupPage/Signup';
import { Route , Link} from 'react-router-dom';
import axios from 'axios';

export default class Signin extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      };
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  

  handleSubmit(event) {
      console.log(this.state.email)
      console.log(this.state.password)
      axios.post('http://localhost:3001/sign-in',{
          username: this.state.email,
          password: this.state.password,
      }).then(function (res){
          console.log(res)
          localStorage.setItem('token', res.data.access);
          localStorage.setItem('user', res.config.data);
      }).catch(function (err){
          console.log(err)
      })
      event.preventDefault();
  }

  render() {
      return (
        <div>
            <Container component="main" maxWidth="xs">    
            <CssBaseline />
           <div >
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Sign in
            </Typography>
            <form>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email} 
                  onChange={this.onChange}
               />
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password} 
                  onChange={this.onChange}
               />
                <FormControlLabel
                  control={<Checkbox value="remember" color="white" />}
                  label="Remember me"
               />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                 <Grid item>
                  <Link to="/Sign-up" variant="body2" style={{ textDecoration: "none",color:"white" }}>
                    Don't have an account? Sign Up
                  </Link>
                 </Grid>
               </Grid>
               <Route path="/sign-up" component={Signup}/>
            </form>
          </div>
          <Box mt={8}>
          </Box>
          </Container>
     </div> )
} 
}



