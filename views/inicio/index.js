$(document).ready(function () {
  const cart = document.querySelector('#cart');
  const table = document.querySelector('#table-body');
  const closeCart = document.querySelector('#close-cart');
  const seccion = document.querySelector('#seccion');
  const sessionBtn = document.querySelector('#cerrar-btn');
  const vovlerBtn = document.querySelector('#volver');
  const cerrarSeccion = document.querySelector('#sesion-btn')
  const productList = document.querySelector("#product-list");
  const courseBtn = document.querySelectorAll("#course-btn");

  $("#shop-icon").on('click', function () {
    $("#cart").toggleClass("h-96 p-4");
  });

  closeCart.addEventListener('click', e => {
    cart.classList.remove('h-96', 'p-4');
  });

  sessionBtn.addEventListener('click', e => {
    seccion.classList.add('h-96', 'p-4');
  });

  vovlerBtn.addEventListener('click', e => {
    seccion.classList.remove('h-96', 'p-4');
  });

  cerrarSeccion.addEventListener('click', async e => {
    try {
      await axios.get('/api/logout');
      window.location.pathname = '/';
    } catch (error) {
      console.log(error);
    }
  });

  courseBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      console.log(e.target);
      const img = e.target.parentElement.parentElement.children[0].innerHTML;
      const name = e.target.parentElement.children[0].innerHTML;
      const exist = [...table.children].find(Element => Element.children[1].innerHTML == name);

      if (exist) {
        exist.children[3].innerHTML = Number(exist.children[3].innerHTML) + 1;
      } else {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${img}</td>
          <td>${name}</td>
          <td>15$</td>
          <td>1</td>
          <td>
          <svg xmlns="http://www.w3.org/2000/svg" class=""delete-btn fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </td>
          `;
        row.children[4].addEventListener('click', e => {
          e.currentTarget.parentElement.remove();
        });

        table.append(row);
      }

    });
  });

  // Función para obtener productos desde el backend
  async function fetchProducts() {
    try {
      const response = await axios.get('/api/products');
      const products = response.data;

      // Renderizar la lista de productos
      products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div 
          class="gap-1 flex flex-col items-center justify-center productItem" 
          id="${product._id}"
          data-name="${product.name}"
          data-description="${product.description}"
          data-price="${product.price}"
        >
          <img class="h-40 w-40 rounded-3xl" src="${product.image}"/> 
          <h3 class="font-['Pally'] font-bold text-base">${product.name}</h3>
          <p class="font-['Pally']  text-base">${product.description}</p>
          <p class="font-['Pally'] font-bold text-base">$${product.price}</p>
          <button class="h-8 w-40 rounded-xl bg-[#485935] hover:bg-[#26301b] font-['Pally'] text-white course-btn">
            Agregar al carrito
          </button>
        </div>
        `;
        productList.appendChild(div);
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  //CLICK EDIT BUTTON
  $('body').on('click', '.course-btn', function (e) {
    e.preventDefault();
    const item = $(this).parent();
    const id = item.attr('id');
    const name = item.data('name');
    const description = item.data('description');
    const price = item.data('price');
    let bandera = false;
    let itemCarrito = "";
    if (localStorage.carrito) {
      itemCarrito = JSON.parse(localStorage.carrito);
      const carritoDuplicado = itemCarrito.find(item => item.id === id);
      if (carritoDuplicado) {
        bootbox.alert('No puede comprar mas de un articulo');
      } else {
        itemCarrito.push({
          id,
          name,
          description,
          price
        });
        bandera = true;
      }

    } else {
      itemCarrito = [
        {
          id,
          name,
          description,
          price
        }
      ];
      bandera = true;
    }
    localStorage.setItem('carrito', JSON.stringify(itemCarrito));
    if (bandera) {
      showCart();
      $('#cart').addClass('h-96 p-4');
    }

  })

  const showCart = () => {
    $('#table-body-cart').html('');
    if (localStorage.carrito) {
      const carrito = JSON.parse(localStorage.carrito);
      carrito.map(item => {
        $('#table-body-cart').append(`
        <tr>
          <td class="font-bold  borber-b">${item.name}</td>
          <td class="borber-b">${item.description}</td>
          <td class="font-bold borber-b">${item.price}</td>
        </tr>
        `);
      })
    }
  }

  showCart();

  $('#table-clear').on('click', function () {
    localStorage.removeItem('carrito');
    showCart();
  });

  // Llamar a la función para obtener productos al cargar la página
  fetchProducts();
});