// 按需引入组件的操作放到单独的文件里面
import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  Image,
  List,
  NavBar,
  Tabbar,
  TabbarItem,
  Toast,
} from "vant";
import Vue from "vue";

// 放到一个数组里面，进行遍历注册
const VantUis = [
  Button,
  Field,
  Form,
  Image,
  NavBar,
  Tabbar,
  TabbarItem,
  Toast,
  Cell,
  List,
  Icon,
  Grid,
  GridItem,
  CellGroup,
  Dialog,
];

VantUis.forEach((item) => Vue.use(item));
