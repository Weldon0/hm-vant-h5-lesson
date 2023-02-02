<template>
  <div class="login-page">
    <van-nav-bar title="面经登录"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^\w{6,16}$/, message: '用户名必须6-16位' },
        ]"
      ></van-field>
      <van-field
        type="password"
        name="password"
        v-model="password"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\w{6,16}$/, message: '密码必须6-16位' },
        ]"
        label="密码"
        placeholder="密码"
      ></van-field>
      <div style="margin: 16px">
        <van-button type="info" block>提交</van-button>
      </div>
    </van-form>

    <router-link class="link" to="/register">注册账号</router-link>
  </div>
</template>

<script>
// 用户名是数字字母下划线6位以上 [0-9a-zA-Z_]
import { login } from "@/api/user";
import { setToken } from "@/utils/storage";

export default {
  name: "login-page",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      // 点击提交的时候收集数据
      // 表单需要添加name值才可以正常的收集数据
      const {
        data: { token },
      } = await login(values);
      //   获取到了token，存储到本地存储
      setToken(token);
      this.$toast.success("登录成功");
      //   跳转首页
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
