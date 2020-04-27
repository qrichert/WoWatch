import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AppRoutes from './routes/appRoutes';
import RootStyles from '../styles/root';
import TimerView from '../views/TimerView';
import SettingsView from '../views/SettingsView';

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<Tab.Navigator
				initialRouteName={AppRoutes.TIMER}
				tabBarOptions={{
					activeTintColor: RootStyles.colorHighlight,
					showLabel: false
				}}
				screenOptions={({route}) => ({
					tabBarIcon: ({color, size}) => {
						let iconName = '';
						switch (route.name) {
							case AppRoutes.TIMER: iconName = 'ios-timer'; break;
							case AppRoutes.SETTINGS: iconName = 'ios-settings'; break;
						}
						return <Ionicons name={iconName} size={size} color={color} />
					}
				})}
			>
				<Tab.Screen
					name={AppRoutes.TIMER}
					component={TimerView}
					options={{title: 'Timer'}}
				/>
				<Tab.Screen
					name={AppRoutes.SETTINGS}
					component={SettingsView}
					options={{title: 'Settings'}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
