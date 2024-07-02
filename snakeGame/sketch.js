var s;
var side = 20;
var food;
var score = 0;


function setup() {
    createCanvas(windowWidth-100, windowHeight-50); // Adjust canvas size for different screens
    frameRate(10);
    s = new Snake();
    pickLocation();
}

function pickLocation(){
    var cols = floor((windowWidth-100) / side);
    var rows = floor((windowHeight-50) / side);
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

function windowResized() {
    resizeCanvas(windowWidth - 100, windowHeight - 50);
    pickLocation(); // Adjust food location after resizing
}

// Keyboard input
function keyPressed(){
    if( keyCode === UP_ARROW ){
        s.dir(0, -1);
    } else if( keyCode === DOWN_ARROW ){
        s.dir(0, 1);
    } else if( keyCode === RIGHT_ARROW ){
        s.dir(1, 0);
    } else if( keyCode === LEFT_ARROW ){
        s.dir(-1, 0);
    }
}

let ptouchX, ptouchY; // Previous touch position variables

function touchMoved() {
    if (touches.length > 0) {
        let touchX = touches[0].x;
        let touchY = touches[0].y;

        if (typeof ptouchX !== 'undefined' && typeof ptouchY !== 'undefined') {
            let deltaX = touchX - ptouchX;
            let deltaY = touchY - ptouchY;

            // Adjust snake direction based on touch movement
            if (deltaX > 0) {
                s.dir(1, 0); // Right
            } else if (deltaX < 0) {
                s.dir(-1, 0); // Left
            } else if (deltaY < 0) {
                s.dir(0, -1); // Up
            } else if (deltaY > 0) {
                s.dir(0, 1); // Down
            }
        }

        // Update previous touch position for next iteration
        ptouchX = touchX;
        ptouchY = touchY;

        // Prevent default touch behavior
        return false;
    }
}
