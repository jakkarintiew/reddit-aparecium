<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "./assets/css/main.css";

export default {
  name: "app",
  components: {}
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand");
body {
  background-color: #332a3e;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
