<template>
  <div>
    <Navigation class="w-full"/>

    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOut">
      <grid-loader
        class="relative mx-auto -m2-2 -mb-12"
        v-if="this.getLoading"
        :loading="this.getLoading"
        :color="color"
        :size="size"
      ></grid-loader>
    </transition>

    <div class="flex items-stretch p-2">
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeft"
      >
        <Comments
          v-if="this.postId && !this.getLoading"
          class="comments-anim w-2/3 ml-5 flex-1"
          :post="this.getPostData"
          :postId="this.postId"
        ></Comments>
      </transition>
      <transition
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutRight"
      >
        <Sidebar v-if="this.postId && !this.getLoading" class="w-1/3"></Sidebar>
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
      color: "#fb5f2b",
      size: "15px",
      margin: "2px",
      radius: "2px"
    };
  },
  components: {
    Navigation: Navigation,
    Comments: Comments,
    Sidebar: Sidebar,
    GridLoader
  },
  props: {
    post: Array,
    postId: String,
    loading: false
  },
  computed: mapGetters(["getPostData", "getLoading"]),
  methods: {
    ...mapActions(["fetchPostData", "changeLoadingTrue", "changeLoadingFalse"])
  },
  watch: {
    getPostData() {
      this.changeLoadingFalse();
    }
  }
};
</script>

<style scoped>
.comments-anim {
  animation-duration: 300ms;
}
</style>
