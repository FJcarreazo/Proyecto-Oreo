$(document).ready(function () {

  const clearForm = () => {
    $('#name').val('').removeClass('is-invalid is-valid');
    $('#description').val('').removeClass('is-invalid is-valid');
    $('#price').val('').removeClass('is-invalid is-valid');
    $('#quantity').val('').removeClass('is-invalid is-valid');
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

  const getProductList = async () => {
    $('#loading').fadeIn();
    const { data } = await axios.get('/api/products');

    $('#tableBody').html('');
    data.map(item => {
      $('#tableBody').append(`
      <tr 
        id="${item._id}"
        data-name="${item.name}"
        data-description="${item.description}"
        data-price="${item.price}"
        data-quantity="${item.quantity}"
      >
        <td class"row"> 
          <img style="float: left;" src="${item.image ? item.image : 'https://res.cloudinary.com/erdesarrollo/image/upload/v1669769053/userdefault_oegarm.jpg'}" alt="" class="avatar-sm rounded-circle me-2" /> 
          ${item.name ? item.name : ''}
        </td>
        <td>${item.description ? item.description : ''}</td>
        <td>${item.price ? item.price : 0}</td>
        <td>${item.quantity ? item.quantity : 0}</td>
        <td>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" class="px-2 text-primary button_edit">
                <i class="bx bx-pencil font-size-18"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" class="px-2 text-danger button_del">
                <i class="bx bx-trash-alt font-size-18"></i>
              </a>
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
    $('#createProduct').attr('mode', 'edit');
    $('#idItem').val(id);

    $('#name').val(item.data('name'));
    $('#description').val(item.data('description'));
    $('#price').val(item.data('price'));
    $('#quantity').val(item.data('quantity'));
    $('#createProduct').modal('show');
  })

  //CLICK DELETE BUTTON
  $('body').on('click', '.button_del', function (e) {
    e.preventDefault();
    const item = $(this).parent().parent().parent().parent();
    const id = item.attr('id');
    bootbox.confirm("&iquest;Seguro que desea eliminar este item?", async function (result) {
      if (result) {
        $('#loading').fadeIn();
        try {
          await axios.delete('/api/products/' + id);
          getProductList();
        } catch (e) {
          console.error(e);
          $('#loading').fadeOut();
        }
      }
    })
  })

  //CLICK SAVE BUTTON
  $('#saveForm').on('click', async function () {
    const name = $('#name');
    const description = $('#description');
    const price = $('#price');
    const quantity = $('#quantity');
    const image = $('#image');
    const idItem = $('#idItem');
    const item = $(this).parent().parent().parent().parent();
    const mode = item.attr('mode');

    const validName = name.val() !== '' ? true : false;
    const validDescription = description.val() !== '' ? true : false;
    const validPrice = (price.val() !== '' && price.val() > 0) ? true : false;
    const validQuantity = (quantity.val() !== '' && quantity.val() > 0) ? true : false;

    validateField(name, validName);
    validateField(description, validDescription);
    validateField(price, validPrice);
    validateField(quantity, validQuantity);

    if (
      validName &&
      validDescription &&
      validPrice &&
      validQuantity
    ) {
      $('#loading').fadeIn();
      const formData = new FormData();
      formData.append('name', name.val());
      formData.append('description', description.val());
      formData.append('price', price.val());
      formData.append('quantity', quantity.val());
      formData.append('image', image[0].files[0]);

      try {
        if (mode === 'edit') {
          formData.append('id', idItem.val());

          await axios.patch('/api/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          await axios.post('/api/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }
        $('#createProduct').modal('hide');
        clearForm();
        getProductList();
      } catch (e) {
        console.error(e);
        $('#loading').fadeOut();
      }
    }
  })

  $('#createProduct').on('hidden.bs.modal', function () {
    clearForm();
    $(this).attr('mode', '');
  })

  getProductList();

})