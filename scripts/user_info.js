import * as constants from './constants.js'
import { GogglesInfo } from './goggles_info.js';


export class UserInfo {
  #name = null;
  #aChannel = null;
  #goggleType =null;
  #channelLabel = null;

  constructor(name, aChannel, goggleType, channelLabel) {
    this.#name = name;
    this.#aChannel = aChannel;
    this.#goggleType = goggleType;
    this.#channelLabel = channelLabel;
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

  getChannelLabel() {
    return this.#channelLabel;
  }

  getFriendlyChannelName() {
    const goggleRecord = constants.goggleToGoggleRecord(this.#goggleType);
    const freqRecord = constants.getFreqSelection(goggleRecord, this.#channelLabel);
    return this.#goggleType + ' - CH' + freqRecord.channel;
  }
}

export function createUserTestData() {
  const FIRST_NAMES = ['Ben', 'Ethen', 'Joel', 'Zane', 'Grant', 'Jayden', 'Arthur', 'Max', 'Mary' ];
  let testData = [];
  for(let i = 0; i< FIRST_NAMES.length; i++) {
    const name = FIRST_NAMES[i];
    const gogglesInfo = createRandomGogglesInfo();
    const user = new UserInfo(name, gogglesInfo.getAChannel(), gogglesInfo.getPlatform(), gogglesInfo.getLabel());
    testData.push(user);
  }
  console.log(testData);
  return testData;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function createRandomGogglesInfo(){
  const goggleLength = constants.GOGGLES_RECORDS.length;
  const goggleRecord = constants.GOGGLES_RECORDS[getRandomInt(goggleLength)];
  const numFreqRecords = goggleRecord.freqMap.length;
  const freqRecord = goggleRecord.freqMap[getRandomInt(numFreqRecords)];
  const info = new GogglesInfo();
  info.setPlatform(goggleRecord.type);
  info.setFreqInfo(freqRecord)
  return info;
}