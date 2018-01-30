import React from 'react';
import styles from './styles';
import {View, TextInput} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
/**
 * JSX View
 * @returns {XML}
 */
var view = function () {
    const {hint,keyboardType,customProps,value} = this.props;
    let {style } = this.props;
    let icon = this.getIcon();
    style = style || {};
    let input = null;
    const inputProps = {
        onChangeText : this.onChangeText.bind(this),
        onBlur : this.onBlur.bind(this),
        style : [styles.input, style.input],
        placeholder : hint,
        ...customProps,
        value : this.state.value
    }
    switch (this.getType()){
        case "email" :
            input =  (
                <TextInput
                    keyboardType = {keyboardType || "email-address"}
                    {...inputProps}
                />
            );
            break;
        case "password" :
            input = (
                <TextInput
                    keyboardType = {keyboardType || "default"}
                    secureTextEntry={true}
                    {...inputProps}
                />
            );
            break;
        case "number" :
            input = (
                <TextInput
                    keyboardType = {keyboardType || "numeric"}
                    {...inputProps}
                />
            );
            break;
        case "phone" :
            input = (
                <TextInput
                    keyboardType = {keyboardType || "phone-pad"}
                    maxLength = {15}
                    {...inputProps}
                />
            );
            break;
        default :

            input = (
                <TextInput
                    keyboardType = {keyboardType || "default"}
                    {...inputProps}
                />
            );
            break;
    }
    return (
        <View style={style.container}>
            {
                icon ? (
                    <Icon name={icon} style={[styles.inputIcon, style.iconStyle]}/>
                ) : null
            }
            {input}
        </View>
    );
}
module.exports = view;
