import React from 'react';
import styles from './styles';
import Button from '../button';
/**
 * JSX View
 * @returns {XML}
 */
var view = function(){
	const type = this.getType();
	const {triggerElement} = this.props;
	let element = null;
	if(triggerElement){
        /**
		 * element should support onPress event
         */
		element = React.cloneElement(triggerElement,{
			onPress : this.authenticate.bind(this)
		});
	} else {
        switch(type){
            case 'facebook':
                element = (
					<Button onPress = {this.authenticate.bind(this)}>
						Facebook
					</Button>
                );
                break;
            case 'google':
                element = (
					<Button onPress = {this.authenticate.bind(this)}>
						Google
					</Button>
                );
                break;
            default:
            	//Throw Error for unsupported type
                this.validateType();
        }
	}

	return element;
}
module.exports = view;
