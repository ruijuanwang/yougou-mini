import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 封装request请求工具  所有的组件可以通过 this.http() 调用 
Vue.prototype.http=async function(options){
   // 发送请求 打开 loading状态
    uni.showLoading({title:'加载中'})
  // 设置基地址：
  let baseURL="https://www.uinav.com"
  const res = await uni.request({
    url:baseURL+options.url, // 请求接口的地址
    data:options.data, // data参数
    method:options.method?options.method:'GET' // 请求方式判断一下
  })
  // await 下面的代码，是请求成功执行
  // 请求成功 隐藏 loading状态
    uni.hideLoading({title:'加载中'})
  // 请求成功 我们应该返回请求的结果，但是这里的请求结果 是promise的 
  // res[1].data是轮播图数据，我们直接返回
  return res[1].data

}

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
