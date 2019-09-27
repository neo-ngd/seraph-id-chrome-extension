import React from 'react';
import { Box } from '@material-ui/core';
import ReactJson from 'react-json-view';
import { dialogTypes } from '../../pages/Content/contentTypes';
import BaseModal from '../Modals/BaseModal';
import BaseButton from '../Buttons/BaseButton';

const DialogClaims = ({ open, handleClose, claim, handleClaim, context, schemaName, verifierName }) => {
  const header = () => (
    <Box color="text.primary">
      {context === dialogTypes.GET_CLAIM
        ? 'Do you want to accept this claim?'
        : `${verifierName} wants to access your ${schemaName}. Do you want to share it?`
      }
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
        transform: 'translateX(-50%)',
        right: 0,
        bottom: 0,
        maxWidth: '300px',
        zIndex: 99,
      }}
    >
      <Box>
        <ReactJson
            displayObjectSize={false}
            displayDataTypes={false}
            src={claim}
          />
      </Box>

      <Box alignSelf="flex-end" width="80%" pr="20px" display="flex">
        <BaseButton
          handleClick={handleClose}
          small
          text="No"
        />

        <BaseButton
          small
          handleClick={handleClaim}
          text="Yes"
        />
      </Box>
    </BaseModal>
  );
}

export default DialogClaims;
