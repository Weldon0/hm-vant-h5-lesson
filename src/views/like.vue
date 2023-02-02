<template>
  <div class="collect-page">
    <van-nav-bar title="我的喜欢" fixed></van-nav-bar>
    <van-list
      v-model="loading"
      @load="onLoad"
      :finished="finished"
      finished-text="没有更多数据了"
    >
      <article-item v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<script>
// 导入获取收藏数据的接口
import { getLikeArticle } from "@/api/article";
export default {
  name: "collect-page",
  data() {
    return {
      list: [], // 文章列表
      page: 1, // 请求的是第几页的数据
      loading: false, // 是否正在加载
      finished: false, // 数据请求完毕
    };
  },
  methods: {
    async onLoad() {
      // 1、请求喜欢文章的接口
      const res = await getLikeArticle(this.page);
      // 2、请求到的数据拼接复制给list
      this.list = [...this.list, ...res.data.rows];
      // 3、请求完成以后loading关闭
      this.loading = false;
      // 4、page自增
      this.page++;
      // 5、判断数据是否请求完毕，如果完毕开启finished属性
      if (this.page > res.data.pageTotal) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
