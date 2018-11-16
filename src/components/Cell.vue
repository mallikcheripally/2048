<template>
    <div class="cell-container"></div>
</template>

<script>
export default {
  name: "Cell"
};
</script>

<style lang="scss">
@import "../scss/config";
.cell-container {
  width: $TILE__SIZE;
  height: $TILE__SIZE;
  background: $CELL__BACKGROUND;
  margin: $TILE__SPACING;
  border-radius: $TILE__BORDER_RADIUS;
  float: left;
}
</style>
