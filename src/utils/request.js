// 封装请求相关的
// 引入axios
import axios from "axios";
// 创建一个axios请求的实例
const request = axios.create({
  baseURL: "http://interview-api-t.itheima.net/h5/", // 配置请求基准路径
  timeout: 5000, // 请求的超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // config 具体请求的配置项
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
    // 什么时候会走响应拦截器的error
    // http状态码
    // 如果响应回来的状态码不是200-300之间
    console.log(err);
  }
);

export default request;
