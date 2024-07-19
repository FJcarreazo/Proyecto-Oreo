const shopIcon = document.querySelector('#shop-icon');
const cart = document.querySelector('#cart');
const table = document.querySelector('#table-body');
const tableClear = document.querySelector('#table-clear');
const closeCart = document.querySelector('#close-cart');
const seccion = document.querySelector('#seccion');
const sessionBtn = document.querySelector('#cerrar-btn');
const vovlerBtn = document.querySelector('#volver');
const cerrarSeccion = document.querySelector('#sesion-btn')



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
        window.location.pathname = '/login';
    } catch (error) {
        console.log(error);
    }
});






