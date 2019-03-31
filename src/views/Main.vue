<template>
  <div>
    <navigation class="w-full"></navigation>

    <div class="absolute w-full my-10">
      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <grid-loader
          class="loader-anim w-full mx-auto"
          v-if="this.getLoading"
          :loading="this.getLoading"
          :color="color"
          :size="size"
        ></grid-loader>
      </transition>
    </div>

    <div class="flex px-5">
      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOut">
        <comments
          v-if="this.postId && !this.getLoading"
          class="comments-anim w-2/3 my-5 flex-1"
          :post="this.getPostData"
          :postId="this.postId"
        ></comments>
      </transition>

      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
        <sidebar class="sidebar-anim w-1/3 ml-5 my-5" v-if="this.postId && !this.getLoading"></sidebar>
      </transition>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Comments from "@/components/Comments";
import Sidebar from "@/components/Sidebar";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "aparecium",
  data() {
    return {
      color: "#a14f77",
      size: "15px",
      margin: "2px",
      radius: "2px"
    };
  },
  components: {
    navigation: Navigation,
    comments: Comments,
    sidebar: Sidebar,
    GridLoader
  },
  props: {
    post: Array,
    postId: String,
    loading: Boolean
  },
  computed: mapGetters(["getPostData", "getLoading"]),
  methods: {
    ...mapActions(["fetchPostData", "changeLoadingTrue", "changeLoadingFalse"])
  },
  watch: {
    getPostData: "changeLoadingFalse"
  }
};
</script>

<style scoped>
.comments-anim {
  animation-duration: 200ms;
  animation-delay: 100ms;
}
.sidebar-anim {
  animation-duration: 200ms;
  animation-delay: 100ms;
}
.loader-anim {
  animation-duration: 200ms;
}
</style>
