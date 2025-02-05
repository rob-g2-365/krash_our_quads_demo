import * as constants from './constants.js'


export class UserInfo {
  #name = null;
  #aChannel = null;
  #channel =null;
  #goggleType =null;
  #channelLabel = null;
  #checkIn = false;


  setName(name){
    this.#name = name;
    return this;
  }

  setAchannel(aChannel){
    this.#aChannel = aChannel;
    return this;
  }

  setGoggleType(goggleType){
    this.#goggleType = goggleType;
    return this;
  }

  setChannelLabel(channelLabel){
    this.#channelLabel = channelLabel;
    return this;
  }

  setCheckIn(checkIn){
    this.#checkIn = checkIn;
    return this;
  }

  setUsingFreqRecord(freqRecord){
    this.#channelLabel= freqRecord.label;
    this.#channel = freqRecord.channel;
    this.#aChannel = freqRecord.achannel;
  }

  getName() {
    return this.#name;
  }

  getAChannel() {
    return this.#aChannel;
  }

  getGoggleType() {
    return this.#goggleType;
  }

  getChannel() {
    return this.#channel;
  }

  getChannelLabel() {
    return this.#channelLabel;
  }

  getCheckIn(){
    return this.#checkIn;
  }

  getCheckInString() {
    return this.#checkIn?"Checked In": "Not Checked In";
  }

  getFriendlyChannelName() {
    return this.#goggleType + ' - CH' + this.#channel;
  }

  isInitialized() {
    return ((this.#goggleType!==null) && (this.#channelLabel !== null));
  }

  getHtmlStatus() {
    let html = `<p>Name = ${this.#name}</p>`;
    if(!this.isInitialized()) {
      html += '<p>VTX Frequency Not Configured</p>';
      return html;
    }

    html += `
      <p>Channel Information = ${this.getFriendlyChannelName()}</p>
      <p>Analog Channel Equivalent = ${this.getAChannel()} </p>
      <p>Check In Status = ${this.getCheckInString()} </p>
    `;
    return html;
  }

  getHtmlStatus2() {
    const init = this.isInitialized();
    const channelFriendlName = init?this.getFriendlyChannelName():"Not Configured";
    const aChannel = init?this.getAChannel():"Not Configured";
    const checkInStatus = init?this.getCheckInString():"Not Checked In"
    return `
    <table>
      <tr>
        <td>Name</td>
        <td>${this.getName()}</td>
      </tr>
      <tr>
        <td>Channel Info</td>
        <td>${channelFriendlName}</td>
      </tr>
      <tr>
        <td>Analog Channel Equivalent</td>
        <td>${aChannel}</td>
      </tr>
      <tr>
        <td>Check In Status</td>
        <td>${checkInStatus}</td>
      </tr>
    </table>
    `;
  }
}


let gUserInfo = null;

export function loggedIn(){
  return (gUserInfo !== null);
}

export function globalUserLoggedInAndConfigured() {
  return loggedIn() && gUserInfo.isInitialized();
}

export function setGlobalUserInfo(userInfo) {
  gUserInfo = userInfo;
}

export function getGlobalUserInfo(){
  return gUserInfo;
}

export function getGlobalHtmlStatus() {
  if(!gUserInfo) {
    return '<p>User not logged in.</p>'
  }
  return gUserInfo.getHtmlStatus2();
}

export function createUserTestData() {
  const FIRST_NAMES = ['Ben', 'Ethen', 'Joel', 'Zane', 'Grant', 'Jayden', 'Arthur', 'Max', 'Mary' ];
  let testData = [];
  for(let i = 0; i< FIRST_NAMES.length; i++) {
    const user = new createRandomUserInfo(FIRST_NAMES[i]);
    testData.push(user);
  }
  console.log(testData);
  return testData;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function createRandomUserInfo(name){
  const goggleLength = constants.GOGGLES_RECORDS.length;
  const goggleRecord = constants.GOGGLES_RECORDS[getRandomInt(goggleLength)];
  const numFreqRecords = goggleRecord.freqMap.length;
  const freqRecord = goggleRecord.freqMap[getRandomInt(numFreqRecords)];
  const info = new UserInfo();
  info.setName(name);
  info.setGoggleType(goggleRecord.type);
  info.setUsingFreqRecord(freqRecord);
  return info;
}