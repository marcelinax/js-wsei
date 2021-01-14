class RecordChannel {
  recordArray;
  startTime;

  constructor() {
    this.recordArray = [];
    this.startTime = null;
  }

  startRecording() {
    this.startTime = Date.now();
  }

  stopRecording() {
    this.startTime = null;
  }

  recordSound(sound) {
    const time = Date.now() - this.startTime;
    this.recordArray.push({
      sound,
      time,
    });
  }

  playSounds() {
    this.recordArray.forEach((sound) => {
      setTimeout(() => {
        const a = new Audio(sound.sound);
        a.play();
      }, sound.time);
    });
  }

  deleteRecording() {
    this.recordArray = [];
  }
}

class Drumkit {
  channels = [
    new RecordChannel(),
    new RecordChannel(),
    new RecordChannel(),
    new RecordChannel(),
  ];

  activceChannel = 0;

  recording = false;

  sounds = [
    {
      soundSrc: `./sounds/clap.wav`,
      soundName: `clap`,
      key: "a",
    },
    {
      soundSrc: `./sounds/hihat.wav`,
      soundName: `hihat`,
      key: "s",
    },
    {
      soundSrc: `./sounds/crash.wav`,
      soundName: `crash`,
      key: "d",
    },
    {
      soundSrc: `./sounds/kick.wav`,
      soundName: `kick`,
      key: "z",
    },
    {
      soundSrc: `./sounds/openhat.wav`,
      soundName: `openhat`,
      key: "x",
    },
    {
      soundSrc: `./sounds/snare.wav`,
      soundName: `snare`,
      key: "c",
    },
  ];

  constructor() {
    this.initKeys();
    this.initChannelSelect();
    this.initRecordingButtons();
    this.initChannelButtons();
    this.initPlayAllButton();
    this.initDeleteAllButton();
  }

  initKeys() {
    document.addEventListener("keydown", (e) => this.handleKeyDown(e.key));
  }

  initChannelSelect() {
    document.getElementById("channels").addEventListener("change", (e) => {
      this.activceChannel = parseInt(e.target.value);
    });
  }

  initRecordingButtons() {
    document.getElementById("recordBtn").addEventListener("click", (e) => {
      if (!this.recording) {
        this.channels[this.activceChannel].startRecording();
        document.getElementById("channels").disabled = true;
        e.target.innerText = "Stop recording";
      } else {
        this.channels[this.activceChannel].stopRecording();
        document.getElementById("channels").disabled = false;
        e.target.innerText = "Start recording";
      }
      this.recording = !this.recording;
    });
  }

  initPlayAllButton() {
    document.getElementById("playBtn").addEventListener("click", (e) => {
      this.channels.forEach((c) => c.playSounds());
    });
  }

  initDeleteAllButton() {
    document.getElementById("deleteBtn").addEventListener("click", (e) => {
      this.channels.forEach((c) => c.deleteRecording());
    });
  }

  initChannelButtons() {
    document
      .getElementById("channel1")
      .querySelector(".play")
      .addEventListener("click", () => this.channels[0].playSounds());
    document
      .getElementById("channel2")
      .querySelector(".play")
      .addEventListener("click", () => this.channels[1].playSounds());
    document
      .getElementById("channel3")
      .querySelector(".play")
      .addEventListener("click", () => this.channels[2].playSounds());
    document
      .getElementById("channel4")
      .querySelector(".play")
      .addEventListener("click", () => this.channels[3].playSounds());
    document
      .getElementById("channel1")
      .querySelector(".delete")
      .addEventListener("click", () => this.channels[0].deleteRecording());
    document
      .getElementById("channel2")
      .querySelector(".delete")
      .addEventListener("click", () => this.channels[1].deleteRecording());
    document
      .getElementById("channel3")
      .querySelector(".delete")
      .addEventListener("click", () => this.channels[2].deleteRecording());
    document
      .getElementById("channel4")
      .querySelector(".delete")
      .addEventListener("click", () => this.channels[3].deleteRecording());
  }

  handleKeyDown(keyCode) {
    this.sounds.forEach((sound, index) => {
      if (keyCode == sound.key) this.playSound(index);
    });
  }

  playSound(soundIndex) {
    const a = new Audio(this.sounds[soundIndex].soundSrc);

    document
      .querySelectorAll(".drum_parts")
      [soundIndex].classList.add("active");
    setTimeout(() => {
      document
        .querySelectorAll(".drum_parts")
        [soundIndex].classList.remove("active");
    }, 300);
    a.play();
    this.channels[this.activceChannel].recordSound(
      this.sounds[soundIndex].soundSrc
    );
  }

  setActiveChannel(channelIndex) {
    this.activceChannel = channelIndex;
  }
}

const dk = new Drumkit();
