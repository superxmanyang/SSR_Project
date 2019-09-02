<template>
 <!-- 不懂为啥在用container -->
  <div class="container">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="banner-image" 
        :style="`background:url(${item.url}) center center no-repeat;background-size:contain contain;
        `">
        <!-- background-size:contain contain;
        把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。 -->
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [
        {
          url: "http://157.122.54.189:9095/assets/images/th03.jfif"
        },
        {
          url: "http://157.122.54.189:9095/assets/images/th04.jfif"
        }
      ]
    };
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