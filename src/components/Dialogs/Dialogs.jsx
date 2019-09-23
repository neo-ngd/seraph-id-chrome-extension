import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import ReactJson from 'react-json-view';
import Button from '@material-ui/core/Button';

function DialogClaims({ open, handleClose, claim, handleClaim }) {
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
            onClick={handleClaim}
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

export default DialogClaims;
