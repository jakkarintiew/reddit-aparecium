<template>
  <div class="viz h-auto bg-black text-grey-light rounded shadow-md p-5">
      <h1 class="text-grey-lighter font-hairline mb-4">Comments Topic Modelling</h1>
    <div>
      <force-graph v-if="!getarrayLoading" :arrayData="this.getarrayData"></force-graph>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import VizForceGraph from "@/components/VizForceGraph";

export default {
  name: "viz",
  components: {
    "force-graph": VizForceGraph
  },
  data: function() {
    return {
      data: []
    };
  },
  computed: mapGetters(["getarrayData",  "getarrayLoading"]),
  created() {
  },
  methods: {
    ...mapActions(["fetcharrayData"]),
  }
};
</script>

<style scoped>
.viz {
  font-family: "Quicksand", sans-serif;
}
</style>

