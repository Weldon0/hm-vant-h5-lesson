import request from "@/utils/request";

export const getArticleList = (obj) => {
  return request({
    method: "GET",
    url: "/interview/query",
    // get请求的参数放到params配置项里面
    params: {
      current: obj.current, // 获取第几页的数据
      pageSize: 10, // 每页多少条
      sorter: obj.sorter, // 排序方式，weight_desc获取推荐列表数据
    },
  });
};

// 收藏的列表
export const getArticlesCollect = (page) => {
  return request({
    method: "GET",
    url: "/interview/opt/list",
    params: {
      optType: 2,
      pageSize: 10,
      page,
    },
  });
};

// 喜欢文章的列表
export const getLikeArticle = (page) => {
  return request({
    method: "GET",
    url: "/interview/opt/list",
    params: {
      optType: 1, // 1为喜欢  2为收藏
      pageSize: 10,
      page,
    },
  });
};

// 获取文章详情的接口
export const getArticleDetail = (id) => {
  return request.get("interview/show", {
    params: {
      id,
    },
  });
};

// 点击喜欢的接口
export const updateLike = (id) => {
  return request.post("interview/opt", {
    id,
    optType: 1, // 喜欢
  });
};

// 点击收藏的接口
export const updateCollect = (id) => {
  return request.post("interview/opt", {
    id,
    optType: 2, // 收藏
  });
};
