import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import Button from '../../button';
import {toClass} from 'recompose'
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
    const {children, style, submit} = this.props;
    let submitBtn = this.props;
    if (typeof submit != 'undefined') {
        if (!submit) {
            submitBtn = null;
        } else {
            const {getTrigger, customProps} = submit;
            /**
             * A function get Trigger can be exposed to get a submit trigger
             * except the button, All the exposed configuration is passed to trigger
             */
            if (typeof getTrigger != 'undefined' && getTrigger instanceof Function) {
                submitBtn = getTrigger(this.getExposedConfig())
            } else {
                /**
                 * Default onPress property not allowed
                 * @type {XML}
                 */
                submitBtn = (
                    <Button
                        text="Submit"
                        {...customProps}
                        onPress={this.onSubmit.bind(this)}
                    />
                )
            }
        }
    } else {
        submitBtn = (
            <Button
                text="Submit"
                onPress={this.onSubmit.bind(this)}
            />
        )
    }
    const childrenWithProps = this.getModifiedChildren();
    return (
        <View style={style}>
            {
                childrenWithProps
            }
            {submitBtn}
        </View>
    )
}
module.exports = view;
