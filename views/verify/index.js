const infoText = document.querySelector('#text-info');

(async () => {
    try {
        const token = window.location.pathname.split('/')[3];
        const id = window.location.pathname.split('/')[2];
        console.log(id);
        await axios.patch(`/api/users/${id}/${token}`);
        window.location.pathname = '/signin/';
      
        
    } catch (error) {
        infoText.innerHTML = error.response.data.error;
    }
})();