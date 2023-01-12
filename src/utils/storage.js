// 封装本地存储的 获取，存储，删除

const key = "my-token-vant-mobile";

// 获取本地存储的token

// 按需导出
// 本地存储取token
export const getToken = () => {
  return localStorage.getItem(key);
};

// 本地存储存token
export const setToken = (token) => {
  localStorage.setItem(key, token);
};

// 删除token
export const delToken = () => {
  localStorage.removeItem(key);
};
