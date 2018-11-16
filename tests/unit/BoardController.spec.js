import { BoardController } from "@/controllers/BoardController";

describe("BoardController", () => {
  let boardController = new BoardController();

  it("should contain board of size 4", () => {
    expect(boardController.size).toBe(4);
  });

  it("should add a new tile", () => {
    let currentTilesCount = boardController.tiles.length;
    boardController.addNewTile(null, null, 4);
    let newTilesCount = boardController.tiles.length;
    expect(newTilesCount).toBeGreaterThan(currentTilesCount);
  });

  it("should add a random time when tiles are moved", () => {
    let currentTiles = boardController.tiles;
    boardController.move(0);
    let newTiles = boardController.tiles;
    expect(newTiles.tiles).not.toEqual(currentTiles);
  });
});
