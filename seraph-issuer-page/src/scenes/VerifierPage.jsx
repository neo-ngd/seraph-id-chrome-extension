import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../components/Buttons/BaseButton";
import Typography from "@material-ui/core/Typography";

export default function SpacingGrid() {
  const [claim, setClaim] = React.useState(null);
  const [error, setError] = React.useState(null);

  function askClaim() {
    window.seraphID.askClaim("8dddfaab-9a98-4cc9-8013-5d4fa00fe162");
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
            <Button onClick={askClaim} text={"LOGIN"}></Button>
          </Grid>
          <Grid item xs={12}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
          </Grid>
        </Grid>
      ) : (
        <React.Fragment>
          <Typography style={{ color: "#ffffff" }}>
            Your Claim is ready, you can now save it in to your Wallet
          </Typography>
          <Button text={"Login"}></Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
