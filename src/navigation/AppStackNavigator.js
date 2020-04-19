import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme } from '@react-navigation/native';
import AppRoutes from './routes/appRoutes';
import RootStyles from '../styles/root';
import TimerView from '../views/TimerView';
import SettingsView from '../views/SettingsView';

const Stack = createStackNavigator();

export default function AppStackNavigator() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<Stack.Navigator
				initialRouteName={AppRoutes.TIMER}
				screenOptions={{
					headerTintColor: RootStyles.colorHighlight,
				}}
			>
				<Stack.Screen
					name={AppRoutes.TIMER}
					component={TimerView}
					options={{
						title: 'Timer',
						headerShown: false
					}}
				/>
				<Stack.Screen
					name={AppRoutes.SETTINGS}
					component={SettingsView}
					options={{title: 'Settings'}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
