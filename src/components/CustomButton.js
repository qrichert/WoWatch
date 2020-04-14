import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import RootStyles from '../styles/root'

class CustomButton extends React.Component {

	constructor(props) {
		super(props);

		// Disabled
		this.m_disabled = typeof this.props.disabled !== 'undefined';

		// Text Size
		this.m_textSize = RootStyles.textSizeDefault;

		let textLength = this.props.text.length;

		if (textLength > 5)
			this.m_textSize = this.m_textSize / (textLength / 5);

		// Background
		this.m_backdropColor = '#333333';
		this.m_highlightColor = '#ffffff';

		if (typeof this.props.type !== 'undefined' || this.m_disabled) {

			let type = this.props.type || 'default';

			if (this.m_disabled)
				type = 'disabled';

			type = type.toLowerCase();

			switch (type) {
				case 'start':
					this.m_backdropColor = '#0a2a12';
					this.m_highlightColor = '#30d158';
					break;
				case 'stop':
					this.m_backdropColor = '#330e0c';
					this.m_highlightColor = '#ff453a';
					break;
				case 'disabled':
					this.m_backdropColor = '#1c1c1c';
					this.m_highlightColor = '#98989f';
					break;
			}

		} else {

			let { backdropColor, highlightColor } = this.props;

			this.m_backdropColor = backdropColor || this.m_backdropColor;
			this.m_highlightColor = highlightColor || this.m_highlightColor;
		}
	}

	render() {
		return (
			<TouchableOpacity
				style={StyleSheet.flatten([styles.container, {borderColor: this.m_backdropColor}])}
				onPress={this.props.onPress}
				disabled={this.m_disabled}
			>
				<View style={StyleSheet.flatten([styles.backdrop, {backgroundColor: this.m_backdropColor}])}>
					<Text
						numberOfLines={1}
						style={StyleSheet.flatten([styles.text, {color: this.m_highlightColor, fontSize: this.m_textSize}])}
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
