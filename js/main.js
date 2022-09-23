const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("is-open");
}

//new WOW().init();


// day 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput= document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const userName1 = document.querySelector('#userName');
const passwordInput = document.querySelector('#password');

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
}

function authorized() {

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        userName1.textContent = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    console.log('Авторизован');

    userName.textContent = login; 

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';
    userName1.textContent = "Welcome, " + login + "!";
    buttonOut.addEventListener('click', logOut)
}

function notAuthorized() {
    console.log('Не авторизован');

    function logIn(event) {
        event.preventDefault();
        login = loginInput.value;

        toggleModalAuth();
        buttonAuth.removeEventListener('click', toggleModalAuth);
        loginForm.removeEventListener('submit', logIn)
        loginForm.reset();
        
        if(login && password) {
            localStorage.setItem('gloDelivery', login);
            
            toggleModalAuth();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            loginForm.removeEventListener('submit', logIn);
            loginForm.reset();
            checkAuth();
        }
        else {
            alert('Заполните поля!');
            toggleModalAuth();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            loginForm.removeEventListener('submit', logIn)
            loginForm.reset();
        }
    }

    buttonAuth.style.display = 'block';
    userName.style.display = 'none';
    buttonOut.style.display = 'none';

    buttonAuth.addEventListener('click', toggleModalAuth);
    loginForm.addEventListener('submit', logIn);
    modalAuth.addEventListener('click', function(event) {
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth();
        }
    });
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();