<template>
  <div class="vuebar-element-main" v-bar="{
      preventParentScroll: true
    }">
    <div>
      <div id="app">
        <router-view/>
      </div>
    </div>
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
  background-color: #222222;
  overflow-x: hidden;
}
#app {
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
}
a:link {
  color: skyblue;
}

/* visited link */
a:visited {
  color: grey;
}

.vuebar-element-main {
  width: 100%;
  position: fixed !important;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vuebar-element-comments {
  height: 1000px;
  width: 100%;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 15px;
  min-height: 15px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba(160, 160, 160, 0.3);
  margin: 5px 5px 5px 0;
  border-radius: 5px;
  height: calc(100% + 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(160, 160, 160, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(93, 26, 119, 0.5);
}
</style>
