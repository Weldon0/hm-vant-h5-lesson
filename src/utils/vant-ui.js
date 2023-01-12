// 按需引入组件的操作放到单独的文件里面
import { Button, Image, Tabbar, TabbarItem } from "vant";
import Vue from "vue";

// Vue.component('')
Vue.use(Button);
Vue.use(Image);
Vue.use(Tabbar);
Vue.use(TabbarItem);
