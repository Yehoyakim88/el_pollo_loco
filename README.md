# el_pollo_loco



Obsoleter Code
--------------


world.class.js
-.-.-.-.-.-.-.

// OBSOLETE

// // backgroundObjects = [
    //     new BackgroundObject('img/5_background/layers/air.png', 0, canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, canvas_height),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, canvas_height),
        
    //     new BackgroundObject('img/5_background/layers/air.png', 1*canvas_width-1, canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 1*canvas_width-1, canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 1*canvas_width-1, canvas_height),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 1*canvas_width-1, canvas_height),

    //     new BackgroundObject('img/5_background/layers/air.png', 2*canvas_width-2, canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2*canvas_width-2, canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2*canvas_width-2, canvas_height),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2*canvas_width-2, canvas_height),

    //     new BackgroundObject('img/5_background/layers/air.png', 3*canvas_width-3, canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3*canvas_width-3, canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3*canvas_width-3, canvas_height),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3*canvas_width-3, canvas_height),

    //     new BackgroundObject('img/5_background/layers/air.png', 4*canvas_width-4, canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 4*canvas_width-4, canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 4*canvas_width-4, canvas_height),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 4*canvas_width-4, canvas_height),

    //     new BackgroundObject('img/5_background/layers/air.png', 5*canvas_width-5, canvas_height),
    //     new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 5*canvas_width-5, canvas_height),
    //     new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 5*canvas_width-5, canvas_height),
    //     new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 5*canvas_width-5, canvas_height),
    // ];

    // generateBackground() {
    //     for(let i = 0; i < 20; i++) {
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 2*i*(canvas_width-1), canvas_height));
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2*i*(canvas_width-1), canvas_height));
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2*i*(canvas_width-1), canvas_height));
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2*i*(canvas_width-1), canvas_height));

    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
    //         this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', canvas_width-1 + 2*i*(canvas_width-1), canvas_height));
    //     }
    // }


    movable-object.class.js
    // isColliding (obj) {
    //     return   this.x+25 + this.width-65 > obj.x && 
    //              this.y+115 + this.height - 128 > obj.y &&
    //              this.x < obj.x && 
    //              this.y < obj.y + obj.height;
    //  }


//     isColliding (obj) {
//       return   this.x + this.width - this.offset.right > obj.x + obj.offset.left && 
//                this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
//                this.x + this.offset.left < obj.x + obj.width -obj.offset.right && 
//                this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
//    }