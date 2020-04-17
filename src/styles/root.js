import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;

let RootStyles = {
	gutterDefault: 20,
	buttonSize: 72,
	textSizeDefault: 19,
	colorPurpleAcid: '#8900ff',
};

if (SCREEN_WIDTH <= 320) { // iPhone SE = 320
	RootStyles = {
		...RootStyles,
		gutterDefault: 10
	}
}

export default RootStyles;
