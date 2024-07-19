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
        window.location.pathname = '/signin/';
    } catch (error) {
        console.log(error);
    }
});

async function fetchProducts() {
    try {
      const response = await axios.get('https://proyecto-oreo.onrender.com/admin/products/');
      const products = response.data;
     
      

      // Renderizar la lista de productos
      products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="gap-1 flex flex-col items-center justify-center">
         <img class="h-40 w-40 rounded-3xl" src="${product.image}"/> 
          <h3 class="font-['Pally'] font-bold text-base">Nombre: ${product.name}</h3>
          <p class="font-['Pally'] font-bold text-base">Descripcion: ${product.description}</p>
          <p class="font-['Pally'] font-bold text-base">Precio: $${product.price}</p>
          <p class="font-['Pally'] font-bold text-base">Cantidad: ${product.quantity}</p>
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






