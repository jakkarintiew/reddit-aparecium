<template>
  <div
    class="bg-black m-1 rounded border border-grey-darkest"
    :class="{ 'child-comment': isChild }"
    :id="id"
    v-if="body"
  >
    <header class="bg-transparent m-1 p-2">
      <span
        class="collapse-button cursor-pointer flex-auto bg-grey-darkest px-2 py-1 hover:text-blue-light hover:bg-blue-darker"
        v-on:click="toggleChildren"
      >{{ showChildren ? '-' : '+' }}</span>
      <span
        class="flex-auto text-center bg-indigo-darker rounded-lg shadow-md px-2 py-1 m-2"
      >{{ author }}</span>
    </header>

    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div
        class="comment-anim bg-transparent leading-normal whitespace-pre-line text-grey-light"
        v-if="showChildren"
      >
        <vue-markdown class="px-3" :source="body"></vue-markdown>

        <template v-if="replies && showChildren">
          <div :id="id">
            <comment
              v-for="comment in replies"
              class="comment-anim"
              :key="comment.id"
              :body="comment.body"
              :author="comment.author"
              :replies="comment.replies"
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

export default {
  name: "comment",
  props: {
    id: String,
    author: String,
    body: String,
    replies: Array, // The last child has empty string
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

