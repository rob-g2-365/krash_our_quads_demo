const GOGGLES_STORAGE_ITEM = "goggles-info";

export class GogglesInfo {
  #platform = null;
  #label = null;
  #channel =null;
  #aChannel = null;
  #freq = null;


  setPlatform(platform) {
    this.#platform = platform;
  }

  getPlatform(){
    return this.#platform;
  }

  getLabel() {
    return this.#label;
  }

  getChannel(){
    return this.#channel;
  }

  getAChannel() {
    return this.#aChannel;
  }

  isInitialized() {
    return ((this.#platform!==null) && (this.#freq !== null));
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
      platformType: this.#platform,
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
};
