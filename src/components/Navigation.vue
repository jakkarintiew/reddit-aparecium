<template>
  <sequential-entrance fromTop>
    <div class="home">
      <header class="w-full p-10">
        <div class="mx-auto text-center justify-center mb-10">
          <img width="300" alt="Aparecium logo" src="../assets/logo.svg">
          <h1 class="logo-text text-grey-light font-hairline mt-3">Reddit Aparecium</h1>
          <h5 class="logo-text text-grey font-hairline mt-3">Analyze Reddit Comments</h5>
        </div>
        <div class="p5">
          <form @submit.prevent="fetchData()">
            <div class="w-2/3 flex mx-auto items-center">
              <input
                v-model="postUrl"
                type="text"
                class="input-form flex-1 appearance-none rounded-l-lg bg-grey-light shadow-md p-4 text-grey-darkest mr-0 focus:outline-none focus:bg-grey-lightest"
                placeholder="Copy Reddit thread URL here..."
                autocapitalize="off"
                autocorrect="off"
                @keyup.enter="fetchData()"
              >
              <button
                @click="fetchData()"
                class="input-btn btn-hover color-10 appearance-none text-white font-semibold tracking-wide uppercase p-4 rounded-r-lg shadow-md focus:outline-none"
                type="button"
              >Analyze</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  </sequential-entrance>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      postUrl: "",
      postId: "",
      color: "#fb5f2b",
      size: "15px",
      margin: "2px",
      radius: "2px"
    };
  },
  computed: mapGetters(["gettreeData", "getarrayData", "getLoading"]),
  methods: {
    ...mapActions([
      "fetchtreeData",
      "fetcharrayData",
      "changeLoadingTrue",
      "changeLoadingFalse"
    ]),
    fetchData() {
      if (this.postUrl != "") {
        this.changeLoadingTrue();
        this.fetchtreeData(this.postUrl);
        this.fetcharrayData(this.postUrl);
      }
    },
    routePost(postId) {
      if (postId != "") {
        this.$router.push({
          path: `/comments/${postId}`,
          params: {
            post: this.gettreeData,
            postId: this.postId
          }
        });
      }
    }
  },
  watch: {
    gettreeData() {
      this.postId = this.gettreeData[0].id;
      this.routePost(this.postId);
      this.changeLoadingFalse();
    },
    getarrayData() {
      this.changeLoadingFalse();
    }
  }
};
</script>

<style scoped>
.home {
  animation-duration: 500ms;
}
header {
  position: relative;
  /* background-image: linear-gradient(-225deg, #a14f77 0%, #8D0B93 50%, #321575 100%);   */
  background-image: linear-gradient(
    -225deg,
    #a14f77 0%,
    #562b7c 52%,
    #32709c 100%
  );
  /* background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%); */
  /* background-image: linear-gradient(-45deg, #874da2 0%, #c43a30 100%); */
  /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%); */
  box-shadow: 0 10px 80px -2px rgba(0, 0, 0, 0.5);
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
.logo-text {
  font-family: "Quicksand", sans-serif;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.buttons {
  margin: 10%;
  text-align: center;
}

.btn-hover {
  cursor: pointer;
  text-align: center;
  background-size: 300% 100%;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-1 {
  background-image: linear-gradient(
    to right,
    #25aae1,
    #40e495,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
.btn-hover.color-2 {
  background-image: linear-gradient(
    to right,
    #f5ce62,
    #e43603,
    #fa7199,
    #e85a19
  );
  box-shadow: 0 4px 15px 0 rgba(229, 66, 10, 0.75);
}
.btn-hover.color-3 {
  background-image: linear-gradient(
    to right,
    #667eea,
    #764ba2,
    #6b8dd6,
    #8e37d7
  );
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.btn-hover.color-4 {
  background-image: linear-gradient(
    to right,
    #fc6076,
    #ff9a44,
    #ef9d43,
    #e75516
  );
  box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
}
.btn-hover.color-5 {
  background-image: linear-gradient(
    to right,
    #0ba360,
    #3cba92,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.btn-hover.color-6 {
  background-image: linear-gradient(
    to right,
    #009245,
    #fcee21,
    #00a8c5,
    #d9e021
  );
  box-shadow: 0 4px 15px 0 rgba(83, 176, 57, 0.75);
}
.btn-hover.color-7 {
  background-image: linear-gradient(
    to right,
    #6253e1,
    #852d91,
    #a3a1ff,
    #f24645
  );
  box-shadow: 0 4px 15px 0 rgba(126, 52, 161, 0.75);
}
.btn-hover.color-8 {
  background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}
.btn-hover.color-9 {
  background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.btn-hover.color-10 {
  background-image: linear-gradient(
    to right,
    #ed6ea0,
    #ec8c69,
    #f7186a,
    #fbb03b
  );
  box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}
.btn-hover.color-11 {
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
}
</style>