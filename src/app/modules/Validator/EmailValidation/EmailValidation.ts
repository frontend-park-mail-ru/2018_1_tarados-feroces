const emailRegular: any = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;

export default function EmailValidation(input: any, errors: any): boolean {
    const valid = emailRegular.test(input);
    if (!valid) {
        errors.email = 'Write correct e-mail';
    } else {
        errors.email = '';
    }
    return valid;
}
