// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import ReactJson from 'react-json-view';
import BaseModal from '../Modals/BaseModal';
import BaseButton from '../Buttons/BaseButton';
import {DIALOG_TYPES} from "../../commons/constants";
import Icon from '../Icon/Icon';
import dictionary from "../../commons/dictionary";

/**
 * <DialogHeader />
 * Header for the modal dialog
 * @return {*}
 * @constructor
 */
const DialogHeader = () => (
    <Box pl={1.2} pt={0.8}>
      <Icon />
    </Box>
);

/**
 * <Dialogs />
 * Modal dialog for the content script.
 * It accept two context: GET_CLAIM and ASK_CLAIM.
 * Based on the passed context, the dialog should be render in the issuer or the verifier dialog variant.
 * @param open
 * @param handleClose
 * @param claim
 * @param handleClaim
 * @param context
 * @param schemaName
 * @param verifierName
 * @return {*}
 * @constructor
 */
const Dialogs = ({ open, handleClose, claim, handleClaim, context, schemaName, verifierName }) => {
  return (
    <BaseModal
      HeaderComponent={DialogHeader}
      isOpen={open}
      onClose={handleClose}
      style={{
        maxWidth: '300px',
      }}
    >
      <Box fontSize="16px" pb={2} textAlign="center" color="text.primary">
        {context === DIALOG_TYPES.GET_CLAIM
          ? dictionary.dialogs.askAccept
          : `${verifierName} ${dictionary.dialogs.wantTo} ${schemaName}. ${dictionary.dialogs.askShare}`
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
          text={dictionary.commons.no}
          fullWidth={false}
          reject={true}
        />

        <BaseButton
          small
          handleClick={handleClaim}
          text={dictionary.commons.yes}
          fullWidth={false}
        />
      </Box>
    </BaseModal>
  );
};

Dialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  claim: PropTypes.object,
  handleClaim: PropTypes.func,
  context: PropTypes.oneOf([
      DIALOG_TYPES.ASK_CLAIM,
      DIALOG_TYPES.GET_CLAIM
  ]),
  schemaName: PropTypes.string,
  verifierName: PropTypes.string,
};

export { DialogHeader };
export default Dialogs;
