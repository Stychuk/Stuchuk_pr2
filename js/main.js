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
const logInForm = document.querySelector('#logInForm');
const loginInput= document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const userName1 = document.querySelector('#userName');
const passwordInput = document.querySelector('#password');

let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    modalAuth.classList.toggle("is-open");
    loginInput.style.borderColor = '';
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
          localStorage.setItem('gloDelivery', login)
          toggleModalAuth();
          buttonAuth.removeEventListener('click', toggleModalAuth);
          logInForm.removeEventListener('submit', logIn)
          logInForm.reset();
          checkAuth();
        } else {
            loginInput.style.borderColor = '#ff0000';
            loginInput.value = '';
        }
    }

    buttonAuth.style.display = 'block';
    userName.style.display = 'none';
    buttonOut.style.display = 'none';
    buttonAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();