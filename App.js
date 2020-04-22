import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/store';
import { StatusBar, View } from 'react-native';
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
