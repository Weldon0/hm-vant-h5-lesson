<template>
  <div class="user-page">
    <div class="user">
      <img :src="avatar" alt="" />
      <h3>{{ username }}</h3>
    </div>
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="clock-o" text="历史记录" to="/" />
      <van-grid-item icon="bookmark-o" text="我的收藏" to="/collect" />
      <van-grid-item icon="good-job-o" text="我的点赞" to="/like" />
    </van-grid>

    <van-cell-group class="mt20">
      <van-cell title="推荐分享" is-link></van-cell>
      <van-cell title="意见反馈" is-link></van-cell>
      <van-cell title="关于我们" is-link></van-cell>
      <van-cell @click="logOut" title="退出登录" is-link></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { delToken } from "@/utils/storage";

export default {
  name: "user-page",
  data() {
    return {
      avatar: "",
      username: "",
    };
  },
  async created() {
    // 调用了获取用户信息的接口
    const res = await getUserInfo();
    // 接口里面获取到的个人信息赋值给data里面的数据
    this.avatar = res.data.avatar;
    this.username = res.data.username;
  },
  methods: {
    /**
     *  $dialog.confirm() 会返回一个promise对象
     *  如果用户点击了确认，promise对象的状态就是成功
     *  如果用户点击了取消，promise对象的状态就是失败
     *  通过async await来获取promise对象的结果
     *  如果用户点击了确认，就会执行try里面的代码
     *  如果用户点击了取消，就会执行catch里面的代码
     */
    async logOut() {
      try {
        await this.$dialog.confirm({
          title: "确认退出登录？",
        });
        // console.log("用户点击了确认");

        //   1、清空token
        delToken();
        //   2、跳转登录页面
        this.$router.push("/login");
      } catch (e) {
        console.log("用户点击了取消");
      }
      //   1、弹出一个确认弹层
      //   2、用户点击了确定以后，再退出
      //   3、用户点击了取消，什么事情也不做
    },
  },
};
</script>

<style lang="less" scoped>
.user-page {
  padding: 0 10px;
  background: #f5f5f5;
  height: 100vh;

  .mt20 {
    margin-top: 20px;
  }

  .user {
    display: flex;
    padding: 20px 0;
    align-items: center;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }

    h3 {
      margin: 0;
      padding-left: 20px;
      font-size: 18px;
    }
  }
}
</style>
