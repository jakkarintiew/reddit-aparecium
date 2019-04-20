<template>
  <div>
    <button @click="reload">reload</button>
    <svg :height="height" :width="width" @mousemove="onMouseMove($event)"></svg>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as d3 from "d3";
import { forceCluster } from "d3-force-cluster";
export default {
  name: "graph",
  data() {
    return {
      width: 850,
      height: 500,
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
  created() {
    // this.loadData();
  },
  methods: {
    // load data
    loadData() {
      var svg = d3.selectAll("svg").call(d3.zoom().on("zoom", zoomed));

      var width = 850;
      var height = 500;
      var radius = 5;
      var m = Object.keys(this.arrayData.LDA_topics).length;
      var clusters = new Array(m);
      var nodes = this.arrayData.comments;
      var colors = d3
        .scaleSequential(d3.interpolateRainbow)
        .domain(d3.range(m));
      // console.log("Start loop");
      for (var property in nodes) {
        if (nodes.hasOwnProperty(property)) {
          var currComment = nodes[property];
          if (
            !clusters[currComment.LDA_best_topic] ||
            currComment.LDA_best_topic_score >
              clusters[currComment.LDA_best_topic].LDA_best_topic_score
          ) {
            clusters[currComment.LDA_best_topic] = nodes[property];
          }
          // currComment.x =
          //   Math.cos((currComment.LDA_best_topic / m) * 2 * Math.PI) * 150 +
          //   width / 2 +
          //   Math.random();
          // currComment.y =
          //   Math.sin((currComment.LDA_best_topic / m) * 2 * Math.PI) * 150 +
          //   height / 2 +
          //   Math.random();

          if (currComment.LDA_best_topic == []) {
            // console.log(currComment);
            currComment.x = width / 2;
            currComment.y = height / 2;
          }
        }
      }

      // console.log(clusters);

      var node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", function(d) {
          return getRadius(d.LDA_best_topic_score);
        })
        .attr("fill", function(d) {
          return colors(d.LDA_best_topic / 10);
        })
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      node.append("title").text(function(d) {
        return d.body;
      });

      //add zoom capabilities
      function zoomed() {
        node.attr("transform", d3.event.transform);
      }

      // console.log("Run Simu");

      var chargeStrength = 0.6;
      var collideStrength = 0.4;
      var centerStrenght = 0.01
      var clusterStrength = 0.04;

      var simulation = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collision",
          d3
            .forceCollide()
            .radius(function(d) {
              return getRadius(d.LDA_best_topic_score) + 2;
            })
            .strength(collideStrength)
        )
        .force(
          "x",
          d3
            .forceX(function(d) {
              return clusters[d.LDA_best_topic].x;
            })
            .x(function(d) {
              return clusters[d.LDA_best_topic].x;
            })
            .strength(clusterStrength)
        )
        .force(
          "y",
          d3
            .forceY(function(d) {
              return clusters[d.LDA_best_topic].y;
            })
            .y(function(d) {
              return clusters[d.LDA_best_topic].y;
            })
            .strength(clusterStrength)
        )
        .on("tick", ticked);

      function getRadius(score) {
        return Math.exp(score * 2.5) * 2;
      }

      // // ramp up collision strength to provide smooth transition
      // var transitionTime = 3000;
      // var t = d3.timer(function(elapsed) {
      //   var dt = elapsed / transitionTime;
      //   simulation.force(
      //     "collision",
      //     d3.forceCollide().strength(Math.pow(dt, 2) * 0.7)
      //   );
      //   if (dt >= 1.0) t.stop();
      // });

      function ticked() {
        node
          .attr("cx", function(d) {
            return d.x;
            // return (d.x = Math.max(radius, Math.min(width * 3 - radius, d.x)));
          })
          .attr("cy", function(d) {
            return d.y;
            // return (d.y = Math.max(radius, Math.min(height * 3 - radius, d.y)));
          });
      }

      // drag event handlers
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    },
    reload() {
      //console.log('reloading...');
      // this.$svg.empty(); // clear svg --> easiest way to re-create the force graph.
      d3.selectAll("circle").remove();
      this.loadData();
    },
    // mouse events
    onMouseMove(evt) {
      //console.log(evt, this)
      this.mousePosition = {
        x: evt.clientX,
        y: evt.clientY
      };
    }
  },
  computed: {
    ...mapGetters(["getarrayData"])
  }
};
</script>


<style />;
