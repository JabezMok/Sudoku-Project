
var selectedNum;
var selectedTile;
var disableSelect;
var timer;

let new_board = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], 
[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];



window.onload = function(){
    generateBoard();
    id("number-container").classList.remove("hidden");

    id("flexSwitchCheckDefault").addEventListener("change",function(){
        if (qs("body").classList.contains("dark")){
            qs("body").classList.remove("dark");
            var navbar = id("navbar");
            navbar.classList.add("navbar-light");
            navbar.classList.remove("navbar-dark");
            navbar.classList.remove("navbarDark");
        }
        else{
            qs("body").classList.add("dark");
            var navbar = id("navbar");
            navbar.classList.remove("navbar-light");
            navbar.classList.add("navbar-dark");
            navbar.classList.add("navbarDark");

        }
    })

    numberContainer();

    id("solve-btn").addEventListener("click",function(){
        load_board();
        if (check_entry(new_board)){
            solve(new_board)
            let tiles = qsa(".tile");
            for (let i=0; i<81; i++){
                if (tiles[i].textContent == ""){
                    let id = tiles[i].id;
                    let col = id%9;
                    let row = Math.floor(id/9);
                    tiles[i].textContent = new_board[row][col];
                    tiles[i].classList.add("solved");
                }

            }
            disableSelect = true;
        }
        load_board();



    })

    id("reset").addEventListener("click",function(){
        new_board = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], 
        [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], 
        [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];
        disableSelect = false;
        generateBoard();
        for (let i=0; i < 10; i++){
            id("number-container").children[i].classList.remove("selected");
        }
    })
}

function id(id){
    return document.getElementById(id);
}

function generateBoard(){
    //Clear previous board
    clearPrevious();
    //Let used to increment tile ids
    let idCount = 0;
    //Create 81 tiles
    for (let i=0; i < 81; i++){
        //Create a new paragraph element
        let tile = document.createElement("p");
        
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

function numberContainer(){
    for (let i=0; i<id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click", function(){
            //If selecing is not disabled
            if (!disableSelect){
                //If number is already selected
                if (this.classList.contains("selected")){
                    this.classList.remove("selected");
                    selectedNum = null;
                } else{
                    for (let i=0; i < 10; i++){
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

function updateMove(){
    //If a tile and a number is selected
    if ((selectedTile) && (selectedNum)){
        //Set tile to the correct number
        selectedTile.textContent = selectedNum.textContent;
        let id = selectedTile.id;
        let col = id%9;
        let row = Math.floor(id/9);
        if (selectedNum.textContent == ""){
            new_board[row][col] = 0;
        }else{
            new_board[row][col] = selectedTile.textContent;
        }
        // Deselect the tiles
        selectedTile.classList.remove("selected");
        selectedNum.classList.remove("selected");
        //Clear the selected var
        selectedTile = null;
        selectedNum = null;
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

function load_board(){
    console.log(new_board);
}

function possible(new_board,n,row,col){
    for (let i=0; i < 9; i++){
        if ((new_board[row][i]) == n){
            return false;
        }
    }
        
    for (let i=0; i < 9; i++){
        if (new_board[i][col] == n){
            return false;
        }
    }
        
    var x = Math.floor(col/3)*3;
    var y = Math.floor(row/3)*3;

    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            if (new_board[y+i][x+j] == n){
                return false;
            }
        }   
    }
    return true;
}
    



function solve(new_board){
    let current = find_empty(new_board);

    if (!current){
        return true;
    }    
    else{
        let row = current[0];
        let col = current[1];

    for (let n=1; n<10; n++){
        if (possible(new_board,n,row,col)){
            new_board[row][col] = n;

            if (solve(new_board)){
                return true;
            }
            new_board[row][col] = 0;
        }
    } 
    return false;
    }  
}

    

function find_empty(new_board){
    for (let i=0; i < 9; i++){
        for (let j=0; j < 9; j++){
            if (new_board[i][j] == 0){
                return [i, j] //row , col
            }
        }
    } 
    return null;
}

function check_entry(new_board){
    for (let i=0; i < 9; i++){
        for (let j=0; j < 9; j++){
            if (new_board[i][j] != 0){
                let n = new_board[i][j];
                new_board[i][j] = 0;
                if (!possible(new_board,n,i,j)){
                    window.alert("Error!");
                    return false
                }
                new_board[i][j] = n;
            }
        }
    } 
    return true;
}

