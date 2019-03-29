<template>
  <div class="mx-auto">
    <section>
      <template v-if="post_header[0]">
        <header class="bg-orange">
          <h2 class="h2 m0">{{ post_header[0].data.title }}</h2>
          <div>
            {{ post_header[0].data.ups }}
            <a
              :href="post_header[0].data.url"
              target="_blank"
            >Open original</a>
          </div>
        </header>
        <vue-markdown
          v-if="post_header[0].data.selftext"
          class="black bg-darken-1 p2"
          :source="post_header[0].data.selftext"
        ></vue-markdown>
      </template>
      <div>
        <comment
          v-for="comment in comments"
          :key="comment.data.id"
          :body="comment.data.body"
          :author="comment.data.author"
          :replies="comment.data.replies"
        />
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
    getComments: function(id) {
      this.post_header = this.post[0].data.children;
      this.comments = this.post[1].data.children;
    }
  },
  created: function() {
    this.getComments(this.postId);
  },
  watch: {
    $route: function(to, from) {
      console.log("changing route at Comments")
      if (to.params.postId === from.params.postId) return false;
      this.post_header = [];
      this.comments = [];
      this.getComments(to.params.postId);
    }
  }
};
</script>
