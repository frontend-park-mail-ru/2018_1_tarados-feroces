import EmailValidation from '../EmailValidation/EmailValidation';
import LoginValidation from '../LoginValidation/LoginValidation';
import PasswordValidation from '../PasswordValidation/PasswordValidation';

export default function BasicValidation(element: any, name:string, errors: any): boolean {
    const valid = !(element === '');
    if (!valid) {
        errors[name] = 'Please write some data';
    } else {
        switch (name) {
            case 'login':
                LoginValidation(element, errors);
                break;
            case 'email':
                EmailValidation(element, errors);
                break;
            case 'password':
                PasswordValidation(element, errors);
                break;
            default:
                break;
        }
    }
    return valid;
}
