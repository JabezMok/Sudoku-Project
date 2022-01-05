//Load boards
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

//Create variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function(){
    //Run startgame function when button is clicked
    id("start-btn").addEventListener("click", startGame);
    id("flexSwitchCheckDefault").addEventListener("change",function(){
        if (qs("body").classList.contains("dark")){
            qs("body").classList.remove("dark");
            id("diffSelect").classList.remove("dark");
            id("timeChoice").classList.remove("dark");
            var navbar = id("navbar");
            navbar.classList.add("navbar-light");
            navbar.classList.remove("navbar-dark");
            navbar.classList.remove("navbarDark");
        }
        else{
            qs("body").classList.add("dark");
            id("diffSelect").classList.add("dark");
            id("timeChoice").classList.add("dark");
            var navbar = id("navbar");
            navbar.classList.remove("navbar-light");
            navbar.classList.add("navbar-dark");
            navbar.classList.add("navbarDark");

        }
    })

    //Add event listener to number container
    for (let i=0; i<id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click", function(){
            //If selecing is not disabled
            if (!disableSelect){
                //If number is already selected
                if (this.classList.contains("selected")){
                    this.classList.remove("selected");
                    selectedNum = null;
                } else{
                    for (let i=0; i < 9; i++){
                        id("number-container").children[i].classList.remove("selected");
                    }
                    //Select it and update selectedNum
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        })
    }

}

function startGame(){
    //Choose board difficulty
    let board;
    if (id("diffSelect").value === 'easy') board = easy[0];
    else if (id("diffSelect").value === 'medium') board = medium[0];
    else board =hard[0];

    //Set lives to 3 and enable selecting numbers and tiles
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining: " + lives;
    
    //Create board
    generateBoard(board);

    //Starts the timer
    startTimer();
    
    //Show number container
    id("number-container").classList.remove("hidden");
}   

function startTimer(){
    //Sets time remaining based on input
    if (id("timeChoice").value === "10") timeRemaining = 600;
    else if (id("timeChoice").value === "20") timeRemaining = 1200;
    else timeRemaining = 1800;
    //Sets timer for first second
    id("timer").textContent = timeConversion(timeRemaining);
    //Sets timer to update every second
    timer = setInterval(function(){
        timeRemaining --;
        // If no time remaining
        if (timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)

}
//Converts second into MM:SS format
function timeConversion(time){
    let minutes = Math.floor(time / 60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function id(id){
    return document.getElementById(id);
}

function updateMove(){
    //If a tile and a number is selected
    if ((selectedTile) && (selectedNum)){
        //Set tile to the correct number
        selectedTile.textContent = selectedNum.textContent;
        //If the number matches the number in the solution
        if (checkCorrect(selectedTile)){
            // Deselect the tiles
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //Clear the selected var
            selectedTile = null;
            selectedNum = null;
            //Check if board is completed
            if (checkDone()){
                endGame();
            }
            //If the number does not match the solution key
        }else{
            //Disable selecting new numbers for one sec
            disableSelect = true;
            //Make tile red
            selectedTile.classList.add("incorrect");
            //Run in one second
            setTimeout(function(){
                //Subtract lives by one
                lives --;
                if (lives === 0){
                    endGame();
                }else{
                    //Update lives text
                    id("lives").textContent = "Lives Remaining: " + lives;
                    disableSelect = false;
                }
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");

                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
                
            }, 1000);
        }
    }
}

function checkDone(){
    let tiles = qsa(".tile");
    for (let i = 0; i < tiles.length; i++){
        if (tiles[i].textContent === "") return false;
    }
    return true;
}

function endGame(){
    //Disable move and stop timer
    disableSelect = true;
    clearTimeout(timer);
    //Display message
    if (lives === 0 || timeRemaining === 0){
        id("lives").textContent = "You Lost!";
    }else{
        id("lives").textContent = "You Win!";
        setTimeout(function(){
            window.alert("Good Job!");
        }, 300);
        
    }
}

function checkCorrect(tile){
    //Set solution based on difficulty selection
    let solution;
    if (id("diffSelect").value === 'easy') solution = easy[1];
    else if (id("diffSelect").value === 'medium') solution = medium[1];
    else solution = hard[1];
    // If tile's number is equal to solution's number
    if (solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function generateBoard(board){
    //Clear previous board
    clearPrevious();
    //Let used to increment tile ids
    let idCount = 0;
    //Create 81 tiles
    for (let i=0; i < 81; i++){
        //Create a new paragraph element
        let tile = document.createElement("p");
        if (board.charAt(i) != "-"){
            //Set tile text to correct number
            tile.textContent = board.charAt(i);
            tile.addEventListener("mouseover",function(){
                console.log(tile.textContent);
                let tiles = qsa(".tile");
                for (let i=0; i < tiles.length; i++){
                    if (tiles[i].textContent === tile.textContent){
                        tiles[i].style.backgroundColor = "grey";
                    }   
                }
                
            });
            tile.addEventListener("mouseout", function(){
                let tiles = qsa(".tile");
                for (let i=0; i < tiles.length; i++){
                    if (tiles[i].textContent === tile.textContent){
                        tiles[i].style.backgroundColor = "";
                    }   
                }
            })
            
        } else{
            //Add click event listener to tile
            tile.addEventListener("click",function(){
                //If selecting is not disabled
                if (!disableSelect){
                    if(tile.classList.contains("selected")){
                        tile.classList.remove("selected");
                        selectedTile = null;
                    }else{
                        //Deselect other tiles
                        for (let i=0; i < 81; i++){
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //Add selection and update variable
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            })

            

            tile.addEventListener("mouseover",function(){
                if (tile.textContent != ""){
                    console.log(tile.textContent);
                    let tiles = qsa(".tile");
                    //Remove each tile
                    for (let i=0; i < tiles.length; i++){
                        if (tiles[i].textContent === tile.textContent){
                            tiles[i].style.backgroundColor = "grey";
                        }   
                    }
                }
            })
            tile.addEventListener("mouseout", function(){
                let tiles = qsa(".tile");
                for (let i=0; i < tiles.length; i++){
                    if (tiles[i].textContent === tile.textContent){
                        tiles[i].style.backgroundColor = "";
                    }   
                }
            })
        }
        //Assign tile id
        tile.id = idCount;
        //Increment for next tile
        idCount ++;
        //Add tile class to all tiles
        tile.classList.add("tile");
        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)){
            tile.classList.add("bottomBorder");
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder");
        }

        //Add tile to board
        id("board").appendChild(tile);
    }

}

function clearPrevious(){
    //Access all of the tiles
    let tiles = qsa(".tile");
    //Remove each tile
    for (let i=0; i < tiles.length; i++){
        tiles[i].remove();
    }
    //If there is a timer clear it
    if (timer) clearInterval(timer);
    //Deslect any numbers
    for (let i=0; i < id("number-container").children.length; i++){
        id("number-container").children[i].classList.remove("selected")
    }
    //Clear selected variables
    selectedTile = null;
    selectedNum = null;
}

function qs(selector){
    return document.querySelector(selector);
}

function qsa(selector){
    return document.querySelectorAll(selector);
}

