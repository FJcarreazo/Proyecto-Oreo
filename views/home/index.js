import { createNotification } from '../components/notification.js';
$(document).ready(function () {
    const nameInput = $('#name-input');
    const telefonoInput = $('#telefono-input');
    const emailInput = $('#email-input');
    const passwordInput = $('#password-input');
    const select = $('#selector');
    const formBtn = $('#form-btn');
    const notification = $('#notification');
    const nameValidation = $('#nameValidation');
    const emailValidation = $('#emailValidation');
    const passValidation = $('#passValidation');

    const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/
    const NAME_VALIDATION = /^[A-Z][a-z ]*[A-Z][a-z]*$/
    const TLF_VALIDATION = /^[0-9].{6}$/

    nameValidation.fadeOut();
    emailValidation.fadeOut();
    passValidation.fadeOut();

    const validateField = (field, fieldValidation, valid) => {
        if (valid) {
            field.removeClass('outline-red-500');
            field.addClass('outline-green-500');
            formBtn.attr('disabled', false);
            if (fieldValidation) fieldValidation.fadeOut();
        } else {
            field.removeClass('outline-green-500');
            field.addClass('outline-red-500');
            formBtn.attr('disabled', true);
            if (fieldValidation) fieldValidation.fadeIn();
        }
    }

    nameInput.on('blur', function () {
        validateField($(this), nameValidation, NAME_VALIDATION.test($(this).val()))
    })
    emailInput.on('blur', function () {
        validateField($(this), emailValidation, EMAIL_VALIDATION.test($(this).val()))
    })
    passwordInput.on('blur', function () {
        validateField($(this), passValidation, PASSWORD_VALIDATION.test($(this).val()))
    })
    telefonoInput.on('blur', function () {
        validateField($(this), null, TLF_VALIDATION.test($(this).val()))
    })

    const clearForm = () => {
        nameInput.val(''); nameInput.removeClass('outline-green-500');
        emailInput.val(''); emailInput.removeClass('outline-green-500');
        telefonoInput.val(''); telefonoInput.removeClass('outline-green-500');
        passwordInput.val(''); passwordInput.removeClass('outline-green-500');
        nameValidation.fadeOut();
        emailValidation.fadeOut();
        passValidation.fadeOut();
    }

    formBtn.on('click', async function (e) {
        e.preventDefault();
        try {
            if (
                NAME_VALIDATION.test(nameInput.val()) &&
                EMAIL_VALIDATION.test(emailInput.val()) &&
                PASSWORD_VALIDATION.test(passwordInput.val()) &&
                TLF_VALIDATION.test(telefonoInput.val())
            ) {
                $('#loading').fadeIn();
                const newUser = {
                    name: nameInput.val(),
                    email: emailInput.val(),
                    selector: select.val(),
                    telefono: telefonoInput.val(),
                    password: passwordInput.val(),
                }
                const { data } = await axios.post('/api/users', newUser);
                createNotification(false, data);
                setTimeout(() => {
                    notification.innerHTML = '';
                    clearForm();
                    $('#loading').fadeOut();
                }, 1000);

            } {
                $('#loading').fadeOut();
                validateField(nameInput, nameValidation, NAME_VALIDATION.test(nameInput.val()))
                validateField(emailInput, emailValidation, EMAIL_VALIDATION.test(emailInput.val()))
                validateField(passwordInput, passValidation, PASSWORD_VALIDATION.test(passwordInput.val()))
                validateField(telefonoInput, null, TLF_VALIDATION.test(telefonoInput.val()))
            }

        } catch (error) {
            $('#loading').fadeOut();
            if (error.response) {
                createNotification(true, error.response.data.error);
            }
            setTimeout(() => {
                notification.innerHTML = '';
            }, 5000)

        }
    })

})