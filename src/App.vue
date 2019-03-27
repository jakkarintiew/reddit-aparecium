<template>
  <div id="app" style="background-color:blueviolet;">
    <router-view/>
  </div>
</template>

<script>
import './assets/css/main.css'
export default {
  name: 'app',
  components: {

  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand');
body {
  background-color: #332A3E;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
