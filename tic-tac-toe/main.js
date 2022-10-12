// const Otext = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle fill="none" cx="50" cy="50" stroke-width="6" r="45"/></svg>`;

// const Xtext =  ` <svg id="x" viewBox="0 0 130.2 130.2" xmlns="http://www.w3.org/2000/svg">
// <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" x1="34.4" y1="38" x2="95.8" y2="92.3"/>
// <line class="path line second" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" x1="95.8" y1="38" x2="34.4" y2="92.3"/>
// </svg>`

let gameOver= false; 
let numPlays=0;
let currentPlayer= "X";  // by default
let currentPlays = {
    "X":[],
    "O" :[]
}



const winPos=[
    ["a" , "b" , "c"],
    ["d" , "e" , "f"],
    ["g" , "h" , "i"],
    ["a" , "d" , "g"],
    ["b" , "e" , "h"],
    ["c" , "f" , "i"],
    ["a" , "e" , "i"],
    ["c" , "e" , "g"]
    ]

    
$(document).ready (function(){
    $('.cell').click(function(){
    
        if ( gameOver || $(this).text()!=""){
            return; 
        }
        numPlays++

        $(this).text(currentPlayer); 
        currentPlays[currentPlayer].push($(this).attr('id'));

        const player1Score = $('#p-1-wins').html();
        const player2Score = $('#p-2-wins').html();
        if (isWinner() && currentPlayer === 'X'){
            $(".winner").text("Winner: " + isWinner())
            $('#p-1-wins').html(Number(player1Score) + 1);
            gameOver = true;
        }
        if (isWinner() && currentPlayer === 'O'){
            $(".winner").text("Winner: " + isWinner())
            $('#p-2-wins').html(Number(player2Score) + 1);
            gameOver = true;
        }
        if (isDraw()){
            //alert('Draw!')
            $(".winner").text("DRAW!! Play Again")
        }
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X' ;  //each time player click we need to change the player ( if 1st player x else o or x) 
       // turn 
        $(".turn").text(currentPlayer + "'s Turn")

    })
        
 

});


function isWinner(){
// if(numPlays<5)
// return;

for( let i=0 ; i< winPos.length;i++){
    let isWinner = true ; 
    for ( let j =0 ; j< winPos[i].length; j++){
        // inArray returns the index of the element in the array, not a boolean indicating if the item exists in the array
        if ($.inArray(winPos[i][j],currentPlays[currentPlayer] ) < 0){
            isWinner = false;
            break;

        }


    }
    if( isWinner)
    return currentPlayer;
    //if (currentPlays[currentPlayer].sort().toString() === winPos[i].toString()){
 //return currentPlayer ; 
}
return false;
}



function isDraw(){
    
    // if the number of plays is 9 and no winner 

        if (numPlays === 9 && isWinner() === false){
            return true;

        }
        return false ;
}

$('.reset').click(function(){
  
numPlays=0;
gameOver=false;
currentPlayer= "X"; 
 currentPlays = {
    "X":[],
    "O" :[]
}
    $(".winner").text("")
    $(".turn").text("X's Turn")
    $('.cell').html("");
    $('#p-2-wins').html("0");
    $('#p-1-wins').html("0");


})
$('.play').click(function(){
  
    numPlays=0;
    gameOver=false;
    currentPlayer= "X"; 
     currentPlays = {
        "X":[],
        "O" :[]
    }
        $(".winner").text("")
        $(".turn").text("X's Turn")
        $('.cell').html("");
    })



