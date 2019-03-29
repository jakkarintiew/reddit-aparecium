<template>
  <div class="home">
    <header>
      <div class="container mx-auto text-center justify-center">
        <img width="330" alt="Aparecium logo" src="../assets/logo.svg">
        <h1 class="logo-text mt-3 mb-10">Reddit Aparecium</h1>
        <form v-on:submit.prevent="goAparecium()" class="w-max">
          <div class="w-2/3 flex mx-auto items-center">
            <input
              v-model="postUrl"
              type="text"
              class="input-form flex-1 appearance-none rounded-l-lg bg-grey-light shadow-md p-4 text-grey-darker mr-0 focus:outline-none focus:bg-grey-ligtest"
              placeholder="Copy Reddit thread URL here..."
              autocapitalize="off"
              autocorrect="off"
              @keyup.enter="goAparecium()"
            >
            <button
              @click="goAparecium()"
              class="input-btn color-3 appearance-none bg-indigo-darker text-grey-light text-base font-semibold tracking-wide uppercase p-4 rounded-r-lg shadow-md hover:bg-indigo-dark focus:outline-none"
              type="button"
            >GO</button>
          </div>
        </form>
      </div>
    </header>
    <div :disabled="loading" v-if="this.loading" transition="fade">
      <grid-loader class="mx-auto" :loading="loading" :color="color" :size="size"></grid-loader>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  name: "home",
  data() {
    return {
      postUrl: "",
      postId: "",
      post: [],
      subreddit: "",
      loading: false,
      color: "#fb5f2b",
      size: "15px",
      margin: "2px",
      radius: "2px"
    };
  },
  components: {
    GridLoader
  },
  computed: mapGetters(["getPostData"]),
  methods: {
    ...mapActions(["fetchPostData"]),
    goPost(postId) {
      if (postId != "") {
        this.$router.push({
          name: "aparecium",
          params: { post: this.getPostData, postId: this.postId }
        });
      }
    },
    goAparecium() {
      this.loading = true;
      this.fetchPostData(this.postUrl);
    },
  },
  watch: {
    getPostData (newPost, oldPost) {
      console.log(newPost)
      newPost = this.getPostData;
      this.postId = this.getPostData[0].data.children[0].data.id;
      this.subreddit = this.getPostData[0].data.children[0].data.subreddit;
      this.goPost(this.postId);
    }
  }
};
</script>

<style scoped>
header {
  position: relative;
  background: #fb5f2b;
  padding: 4rem 0 4rem;
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
  background-image: linear-gradient(
    to right,
    #5165be,
    #51336e,
    #526da1,
    rgb(95, 35, 122)
  );
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

/* always present */
.fade-transition {
  transition: all 1s ease;
  height: 30px;
  padding: 10px;
  overflow: hidden;
}
/* .fade-enter defines the starting state for entering */
/* .fade-leave defines the ending state for leaving */
.fade-enter,
.fade-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
</style>

