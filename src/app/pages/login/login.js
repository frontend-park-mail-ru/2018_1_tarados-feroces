'use strict';

const regToValidateLogin = /^([a-z0-9_])+$/i;

const inputsBlocks = [...document.getElementsByClassName('login-block__input-block')];

document.getElementsByClassName('login-block__login-button')[0].addEventListener('click', () => {
    if (inputsBlocks.reduce((correctCount, item) => correctCount + validate(item), 0) === inputsBlocks.length) {
        // document.location.href = '/auth';
        router.go('/auth/');
    }
});

const addValidation = (inputBlock) => {
    const input = inputBlock.getElementsByTagName('input')[0];
    const error = inputBlock.getElementsByClassName('error')[0];

    input.addEventListener('blur', () => {
        input.value.search(regToValidateLogin) === -1 ? error.style.display = 'block' : error.style.display = '';
    });

    input.addEventListener('focus', () => {
        if (error.style.display === 'block') {
            error.style.display = '';
        }
    });
};

const validate = (inputBlock) => {
    const input = inputBlock.getElementsByTagName('input')[0];
    const error = inputBlock.getElementsByClassName('error')[0];

    if (input.value.search(regToValidateLogin) === -1) {
        error.style.display = 'block';
        return false;
    }

    error.style.display = '';
    return true;
};

inputsBlocks.forEach((item) => addValidation(item));
