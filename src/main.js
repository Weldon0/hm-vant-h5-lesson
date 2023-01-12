import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 刚才写好的vant-ui的js文件直接引入就可以
import "./utils/vant-ui";

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
