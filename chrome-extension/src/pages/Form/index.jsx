// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { ThemeProvider } from '@material-ui/styles';
import Form from './Form';
import './index.css';
import theme from '../../commons/theme';

const proxyStore = new Store();

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
