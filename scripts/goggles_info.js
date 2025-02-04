const GOGGLES_STORAGE_ITEM = "goggles-info";
import * as constants from './constants.js'

export class GogglesInfo {
  #platformType = null;
  #label = null;
  #channel =null;
  #aChannel = null;
  #freq = null;

  setPlatform(platformType) {
    this.#platformType = platformType;
  }

  getPlatform(){
    return this.#platformType;
  }

  isInitialized() {
    return ((this.#platformType!==null) && (this.#freq !== null));
  }

  test() {
    return ((this.#label || this.#channel || this.#aChannel | this.#freq));
  }

  setFreqInfo(freqRecord) {
    this.#label = freqRecord.label;
    this.#channel = freqRecord.channel;
    this.#aChannel = freqRecord.achannel;
    this.#freq = freqRecord.freq;
  }

  toJSON () {
    return {
      platformType: this.#platformType,
      label:this.#label,
      channel: this.#channel,
      aChannel:this.#aChannel,
      freq:this.#freq
    };    
  }

  save() {
    localStorage.setItem(GOGGLES_STORAGE_ITEM, JSON.stringify(this));
  }

  static load() {
    const goggleRecord = localStorage.getItem(GOGGLES_STORAGE_ITEM);
    if(!goggleRecord) {
      return null;
    }
    const gogglesInfo = new GogglesInfo();
    gogglesInfo.setPlatform(goggleRecord.platformType);
    gogglesInfo.setFreqInfo(goggleRecord);
  }
}

export function getGoggleTestData() {
  const FIRST_NAMES = ['Ben', 'Ethen', 'Joel', 'Zane', 'Grant', 'Jayden', 'Arthur', 'Max', 'Mary' ];
  let testData = [];
  for(let i = 0; i< FIRST_NAMES.length; i++) {
    const name = FIRST_NAMES[i];
    testData.push({name: name, goggleInfo: createRandomGogglesRecord(name)});
  }
  return testData;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function createRandomGogglesRecord(){
  const goggleLength = constants.GOGGLES_RECORDS.length;
  const goggleRecord = constants.GOGGLES_RECORDS[getRandomInt(goggleLength)];
  const numFreqRecords = goggleRecord.freqMap.length;
  const freqRecord = goggleRecord.freqMap[getRandomInt(numFreqRecords)];
  const info = new GogglesInfo();
  info.setPlatform(goggleRecord.type);
  info.setFreqInfo(freqRecord)
  return info;
}

