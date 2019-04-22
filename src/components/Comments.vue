<template>
  <div>
    <section>
      <template v-if="post_header">
        <header class="title bg-black text-grey-lighter rounded shadow-md p-5">
          <div>
            <div>
              <a :href="post_header.url" target="_blank" class="no-underline">
                <h2 class="mb-5 text-hairline text-grey-light">{{ post_header.title }}</h2>
              </a>
              <div class="my-2">
                Posted by
                <span
                  @click="analyseUser(post_header.author)"
                  class="flex-auto cursor-pointer text-center bg-red-darker rounded-lg shadow-md px-2 py-1"
                >{{ post_header.author }}</span>
              </div>
              <div class="text-orange my-2">{{ post_header.score }}</div>
            </div>
            <vue-markdown
              v-if="post_header.selftext"
              class="bg-black whitespace-pre-line text-grey-lighter my-5"
              :source="post_header.selftext"
            ></vue-markdown>
          </div>
          <!-- <span
            class="border border-white"
            vbind:style="{ 
              background-image:url({post_header.thumbnail});
            }"
          >
            <a :href="post_header.url" target="_blank"></a>
            <img
              :src="post_header.thumbnail"
              vbind:style="{
                object-fit: cover; 
                width: 230px; 
                height: 230px;
              }"
            > 
          </span>-->
        </header>
      </template>
      <!-- fix if condition to loading -->
      <div v-if="comments" class="text-grey-lighter rounded my-5">
        <visualization></visualization>
      </div>

      <div v-if="comments" class="commment bg-black text-grey-lighter rounded shadow-md p-5 ">
        <div class="vuebar-element-comments" v-bar>
          <div>
            <comment
              v-for="comment in comments"
              :key="comment.id"
              :id="comment.id"
              :body="comment.body"
              :author="comment.author"
              :replies="comment.replies"
              :score="comment.score"
              :created_utc="comment.created_utc"
            ></comment>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import Comment from "@/components/Comment";
import Visualization from "@/components/Visualization";
import VueMarkdown from "vue-markdown";
import { mapActions, mapMutations } from "vuex";

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
    ...mapActions(["fetchAbout", "fetchComments", "fetchSubmitted"]),
    ...mapMutations(["setUsername"]),
    analyseUser(username) {
      this.setUsername(username);
      this.fetchAbout();
      this.fetchComments("");
      this.fetchSubmitted("");
    },
    getComments: function() {
      this.post_header = this.post[0];
      this.comments = this.post[1];
    }
  },
  mounted: function() {
    this.getComments(this.postId);
    this.analyseUser(this.post_header.author);
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
.title {
  font-family: "Quicksand", sans-serif;
}
</style>
