let gamingWindow;
let startScreen;
let endScreen;
let youLostScreen;
let touchControls;
let musicToggleButton;
let canvas;
let canvas_height;
let canvas_width;
let world;
let keyboard;
let music = false;
let backgroundMusic = new Audio('./audio/cumbia-mexican-banda-2716.mp3');
backgroundMusicPlaying = false;
backgroundMusic.volume = 0.75;
DEBUG = false;


function setup_canvas() {
    gamingWindow = document.getElementById('game-window');
    gamingWindow.classList.remove('d-none');
    canvas = document.getElementById('game-canvas');
    canvas.removeAttribute('hidden');
    canvas_height = canvas.offsetHeight;
    canvas_width = canvas.offsetWidth;
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, backgroundMusic);
    checkScreen();
}

function init() {
    startScreen = document.getElementById('startscreen-container');
    gamingWindow = document.getElementById('game-window');
    startScreen.classList.add('d-none');
    touchControls = document.getElementById('touch-controls');
    musicToggleButton = document.getElementById('music-on-off');
    setup_canvas();
}


function restartAfterWon() {
    endScreen = document.getElementById('endscreen-container');
    endScreen.classList.add('d-none');
    setup_canvas();
    touchControls.classList.remove('d-none');
    musicToggleButton.classList.remove('d-none');
}


function restartAfterLost() {
    youLostScreen = document.getElementById('youLost-container');
    youLostScreen.classList.add('d-none');
    touchControls.classList.remove('d-none');
    musicToggleButton.classList.remove('d-none');
    setup_canvas();
}


function hoverStartButton(x) {
    x.src = 'img/playGameHovered.png';
}


function dishoverStartButton(x) {
    x.src = 'img/playGame_image.png';
}


function hoverRestartButton(x) {
    x.src = 'img/restart_hovered.png';
}


function dishoverRestartButton(x) {
    x.src = 'img/restart.png';
}


function clearAllIntervals() {
    for (let i = 1; i < 200; i++) {
        window.clearInterval(i);
    }
  };


function checkScreen() {
    setInterval(() => {
      if (window.innerHeight < window.innerWidth) {
        document.getElementById('turnPhone').classList.add('d-none');
      } else {
        document.getElementById('turnPhone').classList.remove('d-none');
      }
    }, 10)
}