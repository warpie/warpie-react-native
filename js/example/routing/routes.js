import Sample from '../containers/sample';
import HeaderWithMenu from '../containers/headerWithMenu'
import Login from '../containers/login';
import SignUp from '../containers/signUp';
import ForgotPassword from '../containers/forgotPassword';
import ResetPassword from '../containers/resetPassword';
import Verification from '../containers/verification';
import Introduction from '../containers/introduction';
import Home from '../containers/home';
import Profile from '../containers/profile';
import EditProfile from '../containers/editProfile';
import React from 'react';
import {ModalUtils} from '@core-components';
import Drawer from '../containers/drawer';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
export const INITIAL_ROUTE='unsecured';
export const INITIAL_SECURED_ROUTE='home';
export const INITIAL_UNSECURED_ROUTE='introduction';
const securedRoutes = {
    home : {
        screen : Home
    },
    profile : {
        screen : Profile
    },
    editProfile : {
        screen : EditProfile
    }

};
const unsecuredRoutes = {
    sample : {
        screen : Sample
    },
    login : {
        screen : Login
    },
    signUp : {
        screen : SignUp
    },
    forgotPassword : {
        screen : ForgotPassword
    },
    resetPassword : {
        screen : ResetPassword
    },
    verification : {
        screen : Verification
    },
    introduction : {
        screen : Introduction
    },
}

const Routes = {
    unsecured : {
        screen : StackNavigator(unsecuredRoutes,{
            initialRouteName : INITIAL_UNSECURED_ROUTE,
            navigationOptions : {
                header : null
            }
        })
    },
    secured : {
        screen : DrawerNavigator({
            drawer : {
                screen : StackNavigator(securedRoutes,{
                    navigationOptions : (props)=>{
                        let navigationOptions = {}
                        const {navigation} = props;
                        navigationOptions.header = <HeaderWithMenu navigation = {navigation}/>;
                        return navigationOptions;
                    },
                    initialRouteName : INITIAL_SECURED_ROUTE
                })
            }
        },{
            /**
             * There is a reason why we had to put secured routes in a Stack Navigator
             * nested inside the stack navigator, We dont want to show header in
             * Drawer and there is no way to hide header in case of draweropen and
             * show in case of normal route. So we have put all the routes under
             * a stack navigator where the header will be shown and in drawer
             * it is set to null
             */
            initialRouteName : "drawer",
            navigationOptions : (props)=>{
                const {navigation} = props;
                return {
                    header : null
                }
            },
            contentComponent : Drawer,
            /**
             * Fix for https://github.com/react-navigation/react-navigation/issues/3148
             */
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle'
        })
    }
};
const Modals = {
    verification : Verification
}
setTimeout(()=>{
    ModalUtils.setModalScenes(Modals)
});

export default Routes;
