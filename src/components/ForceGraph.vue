<template>
  <div>
    <button @click="reload">reload</button>
    <div id="graph" class="flex">
      <svg id="fourceGraph" :height="height" :width="width*.7"></svg>
      <svg id="topic" :height="height" :width="width*.3"></svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as d3 from "d3";

export default {
  name: "graph",
  data() {
    return {
      width: 850,
      height: 500,
      split: 0.3,
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
    this.forceGraph(); // initially load json
  },
  created() {
    // this.forceGraph();
  },
  methods: {
    getTopic(topic_index) {
      var that = this;
      d3.select("#topic")
        .selectAll("*")
        .remove();
      var svg = d3.selectAll("#topic");
      var topics = that.arrayData.LDA_topics;
      var topic = topics[topic_index];
      var m = Object.keys(that.arrayData.LDA_topics).length;
      var colors = d3
        .scaleSequential(d3.interpolateRainbow)
        .domain(d3.range(m));

      var topic_word = svg
        .selectAll(".node")
        .data(topic)
        .enter()
        .append("g")
        .attr("class", "node");

      topic_word
        .append("rect")
        .attr("width", function(d) {
          return Math.exp(d.score * 5) * 10;
        })
        .attr("height", function(d) {
          return Math.exp(d.score * 5) * 10;
        })
        .attr("right", 35)
        .attr("y", function(d, i) {
          return i * 45 + 60 - (Math.exp(d.score * 5) * 10) / 2;
        })
        .attr("fill", colors(topic_index / 10));

      topic_word
        .append("text")
        .attr("dx", 90)
        .attr("dy", function(d, i) {
          return i * 45 + 57;
        })
        .text(function(d) {
          return d.term;
        })
        .style("font-size", "0.8rem")
        .style("font-weight", "bold")
        .attr("fill", "lightgrey");

      topic_word
        .append("text")
        .attr("dx", 90)
        .attr("dy", function(d, i) {
          return i * 45 + 72;
        })
        .text(function(d) {
          return Math.round(d.score * 1000) / 1000;
        })
        .style("font-size", "0.7rem")
        .style("font-weight", "light")
        .attr("fill", "lightgrey");
    },
    // load data
    forceGraph() {
      var that = this;
      var svg = d3.selectAll("#fourceGraph").call(d3.zoom().on("zoom", zoomed));
      var width = 850 * 0.7;
      var height = 500;
      var radius = 5;
      var m = Object.keys(that.arrayData.LDA_topics).length;
      var clusters = new Array(m);
      var nodes = that.arrayData.comments;
      var colors = d3
        .scaleSequential(d3.interpolateRainbow)
        .domain(d3.range(m));
      // console.log("Start loop");

      // Get Clusters
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
          currComment.x =
            Math.cos((currComment.LDA_best_topic / m) * 2 * Math.PI) * 140 +
            width / 2 +
            Math.random();
          currComment.y =
            Math.sin((currComment.LDA_best_topic / m) * 2 * Math.PI) * 140 +
            height / 2 +
            Math.random();

          if (currComment.LDA_best_topic == "[]") {
            // console.log(currComment);
            currComment.x = width / 2;
            currComment.y = height / 2;
          }
        }
      }

      var node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", function(d) {
          // return getRadius(d.LDA_best_topic_score);
          // upvote score as radius
          return Math.log10(d.score * 1.0 + 2) * 10;
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

      // node.append("title").text(function(d) {
      //   return d.body;
      // });

      var that = this;

      node.on("click", function(d) {
        console.log("get topic: " + d.LDA_best_topic);
        return that.getTopic(d.LDA_best_topic);
      });

      // define tooltip
      var tooltip = d3
        .select("#graph") // select element in the DOM with id 'chart'
        .append("div") // append a div element to the element we've selected
        .attr("class", "tooltip"); // add class 'tooltip' on the divs we just selected

      tooltip
        .append("span")
        .append("text")
        .text("User") // add divs to the tooltip defined above
        .attr(
          "class",
          "author flex-auto text-center bg-red-darker rounded-lg shadow-md mr-1 my-2 px-2 py-1"
        );

      tooltip
        .append("span") // add divs to the tooltip defined above
        .attr(
          "class",
          "score flex-auto text-center text-orange-dark mr-1 my-2 px-2 py-1"
        );

      tooltip
        .append("div") // add divs to the tooltip defined above
        .attr("class", "body my-2");

      tooltip
        .append("div") // add divs to the tooltip defined above
        .attr("class", "controversiality my-2");

      tooltip
        .append("div") // add divs to the tooltip defined above
        .attr("class", "polarity my-2");

      tooltip
        .append("div") // add divs to the tooltip defined above
        .attr("class", "subjectivity my-2");

      tooltip
        .append("div") // add divs to the tooltip defined above
        .attr("class", "topicScore my-2");

      // mouse event handlers are attached to path so they need to come after its definition
      node.on("mouseover", function(d) {
        // when mouse enters div
        console.log("show tip");
        tooltip.select(".author").html(d.author);
        tooltip.select(".score").html(d.score);
        tooltip
          .select(".controversiality")
          .html("Controversiality: " + d.controversiality);
        tooltip.select(".body").html(d.body);
        tooltip.select(".polarity").html("Sentiment Polairty: " + d.polarity);
        tooltip
          .select(".subjectivity")
          .html("Sentiment Subjectivity: " + d.subjectivity);
        tooltip
          .select(".topicScore")
          .html("LDA Topic Score: " + d.LDA_best_topic_score);
        tooltip.style("display", "block"); // set display
      });

      node.on("mouseout", function() {
        // when mouse leaves div
        console.log("Hide tip");
        tooltip.style("display", "none"); // hide tooltip for that element
      });

      node.on("mousemove", function(d) {
        // when mouse moves
        tooltip
          .style("top", d3.event.layerY + 10 + "px") // always 10px below the cursor
          .style("left", d3.event.layerX - 175 + "px"); // always 10px to the right of the mouse
      });

      function zoomed() {
        node.attr("transform", d3.event.transform);
      }

      // Force Simulation
      var chargeStrength = 0.5;
      var collideStrength = 0.5;
      var clusterStrength = 0.05;

      var simulation = d3
        .forceSimulation(nodes)
        .velocityDecay(0.3)
        // .alphaDecay(0.2)
        .force("charge", d3.forceManyBody().strength(chargeStrength))
        // .force("center", d3.forceCenter(width / 2, height / 2))
        .force(
          "collision",
          d3
            .forceCollide()
            .radius(function(d) {
              return getRadius(d.LDA_best_topic_score) + 1;
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
        if (!d3.event.active) simulation.alphaTarget(0.3);
        d.fx = null;
        d.fy = null;
      }
    },
    reload() {
      d3.selectAll("circle").remove();
      this.forceGraph();
      this.getTopic(0);
    }
  },
  computed: {
    ...mapGetters(["getarrayData"])
  }
};
</script>


<style>
.nodes {
  cursor: pointer;
}

/* tooltip */
.tooltip {
  background: #333;
  box-shadow: 0 0 5px #2e2e2e;
  color: lightgray;
  display: none;
  font-size: 13px;
  left: 130px;
  padding: 15px;
  position: absolute;
  text-align: left;
  top: 95px;
  width: 350px;
  z-index: 10;
}

.tooltip .body {
  font-size: 15px;
  font-weight: bold;
}
</style>

