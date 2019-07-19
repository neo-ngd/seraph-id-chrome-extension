import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Grid from "@material-ui/core/Grid";
import CreateWallet from "./scenes/CreateWallet";
import { checkWallet } from "./utils/storage";
/*global chrome*/

function App() {
  return (
    <div className="App">
      <Grid container spacing={3} alignContent="center">
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          {checkWallet() === false ? <CreateWallet /> : "hello"}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
