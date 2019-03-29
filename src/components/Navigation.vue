<template>
  <div>
    <nav class="nav flex items-center justify-left flex-wrap shadow-lg">
      <router-link to="/">
        <img class="ml-4 mr-2 my-2" width="35" alt="Aparecium logo" src="@/assets/logo.svg">
      </router-link>
      <span class="logo-text">Reddit Aparecium</span>
      <span class="w-2/3">
        <form class="w-full" v-on:submit.prevent="fetchData()">
          <div class="w-full ml-5 flex items-center justify-center">
            <input
              v-model="post_link"
              type="text"
              class="w-2/3 input-form appearance-none rounded-l bg-grey-light shadow-md p-2 text-grey-darker mr-0 focus:outline-none focus:bg-grey-ligtest"
              placeholder="Copy Reddit thread URL here..."
              autocapitalize="off"
              autocorrect="off"
              @keyup.enter="fetchData()"
            >
            <button
              @click="fetchData()"
              class="input-btn color-3 appearance-none bg-indigo-darker text-grey-light text-base font-semibold tracking-wide p-2 rounded-r shadow-md hover:bg-indigo-dark focus:outline-none"
              type="button"
            >GO</button>
          </div>
        </form>
      </span>
    </nav>
  </div>
</template>

<script>
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  name: "navigation",
  data() {
    return {
      post_link: "",
      post: [],
      postId: "",
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
  methods: {
    fetchData() {
      // get post
      if (this.post_link == "") {
        this.loading = false;
        this.$router.push({ name: "home" });
      } else {
        this.loading = true;
        fetch(this.post_link + ".json", {
          headers: {
            Accept: "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.post = data;
          })
          .then(() => {
            this.postId = this.post[0].data.children[0].data.id;
            this.subreddit = this.post[0].data.children[0].data.subreddit;
            this.goPost(this.postId);
          });
      }
    },
    goPost(postId) {
      if (postId != "") {
        this.$router.push({
          name: "aparecium",
          params: { post: this.post, postId: this.postId }
        });
      }
    }
  }
};
</script>


<style scoped>
.nav {
  background: #fb5f2b;
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
  font-size: 24px;
  color: #f2f2f2;
}
</style>
