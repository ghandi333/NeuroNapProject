import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Route , Link} from 'react-router-dom';
import Signin from '../SigninPage/Signin';
import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100vh',
//     backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg3.jpg'})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     overflow:'hidden',
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', 
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignUp() {
//   const classes = useStyles();

//   return (
//   <div>
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="firstName"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 autoFocus
                
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 autoComplete="lname"
               
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
                
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
               
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="cpassword"
//                 label="confirm password"
//                 name="cpassword"
//                 autoComplete="cpassword"
              
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
            
//           >
//             Sign Up
//           </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link to="/sign-in" variant="body2" onClick={event =>  window.location.href='/sign-in'} style={{ textDecoration: "none",color:"white" }}>
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//           <Route path="/sign-in" component={Signin}/>
//         </form>
//       </div>
  
//       <Box mt={5}>
//       </Box>
//    </Container>
//   </div> 
//   );
// }

export default class Signup extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          email: '',
          password: '',
          confirmpassword:'',
      };
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  handleSubmit(event) {
    axios.post('http://localhost:3001/sign-up',{
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
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
      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                value={this.state.username}
                onChange={this.onChange}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cpassword"
                label="confirm password"
                name="confirmpassword"
                autoComplete="cpassword"
                value={this.state.cpassword}
                onChange={this.onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2" onClick={event =>  window.location.href='/sign-in'} style={{ textDecoration: "none",color:"white" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Route path="/sign-in" component={Signin}/>
        </form>
      </div>
  
      <Box mt={5}>
      </Box>
      </Container>
    </div> 
        )
     }
  }