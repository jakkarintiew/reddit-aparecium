<template>
  <div class="viz h-auto bg-black text-grey-light rounded shadow-md p-5">
      <h1 class="text-grey-lighter font-hairline mb-4">Comments Topic Modelling</h1>
    <div>
      <graph v-if="!getLoading" :arrayData="this.getarrayData"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ForceGraph from "@/components/ForceGraph";

export default {
  name: "visualization",
  components: {
    graph: ForceGraph
  },
  data: function() {
    return {
      data: []
    };
  },
  computed: mapGetters(["getarrayData",  "getLoading"]),
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

