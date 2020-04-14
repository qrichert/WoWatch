import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RootStyles from '../styles/root'

class Clock extends React.Component {

	render() {

		// Count up or down
		let countDirection = 'down';

		if (typeof this.props.countDirection !== 'undefined'
			&& this.props.countDirection === 'up') {
				countDirection = 'up';
		}

		// Time
		let time = this.props.time || 0;

		time = Math.trunc(time); // No milliseconds or what

		let hours = Math.trunc(time / 3600);
			time -= hours * 3600;

		let minutes = Math.trunc(time / 60);
			time -= minutes * 60;
			minutes = minutes.toString().padStart(2, '0');

		let seconds = time;
			seconds = seconds.toString().padStart(2, '0');

		// Clock color
		let clockColor = 'white';

			if (countDirection === 'down') {
				if (time <= 5)
					clockColor = 'red';
				else if (time <= 10)
					clockColor = 'orange';
			}

		return (
			<View style={StyleSheet.flatten([styles.container, this.props.style])}>
				<View style={styles.clockContainer}>
					{hours > 0 && <Text style={styles.hours}>{hours}</Text>}
					<Text style={StyleSheet.flatten([styles.time, {color: clockColor}])}>{minutes}:{seconds}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'green',
		borderWidth: 1,
		marginBottom: RootStyles.gutterDefault
	},
	hours: {
		color: '#ffffff',
		fontSize: RootStyles.textSizeDefault
	},
	clockContainer: {
		alignItems: 'flex-end'
	},
	time: {
		color: '#ffffff',
		fontSize: 100
	}
});

export default Clock;
