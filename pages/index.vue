<template>
 <!-- 不懂为啥在用container -->
  <div class="container">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="banner-image" 
        :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;background-size:contain contain;`">          
                                <!-- 从console dir打印出来的 然后拼接 -->
                               
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
 <!-- background-size:contain contain;
        把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。 -->

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [
       
      ]
    };
  },
  mounted(){
    // 原本我们是用import 引入
    // 然后 this.$axios 改写法是通用标准 nuxt帮我们封装好了 如果没有nuxt我们在普通Vue文件里还要添加Vue.prototype.$axios =$axios
    
    // url请求方式看接口文档
    this.$axios({
      url:"/scenics/banners"
    }).then(res=>{
      
      const{data}=res.data;
      
      this.banners =data
    })
   console.dir(this.$axios);
  }
};
</script>

<style scoped lang="less">
// min-width最小宽度
.container {
  min-width: 100;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>