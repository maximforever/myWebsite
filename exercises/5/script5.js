$(document).ready(main);


function main(){

    $("#status").append("ready to go!");

    var canvas = $("#canvas");
    var SPEED = 3;
    var dx = randBetween(-SPEED, SPEED);
    var dy = randBetween(-SPEED, SPEED);
    var ctx;
    var MINRAD = 5;
    var MAXRAD = 5;
    var NUM_CIRCLES = 50;
    var x = WIDTH/2;
    var y = HEIGHT/2;
    var WIDTH = canvas.width();
    var HEIGHT = canvas.height();
    var circles = [];
    var mute = true;

    MAP_HEIGHT = 800;
    MAP_WIDTH = 1400;


    var left_offset = 0;
    var top_offset = 0; 
    
    if (canvas[0].getContext){
        var ctx = canvas[0].getContext('2d');
        $("#status").append("<br>width: " + canvas.width());
        $("#status").append("<br>height: " + canvas.height());

        init();

    } else {
      // canvas-unsupported code here ctx.clearRect(0,0,300,300);
      $("#status").append("<br>canvas is broken :( ");
    }

    function init(){



        ctx = $("#canvas")[0].getContext("2d");

        var placed;

        // This is the bit that makes cicles:

        for(i = 0; i < NUM_CIRCLES; i++){
            
            do {
                var c = makeCircle();  
                placed = true;          

                // let's make sure this circle doesn't overlap with any other circle

                for(i = 0; i < circles.length; i++){

                    var d = getDistance(circles[i], c);
                    if(d < (circles[i].radius + c.radius + 10)){
                    
                        placed = false;
                    }
                    
                }
            }while(!placed)

            circles.push(c);

            $("#count").text("Count: " + circles.length);
        }   

    /*       
        
        a = new Circle(100, 100, 10, randBetween(-SPEED, SPEED), randBetween(-SPEED, SPEED));
        b = new Circle(200, 100, 10, randBetween(-SPEED, SPEED), randBetween(-SPEED, SPEED));
        c = new Circle(300, 100, 10, randBetween(-SPEED, SPEED), randBetween(-SPEED, SPEED));
        d = new Circle(1000, 600, 10, randBetween(-SPEED, SPEED), randBetween(-SPEED, SPEED));
        circles.push(a, b, c, d);

    */
        $("#count").text("Count: " + circles.length);
    


        return setInterval(draw, 10)
    }

    function makeCircle(){
        
        
        c = new Circle(randBetween(MAXRAD, MAP_WIDTH-MAXRAD), randBetween(MAXRAD, MAP_HEIGHT-MAXRAD), randBetween(MINRAD, MAXRAD), randBetween(-SPEED, SPEED), randBetween(-SPEED, SPEED));
        return c;
    }

    function draw(){


        clear();

        $("#x-pos").text(left_offset);
        $("#y-pos").text(top_offset);

        for(i = 0; i < circles.length; i++){
            drawCircle(circles[i]);
        }

        
    
    }

    function drawCircle(circle){
        ctx.fillStyle = "rgba(249, 250, 238, 0.7)";
        ctx.stokeStyle = "rgba(178, 181, 148, 1)";
        ctx.beginPath();
        ctx.arc(circle.xPos - left_offset, circle.yPos - top_offset, circle.radius, 0, Math.PI*2, true);         // start at 0, end at Math.PI*2
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();

        if ((circle.xPos + dx) > (WIDTH - circle.radius) || (circle.xPos + circle.dx) <= circle.radius){
            circle.dx = -circle.dx;
            circle.dy *= randBetween(0.5, 1.5);
        }

        if((circle.yPos + dy) > (HEIGHT-circle.radius) || (circle.yPos + circle.dy) <= circle.radius){
            circle.dy = -circle.dy;
            circle.dx *= randBetween(0.5, 1.5);
        }


/*
        circle.xPos += circle.dx;
        circle.yPos += circle.dy;*/
    }

    function Circle(x, y, radius, dx, dy){
        this.xPos = x;
        this.yPos = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    function getDistance(a, b){

        d = Math.sqrt(Math.pow((b.xPos - a.xPos), 2) + Math.pow((b.yPos - a.yPos),2));   
        return d;
    }


// LIBRARY CODE

    function circle(x,y,r) {
        ctx.fillStyle = "rgba(100, 157, 181, 0.7)";
        ctx.stokeStyle = "rgba(30, 75, 94, 1)";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, true);         // start at 0, end at Math.PI*2
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
     
    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    // listen to keyboard events:

        $(window).keydown(function(e){

            if(e.which == 37){
                console.log("left");
                if(left_offset > 0){
                    $("#x-pos").css("color", "black");
                    left_offset -= 5;
                } else {
                    console.log("nowehere to go, left_offset is " + left_offset);
                    $("#x-pos").css("color", "red");
                }   
            }

            if(e.which == 38){
                console.log("up");
                if(top_offset > 0){
                    $("#y-pos").css("color", "black");
                    top_offset -= 5;
                } else {
                    console.log("nowehere to go, top_offset is " + left_offset);
                    $("#y-pos").css("color", "red");
                } 
                
            }

            if(e.which == 39){
                console.log("right");
                if(left_offset < (MAP_WIDTH-WIDTH)){
                    $("#x-pos").css("color", "black");
                    left_offset += 5;
                } else {
                    console.log("nowehere to go, left_offset is " + left_offset);
                    $("#x-pos").css("color", "red");
                } 
            }

            if(e.which == 40){
                console.log("down");
                if(top_offset < (MAP_HEIGHT-HEIGHT)){
                    $("#y-pos").css("color", "black");
                    top_offset += 5;
                } else {
                    console.log("nowehere to go, top_offset is " + left_offset);
                    $("#y-pos").css("color", "red");
                } 
            }
       
        });

// END LIBRARY CODE

    function randBetween(min, max){
        return Math.random() * (max - min) + min;
    }

}