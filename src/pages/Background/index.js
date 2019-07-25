import { createStore } from 'redux';
import { walletReducer } from './redux/reducers';
import { wrapStore } from 'webext-redux';

window.open('http://google.com/');
window.SeraphID = { value: 1 };
window.SeraphID.value = 2;
const store = createStore(walletReducer, {});

wrapStore(store);
