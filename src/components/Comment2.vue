<template>
  <div>
    <div>
      <h3>
        <a class="my-2 font-bold no-underline" target="_blank" :href="link">{{ type }} comment</a>
      </h3>
    </div>

    <div class="my-3">
      <small v-if="data">
        /r/{{data.subreddit}} ·
        <span :class="color">{{data.score}}</span>
        ·
        {{date}}
      </small>
    </div>

    <div
      class="comment bg-black mb-2 rounded-lg border border-grey-darkest p-3"
      v-html="compiledMarkdown"
    ></div>
  </div>
</template>

<script>
var marked = require("marked");
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: false,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

var moment = require("moment");

export default {
  name: "comment",
  props: ["data", "type"],
  computed: {
    compiledMarkdown() {
      if (!this.data) return "N/A";
      return marked(this.data.body);
    },
    date() {
      if (!this.data) return;
      return moment(1000 * this.data.created_utc).fromNow();
    },
    color() {
      if (!this.data) return;
      return this.data.score >= 1 ? "orangered-color" : "periwinkle-color";
    },
    link() {
      if (!this.data) return;
      return `https://www.reddit.com/r/${
        this.data.subreddit
      }/comments/${this.data.link_id
        .split("_")
        .pop()
        .trim()}/title/${this.data.id}/`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$text: #6b7c93;

.comment {
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: lighter;
  p {
    text-align: left;
    margin-bottom: 0.5rem;
  }

  code {
    background-color: #3e3e7b;
    color: white;
  }

  ul {
    list-style-type: initial;
    padding-left: 1rem;

    li:first-child {
      font-weight: 400;
      background: none;
      box-shadow: none;
    }
  }
}

.orangered-color {
  color: #ff9453;
  font-weight: bold;
}

.periwinkle-color {
  color: #00ccff;
  font-weight: bold;
}

.controversial {
  font-weight: 700;
  color: #ff5600;
}
</style>
