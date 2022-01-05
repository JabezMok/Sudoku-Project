# Sudoku-Project
#### Video Demo:  <https://youtu.be/kGBUPKzA6_s>
#### Description: My final project is based on the Sudoku game. I created a puzzle generator as well as a solver using HTML, CSS, JS and have 5 files.
#### HTML: I used two HTML files for the two different pages, the Puzzle page and Solver page.
#### I used Bootstrap to help me to style the page as well as to make a navbar. I also added a switch to toggle between Light mode and Dark mode. For the puzzle page I create the selection of difficulty and time. For both pages I made buttons to generate the puzzle, solve the puzzle and reset the solver. For both pages I also created a number container from 1 - 9.

#### CSS: I use the same CSS file to style both pages.
#### Here I style the grid, selectors, buttons, number container and navbar. I also created classes for the toggling between dark mode and light and also a class to change the color of the tile when the number was incorrect. I also added a media query to set the display to none when the page width is less than 700px, this is because the grid requires at least 700px to display in its 9 by 9 manner.

#### For js I used a file for each page.
#### The app.js is for the puzzle page, on the loading of the windows, I add event listeners to the start button, dark & light toggle switch, time and difficulty selection as well as the number container. When the start game button is clicked, the startGame function will run and use the difficulty selection to choose which board to generate as well as start the timer depending on the time selected. Once the board is generated, the player can select a tile and the number he would like to input, this causes the updateMove function to run and the number is checked agaisnt the answer. These continues till the player runs out of lives, time or fills the board with the correct numbers.

#### While the solver.js is for the solver page. On load, it will generate a empty board and add event listeners where necessary. When the solve button is clicked, the program first checks the entry to see if it is a valid puzzle to solve. Thereafter, it solves every empty tile using back-tracking and recursion. The completed puzzle is then generated on the page and every tile and number container is disabled. The user will have to click the reset button if he/she desires to enter a new puzzle to solve.
