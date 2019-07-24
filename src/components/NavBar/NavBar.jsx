import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  barStyle: {
    background: 'black',
  },
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.barStyle} position="static" color="default">
        <Toolbar>
          <Grid container spacing={3}></Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
