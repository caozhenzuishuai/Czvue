import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "@/components/TypeNav";
import "./mock/mockServer";
import Carousel from "@/components/Carousel";
import "swiper/css/swiper.min.css";
import Pagination from "@/components/Pagination";
import "./validate";
import * as API from "@/api";
import "./elements";
Vue.config.productionTip = false;
Vue.prototype.$API = API;
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
