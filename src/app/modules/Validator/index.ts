import BasicValidation from './BasicValidation/BasicValidation';

const Validation: any = (values: any, errors: any) => {
    let password: any = null;
    let repeatPassword: any = null;

    (Object.keys(values) || []).forEach((value) => {
        BasicValidation(values[value], value, errors);
        if (value === 'password') {
            password = values[value];
        }
        if (value === 'repeatPassword') {
            repeatPassword = values[value];
        }
    });

    if (repeatPassword) {
        if (password !== repeatPassword) {
            errors.repeatPassword = 'Passwords don`t match';
        }
        else {
            errors.repeatPassword = '';
        }
    }

    return errors;
};

export default Validation;
