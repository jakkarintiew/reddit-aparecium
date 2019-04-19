<template>
  <div class="bg-black text-grey-lighter rounded shadow-md p-2">
    <svg :height="height" :width="width">
      <g transform="translate(5,5)">
        <circle
          v-for="(comment, i) in arrayData.comments"
          :key="comment.id"
          :cx="Math.floor(Math.random() * 500) + width/5"
          :cy="Math.floor(Math.random() * 500)"
          :r="comment.LDA_best_topic_score*50"
          :fill="colors(parseInt(comment.LDA_best_topic))"
          stroke="none"
        ></circle>
      </g>
    </svg>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as d3 from "d3";
export default {
  name: "graph",
  data() {
    return {
      width: 960,
      height: 500,
      padding: 1.5, // separation between same-color nodes
      clusterPadding: 6, // separation between different-color nodes
      maxRadius: 12,
      simulation: null,
      colors: d3.scaleOrdinal(d3.schemeCategory10)
    };
  },
  props: {
    arrayData: Object
  },
  created() {},
  methods: {},
  computed: {
    ...mapGetters(["getarrayData"])
  },
  watch: {
    getarrayData() {
      console.log("Array Data");
      console.log(this.getarrayData);
      console.log("Force Simulation");
      this.simulation = d3
        .forceSimulation(this.arrayData.comments)
        .force("charge", d3.forceManyBody().strength(5))
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force(
          "collision",
          d3.forceCollide().radius(function(d) {
            return d.LDA_best_topic_score * 50;
          })
        );
      this.simulation.restart();
    }
  }
};
</script>


<style />;
