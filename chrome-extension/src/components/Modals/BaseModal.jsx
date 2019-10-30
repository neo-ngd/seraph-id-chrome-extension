// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import PropTypes from 'prop-types';
import { Box, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

/**
 * Component styles
 * @type {StylesHook<Styles<{readonly spacing?: *, readonly palette?: *}, {}, string>>}
 */
const useStyles = makeStyles(({ palette, spacing }) => ({
  wrapper: {
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 40px)',
    top: spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 99999,
  },
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    background: palette.primary.light,
    zIndex: 99999,
    width: '100%',
    maxHeight: '100%',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    backgroundColor: 'transparent',
    height: '42px',
  },
  content: {
    paddingTop: spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
}));

/**
 * <BaseModal />
 * The base dialog modal component.
 * @param isOpen
 * @param onClose
 * @param children
 * @param HeaderComponent
 * @param style
 * @return {*}
 * @constructor
 */
const BaseModal = ({ isOpen, onClose, children, HeaderComponent, style }) => {
  const classes = useStyles();

  return (
    isOpen && (
      <Box className={classes.wrapper} style={style}>
        <ClickAwayListener onClickAway={onClose}>
          <Box onClose={onClose} className={classes.container}>
            <Box className={classes.header}>{HeaderComponent()}</Box>
            <Box className={classes.content}>{children}</Box>
          </Box>
        </ClickAwayListener>
      </Box>
    )
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  HeaderComponent: PropTypes.elementType,
  style: PropTypes.object,
};

export default BaseModal;
