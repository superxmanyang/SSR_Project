<template>
  <!-- :model绑定数据对象 -->
  <!-- ref：获取dom元素 ，this.$refs.from用在方法里-->
  <!-- rules:验证规则 -->
                                                      <!-- 如果没写这个会报错 -->
  <el-form class="form" :model="form" :rules="rules" ref="form">
    <el-form-item class="form-item" prop="username">
      <!-- 用户名的输入框 -->
      <!-- v-model双向绑定显示数据一个在下面 -->
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <!-- 密码的输入框 -->

    <el-form-item class="form-item" prop="password">
      <!-- v-model双向绑定显示数据一个在下面 -->
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <!-- 登录按钮 -->
    <!-- 按钮颜色  点击事件 -->
    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      form: {
        username: "",
        password: ""
      },
      rules: {
        // 表单规则,只负责提示，但是表单还是可以提交      //    触发效果   失去焦点
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  //   方法点击事件
  methods: {
    //   上面的事件之一
    handleLoginSubmit() {
      //   console.log(this.form);
      //   不可能给用户看
      // element-ui的验证表单的事件
      this.$refs.form.validate(valid => {
        // 当valid的值等于true说明表单验证通过
        if (valid) {
            
            console.log(this.form);
        } else {
          console.log("验证失败");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
