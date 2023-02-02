<template>
  <div class="detail-page">
    <van-nav-bar
      @click-left="$router.back()"
      left-text="返回"
      title="面经详情"
      fixed
    ></van-nav-bar>
    <header class="header">
      <h1>{{ article.stem }}</h1>
      <p>
        {{ article.createdAt }} | {{ article.views }} 浏览量 |
        {{ article.likeCount }} 点赞数
      </p>
      <p>
        <img :src="article.avatar" alt="" />
        <span>{{ article.creator }}</span>
      </p>
    </header>
    <main class="body" v-html="article.content"></main>
    <div class="opt">
      <!--点赞功能-->
      <van-icon
        class="van-icon"
        :class="{ active: article.likeFlag }"
        name="like-o"
        @click="toggleLike"
      />
      <!--收藏功能-->
      <van-icon
        name="star-o"
        class="van-icon"
        :class="{ active: article.collectFlag }"
        @click="toggleCollect"
      />
      <!--      <van-icon-->
      <!--        @click="toggleLike"-->
      <!--        :class="{ active: article.likeFlag }"-->
      <!--        name="like-o"-->
      <!--      />-->
      <!--      <van-icon-->
      <!--        @click="toggleCollect"-->
      <!--        :class="{ active: article.collectFlag }"-->
      <!--        name="star-o"-->
      <!--      />-->
    </div>
  </div>
</template>

<script>
import { getArticleDetail, updateCollect, updateLike } from "@/api/article";

export default {
  name: "detail-page",
  data() {
    return {
      article: {},
    };
  },
  async created() {
    // 请求文章详情的接口，请求到的数据赋值给article, 接收的参数是文章的id
    const res = await getArticleDetail(this.$route.params.id);
    this.article = res.data;
  },
  methods: {
    async toggleCollect() {
      // 处理收藏功能
      //   请求接口
      await updateCollect(this.$route.params.id); // 文章的id
      //   切换收藏的标识，界面里面的收藏按钮可以切换高亮效果
      this.article.collectFlag = !this.article.collectFlag;
      //   提示用户收藏或者取消收藏是否成功
      this.$toast.success(
        this.article.collectFlag ? "收藏成功" : "取消收藏成功"
      );
    },
    async toggleLike() {
      // 点赞功能
      // 1、请求接口
      await updateLike(this.$route.params.id);
      // 只要确定接口数据请求成功了，手动修改article里面的likeFlag的状态
      this.article.likeFlag = !this.article.likeFlag;
      // 点赞数应该是加还是减，判断likeFlag
      // 如果likeFlag是存在，点赞数加1，否则点赞数减1
      if (this.article.likeFlag) {
        this.article.likeCount++;
        this.$toast.success("点赞成功");
      } else {
        this.article.likeCount--;
        this.$toast.success("取消点赞成功");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #fec635;
        color: #fff;
      }
    }
  }
}
</style>
