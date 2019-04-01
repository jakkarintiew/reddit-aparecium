<template>
  <div>
    <section>
      <template v-if="post_header[0]">
        <header class="title bg-black text-grey-lighter rounded shadow-md p-5">
          <div>
            <a :href="post_header[0].data.url" target="_blank" class="no-underline">
              <h2 class="mb-5 text-hairline text-grey-light">{{ post_header[0].data.title }}</h2>
            </a>
            <div class="my-2">
              Posted by
              <span
                class="flex-auto text-center bg-red-darker rounded-lg shadow-md px-2 py-1"
              >{{ post_header[0].data.author }}</span>
            </div>
            <div class="text-orange my-2">{{ post_header[0].data.ups }}</div>
          </div>
        </header>
        <vue-markdown
          v-if="post_header[0].data.selftext"
          class="bg-black whitespace-pre-line text-grey-lighter my-5 rounded shadow-md p-5"
          :source="post_header[0].data.selftext"
        ></vue-markdown>
      </template>
      <div data-aos="fade-right" data-aos-duration="300" class="text-grey-lighter rounded my-5">
        <visualization></visualization>
      </div>

      <div
        data-aos="fade-right"
        data-aos-duration="300"
        class="commment bg-black text-grey-lighter rounded shadow-md p-2"
      >
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
import Visualization from "@/components/Visualization";

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
    visualization: Visualization,
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
/* .title {
  font-family: "Quicksand", sans-serif;
} */
.commment {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: lighter;
}
</style>
