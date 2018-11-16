<template>
    <div class="game-overlay" :class="getOverlayBackgroundClasses" v-show="showOverlay">
        <div class="game-result-box">
            <div class="game-result-message" v-if="board.hasWon()">You won!</div>
            <div class="game-result-message" v-if="board.hasLost()">You lose!</div>
            <button class="mvl-button  play-again-button" @click="onPlayAgainPress">Play Again</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "Overlay",
  props: {
    board: Object,
    onPlayAgainPress: Function
  },
  computed: {
    showOverlay() {
      if (!this.board) return;
      return this.board.hasWon() || this.board.hasLost();
    },
    getOverlayBackgroundClasses() {
      if (!this.board) return;
      let classes = [];
      if (this.board.hasWon()) {
        classes.push("game-overlay-won");
      } else if (this.board.hasLost()) {
        classes.push("game-overlay-lose");
      }
      return classes.join(" ");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/config";
.game-overlay {
  background: $OVERLAY__BACKGROUND;
  border-radius: $BOARD__BORDER_RADIUS;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  animation-name: overlayLoadingAnimation;
  animation-duration: 500ms;

  &.game-overlay-won {
    background: $OVERLAY_WON__BACKGROUND;
    .game-result-message {
      color: $OVERLAY_WON__TEXT_COLOR;
    }
    .play-again-button {
      background: $OVERLAY_WON__TEXT_COLOR;
      color: $OVERLAY_WON__BACKGROUND;
    }
  }
  &.game-overlay-lose {
    background: $OVERLAY_LOSE__BACKGROUND;
    .game-result-message {
      color: $OVERLAY_LOSE__TEXT_COLOR;
    }
    .play-again-button {
      background: $OVERLAY_LOSE__TEXT_COLOR;
      color: $OVERLAY_LOSE__BACKGROUND;
    }
  }
}

.game-result-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.game-result-message {
  color: $HEADING__COLOR;
  font-size: 35px;
}
.play-again-button {
  display: block;
  padding: 0 25px;
  margin: 15px auto 0 auto;
  font-weight: 700;
}
@keyframes overlayLoadingAnimation {
  0% {
    transform: scale3d(0, 0, 0);
  }

  40% {
    transform: scale3d(1.15, 1.15, 1.15);
  }

  50% {
    transform: scale3d(1, 1, 1);
  }

  70% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
