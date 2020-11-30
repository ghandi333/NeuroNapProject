import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Blink from 'react-blink-text';
import { Link as Scroll } from 'react-scroll';
import Menus from './Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'ubunto',
  },
  appbar: {
    background: 'none',
    fontFamily:'ubunto',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '3rem',
  },
  Down: {
    color: '#fff',
    fontSize: '3rem',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            NeuroNap
          </h1>
           < Menus />
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            NeuroNap<br />
            <Blink color='white' text='For the sleep you deserve' fontSize='2rem'></Blink>
          </h1>
          <Scroll to="product-des" smooth={true} >
            <IconButton>
              <ArrowDownwardIcon className={classes.Down} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
