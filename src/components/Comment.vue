<template>
  <div
    class="bg-black m-1 rounded border border-grey-darkest"
    :class="{ 'child-comment': isChild }"
    :id="id"
    v-if="body"
  >
    <header class="bg-transparent m-1 p-2 content-center">
      <span
        class="collapse-button cursor-pointer flex-auto bg-grey-darkest px-2 py-1 hover:text-blue-light hover:bg-blue-darker"
        v-on:click="toggleChildren"
      >{{ showChildren ? '-' : '+' }}</span>
      <span
        @click="analyseUser(author)"
        class="flex-auto cursor-pointer text-center bg-red-darker rounded-lg shadow-md px-2 py-1 m-2"
      >{{ author }}</span>
      <span>
        <small class="h-4">
          <span>· &nbsp;</span>
          <span :class="color">{{ score }}</span>
          <span>&nbsp; · &nbsp;</span>
          <span>{{ date }}</span>
        </small>
      </span>
    </header>

    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div
        class="comment-anim bg-transparent leading-normal whitespace-pre-line text-grey-light"
        v-if="showChildren"
      >
        <vue-markdown class="px-3" :source="body"></vue-markdown>

        <template v-if="replies && showChildren">
          <div>
            <comment
              v-for="comment in replies"
              class="comment-anim"
              :key="comment.id"
              :body="comment.body"
              :author="comment.author"
              :replies="comment.replies"
              :score="comment.score"
              :created_utc="comment.created_utc"
              :is-child="true"
            />
          </div>
        </template>
      </div>
    </transition>
  </div>
  <div v-else></div>
</template>

<script>
import Comment from "@/components/Comment";
import VueMarkdown from "vue-markdown";
import { mapActions, mapMutations } from "vuex";
var moment = require("moment");

export default {
  name: "comment",
  props: {
    id: String,
    author: String,
    body: String,
    replies: Array, // The last child has empty string
    isChild: Boolean,
    score: String,
    created_utc: String
  },
  data: function() {
    return {
      showChildren: true
    };
  },
  methods: {
    ...mapActions(["fetchAbout", "fetchComments", "fetchSubmitted"]),
    ...mapMutations(["setUsername", "reset"]),
    analyseUser(username) {
      this.reset()
      this.setUsername(username);
      this.fetchAbout();
      this.fetchComments();
      this.fetchSubmitted();
    },
    toggleChildren: function() {
      this.showChildren = !this.showChildren;
    }
  },
  computed: {
    childComments: function() {
      if (!this.replies) return [];
      return this.replies.data.children;
    },
    date() {
      return moment(1000 * this.created_utc).fromNow();
    },
    color() {
      return this.score >= 1 ? "orangered-color" : "periwinkle-color";
    }
  },
  components: {
    comment: Comment,
    "vue-markdown": VueMarkdown
  }
};
</script>

<style scoped>
.collapse-button {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}

header {
  font-family: "Quicksand", sans-serif;
}

.comment-anim {
  animation-duration: 200ms;
}
.orangered-color {
  color: #ff9453;
  font-weight: bold;
}

.periwinkle-color {
  color: #00ccff;
  font-weight: bold;
}
</style>

