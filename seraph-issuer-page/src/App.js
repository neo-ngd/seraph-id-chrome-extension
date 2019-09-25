import React from "react";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Button from "./components/Buttons/BaseButton";
import logo from "./imgs/logo.svg";
import seedAcademy from "./imgs/seedAcademy.jpg";
import nsa from "./imgs/ns.jpg";
import "./App.css";
import { createClaim } from "./seraphUtils";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

function App() {
  const classes = useStyles();

  function getSera() {
    console.log("called");

    const claim = createClaim();
    window.seraphID.sendClaim(claim);
  }

  const askClaim = () => window.seraphID.askClaim('0ef9f924-0c7b-499e-9d89-a8d1cc0a357d');

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12} sm={4}>
          <header className="page1">
            <img src={logo} alt="logo" className="logo1" />
            <Button text={"Get Claim"} handleClick={getSera} />
            <Button text={"Ask Claim"} handleClick={askClaim} />
          </header>
        </Grid>
        <Grid item xs={12} sm={4}>
          <header className="page2">
            <img src={seedAcademy} alt="logo" className="logo2" />
            <Button text={"Get Claim"} handleClick={getSera} />
          </header>
        </Grid>
        <Grid item xs={12} sm={4}>
          <header className="page3">
            <img src={nsa} alt="logo" className="logo3" />
            <Button text={"Get Claim"} handleClick={getSera} />
          </header>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
