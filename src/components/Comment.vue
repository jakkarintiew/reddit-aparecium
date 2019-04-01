<template>
  <div
    class="bg-black m-2 rounded-lg shadow-md p-1 border border-grey-darkest"
    :class="{ 'child-comment': isChild }"
    v-if="body"
  >
    <header class="bg-transparent ml-1 m-1 p-2" v-on:click="toggleChildren">
      <span
        class="collapse-button cursor-pointer flex-auto bg-grey-darkest shadow-md px-2 py-1 hover:text-blue-light hover:bg-blue-darker"
      >{{ showChildren ? '-' : '+' }}</span>
      <span
        class="flex-auto text-center bg-indigo-darker rounded-lg shadow-md px-2 py-1 m-2"
      >{{ author }}</span>
    </header>
    <transition leave-active-class="animated fadeOut">
      <div
        class="comment-anim bg-transparent leading-normal whitespace-pre-line text-grey-light"
        v-if="showChildren"
      >
        <vue-markdown class="px-3" :source="body"></vue-markdown>
        <template v-if="childComments.length && showChildren">
          <div>
            <sequential-entrance fromBottom delay="50">
              <comment
                v-for="comment in childComments"
                class="comment-anim"
                :key="comment.data.id"
                :body="comment.data.body"
                :author="comment.data.author"
                :replies="comment.data.replies"
                :is-child="true"
              />
            </sequential-entrance>
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

export default {
  name: "comment",
  props: {
    author: String,
    body: String,
    replies: [String, Object], // The last child has empty string
    isChild: Boolean
  },
  data: function() {
    return {
      showChildren: true
    };
  },
  methods: {
    toggleChildren: function() {
      this.showChildren = !this.showChildren;
    }
  },
  computed: {
    childComments: function() {
      if (!this.replies) return [];
      return this.replies.data.children;
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

.comment-anim {
  animation-duration: 200ms;
}
</style>

