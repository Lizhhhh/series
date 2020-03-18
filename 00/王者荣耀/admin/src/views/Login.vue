<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      // 登录请求,返回的是一个token
      const res = await this.$http.post('login', this.model)
      // 将token存入localStorage中(前端磁盘),浏览器关闭了,下次还能访问到
      localStorage.token = res.data.token
      // 跳转
      this.$router.push('/')
      // 弹出登录成功
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>
<style>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>