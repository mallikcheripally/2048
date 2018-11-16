export class TileController {
  /**
   * @type {number} id - Unique ID for the Tile
   */
  static id = 0;

  /**
   * Initialization of a Tile.
   * @constructor
   * @param {number} [row = -1] - Row number for the tile.
   * @param {number} [column = -1] - Column number for the tile.
   * @param {number} [value = 0] - Value of the tile.
   */
  constructor(row, column, value) {
    TileController.id++;
    this.row = row || -1;
    this.column = column || -1;
    this.value = value || 0;
    this.previousRow = -1;
    this.previousColumn = -1;
    this.mergedInto = null;
    this.markForDeletion = false;
  }

  /**
   * Gets the column number of the tile, the current tile is merged from.
   * @return {number} Returns current column number if merged into another tile, else returns previous column number
   */
  fromColumn() {
    return this.mergedInto ? this.column : this.previousColumn;
  }

  /**
   * Gets the row number of the tile, the current tile is merged from.
   * @return {number} Returns current row number if merged into another tile, else returns previous row number
   */
  fromRow() {
    return this.mergedInto ? this.row : this.previousRow;
  }

  /**
   * Checks if the tile has moved earlier to a different position.
   * @return {boolean} Returns if the tile has moved
   */
  hasMoved() {
    return (
      (this.fromRow() !== -1 &&
        (this.fromRow() !== this.toRow() ||
          this.fromColumn() !== this.toColumn())) ||
      this.mergedInto
    );
  }

  /**
   * Check if the tile is new and has not been merged into another tile before.
   * @return {boolean} Returns if the tile is a new one
   */
  isNew() {
    return this.previousRow === -1 && !this.mergedInto;
  }

  /**
   * Gets the column number of the tile, the current tile is merged into.
   * @return {number} Returns column number of the tile merged into if merged, else returns current column number
   */
  toColumn() {
    return this.mergedInto ? this.mergedInto.column : this.column;
  }

  /**
   * Gets the row number of the tile, the current tile is merged into.
   * @return {number} Returns row number of the tile merged into if merged, else returns current row number
   */
  toRow() {
    return this.mergedInto ? this.mergedInto.row : this.row;
  }
}
