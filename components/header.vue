<template >
  <div class="container">
    <!-- 灵活对方方式 -->
    <!-- justify-content:space-between; 左右贴边对齐 -->
    <!-- 文档： https://element.eleme.cn/#/zh-CN/component/layout#dui-qi-fang-shi -->
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>

      <!-- 为什么这里不需要因为nuxt规定的 在pages 下的页面可以直接通过路径访问，默认查找index. vue -->
      <!-- nuxt-link的作用和使用方式和router-link -->

      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 登陆跳转 -->
      <!-- v-if v-else 简单理解 就是得到的boolean再来渲染页面 -->
      <!-- <div v-if="!$store.state.user.userInfo.token"> -->
       <div v-if="!$store.state.user.userInfo.token"> 
        <nuxt-link to="/user/login">登陆 / 注册</nuxt-link>
      </div>

      <div v-else>
        <!-- {{$store.state.user.userInfo.user.nickname}} -->
        <el-dropdown>
  
          <span class="el-dropdown-link">  
<!-- 不懂为什么在axios下面获取链接加在下面在打印看看   store是固定写法 state是仓库的数据 state.user.userInfo是看看user.js里面 配合console可以理解 剩下的看控制台network-->
             <!-- 头像,昵称 -->
            <img :src="` ${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar} `" >
             <span>{{$store.state.user.userInfo.user.nickname}}</span>                          
           <i class="el-icon-arrow-down el-icon--right"></i>                        
            
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
             <!-- click.native 给第三方组件添加事件需要加上native -->
            <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
  <!-- // 这里设置一个单独的组件是为了有公共的样式 -->
</template>

<script>
export default {
  //组件加载
  mounted() {
    // console.dir(this.$axios);
    // console.log(this.$store.state.user.userInfo.token);
     this.$emit("myclick")
    //  做自定义点击事件的话要放在这里
  },
  methods:{
    handleLogout(){
      // console.log(123);
      // 清除登录信息      路径
      this.$store.commit("user/clearUserInfo")
      this.$message({
                type:"success",
                message: "退出成功"
            })
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #ddd;
}

.main {
  width: 1000px;
  margin: 0 auto;
}

.navs {
  flex: 1;
  margin-left: 10px;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    }
  }
  // 该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class

  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.logo {
  padding-top: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}
.el-dropdown-link img{
        width: 36px;
        height:36px;
        border-radius: 50%;
        vertical-align: middle;
        box-sizing: border-box;
        border:2px #fff solid;
        &:hover{
            border:2px #409eff solid;
        }
    }
</style>