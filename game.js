// Array for storing colors
var buttonColours=["red", "blue", "green", "yellow"];

// gamepattern 
var gamePattern=[];

// how user has clicked
var userClickedPattern=[];

// level
var level=0;

// when a color is clicked 
function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// animation for the press
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}


// for generating new random color for new level
function nextSequence(){
    level++;
    $("h1").text("Level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
   
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// Checking the user input
$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    if(gamePattern[(userClickedPattern.length)-1]===userChosenColour)
        {
            playSound(userChosenColour);
            animatePress(userChosenColour);
            if(gamePattern.length===userClickedPattern.length)
                {
                    userClickedPattern=[];

                    setTimeout(function(){nextSequence();},1000);
                }
        }
    else
    {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over");},100);
    
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        level=0;
        gamePattern=[];
        userClickedPattern=[];
    }    

});


// To give a start
$(document).keydown(function(){
    if(gamePattern.length===0)
        {
            nextSequence();
        } 
})



