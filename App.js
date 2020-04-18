import React from 'react';
import { StatusBar, View, Text } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
	return (
		<View style={{flex: 1}}>
			<StatusBar barStyle="light-content" />
			<AppNavigator />
		</View>
	);
}
