<template>
  <!-- 不懂为啥在用container -->
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;background-size:contain contain;`"
        >
          <!-- 从console dir打印出来的 然后拼接 -->
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row class="search-tab" type="flex">
          <span v-for="(item,index) in options" :key="index"
          @click="handleClick(index)"
          :class="{active:current===index}"
          ><i>{{item.name}}</i>
          </span>
          <!-- :class="{active:current===index}" 对象是键值对 然后从左边到右边 -->
          <!-- 传一个index就知道点击的是哪个 -->
        </el-row>

        <!-- 输入框 -->
        <el-row class="search-input" align="middle" type="flex">
          <input :placeholder="options[current].placeholder"/>
                <!-- 因为会改变所以要动态 options里面的数组 -->
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>
 <!-- background-size:contain contain;
        把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。 -->

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [],
      options: [
        {
          name: "攻略",
          placeholder: "搜索城市",
         
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          
        }
      ],
      //当前的索引
      current:0
    };
  
  },
  mounted() {
    // 原本我们是用import 引入
    // 然后 this.$axios 改写法是通用标准 nuxt帮我们封装好了 如果没有nuxt我们在普通Vue文件里还要添加Vue.prototype.$axios =$axios

    // url请求方式看接口文档
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // 解构操作，变成的非对象
      const { data } = res.data;

      this.banners = data;
    })
  },

  methods:{
    handleClick(index){

      if(index===2){
        this.$router.push("/air")
      }

    this.current = index;
    // console.log(this);
    // 为什么是组件因为打印是整个组件里面的一个元素
  }

  }
}
</script>

<style scoped lang="less">
.container {
  // min-width最小宽度
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
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