import {Toast} from 'antd-mobile';
import validateInput from 'validate.js';
/**
 * Validate a value
 * @param validations
 * @param value
 * @param config - Custom Configuration
 */
export function validate(validations,value,config){
    config = config || {}
    let result = processValidation(validations,value,config);
    return result;
}



/**
 * Process a Value
 * @param validation
 * @param value
 */
function processValidation(validation,value,config){
    validation = {
        ...validation
    };
    /**
     * By Default validate.js prepends the property name to
     * validation message so use ^ for preventing it.
     * Reference -> https://validatejs.org/#validators-presence
     */
    Object.keys(validation).map((key)=>{
        if(validation[key].message && validation[key].message[0]!="^"){
            validation[key].message = "^"+validation[key].message;
        }
    });
    /**
     * Pass extra data as required
     * @type {any}
     */

    let result = validateInput({value,...config.extraData},{value : validation});
    /**
     * return the validation messages
     */
    return result?result.value:[];
}


/**
 * Show Validation messages
 * @param messages
 */
export function showMessage(message) {
    Toast.fail(message,0.5,null,false);
}
