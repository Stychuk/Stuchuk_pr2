'use strict';

//new WOW().init();

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const closeAuth = document.querySelector('.close-auth');
const modalAuth = document.querySelector('.modal-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput= document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const userName1 = document.querySelector('#userName');
const passwordInput = document.querySelector('#password');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

function toggleModal() {
    modal.classList.toggle("is-open");
}

function toggleModalAuth() {
    modalAuth.classList.toggle("is-open");
    if (modalAuth.classList.contains("is-open")) {
        disableScroll();
    } else {
        enableScroll();
    }
}

function clearForm() {
    loginInput.style.borderColor = '';
    logInForm.reset();
}

function authorized() {
    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery')
        buttonAuth.style.display = '';
        userName1.textContent = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    userName.textContent = login; 

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
    userName1.textContent = "Welcome, " + login + "!";
    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {

    function logIn(event) {
        event.preventDefault();
        if (loginInput.value.trim()) {
          login = loginInput.value; 
          closeAuth.removeEventListener('click', toggleModalAuth);

          
        if(login && password) {
            localStorage.setItem('gloDelivery', login);
            
            toggleModalAuth();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        }
        } else {
            loginInput.style.borderColor = '#ff0000';
            loginInput.value = '';
        }
    }

    buttonAuth.style.display = 'block';
    userName.style.display = 'none';
    buttonOut.style.display = 'none';
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
    modalAuth.addEventListener('click', function (event) { 
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth();
        }
    })
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

function createCardRestaurant() {

    const card = `
        <a class="card card-restaurant">
            <img src="img/image (1).jpg" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">Тануки</h3>
                    <span class="card-tag tag">48 мин</span>
                </div>
                <div class="card-info">
                    <div class="rating"><img src="img/rating.svg" alt="rating" class="raiting-star"> 3.8</div>
                    <div class="price">От 800 ₽</div>
                    <div class="category">Суши, роллы</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);

}

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
            <img src="img/image (5).jpg" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">Ролл угорь стандарт</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">Рис, угорь, соус унаги, кунжут, водоросли нори.</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary">
                        <span class="button-card-text">В корзину</span>
                        <img 
                        src="img/shopping-cart-white.svg" 
                        alt="shopping-cart" 
                        class="button-card-image">
                    </button>
                    <strong class="card-price-bold">250 ₽</strong>
                </div>
            </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    if(login){
        const target = event.target;

        const restaurant = target.closest('.card-restaurant');

        if(restaurant) {
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            createCardGood();
            createCardGood();
            createCardGood();
        }
    }
    else {
        toggleModalAuth();
    }
}

buttonAuth.addEventListener('click', clearForm);

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();


//  Slider

new Swiper('.swiper', {
    sliderPerView: 1,
    loop: true,
    autoplay: true,
    effect: 'cube',
    grabCursor: true,
    cubeEffect:{
        shadow: false,
    },
})