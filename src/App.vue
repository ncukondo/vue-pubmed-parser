<template>
  <div id="app">
    <router-view></router-view>
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
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left: 1em;
  margin-right: 1em;
}

h1 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #37bc37;
}

h2 {
  color: #37bc37;
  margin-top: 1em;
  margin-bottom: 0.5em;
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
