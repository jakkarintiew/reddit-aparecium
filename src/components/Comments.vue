<template>
  <div>
    <section>
      <template v-if="post_header[0]">
        <header class="bg-grey-darkest text-grey-lighter my-5 rounded shadow-md p-5">
          <h2 class="mb-5">{{ post_header[0].data.title }}</h2>
          <div>
            {{ post_header[0].data.ups }}
            <a
              :href="post_header[0].data.url"
              target="_blank"
              class="no-underline"
            >Open original</a>
          </div>
        </header>
        <vue-markdown
          v-if="post_header[0].data.selftext"
          class="bg-grey-darkest whitespace-pre-line text-grey-lighter my-5 rounded shadow-md p-5"
          :source="post_header[0].data.selftext"
        ></vue-markdown>
      </template>
      <div class="commment bg-grey-darkest text-grey-lighter rounded shadow-md p-3">
        <comment
          v-for="comment in comments"
          :key="comment.data.id"
          :body="comment.data.body"
          :author="comment.data.author"
          :replies="comment.data.replies"
        ></comment>
      </div>
    </section>
  </div>
</template>


<script>
import Comment from "@/components/Comment";
import VueMarkdown from "vue-markdown";

export default {
  name: "comments",
  data() {
    return {
      post_header: [],
      comments: []
    };
  },
  props: {
    post: Array,
    postId: String
  },
  components: {
    comment: Comment,
    "vue-markdown": VueMarkdown
  },
  methods: {
    getComments: function() {
      this.post_header = this.post[0].data.children;
      this.comments = this.post[1].data.children;
    }
  },
  created: function() {
    this.getComments(this.postId);
  },
  watch: {
    $route: function(to, from) {
      if (to.params.postId === from.params.postId) return false;
      this.post_header = [];
      this.comments = [];
      this.getComments(to.params.postId);
    }
  }
};
</script>

<style scoped>
.commment {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: lighter;
}
</style>
