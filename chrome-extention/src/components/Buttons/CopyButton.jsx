// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { useClipboard } from 'use-clipboard-copy';
import { Button, Tooltip } from '@material-ui/core';
import dictionary from "../../commons/dictionary";

/**
 * <CopyButton />
 * The button is copying passing text to the clipboard.
 * @param textToCopy
 * @param children
 * @return {*}
 * @constructor
 */
const CopyButton = ({ textToCopy, children }) => {
  const clipboard = useClipboard({
    copiedTimeout: 700, // timeout duration in milliseconds
  });

  return (
    <Tooltip title={clipboard.copied ? dictionary.copyButton.copied : dictionary.copyButton.copy}>
      <Button
        variant="text"
        onClick={() => {
          clipboard.copy(textToCopy);
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

CopyButton.propTypes = {
    textToCopy: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
};

export default CopyButton;
