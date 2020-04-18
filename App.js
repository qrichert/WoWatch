import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import rootStore from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
	return (
		<Provider store={rootStore}>
			<View style={{flex: 1}}>
				<StatusBar barStyle="light-content" />
				<AppNavigator />
			</View>
		</Provider>
	);
};
