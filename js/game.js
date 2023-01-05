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
    // canvas.setAttribute("height", "600px");
    // canvas.setAttribute("width", "600px");
    canvas_height = canvas.offsetHeight;
    canvas_width = canvas.offsetWidth;
    world = new World(canvas, keyboard);

    // console.log('My character is', world.character);
    console.log('Canvas has a height ( canvas_height ) of ' + canvas_height + ' pixels.');
    console.log('Canvas has a height ( canvas.height ) of ' + canvas.height + ' pixels.');
}


window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);

    if(e.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 87) {
        keyboard.UP = true;
    }

    if(e.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 83) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    // console.log(e);
});

window.addEventListener("keyup", (e) => {

    if(e.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 87) {
        keyboard.UP = false;
    }

    if(e.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 83) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
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