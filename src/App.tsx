import React from 'react';
import './App.css';
import NavBar from "./components/NavBar"
import Grid from "@material-ui/core/Grid";


const App: React.FC = () => {
  return (
    <div className="App">
     <Grid container spacing={3}>
        <Grid item xs={12}>
           <NavBar></NavBar>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
