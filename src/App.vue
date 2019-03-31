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
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import url("https://fonts.googleapis.com/css?family=Quicksand");

body {
  background-color: #453e61;
  min-height: 25cm;
  overflow-x: hidden;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a:link {
  color: skyblue;
}

/* visited link */
a:visited {
  color: grey;
}
</style>
