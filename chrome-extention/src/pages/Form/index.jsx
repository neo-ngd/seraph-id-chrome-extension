import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Form from './Form';
import './index.css';

const proxyStore = new Store();

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#FFF',
      secondary: '#CBCFD4',
      light: '#CBCFD4',
      hint: '#00BF0B',
      error: '#FF6E6E',
    },
    primary: {
      main: '#3C444D',
      dark: '#30363D',
      light: '#FFF',
      contrastText: '#00BF0B',
      error: '#FF6E6E',
    },
  },
});

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <ThemeProvider theme={theme}>
        <Form />
      </ThemeProvider>
    </Provider>,
    window.document.querySelector('#form-container')
  );
});
