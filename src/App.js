import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Grid from "@material-ui/core/Grid";
import CreateWalletButton from "./scenes/CreateWallet";
import { checkWallet, setWallet } from "./utils/storage";
import { createWallet } from "./utils/seraphUtils";

function App() {
  const createAndSetWallet = async () => {
    setWallet(createWallet());
    console.log(checkWallet());
    console.log("created");
  };

  return (
    <div className="App">
      <Grid container spacing={3} alignContent="center">
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          {checkWallet() === false ? (
            <CreateWalletButton onClick={createAndSetWallet} />
          ) : (
            "hello"
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
