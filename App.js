import React from 'react';
import { StatusBar, View } from 'react-native'
import TimerView from './src/components/TimerView';

export default function App() {
	return (
		<View style={{flex:1}}>
			<StatusBar barStyle="light-content" />
			<TimerView />
		</View>
	);
}
