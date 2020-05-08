<template>
  <div>
    <Header />

    <!-- 在此显示当前路由组件 -->
    <router-view></router-view>

    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reqFloors } from "@/api";
export default {
  name: "App",
  async mounted() {
    // this.$store.dispatch("getFloors");
    // this.$store.dispatch("getBanners");
    this.$store.dispatch("getBaseCategoryList");
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped></style>
