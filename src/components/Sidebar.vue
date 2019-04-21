<template>
  <div id="main">
    <div class="side-bar bg-grey-darkest text-grey-lighter rounded shadow-md p-5">
      <h2 class="text-grey-lighter font-hairline">Aparecium</h2>
      <div class="container container--summary">
        <div v-if="isLoading" class="ajax-loader justify-content-center">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p v-show="noPosts">*dust*</p>
        <p v-show="notFound">Not found</p>
        <div v-show="valid">
          <user-summary
            :about="about"
            :username="username"
            :comments="comments"
            :submitted="submitted"
            :isLoading="isLoading"
          ></user-summary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSummary from "@/components/UserSummary";

export default {
  name: "sidebar",
  components: {
    UserSummary
  },
  data() {
    return {
      username: "",
      comments: [],
      submitted: [],
      about: {},
      isLoading: false,
      notFound: false,
      noPosts: false,
      finished: {
        comments: false,
        submitted: false
      }
    };
  },
  mounted() {
    this.$watch("username", () => {
      this.reset();
    });
    // Auto fetch
    if (window.location.hash !== "") {
      this.username = window.location.hash
        .split("#")
        .pop()
        .trim();
      this.fetchData();
    }
  },
  computed: {
    valid() {
      return this.finishedLoading && this.comments.length;
    },
    finishedLoading() {
      if (!this.comments.length && !this.submitted.length) return;
      return this.finished.comments && this.finished.submitted;
    }
  },
  methods: {
    reset() {
      this.notFound = false;
      this.noPosts = false;
      this.finished.comments = false;
      this.finished.submitted = false;
      this.comments = [];
      this.submitted = [];
    },
    fetchData() {
      this.username = "TomShoe02";

      this.reset();

      window.history.replaceState({}, "", `#${this.username}`);

      this.isLoading = true;

      this.fetchAbout();
      this.fetchCombined("comments");
      this.fetchCombined("submitted");
    },
    fetchAbout() {
      this.$http
        .get(`https://www.reddit.com/user/${this.username}/about/.json`)
        .then(response => {
          this.about = response.body.data;
        })
        .catch(response => {
          if (response.status === 404) {
            this.notFound = true;
            this.isLoading = false;
          }
        });
    },
    fetchCombined(type, after = "") {
      this.$http
        .get(
          `https://www.reddit.com/user/${
            this.username
          }/${type}.json?limit=100&after=${after}`
        )
        .then(response => {
          let arr = response.body.data.children;

          // No more posts
          if (!arr.length) {
            this.isLoading = false;
            this.finished[type] = true;
            if (
              !this[type].length &&
              this.finished.comments &&
              this.finished.submitted &&
              !this.comments.length &&
              !this.submitted.length
            )
              this.noPosts = true;
            return;
          }

          // Add additional posts to array
          arr.forEach(item => {
            this[type].push(item);
          });

          // If there's (almost certainly) more, recursively fetch more
          if (arr.length == 100) {
            this.fetchCombined(type, arr[99].data.name);
            return;
          }

          this.finished[type] = true;

          if (this.finished.comments && this.finished.submitted)
            this.isLoading = false;
        })
        .catch(response => {
          if (response.status === 404) {
            this.notFound = true;
            this.isLoading = false;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@keyframes ajax {
  50% {
    transform: scale(2.5);
    box-shadow: 0 8px 50px -4px rgba(0, 50, 150, 0.2);
  }
  100% {
    transform: scale(1);
  }
}
.ajax-loader {
  div {
    width: 10px;
    height: 10px;
    background-color: #e089d9;
    border-radius: 50%;
    margin: 0 1rem;
    animation: ajax 0.8s ease infinite;

    &:nth-child(2) {
      background-color: #ffa9a9;
      animation-delay: 0.1s;
    }
    &:nth-child(3) {
      background-color: #ffd578;
      animation-delay: 0.2s;
    }
    &:nth-child(4) {
      background-color: #a6d5e6;
      animation-delay: 0.3s;
    }
  }
}
</style>
