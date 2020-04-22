import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settingsReducer from './reducers/settingsReducer';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({ settingsReducer });
// export default createStore(rootReducer);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	let store = createStore(persistedReducer);
	let persistor = persistStore(store);
	return { store, persistor };
};
