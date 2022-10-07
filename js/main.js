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


const getData = async function(url) {
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url},
            статус ошибка ${response.status}!`);
    }

    return await response.json();

};

const toggleModal = function() {
    modal.classList.toggle("is-open");
};

const toggleModalAuth = function() {
    modalAuth.classList.toggle("is-open");
    if (modalAuth.classList.contains("is-open")) {
        disableScroll();
    } else {
        enableScroll();
    }
};

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

function createCardRestaurant({ image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery }) {

    const card = `
        <a class="card card-restaurant" data-products="${products}">
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${timeOfDelivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating"><img src="img/rating.svg" alt="rating" class="raiting-star"> ${stars}</div>
                    <div class="price">От ${price} ₽</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood({ description, image, name, price }) {

    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
            <img src="${image}" alt="image" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary">
                        <span class="button-card-text">В корзину</span>
                        <img 
                        src="img/shopping-cart-white.svg" 
                        alt="shopping-cart" 
                        class="button-card-image">
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function createReustarantInfo({ stars, name, price, kitchen }) {

    const restaurantInfo = document.createElement('div');
    restaurantInfo.className = 'menu-heading';

    restaurantInfo.insertAdjacentHTML('beforeend', `
            <h3 class="section-title">${name}</h3>
            <div class="card-info">
                <div class="rating">
                    <img src="img/icon/rating.svg" alt="star" class="rating-star">
                    ${stars}
                </div>
                <div class="price">
                    От ${price} ₽
                </div>
                <div class="category">
                    ${kitchen}
                </div>
            </div>
    `);
    menu.insertAdjacentElement('afterbegin', restaurantInfo);
}

function openGoods(event) {
    if(login){
        const target = event.target;

        const restaurant = target.closest('.card-restaurant');
        
        cardsMenu.textContent = '';
        
        if(restaurant) {
            
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            createReustarantInfo(restaurant.dataset);
            
            getData(`./db/${restaurant.dataset.products}`).then(function(data){
                data.forEach(createCardGood);
            });
            
        }
    }
    else {
        toggleModalAuth();
    }
}

function init() {
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardRestaurant);
        //data.forEach(createReustarantInfo);
    });
        
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
    });
}

init();