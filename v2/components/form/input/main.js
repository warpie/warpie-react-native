import React, { Component } from 'react';
import ComponentView  from './view';
import {validate,showMessage} from '../validation'
/**
 * @description Input Component
 * @type Component
 * @author Inderdeep
 */
export default class Main extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props){
        super(props);
        this.state = {
            value : props.value || "",
            valid : true
        }
    }
    /**
     * ComponentDidMount Hook
     */
    componentDidMount(){

    }

    /**
     * On Change of text
     * @param text
     */
    onChangeText(text){
        const {onChangeText} = this.props;

        this.setState({
            value : text
        },()=>{
            if(this.getValidationTrigger()== 'change'){
                this.validateAndShowMessage();
            }
            if(onChangeText){
                onChangeText(text);
            }
        })
    }

    /**
     * Get Icon
     */
    getIcon(){
        let {icon} = this.props;
        if(typeof icon=='undefined'){
            switch(this.getType()){
                case "email":
                    return "envelope";
                case "password" :
                    return "lock";
                case "phone":
                    return "phone";
                case "number":
                    return "lock";
                default :
                    return null;
            }

        }
        return icon;
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
     * Get validation trigger
     * @returns {string}
     */
    getValidationTrigger(){
        const {validationTrigger} = this.props;
        return (validationTrigger|| "").toLowerCase()
    }
    /**
     * On Blur Event
     */
    onBlur(){
        if(this.getValidationTrigger()=='blur'){
            this.validateAndShowMessage();
        }
    }
    /**
     * Validate the field
     * @param extraData -> Any extra data required for validation
     * e.g in case of equality we might require other values
     */
    validate(extraData){
        //console.log(extraData)
        let {validation} = this.props;
        if(validation){
            const {value} = this.state;
            const errors = validate(validation,value,{extraData});
            this.setState({valid : errors.length==0});
            return errors;
        }
        return [];
    }
    /**
     * Validate and Show message for the field
     */
    validateAndShowMessage(){
        let errors =  this.validate()
        if(errors.length>0){
            showMessage(errors[0]);
        }
    }

    /**
     * To be used by outside components
     * Get Element Value
     */
    getValue(){
        return this.state.value;
    }
    /**
     * To be used by outside components
     * Get if element is valid
     */
    isValid(){
        return this.state.valid;
    }
    /**
     * Render Method
     * @returns {*}
     */
    render() {
        return (ComponentView.bind(this))();
    }
}

Main.displayName = "Input";
//Neccesary for it to be recognized by form as input
Main.displayType = "form-input";
