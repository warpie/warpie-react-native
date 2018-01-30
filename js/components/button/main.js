import React, {Component} from 'react';
import ComponentView  from './view';
import {ActionSheet} from 'antd-mobile';
/**
 * @description Image Picker
 * @type Component
 * @author Inderdeep
 */
export default class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props) {
        super(props);

    }

    /**
     * Default Properties
     * @returns Object
     */
    static get defaultProps() {
        return {
            propTypes : {
                text :PropTypes.string,
                onPress : PropTypes.function,
                style : PropTypes.object,
                textStyle : PropTypes.object
            }
        };
    }
    /**
     * ComponentDidMount Hook
     */
    componentDidMount() {

    }

    /**
     * On Press of button
     */
    onPress(){
        let {onPress} = this.props;
        if(onPress){
            onPress.apply(this,this.args);
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

Main.displayName = "Button";
