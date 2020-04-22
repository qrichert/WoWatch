import { Dimensions } from 'react-native';
import { combineReducers } from 'redux';
import {
	TOGGLE_TIMER_30S,
	TOGGLE_TIMER_1MIN,
	TOGGLE_TIMER_1MIN30,
	TOGGLE_TIMER_2MIN,
	TOGGLE_TIMER_30S_15S
} from '../actions/settingsActions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialTimersState = {
	timer30s: true,
	timer1min: true,
	timer1min30: SCREEN_WIDTH > 320,
	timer2min: false,
	timer30s15s: true
};

function toggleTimersReducer(state = initialTimersState, action) {

	switch (action.type) {
		case TOGGLE_TIMER_30S:
			return { ...state, timer30s: action.value };
		case TOGGLE_TIMER_1MIN:
			return { ...state, timer1min: action.value };
		case TOGGLE_TIMER_1MIN30:
			return { ...state, timer1min30: action.value };
		case TOGGLE_TIMER_2MIN:
			return { ...state, timer2min: action.value };
		case TOGGLE_TIMER_30S_15S:
			return { ...state, timer30s15s: action.value };
		default:
			return state; // Returning a spreaded copy of the state doesn't work somehow { ...state }
	}
}

const rootReducer = combineReducers({ toggleTimersReducer });

export default rootReducer;
