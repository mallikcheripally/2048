<template>
    <div id="app">
        <div class="game-header">2048</div>
        <Board />
        <div class="instructions-box">
            <li>Use keyboard arrows or W (up), A (left), D (right), S (down) to play the game</li>
            <li>Press 'R' to restart the game</li>
        </div>

        <div class="developer-info-box">
            Developed by <a href="https://mallikcheripally.com" target="_blank">Mallik Cheripally</a>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            Source code available on <a href="https://github.com/mallikcheripally/2048" target="_blank">Github</a>
        </div>
    </div>
</template>

<script>
import Board from "./components/Board";
export default {
  name: "app",
  components: {
    Board
  }
};
</script>

<style lang="scss">
@import "scss/config";
body {
  margin: 0;
  padding: 0;
  background: $BODY__BACKGROUND;
}
#app {
  font-family: "Rubik", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 75px auto 0 auto;
  box-sizing: border-box;
}
.game-header {
  color: $HEADING__COLOR;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}
.instructions-box {
  color: $HEADING__COLOR;
  text-align: center;
  font-size: 14px;
  margin-top: 20px;

  li {
    list-style: none;
    margin: 0 0 15px 0;
  }
}
.developer-info-box {
  margin: 25px auto;
  text-align: center;
  color: $CELL__BACKGROUND;
  font-size: 14px;
  a {
    color: $CELL__BACKGROUND;
    &:hover,
    &:focus {
      color: $BOARD__BACKGROUND;
    }
  }
}
</style>
