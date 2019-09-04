
// 这个模块是给vuex做管理的仓库的
//用户管理

//state 是仓库的数据
//mutations 同步修改state的数据 
//actions  异步修改数据，其实也可不用/
export const state =()=>({
    userInfo:{
        token:"",
        user: {},
    },
})


export const mutations ={

 //设置用户信息。mutations下的方法第一个参数固定式state 也就是上面的
 //data参数不是必须的，是调用方法时候传入的参数


 setUserInfo(state,data){
     //data是后台返回的用户信息
     state.userInfo=data;
     
   }

};


export const actions ={};