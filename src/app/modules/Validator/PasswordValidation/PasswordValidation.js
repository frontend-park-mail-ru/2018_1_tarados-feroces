export default function PasswordValidation(input, errors) {
    let valid = false;
    if (input.length > 24) {
        errors.password = 'Password should contain less than 24 symbols';
    } else if (input.length < 8) {
        errors.password = 'Password should contain more than 8 symbols';
    } else {
        valid = true;
        errors.password = '';
    }
    return valid;
}
