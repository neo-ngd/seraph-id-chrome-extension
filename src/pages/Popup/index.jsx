import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <Popup />
    </Provider>,
    window.document.querySelector('#app-container')
  );
});
