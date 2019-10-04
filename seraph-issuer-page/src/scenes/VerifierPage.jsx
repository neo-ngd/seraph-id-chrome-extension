import React, {Fragment, useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import Button from "../components/Buttons/BaseButton";

const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default function VerifierPage({address}) {
  // eslint-disable-next-line
  const [claim, setClaim] = React.useState(null);
  // eslint-disable-next-line
  const [error, setError] = React.useState(null);

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.addEventListener('shareClaimSuccess', claimSuccessListener);
    document.addEventListener('shareClaimError', claimErrorListener);
    return () => {
      document.removeEventListener('shareClaimSuccess', claimSuccessListener);
      document.removeEventListener('shareClaimError', claimErrorListener);
    }
  }, []);

  const claimSuccessListener = ({detail}) => {
    setClaim(detail);
    setStatus(SUCCESS);
    setIsSending(false);
  };
  const claimErrorListener = () => {
    setStatus(ERROR);
    setIsSending(false);
  };

  function askClaim() {
    setIsSending(true);
    window.seraphID.askClaim('Passport', `did:neoid:priv:${address}`, 'Demo');
  }

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
            {!status && <Typography style={{ color: "#ffffff" }}>
              To Access our service login with your passport
            </Typography>}
            {status === ERROR && <Typography style={{ color: "#FF6E6E" }}>
              Something went wrong! Try again.{" "}
            </Typography>}
          </Grid>

          <Grid item xs={12}>
            <Button handleClick={askClaim} text={"Login"} disabled={!address || isSending}/>
          </Grid>
          <Grid item xs={12}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
          </Grid>
        </Grid>
      ) : (
        <Fragment>
          <Typography style={{ color: "#ffffff" }}>Welcome {claim.attributes.attributes.firstName} {claim.attributes.attributes.secondName}</Typography>
        </Fragment>
      )}
    </Fragment>
  );
}
