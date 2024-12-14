$(document).ready(function () {
    const loginForm = $('.form-login');
    const registerForm = $('.form-register');
    const loginTab = $('.login h2:nth-child(1)');
    const registerTab = $('.login h2:nth-child(2)');

    loginTab.click(function () {
        loginForm.css('display', 'block');
        registerForm.css('display', 'none');
    });

    registerTab.click(function () {
        loginForm.css('display', 'none');
        registerForm.css('display', 'block');
    });

    const inputLoginUsername = $('.form-login .check-username');
    const inputLoginPassword = $('.form-login .check-password');
    const errorUsername = $('.error-username');
    const errorPassword = $('.error-password');

    function validateLoginUsername() {
        const pattern = /^[a-zA-Z0-9_]{3,}$/;
        if (inputLoginUsername.val() == '') {
            errorUsername.text('Vui lòng nhập tên đăng nhập');
            inputLoginUsername.focus();
            return false;
        }

        if (!pattern.test(inputLoginUsername.val())) {
            errorUsername.text('Không nhập kí tự đặc biệt');
            inputLoginUsername.focus();
            return false;
        }

        return true;
    }

    function validateLoginPassword() {
        const pattern = /^[a-zA-Z].*/;
        if (inputLoginPassword.val() == '') {
            errorPassword.text('Vui lòng nhập mật khẩu');
            inputLoginPassword.focus();
            return false;
        }

        if (!pattern.test(inputLoginPassword.val())) {
            errorPassword.text('Mật khẩu phải bắt đầu bằng một chữ cái');
            inputLoginPassword.focus();
            return false;
        }

        return true;
    }

    const inputRegiterUsername = $('.form-register .check-username');
    const inputRegisterPassword = $('.form-register .check-password');
    const inputRegisterRePassword = $('.form-register .recheck-password');
    const errorRegisterUsername = $('.error-register-username');
    const errorRegisterPassword = $('.error-register-password');

    const errorRePassword = $('.error-repassword');

    function validateRegisterUsername() {
        const pattern = /^[a-zA-Z0-9_]{3,}$/;
        if (inputRegiterUsername.val() == '') {
            errorRegisterUsername.text('Vui lòng nhập tên đăng nhập');
            inputRegiterUsername.focus();
            return false;
        }

        if (!pattern.test(inputRegiterUsername.val())) {
            errorRegisterUsername.text('Không nhập kí tự đặc biệt');
            inputRegiterUsername.focus();
            return false;
        }

        return true;
    }

    function validateRegisterPassword() {
        const pattern = /^[a-zA-Z].*/;
        if (inputRegisterPassword.val() == '') {
            errorRegisterPassword.text('Vui lòng nhập mật khẩu');
            inputRegisterPassword.focus();
            return false;
        }

        if (!pattern.test(inputRegisterPassword.val())) {
            errorRegisterPassword.text('Mật khẩu phải bắt đầu bằng một chữ cái');
            inputRegisterPassword.focus();
            return false;
        }

        return true;
    }

    function validateLoginRePassword() {
        if(inputRegisterRePassword.val() == '') {
            errorRePassword.text('Vui lòng lại mật khẩu');
            inputRegisterRePassword.focus();
            return false;
        }

        if (inputRegisterRePassword.val() != inputRegisterPassword.val()) {
            errorRePassword.text('Mật khẩu không trùng khớp');
            inputRegisterRePassword.focus();
            return false;
        }

        return true;
    }

    $('.btn-login').click(function (event) {
        event.preventDefault();
        if (validateLoginUsername() && validateLoginPassword()) {
            if(inputLoginUsername.val()=='admin' && inputLoginPassword.val()=='admin') {
                window.location.href = 'Admin.html';
            } else {
                window.location.href = 'product.html';
            }
        } else {
            $('input:invalid').first().focus();
        }
    });

    $('.btn-register').click(function (event) {
        event.preventDefault();
        if (validateRegisterUsername() && validateRegisterPassword() && validateLoginRePassword()) {
            window.location.href = 'product.html';
        } else {
            $('input:invalid').first().focus();
        }
    });
});
