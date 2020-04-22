import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react'
import AppStackNavigator from './src/navigation/AppStackNavigator';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<View style={{flex: 1}}>
					<StatusBar barStyle="light-content" />
					<AppStackNavigator />
				</View>
			</PersistGate>
		</Provider>
	);
};
