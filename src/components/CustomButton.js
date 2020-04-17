import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import RootStyles from '../styles/root'

class CustomButton extends React.Component {

	render() {
		// Disabled
		let disabled = this.props.disabled === true;

		// Text Size
		let textSize = RootStyles.textSizeDefault;

			let textLength = this.props.text.length;

			if (textLength > 5)
				textSize = textSize / (textLength / 5);

		// Background
		let backdropColor = '#333333';
		let highlightColor = '#ffffff';

			if (typeof this.props.type !== 'undefined' || disabled) {

				let type = this.props.type || 'default';

				if (disabled)
					type = 'disabled';

				type = type.toLowerCase();

				switch (type) {
					case 'start':
						backdropColor = '#0a2a12';
						highlightColor = '#30d158';
						break;
					case 'stop':
						backdropColor = '#330e0c';
						highlightColor = '#ff453a';
						break;
					case 'disabled':
						backdropColor = '#1c1c1c';
						highlightColor = '#98989f';
						break;
				}

			} else {

				backdropColor = this.props.backdropColor || backdropColor;
				highlightColor = this.props.highlightColor || highlightColor;
			}

		return (
			<TouchableOpacity
				{...this.props}
				style={[styles.container, {borderColor: backdropColor}, this.props.style]}
				disabled={disabled}
			>
				<View style={[styles.backdrop, {backgroundColor: backdropColor}]}>
					<Text
						numberOfLines={1}
						style={[styles.text, {color: highlightColor, fontSize: textSize}]}
					>
						{this.props.text}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		margin: RootStyles.gutterDefault / 2,
		width: RootStyles.buttonSize,
		height: RootStyles.buttonSize,
		borderRadius: RootStyles.buttonSize / 2,
		padding: 2
	},
	backdrop: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: (RootStyles.buttonSize - 4) / 2,
		padding: 2
	},
	text: {
	}
});

export default CustomButton;
