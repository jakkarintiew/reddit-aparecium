<template>
  <div>
    <Navigation/>
    <Comments v-bind:post="this.post" v-bind:postId="this.postId"/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Comments from "@/components/Comments";
export default {
  name: "aparecium",
  components: {
    Navigation: Navigation,
    Comments: Comments
  },
  props: {
    post: Array,
    postId: String
  },
};
</script>

<style scoped>
</style>
