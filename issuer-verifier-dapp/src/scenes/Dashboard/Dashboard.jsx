// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Owner from "../../components/IdentityOwner/Owner";
import NavBar from "../../components/NavBar/NavBar";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Paper
} from "@material-ui/core/";

const Dashboard = ({ address }) => {
  const [open, setOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const receivedClaimSuccessListener = () => {
    setIsWaiting(false);
    setOpen(true);
  };

  const claimErrorListener = () => {
    setIsWaiting(false);
  };

  useEffect(() => {
    document.addEventListener(
      "shareClaimSuccess",
      receivedClaimSuccessListener
    );
    document.addEventListener("shareClaimError", claimErrorListener);

    return () => {
      document.removeEventListener(
        "shareClaimSuccess",
        receivedClaimSuccessListener
      );
      document.removeEventListener("shareClaimError", claimErrorListener);
    };
  }, []);

  function openDoor() {
    setIsWaiting(true);

    window.seraphID.askClaim(
      "AccessKey",
      `did:neoid:priv:${address}`,
      "Accomodation Door"
    );
  }

  return (
    <div className="DashboardContainer">
      <NavBar />
      <Grid container justify="center" className="GridContainer" spacing={0}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className="GridItem">
          <Paper className="OwnerAgentPaper">
            {
              <Owner
                address={address}
                openDoor={openDoor}
                isWaiting={isWaiting}
              />
            }
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        aria-labelledby="simple-dialog-title"
        onClose={() => setOpen(false)}
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Welcome!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The door is open, enjoy your vacations!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
