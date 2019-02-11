<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "app",
  components: {
    Home
  }
};
</script>
<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left: 1em;
  margin-right: 1em;
}

@media (min-width: 60em) {
  #app {
    background-color: #c0c0c0;
    padding-top: 2em;
    margin: 0;
    min-height: 100vh;
  }
}
</style>
