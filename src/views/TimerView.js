import React from 'react'
import { connect } from 'react-redux';
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Vibration, View } from 'react-native';
import AppRoutes from '../navigation/routes/appRoutes';
import RootStyles from '../styles/root'
import Clock from '../components/Clock'
import CustomButton from '../components/CustomButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialState = {
	timerRunning: false,
	currentTime: 0,
	currentLap: -1
};

class TimerView extends React.Component {

	constructor(props) {
		super(props);

		this.m_prepTime = 3;

		this.m_startTime = null; // Last click on start basically
		this.m_sequence = null; // Sequence selected to be played
		this.m_currentSequence = null; // Sort of queue with timers one after the other
		this.m_sequenceDuration = null;
		this.m_sequenceIsInfinite = null;

		this.m_currentLap = null;
		this.m_currentTimerIndex = null;

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

		let currentTime = this.getCurrentTime();

		// Timing
		this.m_startTime = currentTime;
		this.m_currentTimerStartTime = currentTime;

		// Sequence
		this.m_sequence = sequence;
		this.m_currentSequence = [this.m_prepTime, ...sequence]; // Add 3 seconds for prep on start

		// Sequence duration
		this.m_sequenceDuration = 0;

			for (let i of sequence)
				this.m_sequenceDuration += i;

		// Sequence is infinite
		this.m_sequenceIsInfinite = infinite;

		this.m_currentLap = 0; // Prep time is lap 0
		this.m_currentTimerIndex = -1; // Prep time has no index in sequence

		// Set initial state
		this.setState({
			timerRunning: true,
			currentTime: this.m_currentSequence[0] - 0.001, // - 0.001 to avoid flicker from 00:03.000 to 00:02.999,
			currentLap: this.m_sequenceIsInfinite ? 0 : -1
		});

		requestAnimationFrame(() => { this.timerLoop(); } );
	}

	stopTimer() {
		this.m_startTime = null;
		this.m_sequence = null;
		this.m_currentSequence = null;
		this.m_sequenceDuration = null;
		this.m_sequenceIsInfinite = null;

		this.m_currentLap = null;
		this.m_currentTimerIndex = null;

		this.setState({ ...initialState });
	}

