import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Switch, View, Text } from 'react-native';
import { connect } from 'react-redux';
import RootStyles from '../styles/root';
import {
	TOGGLE_TIMER_30S,
	TOGGLE_TIMER_1MIN,
	TOGGLE_TIMER_2MIN,
	TOGGLE_TIMER_30S_15S
} from '../store/actions/settingsActions';

class SettingsView extends React.Component {

	toggleTimer(type, value) {
		this.props.dispatch({ type, value });
	}

	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Text style={{color:'white'}}>30s</Text>
					<Switch
						value={this.props.timersState.timer30s}
						onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_30S, on)}}
					/>

					<Text style={{color:'white'}}>1 min</Text>
					<Switch
						value={this.props.timersState.timer1min}
						onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_1MIN, on)}}
					/>

					<Text style={{color:'white'}}>2 min</Text>
					<Switch
						value={this.props.timersState.timer2min}
						onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_2MIN, on)}}
					/>

					<Text style={{color:'white'}}>30s/15s</Text>
					<Switch
						value={this.props.timersState.timer30s15s}
						onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_30S_15S, on)}}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
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

// Redux
const mapStateToProps = state => ({
	timersState: state.settingsReducer.toggleTimersReducer
});

export default connect(mapStateToProps)(SettingsView);
