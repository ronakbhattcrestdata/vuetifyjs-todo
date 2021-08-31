import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "Todo",
      path: "/",
      component: () => import("@/views/Todo")
    },
    {
      name: "about",
      path: "/about",
      component: () => import("@/views/About")
    },
  ]
});