import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


function App() {
  const dispatch = useDispatch()
  const wallet = useSelector(state => state.wallet)
  const [open, setOpen] = React.useState(false);
  const [claim, setClaim] = React.useState("");

  function addClaim(claim) {

    dispatch({ type: 'ADD_CLAIM', claim });
    handleClose()
  }


  document.addEventListener('handleClaim', function (e) {
    setClaim(e.detail)
    handleClickOpen()
  });

  document.addEventListener('askWallet', function () {
    document.dispatchEvent(new CustomEvent('receiveWallet', { detail: wallet.accounts[0].label }));
  });

  function seraphIdInjected() {
    window.seraphID = {
      test: "this is a test",
      sendClaim: function (data) {
        document.dispatchEvent(new CustomEvent('handleClaim', { detail: data }));
      },
      getAddress: function () {
        let address
        document.addEventListener('receiveWallet', function (response) {
          address = response.detail
        });
        document.dispatchEvent(new CustomEvent('askWallet'));
        return address
      }
    }
  }

  var script = document.createElement('script'),
    code = document.createTextNode('(' + seraphIdInjected + ')();');
  script.appendChild(code);
  (document.body || document.head || document.documentElement).appendChild(script);



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
            {JSON.stringify(claim)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={addClaim} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
