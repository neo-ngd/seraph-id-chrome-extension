import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../components/Buttons/BaseButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createClaim } from "../seraphUtils";

export default function SpacingGrid() {
  const [values, setValues] = React.useState({
    name: "News",
    surname: "Morgans",
    age: "53"
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
    if (
      window.seraphID === undefined ||
      window.seraphID.getAddress() === undefined
    ) {
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
              label="Name"
              value={values.name}
              onChange={handleChange("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Surname"
              value={values.surname}
              onChange={handleChange("surname")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Age"
              value={values.age}
              onChange={handleChange("age")}
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
          <Typography style={{ color: "#ffffff" }}>
            Your Claim is ready, you can now save it in to your Wallet{" "}
          </Typography>
          <Button
            handleClick={() => sendClaimToWallet()}
            text={"Send Request"}
          ></Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
