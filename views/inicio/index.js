const shopIcon = document.querySelector('#shop-icon');
const cart = document.querySelector('#cart');
const table = document.querySelector('#table-body');
const tableClear = document.querySelector('#table-clear');
const closeCart = document.querySelector('#close-cart');
const seccion = document.querySelector('#seccion');
const sessionBtn = document.querySelector('#cerrar-btn');
const vovlerBtn = document.querySelector('#volver');
const cerrarSeccion = document.querySelector('#sesion-btn')
const productList = document.querySelector("#product-list");
const courseBtn = document.querySelectorAll("#course-btn");

shopIcon.addEventListener('click', e => {
  cart.classList.add('h-96', 'p-4');
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
        <div class="gap-1 flex flex-col items-center justify-center">
         <img class="h-40 w-40 rounded-3xl" src="${product.image}"/> 
          <h3 class="font-['Pally'] font-bold text-base">${product.name}</h3>
          <p class="font-['Pally']  text-base">${product.description}</p>
          <p class="font-['Pally'] font-bold text-base">$${product.price}</p>
          <button id="course-btn" class="h-8 w-40 rounded-xl bg-[#485935] hover:bg-[#26301b] font-['Pally'] text-white">Agreagar al carrito</button>
          </div>
        `;
      productList.appendChild(div);
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
}

// Llamar a la función para obtener productos al cargar la página
fetchProducts();