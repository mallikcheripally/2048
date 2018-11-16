import { mount } from "@vue/test-utils";

import Board from "@/components/Board.vue";
import { BoardController } from "@/controllers/BoardController";
import { InputController } from "@/controllers/InputController";

describe("Board", () => {
  const wrapper = mount(Board, {
    attachToDocument: true
  });

  it("is a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("should contain BoardController instance in board", () => {
    expect(wrapper.vm.board).toBeInstanceOf(BoardController);
  });

  it("should contain InputController instance in inputController", () => {
    expect(wrapper.vm.inputController).toBeInstanceOf(InputController);
  });

  it("should change when keyboard up arrow is pressed", () => {
    let currentTiles = wrapper.vm.board.tiles;
    wrapper.trigger("keydown.up");
    expect(wrapper.vm.board.tiles).not.toEqual(currentTiles);
  });

  it("should re-initialize when game is restarted", () => {
    let currentBoard = wrapper.vm.board;
    wrapper.vm.onPlayAgainPress();
    expect(wrapper.vm.board).not.toEqual(currentBoard);
  });
});
