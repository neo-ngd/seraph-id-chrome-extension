import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Popup from './Popup';
import './index.css';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

const proxyStore = new Store();
//TO DO , use font for evrything

const theme = createMuiTheme({
  palette: {},
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
