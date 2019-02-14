<template>
  <div class="container">
    <h1>Login</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Login from "@/components/login.vue";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { loginWithUI } from "@/lib/firebase.auth";

@Component({
  components: {}
})
export default class Home extends Vue {
  mounted() {
    loginWithUI("#firebaseui-auth-container");
  }
}
</script>
<style lang="stylus" scoped>
.container {
  text-align: center;
}
</style>

