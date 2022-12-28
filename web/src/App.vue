<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap/dist/js/bootstrap.js"
  // import $ from 'jquery'
  export default {
    components: {
      NavBar
    },
    setup() {
      

      // $.ajax({
      //   url: "http://localhost:3030/user/account/register/",
      //   type: "post",
      //   data: {
      //     username: "ywb",
      //     password: "pywb",
      //     confirmedPassword: "pywb",
      //   },

      //   success(resp) {
      //     console.log(resp);
      //   },
      //   erro(resp) {
      //     console.log(resp);
      //   }
      // })
    }
  }
</script>

<style>

body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
