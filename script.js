var run = true;


$(document).ready(main);


function main(){

    console.log("ready");

    $("#toggle").click(function(){
        console.log("open menu"); 
        $("#menu").show();
        $("#landing").css("opacity", "1");
        $("#landing").addClass("blur");
    //    $("#divider").show();

    });

    $("#close").click(function(){
        console.log("close menu"); 
        $("#menu").hide();
        $("#landing").css("opacity", "1");
        $("#landing").removeClass("blur");
    //    $("#divider").hide();

    });

    $(".menu-section").hover(function(){
        $(this).css("background", "rgba(0, 0, 0, 0.4)");
        $(this).css("color", "orange");
    }, function(){
        $(this).css("background", "rgba(0, 0, 0, 0.6)");
        $(this).css("color", "white");
    });

};
