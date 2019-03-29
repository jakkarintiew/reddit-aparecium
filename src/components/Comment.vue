<template>
  <div :class="{ 'child-comment': isChild }" v-if="body">
    <header class="px2 py1 muted" v-on:click="toggleChildren">
      {{ showChildren ? '[-] ' : '[+] ' }}
      {{ author }}
    </header>
    <div v-if="showChildren">
      <vue-markdown class="px2 pb2" :source="body">
      </vue-markdown>
      <template v-if="childComments.length && showChildren">
        <comment
          v-for="comment in childComments"
          :key="comment.data.id"
          :body="comment.data.body"
          :author="comment.data.author"
          :replies="comment.data.replies"
          :is-child="true"
        >
        </comment>
      </template>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
import Comment from '@/components/Comment'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'comment',
  props: {
    author: String,
    body: String,
    replies: [String, Object], // The last child has empty string
    isChild: Boolean,
  },
  data: function () {
    return {
      showChildren: true,
    }
  },
  methods: {
    toggleChildren: function () {
      this.showChildren = !this.showChildren
    },
  },
  computed: {
    childComments: function () {
      if (!this.replies) return []
      return this.replies.data.children
    },
  },
  components: {
    comment: Comment,
    'vue-markdown': VueMarkdown,
  },
}
</script>

<style>

</style>
