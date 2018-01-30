import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Routes} from '../../routing';
import ComponentView from './view'

/**
 * @description Main Component
 * @type Component
 * @author Inderdeep
 */
class Main extends Component {

    /**
     * Container
     * @param props
     */
    constructor(props){
        super(props);

    }
    /**
     * ComponentDidMount Hook
     */
    componentDidMount(){

    }
    /**
     * Render Method
     * @returns {*}
     */
    render() {
        return (ComponentView.bind(this))();
    }
}

Main.displayName = "Main";
