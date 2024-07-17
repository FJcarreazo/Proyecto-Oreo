$(document).ready(function () {

  const getUserList = async () => {
    $('#loading').fadeIn();
    const { data } = await axios.get('/api/users');

    $('#tableBody').html('');
    data.map(item => {
      $('#tableBody').append(`
      <tr id="${item.id}">
        <td><a href="#" class="text-body">${item.name}</a></td>
        <td>${item.telefono}</td>
        <td>${item.email}</td>
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