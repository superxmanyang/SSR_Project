<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>
  <!-- 该表单没有model和rules -->
        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">


                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                  <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo -->

                <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
                <!-- select：在下拉框中选中时候时候触发的事件 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>  
            </el-form-item>


            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>



            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
              
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>



            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>



            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>


        </el-form>  
      </div>
</template>

<script>
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            // data:""
            form:{
               departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "",
                destCode: "",
                departDate: ""
                // 这个应该是自己起的名字明天问大哥
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        
          // value是输入框的值
        // cb是一个回调函数必须要调用，参数的值会显示在下拉框中。
        // cb调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性  
        queryDepartSearch(value, cb){
          //  var res=([
          //       {value: 1,name:'papan'},
          //       {value: 2},
          //       {value: 3},
          //   ]);
            if(!value){
                return;
            }
            // 发现一个会出现所有的秘密
          this.$axios({
             // get参数
            url:"/airs/city",
            params:{
               // 输入框的关键字 应该是get请求的方法明天问大哥
               name:value
            }
          }).then(res=>{
            //  console.log(res.data);
            // 可以看到我们下拉列表的东西是没有'是没有市'这个字
            const{data} = res.data;
            // 分解这个出来为了下面方面用
           

            // 给数组中每个对象添加value属性
            const newData=[];

            data.forEach(v=>{
              v.value=v.name.replace("市","");  //标记问大哥
               // 把带有value属性的对象添加到新数组中
               newData.push(v);
            })
            cb(newData)
          })
          //  cb(res)
        },

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            cb([
                {value: 1},
                {value: 2},
                {value: 3},
            ]);
        },
       
        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            console.log(item);
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            
        },

        // 确认选择日期时触发l
        // 里面的valus是日期，等等我们用momentjs
        handleDate(value){
           console.log(value);
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            
        },

        // 提交表单是触发
        handleSubmit(){
           
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
