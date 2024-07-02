
function Snake(){
    this.x = 20;
    this.y = 20;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.maxtotal = 0;
    this.tail = [{x:0, y:0}];

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if(d < 15){
            this.total++;
            return true;
        }
        return false;
    }

    this.dir = function(x, y) {
        if( (this.tail[this.tail.length-1].x != this.x + (20*x) && this.tail[this.tail.length-1].x != this.y + (20*y)) || this.tail.length === 1 ){
            this.xspeed = x;
            this.yspeed = y;
        }
        // for(var i = 0; i < this.tail.length; i++){
        //     console.log(this.tail[i].x, this.tail[i].x);
        // }
        // console.log("hi");
        // console.log(x, y);
        // console.log("****************************************");
        
    }

    this.death = function() {
        for(var i = 0; i < this.tail.length; i++){
            var r = this.tail[i];
            var d = dist(this.x, this.y, r.x, r.y);
            if( d < 5 ){
                var pname = document.getElementById("player").textContent;
                // console.log(name + " hih");
                document.getElementById('player_name').textContent = pname;
                document.getElementById('player_score').textContent = this.total;
                this.maxtotal = max(this.maxtotal, this.total);
                
                const button = document.getElementById('AddButton');
                button.style.width = '200px';
                button.style.height = '50px';
                button.innerText = 'Add me to board';
                
                this.total = 0;
                this.tail = [];
            }
        }
        return false;
    }

    this.update = function() {

        for(var i = 0; i < this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed*side;
        this.y = this.y + this.yspeed*side;
        if( this.x  >= windowWidth-100  ){
            this.x = 0;
        }else if( this.x <= -20){
            this.x = windowWidth-100 - 20;
        }
        if( this.y >= windowHeight-50 ){
            this.y = 0;
        }else if( this.y <= -20 ){
            this.y = windowHeight-50 - 20;
        }
        document.getElementById("total").innerText = this.total;
        var x = parseInt(document.getElementById("maximum").innerText);
        document.getElementById("maximum").innerText = max(x, this.total); 
        
    }

    this.show = function() {
        fill(255);
        for(var i = 0; i < this.total; i++){
            rect(this.tail[i].x, this.tail[i].y, side, side);
        }
        rect(this.x, this.y, side, side);
    }

    
}