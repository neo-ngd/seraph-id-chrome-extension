import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './Styles';

export default function BaseButton({ handleClick, text, disabled = false }) {
  const classes = useStyles();
  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      variant="outlined"
      color="inherit"
      className={classes.button}
    >
      {text}
    </Button>
  );
}
