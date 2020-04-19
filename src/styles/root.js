import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;

let RootStyles = {
	gutterDefault: 20,
	buttonSize: 72,
	textSizeDefault: 19,
	colorHighlight: '#ff9f0b',
	colorPurpleAcid: '#8900ff',
	colorLightGrey: '#323235'
};

if (SCREEN_WIDTH <= 320) { // iPhone SE = 320
	RootStyles = {
		...RootStyles,
		gutterDefault: 10
	}
}

export default RootStyles;
