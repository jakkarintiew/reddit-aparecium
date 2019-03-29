<template>
  <div :class="{ 'child-comment': isChild }" v-if="body">
    <header class="bg-black ml-2 mt-2 mb-0 rounded-t p-3" v-on:click="toggleChildren">
      <span
        class="collapse-button flex-auto bg-grey-darkest shadow-small mr-1 px-2 py-1"
      >{{ showChildren ? '-' : '+' }}</span>
      <span
        class="flex-auto text-center bg-indigo-darkest rounded-lg shadow-small px-2 py-1"
      >{{ author }}</span>
    </header>
    <div
      class="bg-black text-grey-lighter ml-2 mr-0 mt-0 rounded-b shadow-md p-2 pr-0"
      v-if="showChildren"
    >
      <vue-markdown class="px-5 pb-2" :source="body"></vue-markdown>
      <template v-if="childComments.length && showChildren">
        <div>
          <comment
            v-for="comment in childComments"
            :key="comment.data.id"
            :body="comment.data.body"
            :author="comment.data.author"
            :replies="comment.data.replies"
            :is-child="true"
          ></comment>
        </div>
      </template>
    </div>
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
</style>

