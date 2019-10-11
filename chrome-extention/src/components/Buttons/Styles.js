// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import { makeStyles } from '@material-ui/core';

/**
 * Button styles
 * @type {StylesHook<Styles<{readonly spacing?: *, readonly palette?: *}, {}, string>>}
 */
export const useStyles = makeStyles(({ spacing, palette }) => ({
  button: {
    borderRadius: '20px',
    height: '46px',
    background: 'linear-gradient(90deg, #00BF0B 0%, #B5E200 100%)',
    boxShadow: 'none',
    color: palette.text.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: spacing(1.5),
  },
  rejectButton: {
    background: 'linear-gradient(90deg, #90908D 0%, #F2F2F2 100%)',
  },
  arrowRight: {
    fontSize: 24,
    color: palette.text.primary,
  },
  smallButton: {
    height: '22px',
    fontSize: '10px',
    marginBottom: spacing(1),
    padding: `0 ${spacing(1)}px`,
  },
  smallArrowRight: {
    fontSize: '12px',
  },
}));
