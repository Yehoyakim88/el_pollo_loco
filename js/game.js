let canvas_height;
let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    canvas_height = canvas.offsetHeight;
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
    console.log('Canvas has a height of', canvas_height);
    // world.draw();
}


window.addEventListener("keydown", (e) => {

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

    console.log(e);
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

    console.log(e);
});

// document.onkeydown = checkKey;

// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '38') {
//         console.log('up arrow');
//     }
//     else if (e.keyCode == '40') {
//         console.log('down arrow');
//     }
//     else if (e.keyCode == '37') {
//         console.log('left arrow');
//         world.character.x -= 10;
//     }
//     else if (e.keyCode == '39') {
//         console.log('right arrow');
//         world.character.x += 10;
//     }
// }

