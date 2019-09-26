import React from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { useStyles } from './Styles';

export default function BaseButton({ handleClick, text, disabled = false, icon = true }) {
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      variant="contained"
      color="inherit"
      className={classes.button}
      style={disabled ? { opacity: 0.5 } : {}}
      showNavigationIcon={icon}
    >
      {text}
      {icon && (
        <ArrowRight className={classes.arrowRight} />
      )}
    </Button>
  );
}
