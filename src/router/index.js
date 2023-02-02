import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout.vue";
// import Login from "@/views/login.vue";
// import Register from "@/views/register.vue";
// import Article from "@/views/article.vue";
// import Detail from "@/views/detail.vue";
// import Like from "@/views/like.vue";
// import Collect from "@/views/collect.vue";
// import User from "@/views/user.vue";
import { getToken } from "@/utils/storage";

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
        component: () => import("@/views/article.vue"),
      },
      {
        path: "like",
        component: () => import("@/views/like.vue"),
      },
      {
        path: "collect",
        component: () => import("@/views/collect.vue"),
      },
      {
        path: "user",
        component: () => import("@/views/user.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/register.vue"),
  },
  {
    path: "/article/:id", // /article/1
    component: () => import("@/views/detail.vue"),
  },
];

// 初始化了一个路由的实例化对象
const router = new VueRouter({
  routes,
});

// beforeEach方法，路由跳转之前进行拦截的
// beforeEach接收一个回调函数

// 白名单页面，不需要权限的页面
const whiteList = ["/login", "/register"];

// beforeEach：路由跳转之前进行权限判断
// to: 即将跳转的页面
// form: 从哪个页面进行跳转的
// next: 放行
router.beforeEach((to, from, next) => {
  console.log(to.path);
  // console.log(from);
  // console.log(next);

  // 1、判断用户有没有token，本地存储
  const token = getToken();

  // 如果用户有token或者去的是白名单页面直接放行
  // 如果用户没有token的同时去的不是白名单页面，重定向到login
  if (token || whiteList.includes(to.path)) {
    next();
  } else {
    next("/login");
  }

  // next(token || whiteList.includes(to.path) ? undefined : "/login");

  // token || whiteList.includes(to.path) ? next() : next("/login");

  // if (token) {
  //   next(); // 如果有token直接放行
  // } else {
  //   // 用户有没有token
  //   // 如果你要去的是登录和注册页面，我就放行
  //   if (whiteList.includes(to.path)) {
  //     next();
  //   } else {
  //     // 没有token，还要去有权限的页面，让他去登录
  //     next("/login");
  //   }
  // }

  /**
   * 判断用户有没有token， 有token， 直接放行 （有身份的人，想去哪就去哪~）
   * 没有token（游客），如果是白名单中的页面，直接放行
   * 否则，无token（游客），且在访问需要权限访问的页面，直接拦截到登录
   */
  //   to：去哪里
  //   from: 从哪里来
  //   next 让不让你去（去哪里）
  //   只要调用了next() 放行的意思

  // 进行权限的判断，只有满足条件才放行
  //
  // next();
});

export default router;
