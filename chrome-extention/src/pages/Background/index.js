import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { wrapStore, alias } from 'webext-redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage';
import aliases from './aliases'; // Use SessionStorage

const composeEnhancers = composeWithDevTools({
  realtime: true,
  hostname: 'localhost',
  port: 8000,
});
const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['password'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [alias(aliases), thunk];
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
wrapStore(store);
export const persistor = persistStore(store);
