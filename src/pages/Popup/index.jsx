import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import cruiserfortress3d from '../../assets/fonts/cruiserfortress3d.ttf';
import { ThemeProvider } from '@material-ui/styles';
import Popup from './Popup';
import './index.css';

import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

const proxyStore = new Store();
//TO DO , use font for evrything
const cruiserfortress = {
  fontFamily: 'cruiserfortress3d',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('cruiserfortress3d'),
    url(${cruiserfortress3d}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};
const theme = createMuiTheme({
  typography: {
    fontFamily: 'cruiserfortress',
  },
  palette: {},
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [cruiserfortress],
      },
    },
  },
});

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <ThemeProvider theme={theme}>
        <Popup />
      </ThemeProvider>
    </Provider>,
    window.document.querySelector('#app-container')
  );
});
