import React from 'react'
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Vibration, View } from 'react-native';
import RootStyles from '../styles/root'
import Clock from './Clock'
import CustomButton from './CustomButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialState = {
	timerRunning: false,
	currentTime: 0,
	currentLap: -1
};

class TimerView extends React.Component {

	constructor(props) {
		super(props);

		this.m_startTime = null; // Last click on start basically
		this.m_currentTimerStartTime = null; // Current countdown
		this.m_sequence = null; // Sort of queue with timers left

		this.state = initialState;
	}

	getCurrentTime() {
		return Date.now() / 1000;
	}

	startTimer(sequence, infinite = false) {

		// We can do without, so we go from prev -> new instead of prev -> 0 -> new
		// this.stopTimer(); // In case another timer is running

		if (!Array.isArray(sequence))
			sequence = [sequence];

		// We remove a ms just so it doesn't flicker from like 00:03 to 00:02 (as 00:03 would only by shown for 1 ms)
		const PREP_TIME = 3 - 0.001;
		sequence = sequence.map(timer => timer - 0.001);

		let currentTime = this.getCurrentTime();

		this.m_startTime = currentTime;
		this.m_currentTimerStartTime = currentTime;

		// By default, any sequence starts with a 3s prep time
		this.m_sequence = [PREP_TIME, ...sequence]; // Add 3 seconds for prep on start

		// Sequence duration to calculate lap count
		let sequenceDuration = 0;

			for (let i of sequence)
				sequenceDuration += i;

		this.setState({
			timerRunning: true,
			currentTime: this.m_sequence[0],
			currentLap: infinite ? 0 : -1
		});

		let timerLoop = () => {

			// If it was canceled
			if (this.m_startTime === null|| this.m_currentTimerStartTime === null || this.m_sequence === null)
				return;

			currentTime = this.getCurrentTime();

			let timerDuration = this.m_sequence[0];
			let timeElapsedSinceStart = currentTime - this.m_startTime - PREP_TIME; // Whole sequence
			let timeElapsed = currentTime - this.m_currentTimerStartTime; // Current timer
			let timeRemaining = timerDuration - timeElapsed;

			// TODO: Bad, if app pauses it will be wrong, calculate using sequence duration for infinite
			if (timeRemaining < 0) { // Go to next or stop if no next

				Vibration.vibrate();

				this.m_sequence.shift();

				if (this.m_sequence.length === 0) {

					if (infinite) {
						// If infinite, go for another un
						this.m_sequence = [...sequence];

					} else {
						// Else quit
						this.stopTimer();
						return;
					}
				}

				this.m_currentTimerStartTime = currentTime;
				timerDuration = this.m_sequence[0];
				timeElapsed = currentTime - this.m_currentTimerStartTime;
				timeRemaining = timerDuration - timeElapsed;
			}

			let currentLap = infinite ? 0 : -1;

				// We calculate it dynamically from start time instead of just incrementing
				// Se it's always accurate even if app pauses
				if (infinite && timeElapsedSinceStart > 0)
					currentLap = Math.trunc(timeElapsedSinceStart / sequenceDuration) + 1; // + 1 cause 0-0.9 range = 1st lap

			this.setState({
				currentTime: timeRemaining,
				currentLap: currentLap
			});

			requestAnimationFrame(timerLoop);
		};

		requestAnimationFrame(timerLoop);
	}

	stopTimer() {
		this.m_startTime = null;
		this.m_currentTimerStartTime = null;
		this.m_sequence = null;

		this.setState({ ...initialState });
	}

	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Clock style={styles.clock} time={this.state.currentTime} lap={this.state.currentLap} useColorHint={this.state.timerRunning} />
					<View style={styles.buttonsContainer}>
						<CustomButton text="30s" onPress={() => { this.startTimer(30); }} />
						<CustomButton text="1 min" onPress={() => { this.startTimer(60); }} />
						<CustomButton text="2 min" onPress={() => { this.startTimer(120); }} />
						<CustomButton text="30s/15s" backdropColor={RootStyles.colorPurpleAcid} highlightColor={'white'} onPress={() => { this.startTimer([30, 15], true); }} />

						{/*
							There are max 7 buttons on a line
							If just one orphan, space-between does the job
							If more than one we need to complete
							Two orphans min means we need at max 5 placeholders
						*/}
						<View style={styles.buttonPlaceholder} />
						<View style={styles.buttonPlaceholder} />
						<View style={styles.buttonPlaceholder} />
						<View style={styles.buttonPlaceholder} />
						<View style={styles.buttonPlaceholder} />
					</View>
					<View style={styles.stopButtonContainer} >
						<CustomButton style={styles.stopButton} text="Stop" type="stop" disabled={!this.state.timerRunning} onPress={() => { this.stopTimer(); }}/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: '#000000',
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
	},
	clock: {
		flex: 1
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: SCREEN_WIDTH > 500 ? 'center' : 'space-between',
		alignItems: 'center'
	},
	stopButtonContainer: {
		flex: 1
	},
	stopButton: {
		alignSelf: 'center',
		marginTop: RootStyles.gutterDefault * 2
	},
	buttonPlaceholder: {
		display: SCREEN_WIDTH > 500 ? 'none' : null,
		width: RootStyles.buttonSize,
		marginHorizontal: RootStyles.gutterDefault / 2
	}
});

export default TimerView;
