let gamingWindow;
let startScreen;
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


function init() {
    
    startScreen = document.getElementById('startscreen-container');
    gamingWindow = document.getElementById('game-window');
    startScreen.classList.add('d-none');
    gamingWindow.classList.remove('d-none');
    canvas = document.getElementById('canvas');
    // canvas.setAttribute("height", "600px");
    // canvas.setAttribute("width", "600px");
    canvas_height = canvas.offsetHeight;
    canvas_width = canvas.offsetWidth;
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, backgroundMusic);

    // console.log('My character is', world.character);
    let window_width = window.innerWidth;
    let window_height = window.innerHeight;
    if(DEBUG) {
        console.log('Browser height: ', window_height);
        console.log('Browser width: ', window_width);
        console.log('Canvas has a height ( canvas_height ) of ' + canvas_height + ' pixels.');
        console.log('Canvas has a height ( canvas.height ) of ' + canvas.height + ' pixels.');
    } 
}


function hoverStartButton(x) {
    x.src = 'img/playGameHovered.png';
}

function dishoverStartButton(x) {
    x.src = 'img/playGame_image.png';
}


// window.addEventListener("keydown", (e) => {
//     // console.log(e.keyCode);

//     if(e.keyCode == 65) {
//         keyboard.LEFT = true;
//     }

//     if(e.keyCode == 87) {
//         keyboard.UP = true;
//     }

//     if(e.keyCode == 68) {
//         keyboard.RIGHT = true;
//     }

//     if(e.keyCode == 83) {
//         keyboard.DOWN = true;
//     }

//     if(e.keyCode == 32) {
//         keyboard.SPACE = true;
//     }

//     // console.log(e);
// });

// window.addEventListener("keyup", (e) => {

//     if(e.keyCode == 65) {
//         keyboard.LEFT = false;
//     }

//     if(e.keyCode == 87) {
//         keyboard.UP = false;
//     }

//     if(e.keyCode == 68) {
//         keyboard.RIGHT = false;
//     }

//     if(e.keyCode == 83) {
//         keyboard.DOWN = false;
//     }

//     if(e.keyCode == 32) {
//         keyboard.SPACE = false;
//     }

//     // console.log(e);
// });


// function toggleMusic(){
//     console.log('toggleMusic() call!');
//     if(!music) {
//         document.getElementById('music-on-off').src= './img/musicon.png';

//         backgroundMusic.play();
//         music = true;
//     }
//     else if(music){
//         document.getElementById('music-on-off').src= './img/musicoff.png';
//         backgroundMusic.pause();
//         music = false;
//     }
//     console.log('music ', music);
// }


// function bindButtonEvents() {
//     document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.LEFT = true;
//     });
//     document.getElementById('btnLeft').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.LEFT = false;
//     });

//     document.getElementById('btnUp').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.UP = true;
//     });
//     document.getElementById('btnUp').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.UP = false;
//     });

//     document.getElementById('btnRight').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.RIGHT = true;
//     });
//     document.getElementById('btnRight').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.RIGHT = false;
//     });

//     document.getElementById('btnSpace').addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         keyboard.SPACE = true;
//     });
//     document.getElementById('btnSpace').addEventListener('touchend', (e) => {
//         e.preventDefault();
//         keyboard.SPACE = false;
//     });
// }