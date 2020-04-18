import { createStore, combineReducers } from 'redux';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({ settingsReducer });
export default createStore(rootReducer);
