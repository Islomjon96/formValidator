document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    // Функция успешной валидации
    function success(input) {
        input.parentElement.setAttribute('class', 'form-control success');
    }

    // Функция ошибки валидации
    function error(input, message) {
        const parentElement = input.parentElement;
        parentElement.setAttribute('class', 'form-control error');
        parentElement.querySelector('span').innerHTML = message;
    }

    // Проверка всех полей на пустое значение
    function checkFilledFields(inputArr) {
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                error(input, `Поле ${input.parentElement.querySelector('label').innerHTML} не может быть пустым`);
            }
        });
    }

    // Проверка введение только букв и номеров
    function checkNumLetters(input) {
        const numLetters = /^[a-zA-Z0-9_]+$/;
        if (!numLetters.test(input.value)) {
            error(input, 'Введите только буквы и номера');
        } else {
            success(input);
        }
    }

    //  Проверка на ввод строки хотя бы с одной большой буквы, одной маленькой буквы и одного номера
    function checkPassword(input) {
        const passwordRegExp = /(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])/;
        if (!passwordRegExp.test(input.value)) {
            error(input, `Ваш ${input.parentElement.querySelector('label').innerHTML} должен содержать хотя бы один символ в верхнем регистре, один символ в нижнем регистре и одно число`);
        } else {
            success(input);
        }
    }

    // Проверка правильности заполнения поля email
    function checkEmail(input) {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegExp.test(input.value.trim())) {
            error(input, `Введите правильную электронную почту`);
        } else {
            success(input);
        }
    }

    // Проверка length Имени пользователя и Пароля
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            error(input, `Поле ${input.parentElement.querySelector('label').innerHTML} должно содержать минимум ${min} символов`);
        } else if (input.value.length > max) {
            error(input, `Поле ${input.parentElement.querySelector('label').innerHTML} должно содержать максимум ${max} символов`);
        }
    }

    // Проверка совпадения паролей
    function checkMatchPasswords(input1, input2) {
        if (input1.value !== input2.value) {
            error(input2, `Пароли не совпадают`);
        } else {
            success(input2);
        }
    }

    // Настройка валидации формы при отработке события submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        checkNumLetters(username);
        checkPassword(password);
        checkEmail(email);
        checkLength(username, 6, 25);
        checkLength(password, 8, 25);
        checkMatchPasswords(password, password2);
        checkFilledFields([username, email, password, password2]);
    });

});