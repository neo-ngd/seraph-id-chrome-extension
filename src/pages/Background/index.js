import { createStore } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'webext-redux';
import { composeWithDevTools } from 'remote-redux-devtools';

const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: 8000 });

const store = createStore(rootReducer, composeEnhancers());

wrapStore(store);
