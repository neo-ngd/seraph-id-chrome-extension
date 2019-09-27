import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../components/Buttons/BaseButton";
import Typography from "@material-ui/core/Typography";

export default function SpacingGrid() {
  // eslint-disable-next-line
  const [claim, setClaim] = React.useState(null);
  // eslint-disable-next-line
  const [error, setError] = React.useState(null);

  function askClaim() {
    window.seraphID.askClaim('Passport', 'did:neoid:priv:AKrEnB5fhbi2bN8VqyxsDU3ijGG2tLVPeu', 'Test');
  }

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
              To Access our service login with your passport
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button handleClick={askClaim} text={"LOGIN"}/>
          </Grid>
          <Grid item xs={12}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          <Typography style={{ color: "#ffffff" }}>Welcome </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
