import { createStore } from 'redux';
import rootReducer from './reducers';
import { wrapStore } from 'webext-redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage"; // Use SessionStorage

const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: 8000 });
const persistConfig = {
    key: "root",
    storage: storageSession
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeEnhancers());
wrapStore(store);
export const persistor = persistStore(store);