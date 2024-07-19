$(document).ready(function () {
    const errorText = $('#error-text');
    const formBtn = $('#form-btn');
    const email = $('#email');
    const password = $('#password');
    const emailValidation = $('#emailValidation');
    const passValidation = $('#passValidation');
    emailValidation.fadeOut();
    passValidation.fadeOut();

    const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/

    const validateField = (field, fieldValidation, valid) => {
        if (valid) {
            field.removeClass('outline-red-500');
            field.addClass('outline-green-500');
            fieldValidation.fadeOut();
            formBtn.attr('disabled', false);
        } else {
            field.removeClass('outline-green-500');
            field.addClass('outline-red-500');
            fieldValidation.fadeIn();
            formBtn.attr('disabled', true);
        }
    }

    email.on('blur', function () {
        validateField($(this), emailValidation, EMAIL_VALIDATION.test($(this).val()))
    })
    password.on('blur', function () {
        validateField($(this), passValidation, PASSWORD_VALIDATION.test($(this).val()))
    })

    formBtn.on('click', async function (e) {
        e.preventDefault();
        try {
            if (
                EMAIL_VALIDATION.test(email.val()) &&
                PASSWORD_VALIDATION.test(password.val())
            ) {
                errorText.html();
                $('#loading').fadeIn();
                const user = {
                    email: email.val(),
                    password: password.val()
                }
                await axios.post('/api/login', user);
                if (email.val() === 'fj21carreazo@gmail.com' || email.val() === 'test@user.com') {
                    window.location.pathname = `/admin/users`;
                } else {
                    window.location.pathname = `/inicio/`;
                }
            } else {
                $('#loading').fadeOut();
                validateField(email, emailValidation, EMAIL_VALIDATION.test(email.val()))
                validateField(password, passValidation, PASSWORD_VALIDATION.test(password.val()))
            }
        } catch (error) {
            $('#loading').fadeOut();
            console.log(error);
            errorText.html(error.response.data.error);
        }
    })
})