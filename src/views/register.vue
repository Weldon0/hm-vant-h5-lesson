<template>
  <div class="login-page">
    <van-nav-bar title="面经注册"></van-nav-bar>
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
        <van-button type="primary" block>注册</van-button>
      </div>
    </van-form>

    <router-link class="link" to="/login">已有账号，去登录</router-link>
  </div>
</template>

<script>
// 用户名是数字字母下划线6位以上 [0-9a-zA-Z_]
import { register } from "@/api/user";

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
      // 收集到的表单数据提交给接口，进行注册逻辑
      await register(values);
      //   注册成功，进行成功的提示
      this.$toast.success("注册成功");
      //   跳转到登录页面
      this.$router.push("/login");
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
