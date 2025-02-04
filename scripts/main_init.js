
import { intializeEventListeners, setLoginState, showHomeInformation} from './main_menu_handler.js';
// import { firebaseInit } from './firebase_init.js';

// firebaseInit();
showHomeInformation();
intializeEventListeners();
setLoginState(false);

