import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


function App() {

  document.addEventListener('handleClaim', function (e) {
    handleClickOpen()
  });

  function customConsole() {
    window.seraphID = {
      sendClaim: function () {
        var data = {
          any: 'JSON-ifiable data',
          meaning: 'no DOM elements or classes/functions',
        };

        document.dispatchEvent(new CustomEvent('handleClaim', { detail: data }));
      },
      askClaim:console.log("claim asked")
    }
  }

  var script = document.createElement('script'),
    code = document.createTextNode('(' + customConsole + ')();');
  script.appendChild(code);
  (document.body || document.head || document.documentElement).appendChild(script);

  const [open, setOpen] = React.useState(false);
  const [claim, setClaim] = React.useState("");

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
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to accept this claim ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
