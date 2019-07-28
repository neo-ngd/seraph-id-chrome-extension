import React from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Button, Tooltip, Typography } from '@material-ui/core/';

export default function PublicUrl({ textToCopy, children }) {
  const clipboard = useClipboard({
    copiedTimeout: 700, // timeout duration in milliseconds
  });

  return (
    <Tooltip title={clipboard.copied ? 'Copied!' : 'Copy Link'}>
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
}
