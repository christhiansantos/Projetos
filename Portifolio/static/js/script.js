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