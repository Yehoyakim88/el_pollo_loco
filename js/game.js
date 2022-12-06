let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My character is', world.character);
    world.draw();
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        console.log('up arrow');
    }
    else if (e.keyCode == '40') {
        console.log('down arrow');
    }
    else if (e.keyCode == '37') {
        console.log('left arrow');
        world.character.x -= 10;
    }
    else if (e.keyCode == '39') {
        console.log('right arrow');
        world.character.x += 10;
    }

}