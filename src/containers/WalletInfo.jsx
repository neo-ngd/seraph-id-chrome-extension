import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CopyButton from '../components/Buttons/CopyButton';

function Landing({ name, address }) {
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
    </React.Fragment>
  );
}

export default Landing;
