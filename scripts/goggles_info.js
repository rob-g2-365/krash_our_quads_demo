export class GogglesInfo {
  #platformType = null;
  #label = null;
  #channel =null;
  #aChannel = null;
  #freq = null;

  setPlatform(platformType) {
    this.platformType = platformType;
  }

  getPlatform(){
    return this.platformType;
  }

  isInitialized() {
    return ((this.#platformType!==null) && (this.#freq !== null));
  }

  test() {
    return ((this.#label || this.#channel || this.#aChannel | this.#freq));
  }

  setFreqInfo(freqRecord) {
    console.log(freqRecord);
    this.#label = freqRecord.label;
    this.#channel = freqRecord.channel;
    this.#aChannel = freqRecord.achannel;
    this.#freq = freqRecord.freq;
  }
}