	/**
	 * timerLoop() is entirely based on startTime, so that it works
	 * even if the event loop is paused by the app being put in the background.
	 * On wake up it will just compute the current state based on startTime.
	 */
	timerLoop() {

		// If it was canceled
		if (this.m_startTime === null
		    || this.m_sequence === null
		    || this.m_currentSequence === null
		    || this.m_sequenceDuration === null
		    || this.m_sequenceIsInfinite === null)
			return;

		let currentTime = this.getCurrentTime();
		let totalTimeElapsed = currentTime - this.m_startTime;

		if (!this.m_sequenceIsInfinite
		    && totalTimeElapsed > (this.m_sequenceDuration + this.m_prepTime)) {
			this.stopTimer();
			Vibration.vibrate(); // Make it vibrate on end
			return;
		}

		// Current lap
		let currentLap = 0;

		if (totalTimeElapsed > this.m_prepTime)
			currentLap = Math.trunc((totalTimeElapsed - this.m_prepTime) / this.m_sequenceDuration) + 1;

		// Time remaining
		let currentTimerIndex = -1; // -1 = prepTime
		let timeRemainingInCurrentTimer = 0;

		if (totalTimeElapsed <= this.m_prepTime) {
			timeRemainingInCurrentTimer = this.m_prepTime - totalTimeElapsed;
		} else {
			let currentSequenceTimeElapsed = totalTimeElapsed - this.m_prepTime; // Total sequence time elapsed (i.e. where we're at in the universe of sequences)
				currentSequenceTimeElapsed -= (this.m_sequenceDuration * (currentLap - 1)); // Current sequence time elapsed (i.e. where we're at in current sequence)

			// Now we know where we are inside the current sequence (x / sequenceDuration)
			// So what we do now is we extract the index we're in
			// Like in a sequence [30, 15]:
			// currentSequenceTimeElapsed = 28 -> index 0
			// currentSequenceTimeElapsed = 42 -> index 1

			let sumDurationOfPreviousTimers = 0;
			currentTimerIndex = 0;
			for (let el of this.m_sequence) {
				if (currentSequenceTimeElapsed <= (sumDurationOfPreviousTimers + el))
					break; // Found it

				sumDurationOfPreviousTimers += el;
				currentTimerIndex++; // Could be next one
			}

			// So now we have the index
			// And we can deduce the time the time left in the current timer by subtracting time elapsed from timer duration
			timeRemainingInCurrentTimer = currentSequenceTimeElapsed - sumDurationOfPreviousTimers;
			timeRemainingInCurrentTimer = this.m_sequence[currentTimerIndex] - timeRemainingInCurrentTimer;
		}

		// Now we need to detect lap change or index change to trigger vibration & prevent flicker

		if (this.m_currentLap !== currentLap
			|| this.m_currentTimerIndex !== currentTimerIndex) {

			this.m_currentLap = currentLap;
			this.m_currentTimerIndex = currentTimerIndex;

			timeRemainingInCurrentTimer -= 0.001; // Prevent flicker

			Vibration.vibrate();
		}

		this.setState({
			currentTime: timeRemainingInCurrentTimer,
			currentLap: this.m_sequenceIsInfinite ? currentLap : -1
		});

		requestAnimationFrame(() => { this.timerLoop(); })
	}

	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Clock
						style={styles.clock}
						time={this.state.currentTime}
						lap={this.state.currentLap}
						useColorHint={this.state.timerRunning}
						onLongPress={() => { this.props.navigation.navigate(AppRoutes.SETTINGS); }}
					/>
					<View style={styles.buttonsContainer}>
						{this.props.timersState.timer30s &&
						 <CustomButton
							text="30s"
							onPress={() => { this.startTimer(30); }}
							onLongPress={() => { this.startTimer(30, true); }}
						/>}
						{this.props.timersState.timer1min &&
						<CustomButton
							text="1 min"
							onPress={() => { this.startTimer(60); }}
							onLongPress={() => { this.startTimer(60, true); }}
						/>}
						{this.props.timersState.timer1min30 &&
						<CustomButton
							 text="1'30&quot;"
							 onPress={() => { this.startTimer(90); }}
							 onLongPress={() => { this.startTimer(90, true); }}
						/>}
						{this.props.timersState.timer2min &&
						<CustomButton
							text="2 min"
							onPress={() => { this.startTimer(120); }}
							onLongPress={() => { this.startTimer(120, true); }}
						/>}
						{this.props.timersState.timer30s15s &&
						<CustomButton
							text="30s/15s"
							onPress={() => { this.startTimer([30, 15], true); }}
							onLongPress={() => { this.startTimer([15, 30], true); }}
							backdropColor={RootStyles.colorPurpleAcid}
							highlightColor={'white'}
						/>}

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
	},
	clock: {
		flex: 1,
		marginBottom: RootStyles.gutterDefault
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: SCREEN_WIDTH > 500 ? 'center' : 'space-between',
		alignItems: 'center',
		marginVertical: RootStyles.gutterDefault
	},
	stopButtonContainer: {
		flex: 0.9
	},
	stopButton: {
		alignSelf: 'center',
		marginTop: RootStyles.gutterDefault
	},
	buttonPlaceholder: {
		display: SCREEN_WIDTH > 500 ? 'none' : null,
		width: RootStyles.buttonSize,
		marginHorizontal: RootStyles.gutterDefault / 2
	}
});

// Redux
const mapStateToProps = state => ({
	timersState: state.settingsReducer.toggleTimersReducer
});

export default connect(mapStateToProps)(TimerView);
