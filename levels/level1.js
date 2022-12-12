let bg = [];

function generateBackground(x) {
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


const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png')
    ],
    bg
);