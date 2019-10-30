// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import { makeStyles } from '@material-ui/core';

/**
 * Button styles
 * @type {StylesHook<Styles<{readonly spacing?: *, readonly palette?: *}, {}, string>>}
 */
export const useStyles = makeStyles(({ spacing, palette }) => ({
  button: {
    textTransform: 'none',
    borderRadius: '0',
    height: '46px',
    background: '#00E599',
    boxShadow: 'none',
    color: palette.text.button,
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: spacing(1.5),
  },
  rejectButton: {
    background: '#00E599',
  },
  arrowRight: {
    fontSize: 24.5,
    color: palette.text.primary,
  },
  smallButton: {
    height: '22px',
    fontSize: '13px',
    marginBottom: spacing(1),
    padding: `0 ${spacing(1)}px`,
  },
  smallArrowRight: {
    fontSize: '14px',
  },
}));
