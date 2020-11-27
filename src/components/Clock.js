import React from 'react'
import { Dimensions, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import RootStyles from '../styles/root'

const SCREEN_WIDTH = Dimensions.get('window').width;

class Clock extends React.Component {

	getHintColor(time, defaultColor = '#ffffff') {

		if (time >= 11) // Because we want to color the 10.XX range also, which doesn't match > 10
			return defaultColor;

		const RANGE_START_HUE = 35;
		const RANGE_END_HUE = -5;

		let progress = Math.abs(RANGE_END_HUE - RANGE_START_HUE);

		if (time > 0)
			progress *= 1 - (time / 10);
		// else
		// 	progress *= 1;

		let hue = 0;

		if (RANGE_START_HUE < RANGE_END_HUE)
			hue = RANGE_START_HUE + progress;
		else
			hue = RANGE_START_HUE - progress;

		hue = Math.trunc(hue); // No decimals

		return `hsl(${hue}, 95%, 60%)`;
	}

	render() {

		// Lap
		let lap = -1;

			if (typeof this.props.lap !== 'undefined' && this.props.lap !== null)
				lap = this.props.lap;

		// Use color hint or not (<10s, <5s)
		let useColorHint = this.props.useColorHint === true;

		// Time
		let time = this.props.time || 0;

		// Clock color
		let clockColor = useColorHint ? this.getHintColor(time, '#ffffff') : '#ffffff';

		// h:m:s
		let hours = Math.trunc(time / 3600);
			time -= hours * 3600;

		let minutes = Math.trunc(time / 60);
			time -= minutes * 60;
			minutes = minutes.toString().padStart(2, '0');

		let seconds = Math.trunc(time);
			time -= seconds;
			seconds = seconds.toString().padStart(2, '0');

		let milliseconds = time;
			milliseconds = Math.trunc(milliseconds * 1000);
			milliseconds = milliseconds.toString().padStart(3, '0');

		return (
			<View style={[styles.container, this.props.style]}>
				<View>
					<View style={[styles.sideInfoContainer, styles.hours]}>
						<Text style={[styles.sideInfo, {color: clockColor}]}>{hours > 0 ? hours : ' '}</Text>
					</View>
					<TouchableOpacity onLongPress={this.props.onLongPress}>
						<Text style={[styles.time, {color: clockColor}]}>{minutes}:{seconds}</Text>
					</TouchableOpacity>
					<View style={styles.sideInfoContainer}>
						<Text style={styles.sideInfo}>{lap > -1 ? lap : ' '}</Text>
						<Text style={[styles.sideInfo, {color: clockColor}]}>{milliseconds > 0 ? milliseconds : ' '}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	sideInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	sideInfo: {
		color: '#ffffff',
		fontSize: RootStyles.textSizeDefault,
		fontVariant: ['tabular-nums']
	},
	hours: {
		justifyContent: 'flex-end'
	},
	time: {
		color: '#ffffff',
		fontSize: 100,
		fontWeight: SCREEN_WIDTH > 320 ? '700' : '600',
		fontVariant: ['tabular-nums']
	}
});

export default Clock;
