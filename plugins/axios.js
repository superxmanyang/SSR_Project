

//是用于处理axios的请求拦截插件  看官网文档
import { Message } from 'element-ui';


export default({$axios})=>{

    // console.dir(Message);
    // 返回的res是一个错误的对象，Error对象下都有一个response的属性可以访问错误的信息
   

   $axios.onError(res=>{ 
    //    console.dir(res, 123)  用dir可以看得出结果
    
    const {message,statusCode}= res.response.data;


    if(statusCode===400){
        // Message = this.$message
        Message.error(message)

    }
   })
}

