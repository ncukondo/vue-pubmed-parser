<template>
  <div class="container">
    <h1>Login</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as firebase from "firebase/app";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default Vue.extend({
  props: ["config"],
  mounted() {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", this.config);
  }
});
</script>
<style lang="stylus" scoped>
.container {
  text-align: center;
}
</style>

