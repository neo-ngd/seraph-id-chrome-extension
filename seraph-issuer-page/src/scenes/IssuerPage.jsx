import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../components/Buttons/BaseButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createClaim } from "../seraphUtils";

export default function SpacingGrid() {
  const [values, setValues] = React.useState({
    idNumber: "J12393496",
    firstName: "Edward",
    secondName: "Newgate",
    birthDate: "02.07.1945",
    citizenship: "Greek",
    address: "Via Biella",
    gender: "M"
  });

  const [claim, setClaim] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function sendClaimToWallet() {
    window.seraphID.sendClaim(claim);
  }

  const createAndSetClaim = () => {
    if (window.seraphID === undefined) {
      setError("No wallet detected, please retry");
    } else {
      const claim = createClaim(values);

      setClaim(claim);
    }
  };

  return (
    <React.Fragment>
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
            ></Button>
          </Grid>
          <Grid item xs={12}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography style={{ color: "#ffffff" }}>
                Your Claim is ready, you can now save it in to your Wallet{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                handleClick={() => sendClaimToWallet()}
                text={"Send Request"}
              ></Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
