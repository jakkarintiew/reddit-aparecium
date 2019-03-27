<template>
  <div class="home">
    <header>
      <div>
        <img width="330" alt="Aparecium logo" src="../assets/logo.svg">
        <h1 class="logo-text mt-3 mb-10">Reddit Aparecium</h1>

        <form class="w-max">
          <div class="w-1/2 flex mx-auto items-center">
            <input
              @keyup.enter="fetchData()"
              v-model="input"
              type="text"
              class="input-form flex-1 appearance-none rounded-l-lg bg-grey-light shadow-md p-4 text-grey-darker mr-0 focus:outline-none focus:bg-grey-ligtest"
              placeholder="Copy Reddit thread URL here..."
              autocapitalize="off"
              autocorrect="off"
            >
            <button
              @click="fetchData()"
              class="input-btn color-3 appearance-none bg-indigo-darker text-grey-light text-base font-semibold tracking-wide uppercase p-4 rounded-r-lg shadow-md hover:bg-indigo-dark focus:outline-none"
              type="button"
            >GO</button>
          </div>
        </form>
      </div>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "home",
  components: {
    PulseLoader
  }
};
</script>

<style scoped>
header {
  position: relative;
  background: #fb5f2b;
  padding: 5rem 0 5rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 80px -2px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.input-form {
  font-family: "Quicksand", sans-serif;
  opacity: 0.75;
  transition: 0.5s;
}
.input-form:focus {
  opacity: 1;
  transition: 0.5s;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.input-btn {
  background: #30133d;
  cursor: pointer;
  text-align: center;
  background-size: 300% 100%;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
.input-btn:hover {
  background-position: 100% 0;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
.input-btn.color-3 {
    background-image: linear-gradient(to right, #5165be, #51336e, #526da1, rgb(95, 35, 122));
}
.input-btn:active {
  transform: translateY(1px);
  transition: all 0.1s ease-in-out;
}

.logo-text {
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
  color: #f2f2f2;
}
</style>

