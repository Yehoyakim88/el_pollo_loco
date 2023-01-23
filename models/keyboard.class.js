class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  HELP = false;

  DEBUG = false;

  constructor() {
    this.bindKeyboardPressEvents();
    this.bindButtonsPressEvents();
  }

  bindButtonsPressEvents() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      console.log("Du willst nach links");
      this.LEFT = true;
    });
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document.getElementById("btnUp").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.UP = true;
    });
    document.getElementById("btnUp").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.UP = false;
    });

    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });

    document.getElementById("btnSpace").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    document.getElementById("btnSpace").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
  }

  bindKeyboardPressEvents() {
    window.addEventListener("keydown", (e) => {
      if(this.DEBUG) {console.log(e.keyCode);}

      if (e.keyCode == 72) {
        this.HELP = true;
      }

      if (e.keyCode == 65) {
        this.LEFT = true;
      }

      if (e.keyCode == 87) {
        this.UP = true;
      }

      if (e.keyCode == 68) {
        this.RIGHT = true;
      }

      if (e.keyCode == 83) {
        this.DOWN = true;
      }

      if (e.keyCode == 32) {
        this.SPACE = true;
      }

      // console.log(e);
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 72) {
        this.HELP = false;
      }

      if (e.keyCode == 65) {
        this.LEFT = false;
      }

      if (e.keyCode == 87) {
        this.UP = false;
      }

      if (e.keyCode == 68) {
        this.RIGHT = false;
      }

      if (e.keyCode == 83) {
        this.DOWN = false;
      }

      if (e.keyCode == 32) {
        this.SPACE = false;
      }

      // console.log(e);
    });
  }
}
