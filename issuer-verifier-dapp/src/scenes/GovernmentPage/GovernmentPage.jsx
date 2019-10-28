// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React, { useState, useEffect } from "react";
import "./GovernmentPage.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Fab,
  Tooltip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/HelpOutline";
import ActiveAgent from "../../components/ActiveAgent/ActiveAgent";
import { createClaim } from "../../seraphUtils";

const SUCCESS = "SUCCESS";

const GovernmentPage = ({ address }) => {
  const [fields, setFields] = useState({
    idNumber: "J12393496",
    firstName: "Oliver",
    secondName: "Liang",
    birthDate: "02.07.1989",
    citizenship: "French",
    city: "Zurich"
  });

  const [claim, setClaim] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [ready, setReady] = useState(false);

  // Events to handle success, reject or error after sharing a claim.
  // After the unmount of the component are removed.
  useEffect(() => {
    document.addEventListener("addClaimSuccess", claimSuccessListener);
    document.addEventListener("addClaimError", claimErrorListener);
    return () => {
      document.removeEventListener("addClaimSuccess", claimSuccessListener);
      document.removeEventListener("addClaimError", claimErrorListener);
    };
  }, []);

  // Handler for the event triggered after the storing of the claim in the user wallet (Success)
  const claimSuccessListener = () => {
    setStatus(SUCCESS);
  };

  // Handler for the event triggered after the user decline or error during the storing of the claim
  const claimErrorListener = () => {
    setIsSending(false);
  };

  const handleChange = name => event => {
    setFields({ ...fields, [name]: event.target.value });
  };

  function sendClaimToWallet() {
    setIsSending(true);

    window.seraphID.sendClaim(claim);
  }

  const createAndSetClaim = async () => {
    const claim = await createClaim("passport", fields, address);

    setClaim(claim);
    setTimeout(function() {
      setReady(true);
    }, 2500);
  };

  return (
    <span>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <AccountBalanceIcon className="GovernmentLogo" />
          </IconButton>
          <Typography variant="h6" color="inherit" className="NavBarTypography">
            {" "}
            Government Web Page{" "}
          </Typography>

          <Tooltip title="Help">
            <Link to="/help" className="HelpButton">
              <IconButton color="inherit" aria-label="Menu">
                <HelpIcon className="HelpIconBar" />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Close Government Web Page">
            <Link to="/dashboard" className="CloseButton">
              <IconButton color="inherit" aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className="GovPageContainer">
        <ActiveAgent address={address} location="GovWebPage" />

        <div className="GovPageContent">
          <div className="FormPageContainer">
            {claim === null ? (
              <React.Fragment>
                <h1 className="PassportFormTitle"> Passport Request </h1>

                <form noValidate autoComplete="off" className="FormContainer">
                  <div>
                    <TextField
                      value={fields.firstName}
                      onChange={handleChange("firstName")}
                      className="InputField"
                      disabled
                      required
                      id="first-name"
                      label="First Name"
                    />
                  </div>

                  <div>
                    <TextField
                      value={fields.secondName}
                      onChange={handleChange("secondName")}
                      className="InputField"
                      required
                      id="second-name"
                      label="Second Name"
                    />
                  </div>

                  <div>
                    <TextField
                      value={fields.birthDate}
                      onChange={handleChange("birthDate")}
                      className="InputField"
                      required
                      id="date-of-birth"
                      label="Date of birth"
                    />
                  </div>

                  <div>
                    <TextField
                      value={fields.citizenship}
                      onChange={handleChange("citizenship")}
                      className="InputField"
                      required
                      id="citizenship"
                      label="Citizenship"
                    />
                  </div>

                  <div>
                    <TextField
                      value={fields.city}
                      onChange={handleChange("city")}
                      className="InputField"
                      id="address"
                      label="City"
                    />
                  </div>

                  <FormControl className="GenderRadioButton">
                    <p className="GenderRadioLabel"> Gender </p>

                    <RadioGroup
                      value={"male"}
                      aria-label="gender"
                      name="gender"
                      row
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio color="secondary" />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio color="secondary" />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </form>

                <div className="GetCredentialsButton">
                  <Fab
                    onClick={() => createAndSetClaim()}
                    text={`Send request`}
                    variant="extended"
                    color="primary"
                  >
                    Send Request
                  </Fab>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {ready ? (
                  <div className="PageContainer">
                    <h1>
                      Your Passport is ready! Please store it in your Wallet{" "}
                    </h1>
                    {status !== SUCCESS ? (
                      <span>
                        {isSending ? (
                          <CircularProgress></CircularProgress>
                        ) : (
                          <Fab
                            onClick={() => sendClaimToWallet()}
                            variant="extended"
                            color="secondary"
                            disabled={isSending}
                          >
                            Get Claim
                          </Fab>
                        )}
                      </span>
                    ) : (
                      "Claim Saved!"
                    )}
                  </div>
                ) : (
                  <div className="PageContainer">
                    <h1> Issuing Passport to {address} </h1>
                    <CircularProgress color="secondary" />
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </span>
  );
};

export default GovernmentPage;
