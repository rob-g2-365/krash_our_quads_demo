import {loggedIn, getGlobalUserInfo, getGlobalHtmlStatus, globalUserLoggedInAndConfigured} from "./user_info.js";

export function showCheckInOutQuestion() {
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
  <h3>Check In/Out?</h1>
  <div class="left-radio-div">
  <div class="check-in">
    <input type="radio" name="check-in-out" id="check-in" value="check-in">
    <label for="check-in" class="js-check-in-out">Check In</label>
  </div>
  <div class="check-out">
    <input type="radio" name="check-in-out" id="check-out" value="check-out">
    <label for="check-out" class="js-check-in-out">Check Out</label>
  </div>
  </div>
  <a class="btn button-save js-button-check-in-out">Save</a>`;
  const buttonGogglesElement = document.querySelector(".js-button-check-in-out");
  buttonGogglesElement.addEventListener('click', buttonCheckInOutEventListener);
  setCheckInDefault();
}

function setCheckInDefault() {
  if(!globalUserLoggedInAndConfigured()){
    return;
  }
  const user = getGlobalUserInfo();
  const id = user.getCheckIn()?'check-in': 'check-out';
  const element = document.getElementById(id);
  element.checked = true;
}

function buttonCheckInOutEventListener(event) {
  const elementCheckIn = document.getElementById('check-in');
  const elementCheckOut = document.getElementById('check-out');

  // Make sure that one of the elements is checked.
  if (!elementCheckIn.checked && !elementCheckOut.checked) {
    return;
  }

  if(loggedIn()){
    getGlobalUserInfo().setCheckIn(elementCheckIn.checked);
  }    
  showCheckInState();
}

function showCheckInState() {
  const mainspaceElement = document.querySelector(".js-container");
  const checkInHtml = `
  <h2>User checked in.</h2>
  <h3>Review the <b>Allocated Frequencies</b> and coordinate with other users on your shared channel.</h3>`;

  const checkOutHtml = `
  <h2>User checked out.</h2>
  <h3>Thanks for flying with us.</h3>`;

  const html = getGlobalUserInfo().getCheckIn()? checkInHtml: checkOutHtml;

  mainspaceElement.innerHTML = `
  ${html}
  ${getGlobalHtmlStatus()}
  `;
}
