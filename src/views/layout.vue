<template>
  <div class="layout-page">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="fire-o" to="/article">面经</van-tabbar-item>
      <van-tabbar-item icon="star-o" to="/collect">收藏</van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/like">点赞</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout-page",
};
</script>

<style lang="less" scoped></style>
