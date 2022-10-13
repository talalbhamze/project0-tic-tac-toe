    let gameOver= false; 
    let numPlays=0;
    let currentPlayer= "X";  // by default
    let currentPlays = { // the position we player click - suppose to be empty
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
const audio = $("#mysoundclip")[0];
const audio2 = $("#gamefinish")[0];

;
$(document).ready (function(){
    $('.cell , button ').click(function(){
        audio.play();

    
    
        if ( gameOver || $(this).text()!=""){
            return; 
        }
        numPlays++



        $(this).text(currentPlayer); // to display the Player , each time someone click 
        
        currentPlays[currentPlayer].push($(this).attr('id')); // to show the position of the X and o 

        // checking Scores 
        const player1Score = $('#p-1-wins').html();
        const player2Score = $('#p-2-wins').html();


        //find the winner 
        if (isWinner() && currentPlayer === 'X'){
            $(".winner").text("Winner: " + isWinner())
            $('#p-1-wins').html(Number(player1Score) + 1);
            gameOver = true;
            audio2.play();
            swal({
                title: "Good job!",
                text: "X Player you DIDDDD IT ",
                icon: "success",
                button: " Play Again",
              }).then(function(){
                $('.play').click()

              })
        }
        if (isWinner() && currentPlayer === 'O'){
            $(".winner").text("Winner: " + isWinner())
            $('#p-2-wins').html(Number(player2Score) + 1);
            gameOver = true;
            audio2.play();
            swal({
                title: "Good job!",
                text: "OH!! 'O' Made it this Time  ",
                icon: "success",
                button : " play again" ,
                
                
              }).then(function(){
                $('.play').click()
                $(".swal").css('background-color', '#000');

              })
              

        }
        if (isDraw()){
            //alert('Draw!')
            $(".winner").text("DRAW!! Play Again")
            swal({
                title: "Draw!",
                text: "Let's try Again!",
                icon: "error",
                button: " Play Again",
              }).then(function(){
                $('.play').click()

              })

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
    currentPlays = {"X":[],"O" :[]}

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
    currentPlays = {"X":[],"O" :[]}

        $(".winner").text("")
        $(".turn").text("X's Turn")
        $('.cell').html("");
})



