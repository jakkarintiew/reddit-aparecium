<template>
  <div>
    <navigation class="w-full mb-5"></navigation>

    <div class="absolute w-full my-10">
      <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
        <grid-loader
          class="loader-anim w-full mx-auto"
          v-show="getarrayLoading || gettreeLoading"
          :loading="getarrayLoading || gettreeLoading"
          :color="color"
          :size="size"
        ></grid-loader>
      </transition>
    </div>
    <div class="flex" v-if="!isNewInstance">
      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOut">
        <comments
          id="comments"
          v-if="!getarrayLoading && !gettreeLoading"
          class="comments-anim w-2/3 ml-5 my-5 flex-1"
          :post="this.gettreeData"
          :postId="this.postId"
        ></comments>
      </transition>

      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
        <sidebar class="sidebar-anim w-1/3 mx-5 my-5" v-if="!getarrayLoading && !gettreeLoading"></sidebar>
      </transition>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Comments from "@/components/Comments";
import Sidebar from "@/components/Sidebar";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "aparecium",
  data() {
    return {
      color: "#4e3b82",
      size: "25px",
      margin: "10px",
      isNewInstance: true
    };
  },
  components: {
    navigation: Navigation,
    comments: Comments,
    sidebar: Sidebar,
    GridLoader
  },
  // props: {
  //   post: Array,
  //   postId: String,
  //   loading: Boolean
  // },
  computed: mapGetters([
    "getarrayData",
    "gettreeData",
    "getarrayLoading",
    "gettreeLoading"
  ]),
  methods: {
    routePost(postId) {
      if (postId != "") {
        this.$router.push({
          path: `/comments/${postId}`
        });
      }
    }
  },
  watch: {
    gettreeData() {
      this.postId = this.gettreeData[0].id;
      this.isNewInstance = false;
      this.routePost(this.postId);
    },
    getarrayData() {}
  }
};
</script>

<style scoped>
.comments-anim {
  animation-duration: 300ms;
}
.sidebar-anim {
  animation-duration: 300ms;
}
.loader-anim {
  animation-duration: 300ms;
}
</style>
