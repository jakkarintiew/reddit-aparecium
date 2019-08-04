<template>
  <div>
    <div class="side-bar bg-black text-grey-lighter rounded shadow-md p-5">
      <h1 class="text-grey-lighter font-hairline">Redditor Overview</h1>

      <div>
        <div
          v-show="getCommentsLoading || getSubmittedLoading"
          class="ajax-loader flex justify-center"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div v-show="valid" class>
          <user-details
            :about="getAbout"
            :username="getUsername"
            :comments="getComments"
            :submitted="getSubmitted"
            :isLoading="getCommentsLoading || getSubmittedLoading"
          ></user-details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserDetails from "@/components/UserDetails";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "user-sidebar",
  components: {
    UserDetails
  },
  data() {
    return {};
  },
  mounted() {
    this.reset
  },
  computed: {
    ...mapGetters([
      "getUsername",
      "getAbout",
      "getComments",
      "getSubmitted",
      "getCommentsLoading",
      "getSubmittedLoading"
    ]),
    valid() {
      return this.finishedLoading && this.getComments.length;
    },
    finishedLoading() {
      if (this.getCommentsLoading || this.getSubmittedLoading) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["fetchAbout", "fetchComments", "fetchSubmitted"]),
    ...mapMutations(["setUsername, reset"])
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
    position: relative;
    width: 10px;
    height: 10px;
    background-color: #e089d9;
    border-radius: 50%;
    margin: 10rem 1rem;
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
.side-bar {
  font-family: "Quicksand", sans-serif;
  transition-timing-function: ease;
  transition: height 1s;
  height: auto;
}
</style>
