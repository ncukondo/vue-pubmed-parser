<template>
  <div id="app">
    <div class="container">
      <h1>PMID2Citation</h1>
      <home/>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./views/Home";

export default {
  name: "app",
  components: {
    HelloWorld,
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
}

@media (min-width: 60em) {
  #app {
    background-color: #c0c0c0;
    padding-top: 2em;
    margin: 0;
    min-height: 100vh;
  }

  .container {
    margin-left: 15em;
    margin-right: 15em;
    background-color: white;
    padding: 1em;
    min-height: 80vh;
    border-radius: 1em;
  }
}

h1 {
  color: #37bc37;
}
</style>
