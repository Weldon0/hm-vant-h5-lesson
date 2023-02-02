<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        href="javascript:;"
        :class="{ active: sorter === 'weight_desc' }"
        @click="changeSorter('weight_desc')"
        >推荐</a
      >
      <a
        :class="{ active: sorter === null }"
        href="javascript:;"
        @click="changeSorter(null)"
        >最新</a
      >
      <div class="logo">
        <img src="http://weldon.net.cn/mj-m/img/logo.dbd40807.png" alt="" />
      </div>
    </nav>
    <!--load事件触发时机：内容没有撑起页面的时候，或者滚动到底部的时候(自动触发)-->
    <van-list
      finished-text="没有更多了111"
      :finished="finished"
      v-model="loading"
      @load="onLoad"
    >
      <article-item :item="item" v-for="item in list" :key="item.id" />
    </van-list>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article";

export default {
  name: "article-page",
  data() {
    return {
      list: [],
      current: 1,
      loading: false,
      finished: false,
      sorter: "weight_desc",
    };
  },
  async created() {},
  methods: {
    changeSorter(type) {
      this.sorter = type;

      // 重新请求数据了 ==> 重置所有的状态
      this.current = 1; // 第一页开始请求
      this.list = []; // 把原有的数据清空
      this.finished = false; // 数据没有请求完毕
      this.loading = true; // 开始请求数据，节流阀开启
      this.onLoad(); // 请求数据
    },
    // 1、只要load事件触发，list组件内部就会自动把loading设置为true，表示正在请求当中，此时load事件不会重复触发
    // 2、数据请求完毕，需要关闭loading，为了后续页面下拉的时候可以继续发起请求
    async onLoad() {
      // 只要load这个事件触发，list组件内部就会自动把loading设置为true
      // 加载更多数据
      // 掉接口
      const res = await getArticleList({
        current: this.current,
        sorter: this.sorter, // 数据的类型
      });
      // 一直把上一次的数据直接替换了
      // 把新获取的数据和老的数据进行拼接复制给list(老的数据也需要展示)
      this.list = [...this.list, ...res.data.rows];
      // 让请求的current自增
      this.current++;
      // 请求完毕的时候，让loading变成false，load事件才会后续触发
      this.loading = false;

      // 数据加载完的时候，finished变成true, 表示没有更多数据了
      if (this.current > res.data.pageTotal) {
        this.finished = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
