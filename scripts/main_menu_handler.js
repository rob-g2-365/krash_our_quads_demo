// import { googleLogin, logout } from './firebase_init.js';

const menuHome = 'js-menu-home';
const menuLogin = 'js-menu-login';
const menuLogout ='js-menu-logout';
const menuEnterFreq = 'js-menu-enter-freq';
const menuArriveLeave ='js-menu-arrive-leave';
const menuAllocateFreq = 'js-menu-allocate-freq';
const menuAbout = 'js-menu-about';

const menuHandlers = [
  {f: handlerHome, c:menuHome},
  {f: handlerLogin, c:menuLogin},
  {f: handlerLogout, c:menuLogout},
  {f: handlerEnterFreq, c:menuEnterFreq},
  {f: handlerArriveLeave, c:menuArriveLeave},
  {f: handlerAllocateFreq, c:menuAllocateFreq},
  {f: handlerAbout, c:menuAbout}
];

const arrayMenuLoggedIn = [
  menuLogout,
  menuEnterFreq,
  menuArriveLeave,
  menuAllocateFreq
]

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
/*
 function hamburgerEventListener(event) {
  const x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
  */

function handlerHome(event) {
  clearMenu();
  // googleLogin(updateLoginState);
}


function handlerLogin(event) {
  clearMenu();
  // googleLogin(updateLoginState);
}

function handlerLogout(event) {
  clearMenu();
  // logout(updateLoginState);
}

function handlerEnterFreq(event) {
  alert("enter freq.");
}

function handlerArriveLeave(event) {
  alert("Arrive Leave");
}

function handlerAllocateFreq() {
  alert("Show Allocated Frequency");
}
function handlerAbout() {
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
  <h1>About</h1>
  <h2>Krash our Quads</h2>
  <h2>VTX Frequency Configuration App</h2>
  <h2>Written by Rob Gorsegner </h2>
  <h3>Copyright &copy 2025 </h3>
  `;
  clearMenu();
}

function clearMenu() {
  // const myLinksElement = document.getElementById("myLinks");
  // myLinksElement.style.display = "none";
  document.querySelector('.js-toggler').checked = false;
}

//export function initializeHamburgerEventListener() {
//  document.querySelector('.js-hamburger-icon').addEventListener('click',hamburgerEventListener);
//}

/*
function updateLoginState() {
  const user = firebase.auth().currentUser;
  console.log(user);
  if(user) {
    console.log(user.uid);
  }
  setLoginState(user!==null);
}
*/

export function intializeEventListeners(){
  menuHandlers.forEach((item) => {
    const element = document.querySelector('.' + item.c);
    console.log(item.c);
    element.addEventListener('click',item.f);
    console.log(element);
  });
}

export function setLoginState(loggedIn) {
  document.querySelector('.' + menuLogin).style.display = !loggedIn?'block':'none';
  arrayMenuLoggedIn.forEach((menuClass) => {
    document.querySelector('.' + menuClass).style.display = loggedIn?'block':'none';
  });
}
