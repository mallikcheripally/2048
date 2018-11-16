import { TileController } from "./TileController";

export class BoardController {
  /**
   * Rotates a n*n matrix to left.
   * @param {Array} cells - The cells array to be rotated
   * @return {Array} Returns a left rotated array of cells
   */
  static rotateLeft(cells) {
    let rows = cells.length;
    let columns = cells[0].length;
    let rotated = [],
      x = 0;
    for (; x < rows; ++x) {
      rotated.push([]);
      let y = 0;
      for (; y < columns; ++y) {
        rotated[x][y] = cells[y][columns - x - 1];
      }
    }
    return rotated;
  }

  /**
   * Initialization of Board.
   * @constructor
   * @param {number} size - The size of the board (Board is generated as n*n matrix)
   * @param {number} randomness - The probability of how frequently 4 has to be generated
   */
  constructor(size = 4, randomness = 0.1) {
    this.randomnessProbability = randomness;
    this.deltaX = [-1, 0, 1, 0];
    this.deltaY = [0, -1, 0, 1];
    this.size = size;
    this.tiles = [];
    this.cells = [];
    this.won = false;
    this.makeEmptyBoard();
    this.initializeBoard();
    this.setPositions();
  }

  /**
   * Adds a new tile to the board.
   * @param {number|null} [row] - The row number of the tile to be added
   * @param {number|null} [column] - The column number of the tile to be added
   * @param {number|null} [value] - The value number of the tile to be added
   * @return {Object} Newly added tile
   */
  addNewTile(row, column, value) {
    const tile = new TileController(row, column, value);
    this.tiles.push(tile);
    return tile;
  }

  /**
   * Adds a random tile to the board.
   */
  addRandomTile() {
    let emptyCells = [],
      x = 0;
    for (; x < this.size; ++x) {
      let y = 0;
      for (; y < this.size; ++y) {
        if (this.cells[x][y].value === 0) {
          emptyCells.push({ row: x, column: y });
        }
      }
    }
    let index = Math.floor(Math.random() * emptyCells.length);
    let cell = emptyCells[index];
    let newValue = Math.random() < this.randomnessProbability ? 4 : 2;
    this.cells[cell.row][cell.column] = this.addNewTile(null, null, newValue);
  }

  /**
   * Get the status of the game.
   * @return {boolean} Returns if you lost the game
   */
  hasLost() {
    let canMove = false,
      x = 0;
    for (; x < this.size; ++x) {
      let y = 0;
      for (; y < this.size; ++y) {
        canMove |= this.cells[x][y].value === 0;
        let direction = 0;
        for (; direction < 4; ++direction) {
          let x1 = x + this.deltaX[direction];
          let x2 = y + this.deltaY[direction];
          if (x1 < 0 || x1 >= this.size || x2 < 0 || x2 >= this.size) {
            continue;
          }
          canMove |= this.cells[x][y].value === this.cells[x1][x2].value;
        }
      }
    }
    return !canMove;
  }

  /**
   * Get the status of the game.
   * @return {boolean} Returns if you won the game
   */
  hasWon() {
    return this.won;
  }

  /**
   * Starts the game with initial tiles.
   */
  initializeBoard() {
    let initialTileCount = 2,
      i = 0;
    for (; i < initialTileCount; i++) {
      this.addRandomTile();
    }
  }

  /**
   * Generates an empty board.
   */
  makeEmptyBoard() {
    let x = 0,
      cells = [];
    for (; x < this.size; x++) {
      let y = 0,
        row = [];
      for (; y < this.size; y++) {
        row[y] = this.addNewTile();
      }
      cells[x] = row;
    }
    this.cells = cells;
  }

  /**
   * Move the tile in the appropriate direction, adds a random tile and sets up the tile positions
   * @return {Object} Returns the entire board after performing all the operations
   */
  move(direction) {
    this.removePreviousTiles();
    let i = 0;
    for (; i < direction; i++) {
      this.cells = BoardController.rotateLeft(this.cells);
    }
    let hasChanged = this.moveLeft();

    for (let i = direction; i < 4; ++i) {
      this.cells = BoardController.rotateLeft(this.cells);
    }
    if (hasChanged) {
      this.addRandomTile();
    }
    this.setPositions();
    return this;
  }

  /**
   * Moves the tiles and adds up two tiles if the values match
   * @return {boolean} Returns if the tile values have been changed
   */
  moveLeft() {
    let hasChanged = false,
      x = 0;
    for (; x < this.size; ++x) {
      let currentRow = this.cells[x].filter(tile => tile.value !== 0);
      let resultRow = [],
        target = 0;
      for (; target < this.size; ++target) {
        let targetTile = currentRow.length
          ? currentRow.shift()
          : this.addNewTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          let tile1 = targetTile;
          targetTile = this.addNewTile(null, null, targetTile.value);
          tile1.mergedInto = targetTile;
          let tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won = this.won || targetTile.value === 2048;
        hasChanged =
          hasChanged || targetTile.value !== this.cells[x][target].value;
      }
      this.cells[x] = resultRow;
    }
    return hasChanged;
  }

  /**
   * Clear all the old tiles.
   */
  removePreviousTiles() {
    this.tiles = this.tiles
      .slice()
      .filter(tile => tile.markForDeletion === false);
    this.tiles.forEach(tile => {
      tile.markForDeletion = true;
    });
  }

  /**
   * Sets the previous and current positions for the tiles in the board.
   */
  setPositions() {
    let x = 0,
      cellsLength = this.cells.length;
    for (; x < cellsLength; x++) {
      let y = 0;
      for (; y < cellsLength; y++) {
        this.cells[x][y].previousRow = this.cells[x][y].row;
        this.cells[x][y].previousColumn = this.cells[x][y].column;
        this.cells[x][y].row = x;
        this.cells[x][y].column = y;
        this.cells[x][y].markForDeletion = false;
      }
    }
  }
}
