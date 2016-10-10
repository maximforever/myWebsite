$(document).ready(main);


function main(){

    $("#status").append("ready to go!");

    var canvas = $("#canvas");
    var SPEED = 3;
    var dx = randBetween(-SPEED, SPEED);
    var dy = randBetween(-SPEED, SPEED);
    var ctx;
    var RADIUS = 30;
    var NUM_CIRCLES = 20;

    var MAP_HEIGHT = 800;
    var MAP_WIDTH = 1400;

    //Canvas fix for mobile:
    
    if($(window).width()<720){
        canvas.attr('width', window.innerWidth);
        canvas.attr('height', window.innerHeight);
        NUM_CIRCLES = 1000;
        dx = randBetween(-SPEED/5, SPEED/5);
        dy = randBetween(-SPEED/5, SPEED/5);
        $("#status").append("<br>we're on mobile");
    }
    var WIDTH = canvas.width();
    var HEIGHT = canvas.height();    
    var x = WIDTH/2;
    var y = HEIGHT/2;
    var circles = [];
    var visibleCircles = [];

    var last_click = [0,0]

    var left_offset = 0;
    var top_offset = 0; 
    var colors = ["#FFEABC", "#D4C3FF", "#FF5050", "#50FFDD"];
    


    // EVENT LISTENERS:


    var keyState = {};    
    
    window.addEventListener('keydown',function(e){
        keyState[e.which] = true;
    },true);    
    window.addEventListener('keyup',function(e){
        keyState[e.which] = false;
    },true);


    // this gets the location of the click on the canvas:
    canvas.click(function(e) {
        var posX = e.pageX - $(this).offset().left
        var posY = e.pageY - $(this).offset().top;

        last_click = [posX, posY];

        $("#click-xpos").text(posX);
        $("#click-ypos").text(posY);
    });


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

/*        //reference circle:
        c = new Circle(WIDTH/2, HEIGHT/2, 1, 1, 1)
        circles.push(c);
*/

        $("#count").text("Count: " + circles.length);

        return setInterval(draw, 10)
    }

    function makeCircle(){
        
        
        c = new Circle(randBetween(RADIUS, MAP_WIDTH-RADIUS), randBetween(RADIUS, MAP_HEIGHT-RADIUS), RADIUS, randBetween(-SPEED, SPEED), randBetween(-SPEED, SPEED));
        return c;
    }

    function draw(){


        clear();
        visibleCircles = [];
        moveLoop();

        $("#x-pos").text(Math.round(left_offset,2));
        $("#y-pos").text(Math.round(top_offset,2));

        for(i = 0; i < circles.length; i++){

            // only draw circles actually visible on screen!
            if(!((circles[i].xPos + left_offset)<0 || (circles[i].xPos - circles[i].radius - left_offset)>WIDTH || (circles[i].yPos + circles[i].radius  - top_offset) < 0 || (circles[i].yPos - circles[i].radius - top_offset) > HEIGHT)){
                visibleCircles.push(circles[i]);                        // keep track of which circles are visible
                $("#visible").text(visibleCircles.length);
                drawCircle(circles[i]);                                 // actually draw the circle

            }
        }

        
    
    }

    function drawCircle(circle){


    /* LIGHT TWINKLE: */


        if(randBetween(0, 30) > 29.99){
            circle.color = colors[Math.floor(randBetween(0,3))];
        }


        //create a circle at last click and test for collision:
        if(!(last_click[0] == 0 && last_click[1] == 0)){
            d = Math.sqrt(Math.pow(((circle.xPos - left_offset) - last_click[0]), 2) + Math.pow(((circle.yPos - top_offset) - last_click[1]),2));

            if(d < circle.radius){

                // then we have a collision!
                    console.log("Ya clicked on a circle, you goof!");

                    for(var j = 0; j < circles.length; j++){
                        if(circles[j].active){
                            circles[j].active = false;
                            circles[j].color = colors[Math.floor(randBetween(0,3))];
                            circles[j].radius = RADIUS; 
                        }
                    }


                    last_click = [0,0]
                    circle.radius += 5;
                    circle.color = "green";
                    circle.active = true;


                    // THIS IS WHERE THE MAGIC HAPPENS!
                    // if we click on a circle, we re-center around that cicle.
                   
                    target_left_offset = (circle.xPos - WIDTH/2);
                    target_top_offset = (circle.yPos - HEIGHT/2);

                    animateMove(target_left_offset, target_top_offset);

            }
        }

        ctx.fillStyle = circle.color;
        
        // ctx.stokeStyle = "rgba(178, 181, 148, 1)";
        
        ctx.beginPath();
        ctx.arc(circle.xPos - left_offset, circle.yPos - top_offset, circle.radius, 0, Math.PI*2, true);         // start at 0, end at Math.PI*2
        ctx.closePath();
        ctx.fill();
        // ctx.stroke();

        if ((circle.xPos + dx) > (WIDTH - circle.radius) || (circle.xPos + circle.dx) <= circle.radius){
            circle.dx = -circle.dx;
            circle.dy *= randBetween(0.5, 1.5);
        }

        if((circle.yPos + dy) > (HEIGHT-circle.radius) || (circle.yPos + circle.dy) <= circle.radius){
            circle.dy = -circle.dy;
            circle.dx *= randBetween(0.5, 1.5);
        }
        
    }


    function animateMove(new_left_offset, new_top_offset){

        console.log("animating!");

        var animY = (new_top_offset - top_offset)/100;
        var animX = (new_left_offset - left_offset)/100;
        var counter = 0;


        var moveIt = setInterval(function(){



            top_offset += animY;
            left_offset += animX;

            counter++;

            if(counter >= 100){
                console.log("moved!");
                clearInterval(moveIt);
            }


        }, 10)
    }


    function Circle(x, y, radius, dx, dy){
        

        this.xPos = x;
        this.yPos = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colors[Math.floor(randBetween(0,3))];
        this.active = false;
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

    // listen to button events:
    // this is way smoother than mouse events - need to understand why!


    var timeout;

    $("#move-left").mousedown(function(){
        timeout = setInterval(function(){
            move("left");
        }, 10);
        return false;
    });

    $("#move-up").mousedown(function(){
        timeout = setInterval(function(){
            move("up");
        }, 10);
        return false;
    });

    $("#move-right").mousedown(function(){
        timeout = setInterval(function(){
            move("right");
        }, 10);
        return false;
    });

    $("#move-down").mousedown(function(){
        timeout = setInterval(function(){
            move("down");
        }, 10);
        return false;
    });

    $(document).mouseup(function(){
        clearInterval(timeout);
        return false;
    });

    // listen to keyboard events:

    function moveLoop() {
  
            if (keyState[37]){
                move("left"); 
            }
                
            if(keyState[38]){
                move("up"); 
            }

            if(keyState[39]){
                move("right");
            }

            if(keyState[40]){
                move("down"); 
            }
    }

    function move(dir){
        switch(dir) {
            case "left":

                if(left_offset > 0){
                    $("#x-pos").css("color", "black");
                    $("#canvas").css("border-right", "3px solid #201E28");
                    $("#canvas").css("border-left", "3px solid #201E28");
                    left_offset -= 2;
                } else {
                    console.log("nowehere to go, left_offset is " + left_offset);
                    $("#x-pos").css("color", "red");
                    $("#canvas").css("border-left", "3px solid #8971FF");

                } 
                break;


            case "up":
                if(top_offset > 0){
                    $("#y-pos").css("color", "black");
                    $("#canvas").css("border-top", "3px solid #201E28");
                    $("#canvas").css("border-bottom", "3px solid #201E28");
                    top_offset -= 2;
                } else {
                    console.log("nowehere to go, top_offset is " + left_offset);
                    $("#y-pos").css("color", "red");
                    $("#canvas").css("border-top", "3px solid #8971FF");

                } 

                break;


            case "right":
                if(left_offset < (MAP_WIDTH-WIDTH)){
                    $("#x-pos").css("color", "black");
                    $("#canvas").css("border-right", "3px solid #201E28");
                    $("#canvas").css("border-left", "3px solid #201E28");
                    left_offset += 2;
                } else {
                    console.log("nowehere to go, left_offset is " + left_offset);
                    $("#x-pos").css("color", "red");
                    $("#canvas").css("border-right", "3px solid #8971FF");
                } 

                break;


            case "down":
                if(top_offset < (MAP_HEIGHT-HEIGHT)){
                    $("#y-pos").css("color", "black");
                    $("#canvas").css("border-top", "3px solid #201E28");
                    $("#canvas").css("border-bottom", "3px solid #201E28");
                    top_offset += 2;
                } else {
                    console.log("nowehere to go, top_offset is " + left_offset);
                    $("#y-pos").css("color", "red");
                    $("#canvas").css("border-bottom", "3px solid #8971FF");

                } 
                break;

            default:
                console.log("something broke :( ");
        }
    }


// END LIBRARY CODE

    function randBetween(min, max){
        return Math.random() * (max - min) + min;
    }

}