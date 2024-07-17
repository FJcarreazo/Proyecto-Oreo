$(document).ready(function () {

  const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/
  const NAME_VALIDATION = /^[A-Z][a-z ]*[A-Z][a-z]*$/
  const TLF_VALIDATION = /^[0-9].{6}$/

  const clearForm = () => {
    $('#name').val('').removeClass('is-invalid is-valid');
    $('#email').val('').removeClass('is-invalid is-valid');
    $('#phoneNumber').val('').removeClass('is-invalid is-valid');
    $('#password').val('').removeClass('is-invalid is-valid');
    $('#idItem').val('');
  }

  const validateField = (field, valid) => {
    if (valid) {
      field.removeClass('is-invalid');
      field.addClass('is-valid');
    } else {
      field.removeClass('is-valid');
      field.addClass('is-invalid');
    }
  }

  const getUserList = async () => {
    $('#loading').fadeIn();
    const { data } = await axios.get('/api/users');

    $('#tableBody').html('');
    data.map(item => {
      $('#tableBody').append(`
      <tr id="${item.id}" 
        data-name="${item.name}"
        data-telefono="${item.telefono}"
        data-email="${item.email}"
      >
        <td><a href="#" class="text-body">${item.name}</a></td>
        <td>${item.telefono}</td>
        <td>${item.email}</td>
        <td>
            <ul class="list-inline mb-0">
                <li class="list-inline-item">
                    <a href="#" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Edit"
                        class="px-2 text-primary button_edit"><i
                            class="bx bx-pencil font-size-18"></i></a>
                </li>
                <li class="list-inline-item">
                    <a href="#" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Delete"
                        class="px-2 text-danger button_del"><i
                            class="bx bx-trash-alt font-size-18"></i></a>
                </li>
            </ul>
        </td>
      </tr>
      `);
    })

    $('#loading').fadeOut();
  }

  //CLICK EDIT BUTTON
  $('body').on('click', '.button_edit', function (e) {
    e.preventDefault();
    const item = $(this).parent().parent().parent().parent();
    const id = item.attr('id');
    $('#createUser').attr('mode', 'edit');
    const phonePrefix = item.data('telefono').substring(0, 4);
    const phoneNumber = item.data('telefono').substring(4, 20);
    const email = item.data('email');
    $('#idItem').val(id);

    $('#name').val(item.data('name'));
    $('#phoneNumber').val(phoneNumber);
    $("#phonePrefix").val(phonePrefix);
    $('#email').val(email);
    $('#createUser').modal('show');
  })

  //CLICK DELETE BUTTON
  $('body').on('click', '.button_del', function (e) {
    e.preventDefault();
    const item = $(this).parent().parent().parent().parent();
    const id = item.attr('id');
    bootbox.confirm("&iquest;Seguro que desea eliminar este item?", function (result) {
      if (result) {

      }
    })
  })

  //CLICK SAVE BUTTON
  $('#saveForm').on('click', function () {
    const phonePrefix = $('#phonePrefix');
    const phoneNumber = $('#phoneNumber');
    const idItem = $('#idItem');
    const email = $('#email');
    const name = $('#name');
    const password = $('#password');
    const item = $(this).parent().parent().parent().parent();
    const mode = item.attr('mode');

    const validName = NAME_VALIDATION.test(name.val());
    const validEmail = EMAIL_VALIDATION.test(email.val());
    const validPhone = TLF_VALIDATION.test(phoneNumber.val());
    let validPass = true;

    validateField(name, validName)
    validateField(email, validEmail)
    if ((password.val() && mode === 'edit') || (mode !== 'edit')) {
      validPass = PASSWORD_VALIDATION.test(password.val());
      validateField(password, validPass)
    }
    validateField(phoneNumber, validPhone)

    if (
      validName &&
      validEmail &&
      validPhone &&
      validPass
    ) {
      $('#loading').fadeIn();
      const newUser = {
        id: idItem.val() ? idItem.val() : null,
        name: name.val(),
        email: email.val(),
        selector: phonePrefix.val(),
        telefono: phoneNumber.val(),
        password: password.val() ? password.val() : null,
      }

      if (!idItem.val()) delete newUser.id;
      if (!password.val()) delete newUser.password;

      console.log('DATA TO SAVE', newUser)

    }

  })

  $('#createUser').on('hidden.bs.modal', function () {
    clearForm();
    $(this).attr('mode', '');
  })

  getUserList();

})