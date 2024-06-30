


var s;
var side = 20;
var food;
var score = 0;

function setup() {

    
    createCanvas(600, 600);
    frameRate(10);
    s = new Snake();
    pickLocation();

    
}

function pickLocation(){
    var cols = floor(width / side);
    var rows = floor(height / side);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(side);
}

function draw(){
    background(51);
    s.death();
    s.update();
    s.show();
    score = s.total;
    if( s.eat(food) ){
        pickLocation();
    }
    fill(255, 0, 100);
    rect(food.x, food.y, side, side);
}



function keyPressed(){

    if( keyCode === UP_ARROW ){
        s.dir(0, -1);
    }else if( keyCode === DOWN_ARROW ){
        s.dir(0, 1);
    }else if( keyCode === RIGHT_ARROW ){
        s.dir(1, 0);
    }else if( keyCode === LEFT_ARROW ){
        s.dir(-1, 0);
    }

}

