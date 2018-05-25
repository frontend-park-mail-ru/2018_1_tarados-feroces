import BasicValidation from './BasicValidation/BasicValidation';

window.Validation = (values, errors) => {
    let password = null;
    let repeatPassword = null;

    (Object.keys(values) || []).forEach(value => {
        BasicValidation(values[value], errors);
        if (values[value].name == 'password') {
            password = values[value];
        }
        if (values[value].name == 'repeatPassword') {
            repeatPassword = values[value];
        }
    });


    if (repeatPassword) {
        if (password.value !== repeatPassword.value) {
            errors.repeatPassword = 'Passwords don`t match';
        }
    }

    return errors;
};

export default Validation;
