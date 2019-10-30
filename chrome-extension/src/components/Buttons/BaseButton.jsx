// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';
import { useStyles } from './Styles';

/**
 * <BaseButton />
 * Primary button component.
 * @param handleClick
 * @param text
 * @param small
 * @param disabled
 * @param icon
 * @param fullWidth
 * @param reject
 * @param component
 * @param testID
 * @return {*}
 * @constructor
 */
const BaseButton = ({
  handleClick,
  text,
  small,
  disabled,
  icon,
  fullWidth,
  reject,
  component,
  testID,
}) => {
  const classes = useStyles();

  const style = {};
  if (disabled) {
    style.opacity = 0.5;
  }
  if (fullWidth) {
    style.width = '100%';
  }

  return (
    <Button
      data-test-id={testID}
      component={component}
      disabled={disabled}
      onClick={handleClick}
      variant="contained"
      color="inherit"
      className={clsx(
        classes.button,
        small && classes.smallButton,
        reject && classes.rejectButton
      )}
      style={style}
    >
      {text}
      {icon && (
        <ArrowRight
          style={{ opacity: disabled ? 0.5 : 1 }}
          className={clsx(classes.arrowRight, small && classes.smallArrowRight)}
        />
      )}
    </Button>
  );
};

BaseButton.defaultProps = {
  small: false,
  disabled: false,
  icon: false,
  fullWidth: false,
  reject: false,
  component: undefined,
  testID: 'base-button',
};

BaseButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
  fullWidth: PropTypes.bool,
  reject: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};

export default BaseButton;
