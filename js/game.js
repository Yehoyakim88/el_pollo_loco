let canvas;
let canvas_height;
let canvas_width;
let world;
let keyboard = new Keyboard();
let music = false;
let backgroundMusic = new Audio('./audio/cumbia-mexican-banda-2716.mp3');
backgroundMusic.volume = 0.75;


function init() {
    canvas = document.getElementById('canvas');
    canvas_height = canvas.offsetHeight;
    canvas_width = canvas.offsetWidth;
    // initLevel();
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
    console.log('Canvas has a height of', canvas_height);

    // start game
    // initLevel();
}


window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }

    // console.log(e);
});

window.addEventListener("keyup", (e) => {

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }

    // console.log(e);
});


function toggleMusic(){
    console.log('toggleMusic() call!');
    if(!music) {
        document.getElementById('music-on-off').src= './img/musicon.png';

        backgroundMusic.play();
        music = true;
    }
    else if(music){
        document.getElementById('music-on-off').src= './img/musicoff.png';
        backgroundMusic.pause();
        music = false;
    }
    console.log('music ', music);
}