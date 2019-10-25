// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from "react";
import "./Dashboard.css";
import Owner from "../../components/IdentityOwner/Owner";
import NavBar from "../../components/NavBar/NavBar";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const Dashboard = ({ address }) => {
  return (
    <div className="DashboardContainer">
      <NavBar />
      <Grid container justify="center" className="GridContainer" spacing={0}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className="GridItem">
          <Paper className="OwnerAgentPaper">
            {<Owner address={address} />}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
