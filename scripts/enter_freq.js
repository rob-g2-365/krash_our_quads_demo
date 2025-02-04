import * as constant from './constants.js';
import { GogglesInfo } from './goggles_info.js';

let gGogglesType = null;
let gGogglesInfo = null;

const RADIO_FREQ_NAME = 'radio-freq-name';

export function showGogglesTypeQuestion() {
  console.log('showGogglesTypeQuestion');
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
  <h3>What type of goggles/video transmitter do you have?</h1>
  <div class="radio-analog">
    <input type="radio" name="goggles-type" id="analog" value="analog">
    <label for="analog" class="js-goggles-type">Analog</label>
  </div>
  <div class="radio-dji">
    <input type="radio" name="goggles-type" id="dji" value="dji">
    <label for="dji" class="js-goggles-type">DJI</label>
  </div>
  <div class="radio-hdzero">
    <input type="radio" name="goggles-type" id="hdzero" value="hdzero">
    <label for="hdzero" class="js-goggles-type">HDZero</label>
  </div>
  <div class="radio-walksnail">
    <input type="radio" name="goggles-type" id="walksnail" value="walksnail">
    <label for="walksnail" class="js-goggles-type">Walksnail</label>
  </div>
  <a class="btn button-accept js-button-goggles">Accept</a>`;
  const buttonGogglesElement = document.querySelector(".js-button-goggles");
  buttonGogglesElement.addEventListener('click', buttonGogglesEventListener);
}

function buttonGogglesEventListener(event) {
  console.log('buttonGogglesEventListener');
  console.log(event.target);
  const gogglesType = getCheckedGogglesRadioButton();
  if (gogglesType !== null) {
    gGogglesType = gogglesType;
    const buttonGogglesElement = document.querySelector(".js-button-goggles");
    buttonGogglesElement.removeEventListener('click', buttonGogglesEventListener);
    // Next Step
    showFreqQuestion(gogglesType);
  }
}

function getCheckedGogglesRadioButton() {
  for (let i = 0; i < constant.GOGGLE_TYPES.length; i++) {
    const goggle = constant.GOGGLE_TYPES[i];
    const element = document.getElementById(goggle);
    if (element.checked) {
      return goggle;
    }
  }
  return null;
}

export function showFreqQuestion(goggleType) {
  const goggleRecord = constant.goggleToGoggleRecord(goggleType);
  const mainspaceElement = document.querySelector(".js-container");
  mainspaceElement.innerHTML = `
    <h3 class=js-freq-question> </h3>
    <div class="js-freq-radio-buttons-div">
    </div>
    <a class="btn js-button-freq" data-goggle-type="${goggleType}">Save</a>
    <p class="js-freq-question-notes question-notes"></p>
  `;
  displayQuestion(goggleRecord);
  displayRadioButtons(goggleRecord);
  displayQuestionNotes(goggleRecord);
  hookFreqButtonEventListener();
}

function hookFreqButtonEventListener() {
  const buttonGogglesElement = document.querySelector(".js-button-freq");
  buttonGogglesElement.addEventListener('click', buttonFreqEventListener);
}

function buttonFreqEventListener(event) {
  const label = radioButtonSelection();

  // Make sure that the user did a selection.
  if(!label) {
    return;
  }  
  const goggleType = event.target.dataset.goggleType;
  const goggleRecord = constant.goggleToGoggleRecord(goggleType);
  const freqRecord = constant.getFreqSelection(goggleRecord, label);

  gGogglesInfo = new GogglesInfo();
  gGogglesInfo.setPlatform(goggleType);
  gGogglesInfo.setFreqInfo(freqRecord);
}

function displayQuestion(goggleRecord) {
  const questionElement = document.querySelector('.js-freq-question');
  questionElement.innerHTML = goggleRecord.question;
}

function displayQuestionNotes(goggleRecord) {
  const questionNotesElement = document.querySelector('.js-freq-question-notes');
  questionNotesElement.innerHTML = goggleRecord.notes;
}

function displayRadioButtons(goggleRecord) {
  const questionNotesElement = document.querySelector('.js-freq-radio-buttons-div');
  const freqMap = goggleRecord.freqMap;
  let radioButtonComposite = '';
  freqMap.forEach((channelInfo) => {
    const radioId = channelInfo.label;
    const selection = channelInfo.name;
    const radioButtonHtml = `<input type="radio" name="${RADIO_FREQ_NAME}" ` +
      `id="${radioId}" value="${radioId}"/>`;
    const labelHtml = `<label for="${radioId}">${selection}</label>`;
    radioButtonComposite += '<div>' + radioButtonHtml + labelHtml + '</div>';
  });
  questionNotesElement.innerHTML = radioButtonComposite;
}

function radioButtonSelection() {
  const element = document.getElementsByName(RADIO_FREQ_NAME);
  for (let i = 0; i < element.length; i++) {
    if (element[i].checked) {
      return element[i].value;
    }
  }
  return null;
}
