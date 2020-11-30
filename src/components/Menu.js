import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Route , Switch , Link} from 'react-router-dom';
import SignUp from '../container/SignupPage/Signup';
import SignIn from '../container/SigninPage/Signin';
import Home from './Home';

const useStyles = makeStyles((theme) => ({
    icon: {
      color: '#fff',
      fontSize: '2rem',
    },

 }));

export default function Menus() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
        <IconButton>
            <MenuIcon className={classes.icon} aria-controls="menu" aria-haspopup="true" onClick={handleClick} />
       </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <nav >
          {/* <MenuItem><Link to="/" style={{color:"black" }}>Home</Link></MenuItem> */}
          <MenuItem><Link to="/sign-up" style={{ textDecoration: "none",color:"black" }}>Signup</Link></MenuItem>
          <MenuItem><Link to="/sign-in" style={{ textDecoration: "none",color:"black" }}>Signin</Link></MenuItem>
        </nav>
      </Menu>
      <Switch>
      {/* <Route  exact path="/"  component={Home}/> */}
      <Route  path="/sign-up" component={SignUp}/>
      <Route  path="/sign-in"   component={SignIn}/>
      </Switch>
    </div>
  );
   
}