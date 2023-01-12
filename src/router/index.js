import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout.vue";
import Login from "@/views/login.vue";
import Register from "@/views/register.vue";
import Article from "@/views/article.vue";
import Detail from "@/views/detail.vue";
import Like from "@/views/like.vue";
import Collect from "@/views/collect.vue";
import User from "@/views/user.vue";

Vue.use(VueRouter);

/**
 * @type {import("vue-router").RouteConfig[]}
 */
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/article", // 重定向
    children: [
      {
        path: "article",
        component: Article,
      },
      {
        path: "like",
        component: Like,
      },
      {
        path: "collect",
        component: Collect,
      },
      {
        path: "user",
        component: User,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/article/:id",
    component: Detail,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
