<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                  <FlightsItem
                  v-for="(item, index) in flightsData.flights" 
                    :key="index" 
                    />
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItem from "@/components/air/flightsItem.vue"
import moment from "moment";

export default {
    data(){
        return {

             // 机票列表返回的总数据，总数据包含4个属性，flights/info/options/tatol
            flightsData: {} 
        }
    },
    components:{
        FlightsListHead,
        FlightsItem
    },
   
    mounted(){  

    //   console.log(this.$route);这个算是一种方法
    this.$axios({
        url:'airs',
        //这个只可以传对象  上面的console可以教你许多
        params:this.$route.query
    }).then(res=>{
        // console.log(res);
        // 可以打印出后台传给的数据
         // 赋值给总数据
            this.flightsData = res.data;
            // console.log(this.flightsData);想知道上面为什么这样写就打印这个
    })
    }
}
    

</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>