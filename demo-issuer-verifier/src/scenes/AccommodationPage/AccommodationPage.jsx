// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState, useEffect } from "react";
import "./AccommodationPage.css";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Fab,
  CircularProgress
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ActiveAgent from "../../components/ActiveAgent/ActiveAgent";
import CloseIcon from "@material-ui/icons/Close";
import FlatCards from "../../components/FlatCards/FlatCards";
import { theme } from "../../App";
import { createClaim } from "../../seraphUtils";

const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

const AccommodationPage = ({ address }) => {
  // eslint-disable-next-line
  const [claim, setClaim] = React.useState(null);
  // eslint-disable-next-line
  const [error, setError] = React.useState(null);
  const [booking, setBooking] = React.useState(null);
  const [issuing, setIssuing] = React.useState(false);

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  const themeColor = theme.palette.error.main;
  const style = { backgroundColor: themeColor, color: "white" };

  useEffect(() => {
    document.addEventListener(
      "shareClaimSuccess",
      receivedClaimSuccessListener
    );
    document.addEventListener("shareClaimError", claimErrorListener);
    document.addEventListener("addClaimSuccess", addClaimSuccessListener);
    document.addEventListener("addClaimError", addClaimErrorListener);
    return () => {
      document.removeEventListener(
        "shareClaimSuccess",
        receivedClaimSuccessListener
      );
      document.removeEventListener("shareClaimError", claimErrorListener);
      document.removeEventListener("addClaimSuccess", addClaimSuccessListener);
      document.removeEventListener("addClaimError", addClaimErrorListener);
    };
  }, []);

  const addClaimSuccessListener = () => {
    setStatus(SUCCESS);
  };
  const addClaimErrorListener = () => {
    setIsSending(false);
  };

  const receivedClaimSuccessListener = () => {
    setIssuing(true);
    setIsSending(false);
  };
  const claimErrorListener = () => {
    setStatus(ERROR);
    setIsSending(false);
  };

  const createAndSetClaim = async () => {
    if (window.seraphID === undefined) {
      setError("No wallet detected, please retry");
    } else {
      setIsSending(true);
      const claim = await createClaim("accessKey", booking, address);
      window.seraphID.sendClaim(claim);
    }
  };

  function askClaim() {
    window.seraphID.askClaim(
      "Passport",
      `did:neoid:priv:${address}`,
      "Accommodation Dapp"
    );
    setIsSending(true);
  }

  const renderBooking = () => {
    if (booking !== null) {
      if (issuing) {
        return (
          <div className="PageContainer">
            {status !== SUCCESS ? (
              <span>
                {isSending ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  <React.Fragment>
                    <h1>
                      Thank you! Your keys are ready, please store it in your
                      wallet
                    </h1>

                    <Fab
                      onClick={createAndSetClaim}
                      variant="extended"
                      color="secondary"
                      disabled={isSending}
                    >
                      Get Claim
                    </Fab>
                  </React.Fragment>
                )}
              </span>
            ) : (
              <h1>
                Thank you, use the access key to unlock the door of your
                accommodation
              </h1>
            )}
          </div>
        );
      }
      return (
        <div className="PageContainer">
          <h1> Please provide your passport to book this accommodation</h1>
        </div>
      );
    }
    return (
      <FlatCards
        handleClick={id => {
          setBooking(id);
          askClaim();
        }}
        disabled={!address || isSending}
      />
    );
  };

  return (
    <span>
      <AppBar position="static" style={style}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <HomeIcon className="AgencyLogo" />
          </IconButton>
          <Typography variant="h6" color="inherit" className="NavBarTypography">
            {" "}
            Smart Agency dApp{" "}
          </Typography>

          <Tooltip title="Help">
            <Link to="/help" className="HelpButton">
              <IconButton color="inherit" aria-label="Menu"></IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Close Agency Web Page">
            <Link to="/dashboard" className="CloseButton">
              <IconButton color="inherit" aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className="AgencyPageContainer">
        <ActiveAgent address={address} location="AgencyWebPage" />
        <div className="AgencyPageContent">{renderBooking()}</div>
      </div>
    </span>
  );
};

export default AccommodationPage;
