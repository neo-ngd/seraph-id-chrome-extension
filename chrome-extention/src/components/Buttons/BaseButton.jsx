import React from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Button } from '@material-ui/core';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { useStyles } from './Styles';
import clsx from 'clsx';

export default function BaseButton({ handleClick, text, small = false, disabled = false, icon = false, fullWidth = true, reject = false }) {
  const classes = useStyles();

  const style = {};
  if (disabled) {
    style.opacity = .5;
  }
  if (fullWidth) {
    style.width = '100%'
  }

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      variant="contained"
      color="inherit"
      className={clsx(classes.button, small && classes.smallButton, reject && classes.rejectButton)}
      style={style}
    >
      {text}
      {icon && (
        <ArrowRight className={clsx(classes.arrowRight, classes.smallArrowRight)} />
      )}
    </Button>
  );
}
