import React from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { useStyles } from './Styles';
import clsx from 'clsx';

export default function BaseButton({ handleClick, text, small = false, disabled = false, icon = false }) {
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      variant="contained"
      color="inherit"
      className={clsx(classes.button, small && classes.smallButton)}
      style={disabled ? { opacity: 0.5 } : {}}
    >
      {text}
      {icon && (
        <ArrowRight className={clsx(classes.arrowRight, classes.smallArrowRight)} />
      )}
    </Button>
  );
}
