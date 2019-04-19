<template>
  <div>
    {{mousePosition}}
    <button @click="reload">reload</button>
    <svg :height="height" :width="width" @mousemove="onMouseMove($event)"></svg>
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
      nodes: [],
      simulation: null,
      mousePosition: {
        x: 0,
        y: 0
      }
    };
  },
  props: {
    arrayData: Object
  },
  mounted() {
    this.loadData(); // initially load json
  },
  created() {},
  methods: {
    // load data
    loadData() {
      var svg = d3
        .selectAll("svg")
        .attr("width", this.width)
        .attr("height", this.height);

      var colors = d3.scaleOrdinal(d3.schemeCategory10);

      this.nodes = this.arrayData.comments;
      this.simulation = d3
        .forceSimulation(this.nodes)
        .force("charge", d3.forceManyBody().strength(300))
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force("collide", d3.forceCollide(10).strength(1));

      var node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodes)
        .enter()
        .append("circle")
        // .attr("cx", Math.random() * this.width)
        // .attr("cy", Math.random() * this.height)
        .attr("r", function(d) {
          parseInt(d.LDA_best_topic_score * 10);
        })
        .attr("fill", function(d) {
          return colors(parseInt(d.LDA_best_topic));
        })
        .call(
          d3
            .drag()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );

      node.append("title").text(function(d) {
        return d.id;
      });
      console.log("simulation");

      this.simulation.nodes(this.nodes).on("tick", ticked);

      function ticked() {
        node
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });
      }
    },
    reload() {
      //console.log('reloading...');
      this.$svg.empty(); // clear svg --> easiest way to re-create the force graph.
      this.loadData();
    },
    // mouse events
    onMouseMove(evt) {
      //console.log(evt, this)
      this.mousePosition = {
        x: evt.clientX,
        y: evt.clientY
      };
    },
    // drag event handlers
    dragstarted(d) {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragended(d) {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  },
  computed: {
    ...mapGetters(["getarrayData"])
  }
};
</script>


<style />;
