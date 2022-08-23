import validationRules from "./validatorMessages";

export default function validateFields(fields, rules) {
    const errors = {};
    const rulesMessages = validationRules();
    Object.keys(fields).map(function (keyf) {
        Object.keys(rules).map(function (keyr) {
            if (keyf === keyr) {
                Object.keys(rules[keyr]).map(function (keyrr) {
                    if (keyrr === 'required') {
                        if (fields[keyf].length === 0) {
                            //show error
                            errors[keyr] = rulesMessages[keyr][keyrr]
                        }
                    }
                    if (keyrr === 'min') {
                        if (fields[keyf].length < rules[keyr][keyrr]) {
                            //show error min
                            errors[keyr] = rulesMessages[keyr][keyrr]
                        }
                    }
                    if (keyrr === 'max') {
                        if (fields[keyf].length > rules[keyr][keyrr]) {
                            //show error min
                            errors[keyr] = rulesMessages[keyr][keyrr]
                        }
                    }
                    if (keyrr === 'email') {
                        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                        if (!reg.test(fields[keyf])) {
                            //show error min
                            errors[keyr] = rulesMessages[keyr]['valid']
                        }
                    }
                    if (keyrr === 'same'){
                        if(fields[rules[keyr][keyrr]] !== fields[keyr]){

                            errors[keyr] = rulesMessages[keyr][keyrr]
                        }
                    }
                })
            }
        })
    })
    return errors;
}