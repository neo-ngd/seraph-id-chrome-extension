import React from 'react';
import { Box } from '@material-ui/core';
import ReactJson from 'react-json-view';
import BaseModal from '../Modals/BaseModal';
import BaseButton from '../Buttons/BaseButton';
import logo from '../../assets/icons/logo-header.png';
import {DIALOG_TYPES} from "../../commons/constants";

const DialogClaims = ({ open, handleClose, claim, handleClaim, context, schemaName, verifierName }) => {
  const header = () => (
    <Box pt="8px" pb="8px">
      <img alt="logo" src={logo} />
    </Box>
  );
  return (
    <BaseModal
      HeaderCompoennt={header}
      isOpen={open}
      onClose={handleClose}
      style={{
        left: '50%',
        width: 'auto',
        transform: 'translateX(-50%) translateY(20%)',
        right: 0,
        maxWidth: '300px',
        zIndex: 99,
      }}
    >
      <Box fontSize="16px" pb="16px" textAlign="center" color="text.primary">
        {context === DIALOG_TYPES.GET_CLAIM
          ? 'Do you want to accept this claim?'
          : `${verifierName} wants to access your ${schemaName}. Do you want to share it?`
        }
      </Box>
      <Box overflow="auto" >
        <ReactJson
            displayObjectSize={false}
            displayDataTypes={false}
            enableClipboard={false}
            src={claim}
          />
      </Box>

      <Box alignSelf="flex-end" display="flex" pt={2} pb={1}>
        <BaseButton
          handleClick={handleClose}
          small
          text="No"
          fullWidth={false}
          reject={true}
        />

        <BaseButton
          small
          handleClick={handleClaim}
          text="Yes"
          fullWidth={false}
        />
      </Box>
    </BaseModal>
  );
}

export default DialogClaims;
