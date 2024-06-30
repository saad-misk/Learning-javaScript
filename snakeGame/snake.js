
function Snake(){
    this.x = 20;
    this.y = 20;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if(d < 1){
            this.total++;
            return true;
        }
        return false;
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.death = function() {
        for(var i = 0; i < this.tail.length; i++){
            var r = this.tail[i];
            var d = dist(this.x, this.y, r.x, r.y);
            if( d < 1 ){
                this.total = 0;
                this.tail = [];
                var name = document.getElementById("player").value;
                console.log(name + " hih");
                document.getElementById('player_name').textContent = name;
                document.getElementById('player_score').textContent = this.total;
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
        if( this.x + 20 >= 600 || this.x <= 0 ){
            this.xspeed = -this.xspeed;
        }
        if( this.y + 20 >= 600 || this.y <= 0 ){
            this.yspeed = -this.yspeed;
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