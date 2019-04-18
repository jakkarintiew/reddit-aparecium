<template>
  <div class="viz h-auto bg-grey-darkest h-32 text-grey-light rounded shadow-md p-5">
    <h2 class="text-grey-lighter font-hairline mb-5">Comments Aparecium</h2>
    <div>
      <graph :tweetData="loadData"/>
    </div>
  </div>
</template>

<script>
import ForceGraph from "@/components/ForceGraph";
import * as d3 from "d3";

export default {
  name: "visualization",
  components: {
    graph: ForceGraph
  },
  data: function() {
    return {
      loadData: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let data = await d3.json(
        "https://raw.githubusercontent.com/emeeks/d3_in_action_2/master/data/tweets.json"
      );
      this.loadData = data.tweets;
    }
  }
};
</script>

<style scoped>
.viz {
  font-family: "Quicksand", sans-serif;
}
</style>

