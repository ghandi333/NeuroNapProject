import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cards from './Cards';
import items from '../static/items';
import useWindowPosition from '../hook/useWindowPosition';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
     [theme.breakpoints.down('md')]: {
     flexDirection: 'column',
     },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <React.Fragment>
    <div className={classes.root} id="product-des">
      <Cards item={items[0]} checked={checked} />
      <Cards item={items[1]} checked={checked} />
    </div>
    <div className={classes.root} id="product-des">
    <Cards item={items[2]} checked={checked} />
  </div>
  </React.Fragment>
  );
}
