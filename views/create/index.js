const formulario = document.getElementById('formulario');
const submitBtn = document.getElementById('submit-btn');


formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameProduct = document.getElementById('name-product').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = document.getElementById('precio').value;

   let formData = new FormData();
  formData.append('name', nameProduct);
  formData.append('description', descripcion);
  formData.append('price', precio); 

  let reqBody = {
    name: nameProduct,
    description: descripcion,
    quantity: precio
  }

  await fetch('http://localhost:3003/api/products', {
    method: 'post',
    mode: "cors",
    cache: "default",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
    return response.json();
  })
  .then(data => {

    console.log('Producto creado:', data);

  })
  .catch(error => {
    console.error('Error:', error);
  });
});

