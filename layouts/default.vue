<template>
  <div>
    <!-- 这个是一个公共组件 default-->
    <!-- 渲染头部组件  组件跟第三方才要用native 要看放的东西放在哪里 如果是div啧相反效果 -->
    <Header @myclick="handleLoginOut"  />
     <!-- //  做自定义点击事件的话要放在header这里 因为这个是渲染组件的-->
                                    <!-- abc='123' 放进去上面 Header 组件传值 -->
 
    <!-- 页面的占位符，类似于router-view -->
    <nuxt />

    <!-- 渲染底部组件 -->
   <Footer/>
  </div>
</template>


<script>
// 导入
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
   


  // 注册组件
  components:{
    Header,
    Footer
  },
  
  // ps.组件传值
  // prop:["abc"],
  methods:{
    handleLoginOut(){
      // console.log(123);
     this.$store.commit("user/clearUserInfo")
    }
  }
}
</script>




<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  margin: 0;
  padding: 0;

}
/* ol有序列表 */
ul,li,ol{
  list-style: none;
}

/* 简单理解为斜体字 em为强调 */
i,em{
  font-style: normal;
}


a{
  color: inherit;
  text-decoration: none;
}

a:hover{
  color:inherit;
}
</style>
