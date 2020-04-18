import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import RootStyles from '../styles/root';

class SettingsView extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Text style={{color:'white'}}>Settings</Text>
				</View>
			</SafeAreaView>
		);
	}
}

export default SettingsView;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		// backgroundColor: '#000000',
		...Platform.select({
			android: {
				// StatusBar.currentHeight is Android only, and SafeAreaView is iOS only
				paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25
			}
		})
	},
	container: {
		flex: 1,
		padding: RootStyles.gutterDefault, // Padding doesn't work on SafeAreaView
		maxWidth: 700,
		margin: 'auto'
	}
});
