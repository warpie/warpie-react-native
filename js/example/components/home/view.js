import React from 'react';
import {View,Text} from 'react-native';
import {Drawer,Icon} from 'antd-mobile'
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
    const {navigation} = this.props;
    return (
       <View>
           <Text>
               Text
           </Text>
       </View>
    );
}
module.exports = view;
