var run = true;


$(document).ready(main);


function main(){

    var menu = false;

    console.log("ready");

    $("#toggle").click(function(){

        if(menu){
            menu = false;
            console.log("close menu"); 
            $("#menu").hide();
            $("#landing").css("opacity", "1");
            $("#landing").removeClass("blur");
        } else {
            menu = true;
            console.log("open menu"); 
            $("#menu").show();
            $("#landing").css("opacity", "1");
            $("#landing").addClass("blur");
        }


        

    });

    var containerPadding = $("#content_container").css("padding");

    if ($(window).width() < 960) {
            console.log("we got small!");
            $('.photo').hide();
        }

    $(".menu-section").hover(function(){
        $(this).css("background", "rgba(0, 0, 0, 0.8)");
        $(this).css("color", "#808FFF");
    }, function(){
        $(this).css("background", "rgba(0, 0, 0, 0.6)");
        $(this).css("color", "white");
    });

};
