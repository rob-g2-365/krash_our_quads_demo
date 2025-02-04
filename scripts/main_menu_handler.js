// import { googleLogin, logout } from './firebase_init.js';
// import { googleLogin, logout } from './firebase_init.js';
import {showGogglesTypeQuestion, showFreqQuestion} from './enter_freq.js';
import {showFreqTable} from './freq_table.js'
import * as constant from './constants.js';



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
];

let gLoggedIn = false;

function handlerHome(event) {
  clearMenu();
  showHomeInformation();
}

export function showHomeInformation() {
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
  <h1>Welcome</h1>
  <p>This app allows users to share VTX frequencies. Perform the following steps:</p> 
  <ol>
    <li class="left"><b>Log In</b> using a Google account.</li>
    <li class="left"><b>Enter VTX frequency</b> that you are using.</li>
    <li class="left">When you arrive at the Krash Our Quads Event,  <b>Check In</b>.</li>
    <li class="left">Before you fly, check the <b>Allocated Frequencies</b> and coordinate with anyone on your channel.</li>
    <li class="left">When you leave the Krash Our Quads event, <b>Check Out</b>.</li>
  </ol>
  <a href="#" class="btn">Read More</a>
  `;
}


function handlerLogin(event) {
  clearMenu();
  // googleLogin(updateLoginState);
  gLoggedIn = true;
  updateLoginState()
}

function handlerLogout(event) {
  clearMenu();
  // logout(updateLoginState);
  gLoggedIn = false;
  updateLoginState()
}

function handlerEnterFreq(event) {
  // alert("enter freq.");
  clearMenu();
  showGogglesTypeQuestion();
  // showFreqQuestion(constant.ANALOG)
}

function handlerArriveLeave(event) {
  alert("Arrive Leave");
}

function handlerAllocateFreq() {
  // alert("Show Allocated Frequency");
  clearMenu();
  showFreqTable();
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

function updateLoginState() {
  setLoginState(gLoggedIn);
}

export function intializeEventListeners(){
  menuHandlers.forEach((item) => {
    const element = document.querySelector('.' + item.c);
    element.addEventListener('click',item.f);
  });
}

export function setLoginState(loggedIn) {
  document.querySelector('.' + menuLogin).style.display = !loggedIn?'block':'none';
  arrayMenuLoggedIn.forEach((menuClass) => {
    document.querySelector('.' + menuClass).style.display = loggedIn?'block':'none';
  });
}
