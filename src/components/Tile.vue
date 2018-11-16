<template>
    <div class="tile" :class="getTileClasses">{{tile.value}}</div>
</template>

<script>
export default {
  name: "Tile",
  props: {
    tile: Object
  },
  computed: {
    getTileClasses() {
      if (!this.tile) return;
      let classes = [],
        tile = this.tile;

      classes.push(`tile-${tile.value}`);

      if (tile.isNew()) {
        classes.push("tile-new");
      }

      if (!tile.mergedInto) {
        classes.push(`tile-position_${tile.row}_${tile.column}`);
      }

      if (tile.mergedInto) {
        classes.push("tile-merged");
      }

      if (tile.hasMoved()) {
        classes.push(`tile-row_from_${tile.fromRow()}_to_${tile.toRow()}`);
        classes.push(
          `tile-column_from_${tile.fromColumn()}_to_${tile.toColumn()}`
        );
        classes.push("tile-isMoving");
      }

      return classes.join(" ");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/config";
.tile {
  width: $TILE__SIZE;
  height: $TILE__SIZE;
  line-height: $TILE__SIZE;
  border-radius: $TILE__BORDER_RADIUS;
  margin: $TILE__SPACING;
  background: $TILE__BACKGROUND;
  color: $TILE__TEXT_COLOR;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  font-size: 40px;
  font-weight: 500;
  position: absolute;
}
.tile-merged {
  display: none;
}
.tile.tile-merged.tile-isMoving {
  display: block;
  /*transition: all 200ms ease-in;*/
}
.tile-new {
  animation-duration: 200ms;
  animation-name: newTileAnimation;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 125ms;
  transform: scale(0);
}
@keyframes newTileAnimation {
  0% {
    transform: scale(0);
    border-radius: 100%;
  }

  80% {
    transform: scale(1.1);
    border-radius: 50%;
  }

  100% {
    transform: scale(1);
    border-radius: $TILE__BORDER_RADIUS;
  }
}

@keyframes fadeOutAnimation {
  0% {
    opacity: 1;
    display: block;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
</style>
