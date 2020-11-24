const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, msg) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const errorHolder = formControl.querySelector('small');
    errorHolder.innerText = msg;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const checkRequiredFields = (fields) => {
    fields.forEach((input => {
        if (input.value.trim() === '') {
            showError(input, `${input.id} is required`)
        } else {
            showSuccess(input);
        }
    }))
}

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${input.id} min length is ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${input.id} max length is ${max} characters`)
    } else {
        showSuccess(input);
    }
}
const checkPasswordsMatch = (input1, input2) => {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords don\'t match');
    }
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkRequiredFields([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 3, 8);
    checkLength(password2, 3, 8);
    checkPasswordsMatch(password, password2);
});  

