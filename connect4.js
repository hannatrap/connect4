/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //loop through the number in height and for each column add a row the wideth of width.
function makeBoard() {
  for(let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH}));
  }
};

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  //create const top which is the top row and sets the id to "column top", then is looking for a click and when clicked run the function for handleClick
  //loop through each array of the width (7), create const headCell which creates the element 'td' which creates a cell that can hold data, then set the id of headCell to x, then update the top, which is the top row, to contain a td
  //this would append the entire top row to be a td
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //loop through each array of the height (6), create const row which creates the element 'tr' which creates a row - in this loop create a const cell which allows the cell to hold data -- then set the cell's id to be `${y}-${x}` - then update the row to contain td's
  //update all rows to be td's
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
};

/** findSpotForCol: given column x, return top empty y (null if filled) */
//when given an x - check that column by looping through the y's backwards, if the board does not have that yx pair, return the y value otherwise return null
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for( let y = HEIGHT - 1; y >=0; y --) {
    if(!board[y][x]){
      return y;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

//   // TODO: make a div and insert into correct table cell
//accept a y and x value - create a div element add class of piece and p1 or p2 and set top position of element then append the piece div to go in the cell
function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
};

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
};

/** handleClick: handle click of column top to play piece */
//

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);




  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie - 
  //NEED TO UNDERSTAND THIS
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell =>cell))) {
    return endGame('Tie!');
  }

  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  //if currPlayer is equal to one, change it to two, otherwise (like if it is two) change it to one
 currPlayer = currPlayer === 1 ? 2 : 1;


}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer


    // NEED HELP UNDERSTANDING THIS: 
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //loop through the x and y axis  - checking for r in a row horizontally, verically, and both directions of diagonally. Horizontal is adding to the x to check for win, vertical is adding to the y to check for win, diagonals are manipulating both x and y to chck for wins.
  // If any of those are true - returns true

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

makeBoard();
makeHtmlBoard();
