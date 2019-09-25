import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import ReactJson from 'react-json-view';
import Button from '@material-ui/core/Button';
import { dialogTypes } from '../../pages/Content/contentTypes';

function DialogClaims({ open, handleClose, claim, handleClaim, context }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {context === dialogTypes.GET_CLAIM ?
          'Do you want to accept this claim?' :
          'Do you agree to share this claim?'}
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
  );
}

export default DialogClaims;
