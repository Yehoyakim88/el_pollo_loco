let bg = [];
let levelCoins = [];
let level1;

function generateBackground() {
    for(let i = 0; i < 20; i++) {
        bg.push(new BackgroundObject('img/5_background/layers/air.png', 2*i*(canvas_width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2*i*(canvas_width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2*i*(canvas_width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2*i*(canvas_width-1), canvas_height));

        bg.push(new BackgroundObject('img/5_background/layers/air.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
        bg.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
    }
    return bg;
}


function generateCoins(){
    for (let index = 0; index < 400; index++) {
        levelCoins.push(new Coin());
    }
    return levelCoins;
}


function initLevel() {
    generateBackground();
    generateCoins();
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new EndBoss()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png')
        ],
        bg,
        levelCoins
    );
    return level1;
    
}