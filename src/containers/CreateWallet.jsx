import React, { Fragment } from 'react';
import BaseButton from '../components/Buttons/BaseButton';
import InputText from '../components/InputText/InputText';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import useText from '../commons/hooks/useText';
import { SeraphIDWallet, DIDNetwork } from '@sbc/seraph-id-sdk';

function CreateWallet() {
  const dispatch = useDispatch();
  const { password, handleChange } = useText();

  function createAndSetWallet() {
    const wallet = new SeraphIDWallet({ name: 'MyWallet' });
    wallet.createDID(DIDNetwork.PrivateNet);
    wallet.accounts[0].encrypt(password).then(() => {
      const exportedWalletJSON = JSON.stringify(wallet.export());
      setWallet(exportedWalletJSON);
    });
  }

  function setWallet(wallet) {
    dispatch({ type: 'SET_WALLET', wallet });
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
          <InputText
            text={password}
            handleChange={(e) => handleChange(e)}
          ></InputText>
        </Grid>
        <Grid item xs={12}>
          <BaseButton
            disabled={password === ''}
            handleClick={createAndSetWallet}
            text={'Create a Wallet'}
            variant="contained"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default CreateWallet;
