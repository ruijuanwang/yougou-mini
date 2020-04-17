<template>
  <view>
    <!-- open-type="getUserInfo" 表示获取用户的信息 通过getuserinfo回调中获取到用户信息-->
    <button open-type="getUserInfo" @getuserinfo='getuserinfo' type="primary">微信登录</button>
  </view>
</template>

<script>
  export default {
    methods:{
      // 调用登录的接口 ： 1.获取用户的信息 2.调用接口 3. 存储token到本地
      // 普通页面是表单 收集用户信息 
      // 小程序中 直接调用收集用户的API
       getuserinfo(user){
        // 说明弹出来一个授权 并且点击了 拒绝或者允许
        // user就是用户的信息对象  user.detail 是用户的信息
        console.log('用户信息',user);
        // 1.如果用户点击了拒绝授权 要return  
        if(user.detail.errMsg==="getUserInfo:fail auth deny"){
          // 说明点击了拒绝
          uni.showToast({title:'您不能拒绝哦', icon:'none'})
          // 要停止操作
          return
        }
        // 2.说明用户点击了允许
        // 我们应该调用接口 获取token 存储token到本地  要设置请求头header "Authorization" : token
        // 接口中还需要一个code参数 我们可以通过 wx.login()获取 有两种写法 回调 和 promise
        wx.login({
          success:async res=>{
          // 成功 res.code 就是code
            console.log(res);
            // 发送登录 的请求 接口
           var res = await this.http({
              url:'/api/public/v1/users/wxlogin',
              method:'POST',
              data:{
                  code:res.code,
                  encryptedData:user.encryptedData,
                  iv:user.iv,
                  rawData:user.rawData,
                  signature:res.signature
              }

            })
            // 成功 这里会报错  因为开发者用的appid账号是自己的  后端用的appid 是 公司的 所以会报错 。我们需要修改appid 改成公司的 前后appid一致了 还有在公司的后台把 开发成员 我的微信添加到成员管理 
            console.log(res);
            

          }
        })
 
        

        
      }
    }

  }
</script>

<style lang="scss" scoped>
  button {
    width: 600rpx;
    margin: 200rpx auto 0;
  }
</style>