import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import RootStyles from '../styles/root'
import Clock from './Clock'
import CustomButton from './CustomButton';

StatusBar.barStyle = 'light-content';

class WatchView extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentTime: 817,
			countDirection: 'down'
		};
	}

	render() {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.container}>
					<Clock time={this.state.currentTime} countDirection={this.state.countDirection} />
					<View style={styles.buttonsContainer}>
						<CustomButton text="Start" type="start" />
						<CustomButton text="Stop" type="stop" />
						<CustomButton text="Default" type="default" />
						<CustomButton text="Disabled" disabled />

						<CustomButton text="30 s" type="default" />
						<CustomButton text="1 min" type="default" />
						<CustomButton text="2 min" type="default" />
						<CustomButton text="30s/15s" type="default" />

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
		margin: 'auto',
		borderColor: 'red',
		borderWidth: 1
	},
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	buttonPlaceholder: {
		width: RootStyles.buttonSize,
		marginHorizontal: RootStyles.gutterDefault / 2,
	}
});

export default WatchView;
