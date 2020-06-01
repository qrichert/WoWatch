import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist-expo-filesystem';
import settingsReducer from './reducers/settingsReducer';

const persistConfig = {
	key: 'root',
	storage
};

const rootReducer = combineReducers({settingsReducer});
// export default createStore(rootReducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
