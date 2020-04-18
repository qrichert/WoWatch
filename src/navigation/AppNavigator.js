import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import TimerView from '../views/TimerView';
import SettingsView from '../views/SettingsView';

const Tab = createBottomTabNavigator();

class AppNavigator extends React.Component {
	render() {
		return (
			<NavigationContainer theme={DarkTheme}>
				<Tab.Navigator
					initialRouteName="Settings"
					tabBarOptions={{
						activeTintColor: '#ff9f0b',
						showLabels: false,
					}}
					screenOptions={({route}) => ({
						tabBarIcon: ({color, size}) => {
							let iconName = '';
							switch (route.name) {
								case 'Timer': iconName = 'ios-timer'; break;
								case 'Settings': iconName = 'ios-settings'; break;
							}
							return <Ionicons name={iconName} size={size} color={color} />
						}
					})}
				>
					<Tab.Screen name="Timer" component={TimerView} />
					<Tab.Screen name="Settings" component={SettingsView} />
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}

export default AppNavigator;
