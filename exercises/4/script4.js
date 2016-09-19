$(document).ready(main);


function main(){

    $("#status").append("ready to go!");

    var canvas = $("#canvas");
    var dx = randBetween(-3.5, 3.5);
    var dy = randBetween(-3.5, 3.5);

    //Canvas fix for mobile:
    
    if($(window).width()<720){
        canvas.attr('width', '300');
        canvas.attr('height', '168.75');
        dx = randBetween(-3, 3);
        dy = randBetween(-3, 3);
        $("#status").append("<br>we're on mobile");
    }


    var ctx;
    var WIDTH = canvas.width();
    var HEIGHT = canvas.height();
    var x = WIDTH/2;
    var y = HEIGHT/2;

    var circles = [];

    var mute = true;


    $("#mute").click(function(){
        if(mute){
            mute = false;
            $("#mute").text('MUTE');
        } else {
            mute = true;
            $("#mute").text('UNMUTE');
        }

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


        for(i = 0; i < 5; i++){
            c = makeCircle();
            circles.push(c);
        }


        return setInterval(draw, 10)
    }

    function makeCircle(){

        c = new Circle(randBetween(0, WIDTH), randBetween(0, HEIGHT), randBetween(15, 25), randBetween(-3, 3), randBetween(-3, 3));
        return c;
    }

    function draw(){

        clear();

        for(i = 0; i < circles.length; i++){
            drawCircle(circles[i]);
        }


/*        if ((x + dx) > (WIDTH - 10) || (x + dx) < 10){
            dx = -dx * randBetween(0.6, 1.4);
            dy = dy * randBetween(0.6, 1.4);
            bouncePing();
        }

        if((y + dy) > (HEIGHT-10) || (y + dy) < 10){
            dy = -dy * randBetween(0.6, 1.4);
            dx = dx * randBetween(0.6, 1.4);
            bouncePing();
        }*/

        x += dx;
        y += dy;
    }

    function drawCircle(circle){
        ctx.fillStyle = "rgba(100, 157, 181, 0.7)";
        ctx.stokeStyle = "rgba(30, 75, 94, 1)";
        ctx.beginPath();
        ctx.arc(circle.xPos, circle.yPos, circle.radius, 0, Math.PI*2, true);         // start at 0, end at Math.PI*2
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        if ((circle.xPos + dx) > (WIDTH - circle.radius) || (circle.xPos + circle.dx) <= circle.radius){
            circle.dx = -circle.dx * randBetween(0.6, 1.4);
            circle.dy *= randBetween(0.6, 1.4);
            bouncePing();
        }

        if((circle.yPos + dy) > (HEIGHT-circle.radius) || (circle.yPos + circle.dy) <= circle.radius){
            circle.dy = -circle.dy * randBetween(0.6, 1.4);
            circle.dx *= randBetween(0.6, 1.4);
            bouncePing();
        }



        circle.xPos += circle.dx;
        circle.yPos += circle.dy;
    }


    function bouncePing(){

        canvas.css("border", "3px solid #649DB5");
        
        setTimeout(function(){
            canvas.css("border", "3px solid #0A222D");
        }, 200);

        if(!mute){
            ping = (Math.floor(Math.random()*4))+1;
            new Audio("../assets/pings/ping" + ping + ".mp3").play(); 
        }  
    }


    function Circle(x, y, radius, dx, dy){
        this.xPos = x;
        this.yPos = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
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

// END LIBRARY CODE

    function randBetween(min, max){
        return Math.random() * (max - min) + min;
    }

}