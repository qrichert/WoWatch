import React from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, View, Text } from 'react-native';
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
				<ScrollView style={styles.container}>
					<View style={styles.optionContainer}>
						<Text style={styles.optionText}>30s</Text>
						<Switch
							value={this.props.timersState.timer30s}
							onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_30S, on)}}
						/>
					</View>

					<View style={styles.optionContainer}>
						<Text style={styles.optionText}>1 min</Text>
						<Switch
							value={this.props.timersState.timer1min}
							onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_1MIN, on)}}
						/>
					</View>

					<View style={styles.optionContainer}>
						<Text style={styles.optionText}>2 min</Text>
						<Switch
							value={this.props.timersState.timer2min}
							onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_2MIN, on)}}
						/>
					</View>

					<View style={styles.optionContainer}>
						<Text style={styles.optionText}>30s/15s</Text>
						<Switch
							value={this.props.timersState.timer30s15s}
							onValueChange={on => { this.toggleTimer(TOGGLE_TIMER_30S_15S, on)}}
						/>
					</View>
				</ScrollView>
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
		width: '100%',
		maxWidth: 700,
		margin: 'auto'
	},
	optionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: RootStyles.gutterDefault,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: RootStyles.colorLightGrey
	},
	optionText: {
		color: '#ffffff',
		fontSize: RootStyles.textSizeDefault
	}
});

// Redux
const mapStateToProps = state => ({
	timersState: state.settingsReducer.toggleTimersReducer
});

export default connect(mapStateToProps)(SettingsView);
