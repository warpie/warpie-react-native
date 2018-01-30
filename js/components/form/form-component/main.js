import React, {Component} from 'react';
import ComponentView  from './view';
import {showMessage} from '../validation'

//todo : Expose form.create like method in antd for accessing form methods
/**
 * @description Form Component
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
        this.elementRefs = [];
    }

    /**
     * ComponentDidMount Hook
     */
    componentDidMount() {
    }

    /**
     * Get Modified Children that will
     * have smart behaviour of validation
     */
    getModifiedChildren(props) {
        const {children} = this.props;
        return this.modifyChildren(children)
    }

    /**
     * Recursively search for form inputs
     * and attach refs to it
     * @param children
     * @returns {Object|*|{}|Array}
     */
    modifyChildren(children){
        return React.Children.map(children, (child,index) => {
            //Element should be a valid react element
            if (React.isValidElement(child)) {
                let childProps = {};
                if(child.type.displayType == "form-input"){
                    /**
                     * Name is mandatory so if name if not provided - Auto generate
                     * @type {string}
                     */
                    const childName = child.props.name || "element-" + index;
                    childProps.name =  childName;
                    childProps.ref =  (ref) => {
                        this.elementRefs.push(ref);
                    };
                }

                if (child.props) {
                    // String has no Prop
                    childProps.children = this.modifyChildren(child.props.children);
                    return React.cloneElement(child, childProps);
                } else {
                    return child;
                }
            }
            return child;
        })
    }
    /**
     * On Submit of form
     */
    onSubmit() {
        const {onSubmit} = this.props;
        const {errors, values} = this.validate();
        if (onSubmit) {
            onSubmit(errors, values);
        }

    }

    /**
     * Get All values of elements
     */
    getValues() {
        let values = {};
        (this.elementRefs).map((element) => {
            /**
             * Might happen in case component has unmounted
             */
            if (!element) {
                return;
            }
            const {name} = element.props;
            values[name] = element.getValue();
        });
        return values;
    }

    /**
     * Get Element Value
     * -- Intended to be used via exposed config
     * @param name
     * @returns {*}
     */
    getValue(name) {
        let value = null;
        for (let element of this.elementRefs) {
            if (element && element.props.name == name) {
                value = element.getValue();
                break;
            }
        }
        ;
        return value;
    }

    /**
     * Validate the form
     */
    validate() {
        let errors = null;
        let values = this.getValues();
        let messageShown = false;
        const {validateOnSubmit} = this.props;

        (this.elementRefs).map((element) => {
            /**
             * Might happen in case component has unmounted
             */
            if (!element) {
                return;
            }
            const {name} = element.props;
            let result = [];
            /**
             * Don't validate if validateOnSubmit = false
             */
            if (typeof validateOnSubmit == 'undefined' || validateOnSubmit) {
                //console.log(values)
                /**
                 * Pass extraData as all values of the form
                 */
                result = element.validate(values);
            }
            if (result.length > 0) {
                errors = errors || {};
                //Here we can even put error details property by creating a separate errors function in inputs
                errors[name] = result;
                /**
                 * Show only the first message for the first error
                 */
                if (!messageShown) {
                    showMessage(result[0]);
                    messageShown = true;
                }
            }
        });
        return {errors, values};
    }

    /**
     * Returns all the properties and functions
     * exposed to outside components
     */
    getExposedConfig() {
        return {
            validate: this.validate.bind(this),
            getValue: this.getValue.bind(this),
            getValues: this.getValues.bind(this)
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

Main.displayName = "Form";
