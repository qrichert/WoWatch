import { combineReducers } from 'redux';
import {
	TOGGLE_TIMER_30S,
	TOGGLE_TIMER_1MIN,
	TOGGLE_TIMER_2MIN,
	TOGGLE_TIMER_30S_15S
} from '../actions/settingsActions';

const initialTimersState = {
	timer30s: true,
	timer1min: true,
	timer2min: true,
	timer30s15s: true
};

function toggleTimersReducer(state = initialTimersState, action) {

	let nextState = { ...state };

	switch (action.type) {
		case TOGGLE_TIMER_30S:
			nextState.timer30s = action.value;
			break;
		case TOGGLE_TIMER_1MIN:
			nextState.timer1min = action.value;
			break;
		case TOGGLE_TIMER_2MIN:
			nextState.timer2min = action.value;
			break;
		case TOGGLE_TIMER_30S_15S:
			nextState.timer30s15s = action.value;
			break;
	}

	return nextState;
}

const rootReducer = combineReducers({ toggleTimersReducer });

export default rootReducer;
