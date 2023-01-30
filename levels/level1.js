let bg = [];
let levelCoins = [];
let level1;

function generateBackground() {
    for(let i = 0; i < 20; i++) {
        bg.push(new BackgroundObject('img/5_background/layers/air.png', 2*i*(canvas.width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2*i*(canvas.width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2*i*(canvas.width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2*i*(canvas.width-1), canvas_height));

        bg.push(new BackgroundObject('img/5_background/layers/air.png', canvas.width-1 + 2*i*(canvas.width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvas.width-1 + 2*i*(canvas.width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvas.width-1 + 2*i*(canvas.width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvas.width-1 + 2*i*(canvas.width-1), canvas_height));
    }
    return bg;
}


function generateCoins(){
    for (let index = 0; index < 100; index++) {
        levelCoins.push(new Coin());
    }
    return levelCoins;
}


function generateEnemies(EndbossPosition) {
    return [
        new EndBoss(4400),
        new Chicken(400),
        new Chicken(600),
        new Chicken(800),
        new Chicken(1000),
        new Chicken(1400),
        new Chicken(2000)
    ];
}


function generateClouds() {
    return [
        new Cloud(1),
        new Cloud(2),
        new Cloud(1),
        new Cloud(2),
        new Cloud(1),
        new Cloud(2)
    ];
}


function placeBottles() {
    return [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ];
}


function initLevel() {
    generateBackground();
    generateCoins();
    let EndbossPosition;
    tmp = new Level();
    EndbossPosition = tmp.level_end_x - 600;

    level1 = new Level(
        generateEnemies(EndbossPosition),
        generateClouds(),
        bg,
        levelCoins,
        placeBottles()        
    );
    return level1;
}