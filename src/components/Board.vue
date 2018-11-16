<template>
    <div v-if="board" class="board-container">
        <div class="row-container" v-for="row in board.cells" :key="row.id">
            <Cell v-for="(column) in row" :key="column.id"></Cell>
        </div>
        <div class="tile-container">
            <Tile v-for="tile in tiles" :tile="tile" :key="tile.id" />
        </div>
        <Overlay :board="board" :onPlayAgainPress="onPlayAgainPress" />
    </div>
</template>

<script>
import Cell from "./Cell.vue";
import Tile from "./Tile.vue";
import Overlay from "./Overlay.vue";
import { BoardController } from "../controllers/BoardController";
import { InputController } from "../controllers/InputController";
export default {
  name: "Board",
  data() {
    return {
      board: new BoardController(),
      inputController: new InputController(this.handleInputKeyDown)
    };
  },
  mounted() {
    this.inputController.listen();
  },
  beforeDestroy() {
    this.inputController.destroy();
  },
  computed: {
    tiles() {
      return this.board.tiles.filter(tile => tile.value !== 0);
    }
  },
  methods: {
    handleInputKeyDown(event) {
      const KEY_CODE = Number.isFinite(event.which)
        ? event.which
        : event.keyCode;

      // 0 for left, 1 for up, 2 for right, 3 for down
      const keyEvents = {
        37: 0,
        38: 1,
        39: 2,
        40: 3,
        65: 0,
        87: 1,
        68: 2,
        83: 3
      };

      // Restart the game if R is pressed
      if (KEY_CODE === 82) {
        this.onPlayAgainPress();
        return;
      }

      if (this.board.hasWon() || this.board.hasLost()) {
        return;
      }

      if (Number.isFinite(keyEvents[KEY_CODE])) {
        this.board.move(keyEvents[KEY_CODE]);
      }
    },
    onPlayAgainPress() {
      this.board = new BoardController();
    }
  },
  components: {
    Cell,
    Tile,
    Overlay
  }
};
</script>

<style lang="scss">
@import "../scss/config";
.board-container {
  width: $BOARD__DIMENSIONS;
  height: $BOARD__DIMENSIONS;
  background: $BOARD__BACKGROUND;
  border-radius: $BOARD__BORDER_RADIUS;
  position: relative;
  border: $TILE__SPACING solid $BOARD__BACKGROUND;
  user-select: none;
  margin: auto;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  animation-name: boardLoadingAnimation;
  animation-duration: 300ms;
  animation-timing-function: ease-in-out;
}
.row-container {
  &:after {
    content: "";
    clear: both;
  }
}
@keyframes boardLoadingAnimation {
  0% {
    transform: scale3d(0, 0, 0);
  }
  80% {
    transform: scale3d(1.15, 1.15, 1.15);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
