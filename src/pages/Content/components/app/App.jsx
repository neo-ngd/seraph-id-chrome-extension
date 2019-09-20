import React from 'react';
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

function App() {
  const dispatch = useDispatch();
  const walletFromStore = useSelector((state) => state.wallet);
  const [open, setOpen] = React.useState(false);
  const [claim, setClaim] = React.useState('');

  function addClaim() {
    handleClose();
  }

  document.addEventListener('handleClaim', function(e) {
    setClaim(e.detail);
    handleClickOpen();
  });

  document.addEventListener('askWallet', function() {
    document.dispatchEvent(
      new CustomEvent('receiveWallet', {
        detail: walletFromStore.accounts[0].label,
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
      getAddress: function() {
        let address;
        document.addEventListener('receiveWallet', function(response) {
          address = response.detail;
        });
        document.dispatchEvent(new CustomEvent('askWallet'));
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
    <div>
      {' '}
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
          <DialogContentText id="alert-dialog-description">
            <ReactJson
              displayObjectSize={false}
              displayDataTypes={false}
              src={claim}
            />
          </DialogContentText>
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
    </div>
  );
}

export default App;
