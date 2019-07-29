import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CopyButton from '../components/Buttons/CopyButton';
import Claim from '../components/Cards/Claim';

function Landing({ name, address, claims }) {

  function showClaimList() {
    var claimsArr = Object.entries(claims)
    console.log(claims)
    let list = claimsArr.map(claim => <Claim id={claim[1].id} schema={claim[1].schema} ></Claim >)
    return list
  }


  return (
    <React.Fragment>
      <CopyButton textToCopy={address}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="button">{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="overline" display="block" gutterBottom>
              {address}
            </Typography>
          </Grid>
        </Grid>
      </CopyButton>
      <Divider />
      <Typography variant="h6" display="block" gutterBottom>
        Claims
      </Typography>

      {showClaimList()}


    </React.Fragment>
  );
}

export default Landing;
