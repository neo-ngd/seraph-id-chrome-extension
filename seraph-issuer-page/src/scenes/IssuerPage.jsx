import React, {Fragment, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../components/Buttons/BaseButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createClaim } from "../seraphUtils";

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default function IssuerPage({address}) {
  const [values, setValues] = React.useState({
    idNumber: "J12393496",
    firstName: "Edward",
    secondName: "Newgate",
    birthDate: "02.07.1945",
    citizenship: "Greek",
    address: "Via Biella",
    gender: "M"
  });

  const [claim, setClaim] = useState(null);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.addEventListener('addClaimSuccess', claimSuccessListener);
    document.addEventListener('addClaimError', claimErrorListener);
    return () => {
      document.removeEventListener('addClaimSuccess', claimSuccessListener);
      document.removeEventListener('addClaimError', claimErrorListener);
    }
  }, []);

  const claimSuccessListener = () => {
    setStatus(SUCCESS);
    setIsSending(false);
  };
  const claimErrorListener = () => {
    setStatus(ERROR);
    setIsSending(false);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function sendClaimToWallet() {
    setIsSending(true);
    window.seraphID.sendClaim(claim);
  }

  const createAndSetClaim = async () => {
    if (window.seraphID === undefined) {
      setError("No wallet detected, please retry");
    } else {
      const claim = await createClaim(values, address);

      setClaim(claim);
    }
  };

  return (
    <Fragment>
      {claim === null ? (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography style={{ color: "#ffffff" }}>
              Request a Passport
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="First Name"
              value={values.firstName}
              onChange={handleChange("firstName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Second Name"
              value={values.secondName}
              onChange={handleChange("secondName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Birth Date"
              value={values.birthDate}
              onChange={handleChange("birthDate")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              handleClick={() => createAndSetClaim()}
              text={"Send Request"}
              disabled={!address}
            />
          </Grid>
          <Grid item xs={12}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
          </Grid>
        </Grid>
      ) : (
        <Fragment>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              {!status && <Typography style={{ color: "#ffffff" }}>
                Your Claim is ready, you can now save it in to your Wallet{" "}
              </Typography>}
              {status === ERROR && <Typography style={{ color: "#FF6E6E" }}>
                Something went wrong! Try again.{" "}
              </Typography>}
              {status === SUCCESS && <Typography style={{color: "#00BF0B"}}>
                Your claim has been added.{" "}
              </Typography>}
            </Grid>
            <Grid item xs={12}>
              <Button
                handleClick={status === SUCCESS ? () => {
                  setClaim(null);
                  setStatus(null);
                } : () => sendClaimToWallet()}
                text={`Send ${status === SUCCESS ? 'another' : ''} request`}
                disabled={isSending}
              />
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
}
