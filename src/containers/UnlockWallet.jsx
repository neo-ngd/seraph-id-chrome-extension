import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import BaseButton from '../components/Buttons/BaseButton';
import InputText from '../components/InputText/InputText';
import useText from '../commons/hooks/useText';
import RotatingLogo from '../components/RotatingLogo/RotatingLogo';

function UnlockWallet() {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();

  function setPassword() {
    dispatch({ type: 'SET_PASSWORD', password });
  }

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={12}>
          <RotatingLogo></RotatingLogo>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Welcome Back!{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Your DID is waiting{' '}
            <span role="img" aria-label="sheep">
              🐑
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InputText
            text={password}
            handleChange={(e) => handleChange(e)}
          ></InputText>
        </Grid>

        <Grid item xs={12}>
          <BaseButton
            disabled={password === ''}
            handleClick={setPassword}
            text={'Unlock Wallet'}
            variant="contained"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default UnlockWallet;
