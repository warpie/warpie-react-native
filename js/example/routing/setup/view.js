import React from 'react';
import {INITIAL_ROUTE} from '../routes';
import {
    StackNavigator,
} from 'react-navigation';
import Routes from '../routes';

const Navigator = StackNavigator(Routes,{
    initialRouteName : INITIAL_ROUTE,
    headerMode : 'none'
});
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
    return (
        <Navigator/>
    );
}
module.exports = view;
