$(document).ready(function () {

  const getUserList = async () => {
    $('#loading').fadeIn();
    const { data } = await axios.get('/api/products');

    $('#tableBody').html('');
    data.map(item => {
      $('#tableBody').append(`
      <tr>
        <td><a href="#" class="text-body">${item.name ? item.name : ''}</a></td>
        <td>${item.description ? item.description : ''}</td>
        <td>${item.price ? item.price : 0}</td>
        <td>${item.quantity ? item.quantity : 0}</td>
        <td>
            <ul class="list-inline mb-0">
                <li class="list-inline-item">
                    <a href="javascript:void(0);" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Edit"
                        class="px-2 text-primary"><i
                            class="bx bx-pencil font-size-18"></i></a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript:void(0);" data-bs-toggle="tooltip"
                        data-bs-placement="top" title="Delete"
                        class="px-2 text-danger"><i
                            class="bx bx-trash-alt font-size-18"></i></a>
                </li>
            </ul>
        </td>
      </tr>
      `);
    })

    $('#loading').fadeOut();
  }

  getUserList();

})