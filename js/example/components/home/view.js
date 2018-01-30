import React from 'react';
import {View,Text} from 'react-native';
import Styles from './styles';
import {Form,Input} from '../../../../index'
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
    const {navigation} = this.props;
    const PlaceHolder = ({ className = '', ...restProps }) => (
        <Text>Block</Text>
    );
    return (
       <View style = {Styles.container}>
            <Form>
                <Input/>

            </Form>
       </View>
    );
}
module.exports = view;
