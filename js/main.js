'use strict';

//new WOW().init();

const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
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
const inputSearch = document.querySelector('.input-search');
const pageName = document.querySelector('.page-name');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('gloDelivery');

const cart = [];

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
        cartButton.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    userName.textContent = login; 

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    cartButton.style.display = 'flex';
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
        <a class="card card-restaurant" data-name="${name}" data-stars="${stars}" data-price="${price}" data-kitchen="${kitchen}" data-products="${products}">
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

function createReustarantInfo({ stars, name, price, kitchen }) {

    const restaurantInfo = document.createElement('div');
    restaurantInfo.className = 'menu-heading';

    restaurantInfo.insertAdjacentHTML('afterbegin', ` 
            <h3 class="section-title">${name}</h3>
            <div class="card-info">
                <div class="rating">
                    <img src="img/rating.svg" alt="star" class="rating-star">
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

function createCardGood({ description, image, name, price, id }) {

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
                    <button class="button button-primary button-add-cart" id="${id}">
                        <span class="button-card-text">В корзину</span>
                        <img 
                        src="img/shopping-cart-white.svg" 
                        alt="shopping-cart" 
                        class="button-card-image">
                    </button>
                    <strong class="card-price card-price-bold">${price} ₽</strong>
                </div>
            </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    if(login){
        const target = event.target;

        const restaurant = target.closest('.card-restaurant');
        
        cardsMenu.textContent = '';
        
        if(restaurant) {
            containerPromo.classList.add('hidden');
            restaurants.classList.add('hidden');
            pageName.classList.add('hidden');
            menu.classList.remove('hidden');

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

function closeGoods() {
    inputSearch.value = '';
    containerPromo.classList.remove('hidden');
    restaurants.classList.remove('hidden');
    menu.classList.add('hidden');
    pageName.classList.add('hidden');
}

function addToCart(event) {

    const target = event.target;

    const buttonAddToCart = target.closest('.button-add-cart');

    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(function(item) {
            return item.id === id;
        });

        if (food) {
            food.count += 1;
        } else {
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function renderCart() {
    modalBody.textContent = '';

    cart.forEach(function({ id, title, cost, count }) {
        const itemCart = `
            <div class="food-row">
                <span class="food-name">${title}</span>
                <strong class="food-price">${cost}</strong>
                <div class="food-counter">
                    <button class="counter-button counter-minus" data-id=${id}>-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id=${id}>+</button>
                </div>
            </div>
        `;

        modalBody.insertAdjacentHTML('afterbegin', itemCart)
    });

    const totalPrice = cart.reduce(function(result, item) { 
        return result + (parseFloat(item.cost) * item.count); 
    }, 0);

    modalPrice.textContent = totalPrice + ' ₽';

}

function changeCount(event) {
    const target = event.target;

    if (target.classList.contains('counter-button')) {
        const food = cart.find(function(item) {
            return item.id === target.dataset.id;
        });
        
        if (target.classList.contains('counter-minus')) {
            food.count--;
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
            }
        };

        if (target.classList.contains('counter-plus')) food.count++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function init() {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    
    getData('./db/partners.json').then(function(data){
        data.forEach(createCardRestaurant);
    });

    buttonAuth.addEventListener('click', clearForm);
    
    cartButton.addEventListener("click", function() {
        renderCart();
        toggleModal();
    });

    buttonClearCart.addEventListener('click', function() {
        cart.length = 0;
        renderCart();
    })

    modalBody.addEventListener('click', changeCount);

    cardsMenu.addEventListener('click', addToCart);
    
    close.addEventListener("click", toggleModal);
    
    cardsRestaurants.addEventListener('click', openGoods);
    
    logo.addEventListener('click', function() {
        containerPromo.classList.remove('hidden');
        restaurants.classList.remove('hidden');
        menu.classList.add('hidden');
    });

    checkAuth();

    inputSearch.addEventListener('keypress', function(event) {
        if (event.charCode === 13) {
            pageName.textContent = '';
            const value = event.target.value.trim();

            if(!value) {
                
                event.target.style.backgroundColor = "red";
                event.target.value = '';
                setTimeout(function() {
                    event.target.style.backgroundColor = "red";
                },1500)
                return;
            }

            getData('./db/partners.json') 
                .then(function (data) {
                    return data.map(function(partner) {
                        return partner.products;  
                    }); 
                })
                .then(function(linksProduct) {
                    cardsMenu.textContent = '';

                    linksProduct.forEach(function(link) {
                        getData(`./db/${link}`)
                            .then(function(data) {

                        const resultSearch = data.filter(function(item) {
                            const name = item.name.toLowerCase();
                            return name.includes(value.toLowerCase());
                        });

                            containerPromo.classList.add('hidden');
                            restaurants.classList.add('hidden');
                            menu.classList.remove('hidden');
                            //pageName.style.display = 'flex';
                            
                            if(resultSearch.length == 0) {
                                if(pageName.textContent) return;
                                pageName.textContent  = 'Ничего не найдено';
                            }
                            else {
                                pageName.textContent = 'Результат поиска';
                                resultSearch.forEach(createCardGood);
                            }
                            pageName.classList.remove('hidden');
                        })
                    })
                })
            }
        });
    
    
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