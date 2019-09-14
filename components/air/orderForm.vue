<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="users[index].id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 移除乘机人 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item"
        v-for="(item,index) in infoData.insurances"  :key="index"
        > 
          <el-checkbox :label="`${item.type}：￥${item.price}/份x1   最高赔付${item.compensation}`" 
          border
          @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名" >
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机"  >
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码"  >
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],

      // 保险数据id的集合
      insurances: [],


      //后台需要的数据
       contactName: "",    // 联系人
       contactPhone: "",   // 联系电话
       captcha: "",        // 验证码
       invoice: false,     // 发票字段，默认false
       seat_xid: "",       // 座位id，来自于url的参数
       air: "" ,           // 航班的id,来自于url的id    







       // 机票的数据
      infoData:[],


    };
  },

  mounted(){
     
    // 可以从$route url看浏览器的url 上面获取id跟seat_xid   
    // 解构是为了方便
   const {id, seat_xid} = this.$route.query;
        // 请求机票数据
        this.$axios({
            url: "/airs/" + id,
            params: {
                seat_xid
            }
        }).then(res => {
            // 保存机票的数据
            this.infoData = res.data;


             // 调用store的方法，把infoData存到store中
             this.$store.commit("air/setInfoData", this.infoData);
        })


         
  },

  methods: {
    // 添加乘机人
    handleAddUsers() {
      // 给users添加多一项
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      // 把users中的某一项删除掉
      //   splice会生成一个新数组 ，slice不行 wc3查阅

      // 删除数组中某个元素使用splice，截取数组中的某一项时候使用slice
      const arr = this.users.splice(index, 1);
      console.log(arr);
    },
 
  // 选中保险时候触发
    handleChange(id){
      
    const index = this.insurances.indexOf(id);
    // console.log(index);

 if(index>-1){
     this.insurances.splice(index,1)
    
 }else{
//      // 添加id到数组
      this.insurances.push(id);
 }
   

    //  console.log( this.insurances);
    },
  
  
    // 发送手机验证码 复制注册registerForm表单的功能
    handleSendCaptcha(){

   // 判断如果手机号码是空，不请求
     if(!this.contactPhone){
         this.$message.error("请输入手机号码");
         return;
     }
     
     
     //发送验证码
     this.$axios({
       url:"/captchas",
       method:"POST",
       data:{
         tel:this.contactPhone //手机号码
       }
     }).then(res=>{
      //  console.log(res);
       // 解构出code属性
      const {code} = res.data;

      // 文档地址：https://element.eleme.cn/#/zh-CN/component/message-box#xiao-xi-ti-shi
     this.$alert(`模拟手机验证码是：${code}`, "提示");
     })    



    },

    // 提交订单
    handleSubmit() {
      // console.log(this.users);
      const data = {
                users: this.users,
                insurances: this.insurances,
                contactName: this.contactName,
                contactPhone: this.contactPhone,
                invoice: this.invoice,
                captcha: this.captcha,
                seat_xid: this.$route.query.seat_xid,
                air: this.$route.query.id
            }
            // console.log(data)
              //提交订单

            // 因为有一个是后台的的错误拦截，我们前端最好自己也写一个
            // 判断乘机人
            if(!this.users[0].username || !this.users[0].id){
                this.$message.error("乘机人不能为空");
                return;
            }
            // 联系人
            if(!this.contactName){
                this.$message.error("联系人不能为空");
                return;
            }
            // 联系电话
            if(!this.contactPhone){
                this.$message.error("联系电话不能为空");
                return;
            }
            // 联系电话
            if(!this.captcha){
                this.$message.error("验证码不能为空");
                return;
            }


             this.$axios({
               url:"/airorders",
               method:"POST",
               headers:{
                   // 可以给接口单独加上请求头
                  Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
               },
               data
             }).then(res=>{
                  console.log(res);
             })

    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>