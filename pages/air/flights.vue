<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="flightsData" />
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsListHead/>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <!-- 下面是儿子，这个是爸爸 -->
                  <FlightsItem
                  v-for="(item, index) in dataList" 
                    :key="index" 
                    :data="item"
                    
                    />
                       
                    
                    <!-- 分页 -->
                    <!-- size-change：每页条数切换时候触发 -->
                    <!-- current-change：页码切换时候触发 -->
                    <!-- current-page: 当前的页码 -->
                    <!-- page-size: 当前显示的条数 -->
                    <!-- total: 总条数 -->

                    <el-pagination
                     @size-change = "handleSizeChange"
                     @current-change = "handleCurrentChange"
                         :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    >
                     
                    </el-pagination>
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
import FlightsFilters from "@/components/air/flightsFilters.vue"

export default {
    data(){
        return {

             // 机票列表返回的总数据，总数据包含4个属性，flights/info/options/tatol
            flightsData: {
                 info: {}
                 //这里必须放个空对象info，因为不放会Cannot read property 'departCity' of undefined
                 //因为axios 先请求组件，组件先进里面就会变成空的，我们在这加一个，就算是空的，请求回来起码是个空对象不会报错。
            } ,
              
             // 当前显示的列表数组
             dataList:[],
             
             pageIndex:1, // 当前的页码
            pageSize: 5, // 当前的条数
            total: 0     // 总条数
        }
    },
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters
    },
   
    mounted(){  



//   上面return有数据，下面就用this


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
            // console.log("--------------");
            // console.log(this.flightsData);
            // console.log("-------------------");
            // 想知道上面为什么这样写就打印这个



            // 分页的总条数
            this.total=this.flightsData.flights.length;

             // 第一页的值
            this.dataList=this.flightsData.flights.slice(0,this.pageSize);

            console.log(this.dataList);
    })
    },


    methods:{
        // 事件里都是自己起的


        // 每页条数切换时候触发  val是条数
        handleSizeChange(val){
        //   console.log(val);
          this.pageSize = val;

           // 按照数学公式切换dataList的值
            this.dataList = this.flightsData.flights.slice(0, val);

        },

        // 页码切换时候触发, val是点击的页码
        handleCurrentChange(val){
            // console.log(val);

            this.pageIndex=val; // 当前页


             // 按照数学公式切换dataList的值
             this.dataList = this.flightsData.flights.slice(
                 (this.pageIndex-1)*this.pageSize,
                 this.pageIndex*this.pageSize
             )
        }
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