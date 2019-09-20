import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import ReactJson from 'react-json-view';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { decrypt } from '../../../../commons/seraphSdkUtils';

function App() {
  const dispatch = useDispatch();
  const accountFromStore = useSelector((state) => state.wallet);
  const password = useSelector((state) => state.password);

  const [open, setOpen] = useState(false);
  const [claim, setClaim] = useState('');
  const [wallet, setWallet] = useState('');

  useEffect(() => {
    async function decryptSetWallet() {
      const wallet = await decrypt(accountFromStore, password);
      setWallet(wallet);
    }
    decryptSetWallet();
  }, []);

  function addClaim() {
    wallet.addClaim(claim);

    wallet.accounts[0].encrypt(password).then(() => {
      const exportedWalletJSON = JSON.stringify(wallet.export());
      dispatch({ type: 'SET_WALLET', exportedWalletJSON });
    });
    handleClose();
  }

  document.addEventListener('handleClaim', function(e) {
    setClaim(e.detail);
    handleClickOpen();
  });

  document.addEventListener('getAddress', function() {
    document.dispatchEvent(
      new CustomEvent('receiveAddress', {
        detail: wallet.accounts[0].label,
      })
    );
  });

  function seraphIdInjected() {
    window.seraphID = {
      sendClaim: function(data) {
        document.dispatchEvent(
          new CustomEvent('handleClaim', { detail: data })
        );
      },
      address: function() {
        let address;
        document.addEventListener('receiveAddress', function(response) {
          address = response.detail;
        });
        document.dispatchEvent(new CustomEvent('getAddress'));
        return address;
      },
    };
  }

  var script = document.createElement('script'),
    code = document.createTextNode('(' + seraphIdInjected + ')();');
  script.appendChild(code);
  (document.body || document.head || document.documentElement).appendChild(
    script
  );

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to accept this claim ?
        </DialogTitle>
        <DialogContent>
          <ReactJson
            displayObjectSize={false}
            displayDataTypes={false}
            src={claim}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            No{' '}
            <span role="img" aria-label="sheep">
              😡
            </span>
          </Button>
          <Button
            variant="outlined"
            onClick={addClaim}
            color="primary"
            autoFocus
          >
            Yes{' '}
            <span role="img" aria-label="sheep">
              💚
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default App;
