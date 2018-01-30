import React from 'react';
import styles from './styles';
import {View,Text,TouchableHighlight} from 'react-native';

var view = function(){
	let {textStyle,style,text} = this.props;
	return (
		<TouchableHighlight underlayColor='transparent' onPress={this.onPress.bind(this)} style={[styles.container,style]}>
				<Text style={[styles.text,textStyle]}>{text}</Text>
		</TouchableHighlight>
	)
}
module.exports = view;
