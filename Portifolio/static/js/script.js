function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../static/img/menu-hamburger-nav-svgrepo-com.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../static/img/close-circle-svgrepo-com.svg";
    }
}

const button = document.querySelector('.send'); 

const addLoading = () => {
    button.innerHTML = '<img src="img/spin.avif" class="loading">';
};

const removeLoading = () => {
    button.innerHTML = 'Enviar'; 
};

button.addEventListener('click', function(event) {
   event.preventDefault(); 

    addLoading();

    setTimeout(function() {
        removeLoading();
        document.querySelector('form').submit();
    }, 1000);
});
