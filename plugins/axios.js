

//是用于处理axios的请求拦截插件  看官网文档 调用 Message 或 this.$message 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 close 方法。
import { Message } from 'element-ui';

                //  原本是一个nuxt
export default({$axios,redirect })=>{

    // console.dir(Message);
    // 返回的res是一个错误的对象，Error对象下都有一个response的属性可以访问错误的信息
   

   $axios.onError(res=>{ 
    //    console.dir(res, 123)  用dir可以看得出结果
    
    const {message,statusCode}= res.response.data;


    if(statusCode===400){
        // Message = this.$message
        Message.error(message)

    }


    if(statusCode===401||statusCode===403){

        Message.error("请登录！")
        // 跳转到登录页
        redirect("/user/login");
    }
   })
}

