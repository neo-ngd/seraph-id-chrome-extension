import React from "react";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { createClaim } from "./seraphUtils";
import IssuerPage from "./scenes/IssuerPage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  page: {
    paddingTop: "90px"
  }
}));

function App() {
  const classes = useStyles();

  function getSera() {
    console.log("called");

    const claim = createClaim();
    window.seraphID.sendClaim(claim);
  }

  const askClaim = () =>
    window.seraphID.askClaim("0e5edf34-0451-4eb5-9781-92a413fc6445");

  return (
    <div className={classes.root}>
      <NavBar></NavBar>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.page}
      >
        <Grid item xs={12}>
          <IssuerPage></IssuerPage>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
