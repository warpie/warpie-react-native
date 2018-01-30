import React, { Component } from 'react';
import ComponentView  from './view';
import Expo from 'expo';
const supportedTypes = [
    'facebook','google'
];
/**
 * Authenticate via Facebook
 */
async function authenticateViaFacebook(config){
    const {clientId,scopes} = config;
    const result = await Expo.Facebook.logInWithReadPermissionsAsync(clientId, {
        scopes
    });
    //console.log(result)
    return result;
}
/**
 * Authenticate via Facebook
 */
async function authenticateViaGoogle(config){
    const {clientId,scopes} = config;
    let result;
    try{
        result = await Expo.Google.logInAsync({
            androidClientId : clientId,
            iosClientId: clientId,
            scopes
        });
    } catch(e){
        result = e;
    }


    return result;
}
/**
 * @description Social Sign In Component for various social providers
 * @type Component
 * @author Inderdeep
 */
export default class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props){
        super(props);
        this.validateType();
    }


    /**
     * ComponentDidMount Hook
     */
    componentDidMount(){

    }

    validateType(){
        if(supportedTypes.indexOf(this.getType())==-1){
            throw Error("Unsupported Type value in Social Sign In Component. Supported Types are "+supportedTypes.join(","));
        }
        return true;
    }

    /**
     * Get input type
     * @returns {string}
     */
    getType(){
        const {type} = this.props;
        return (type|| "").toLowerCase()
    }

    /**
     * Authenticate
     */
    async authenticate(){
        const type = this.getType();
        const {onSuccess,onError} = this.props;
        let {clientId,scopes} = this.props;
        if(!clientId){
            console.warn("Client Id missing for Social Sign in component");
        }
        clientId = clientId || "";
        scopes = scopes || [];
        let config = {
            clientId,
            scopes
        };
        let result = null;
        switch(type){
            case 'facebook':
                result = await authenticateViaFacebook(config);
                break;
            case 'google':
                result = await authenticateViaGoogle(config);
                break;
            default:
                //Throw Error for unsupported type
                return this.validateType();
        }
        if(result){
            if(result.type=='success'){
                onSuccess?onSuccess(result):null;
            } else {
                onError?onError(result):null;
            }

        } else {
            throw new Error("Empty response from social provider");
        }
    }

    /**
     * Render Method
     * @returns {*}
     */
    render() {
        return (ComponentView.bind(this))();
    }
}
Main.authenticateViaFacebook = authenticateViaFacebook;
Main.authenticateViaGoogle = authenticateViaGoogle;
Main.displayName = "Social-SignIn";
