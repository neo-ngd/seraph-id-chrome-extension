import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/icons/seraph-logo-horizontal.png';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  barStyle: {
    background: 'black',
    height: '60px',
  },
  logo: {
    maxHeight: '50px',
    height: '10px',
    width: '10px',
  },
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.barStyle} position="static" color="default">
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item>
              <img src={logo} alt="logo" style={{ width: '200px' }} />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
