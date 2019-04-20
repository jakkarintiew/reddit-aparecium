<template>
  <div class="viz h-auto bg-grey-darkest text-grey-light rounded shadow-md p-5">
    <h2 class="text-grey-lighter font-hairline mb-5">Comments Aparecium</h2>
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

