import createPersistedState from 'vuex-persistedstate'

// export default ({store})固定格式
//函数有一个参数，这个参数是nuxt对象
export default ({store}) => {
 
//   console.log({store});
  

    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store //可以是任意的字符串
        })(store)
    })
}