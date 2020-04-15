import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;

const root = {
	gutterDefault: SCREEN_WIDTH > 320 ? 20 : 10, // iPhone SE = 320
	buttonSize: 72,
	textSizeDefault: 19,
	colorPurpleAcid: '#8900ff',
};

export default root;
