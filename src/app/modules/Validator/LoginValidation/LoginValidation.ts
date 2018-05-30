const loginRegular = /^[A-Za-z0-9_-]{5,15}$/;

export default function LoginValidation(input: any, errors: any): boolean {
    const valid = loginRegular.test(input);
    if (!valid) {
        if (input.length < 5) {
            errors.login = 'Login should contain 5 or more symbols';
        } else if (input.length > 15) {
            errors.login = 'Login should contain less than 15 symbols';
        } else {
            errors.login = 'Login should contain only english symbols, numbers, - or _';
        }
    } else {
        errors.login = '';
    }
    return valid;
}
