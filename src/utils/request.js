import { Toast } from "vant";
import axios from "axios";
import { delToken, getToken } from "@/utils/storage";
import router from "@/router";
// 创建一个axios请求的实例
const request = axios.create({
  baseURL: "http://interview-api-t.itheima.net/h5/", // 配置请求基准路径
  timeout: 5000, // 请求的超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // config 具体请求的配置项
    // 请求的时候，为接口统一添加token请求头
    // 先判断是否有token
    const token = getToken();

    if (token) {
      // 如果token存在的情况下，再去到请求头里面添加token
      console.log(config);
      // token添加到请求头里面
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // 请求出错的时候会触发
    // 把错误直接抛出去
    return Promise.reject(err);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 为什么要把data结构出来，返回去
    // 因为拿到的response数据，axios帮我们包裹了一层data,如果不结构每次使用的时候都需要手动点出一层data
    return response.data;
  },
  (err) => {
    console.log(err);
    // 如果注册失败了，没有任何提示
    // 如果响应回来的状态码不是200-300之间

    // 很多接口，只要的状态码不是200-300证明接口出错，只要接口请求出错，要有提示
    // 全局统一的错误提示
    // this.$toast()

    // 提示之前判断数据是否真的存在，如果真的有message再起提示
    // 可选链运算符

    // 判断响应回来的状态码是不是401
    if (err.response.status === 401) {
      // token过期了
      // 删除本地存储的token
      delToken();
      // 跳转到登录页面 login
      // router需要从@/router进行引入
      router.push("/login");
    }

    // 全局错误提示，不用在每次接口请求的时候都去写提示的逻辑
    if (err?.response?.data?.message) {
      Toast.fail(err.response.data.message);
    }
    return Promise.reject(err);
  }
);

export default request;
