// 封装登录或者注册的接口
// 1、引入request
import request from "@/utils/request";

/**
 * 注册接口
 */
export function register(data) {
  return request.post("/user/register", data);
}

/**
 * 登录接口
 */
export function login(data) {
  return request.post("/user/login", data);
}

// 获取个人信息的接口
export function getUserInfo() {
  return request.get("/user/currentUser");
}
