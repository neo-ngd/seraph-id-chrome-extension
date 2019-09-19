import React, { Fragment } from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import InputText from '../components/InputText/InputText';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import useText from '../commons/hooks/useText';

function CreateWallet() {
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
        spacing={2}
      >
        <Grid item xs={12}>
          UNLOCK WALLET
          <InputText
            text={password}
            handleChange={(e) => handleChange(e)}
          ></InputText>
        </Grid>
        <Grid item xs={12}>
          <BaseButton
            disabled={password === ''}
            handleClick={setPassword}
            text={'Create a Wallet'}
            variant="contained"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default CreateWallet;
