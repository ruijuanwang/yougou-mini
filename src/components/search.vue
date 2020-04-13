<template>
  <!-- 搜索 -->
  <div class="search" :class="{active: isfocus}">
    <!-- 搜索框 -->
    <div class="input-wrap" @click="goSearch">
		<!-- 双向绑定输入框 confirm :小程序的回车事件-->
    <input @confirm="goList" v-model="keyword" @input="query" type="text" placeholder="请输入要搜索的商品" >
      <span class="cancle" @click.stop="goCancel">取消</span>
    </div>
    <!-- 搜索结果 -->
    <div class="search-content">
		<!-- removeHistory : 清空历史记录方法 -->
      <div class="title">搜索历史<span @click="removeHistory" class="clear"></span></div>
      <div class="history" >
	    <!-- 循环历史记录 -->
        <navigator v-for="item in history" :key="item"  url="/pages/list/index">{{ item }}</navigator>
        
      </div>
      <!-- 联想搜索 结果 -->
	  <!-- 有联想搜索的时候就显示 不然不显示 -->
      <scroll-view v-if="list.length" scroll-y class="result">
		  <!-- 循环渲染 联想搜索 -->
        <navigator v-for="item in list" :key="item.goods_id" url="/pages/goods/index">{{item.goods_name}}</navigator>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isfocus: false,
        placeholder: '',
		keyword:'', // 输入框内容
		list:[], // 接收联想搜索的内容
		history: uni.getStorageSync('history') || [] // 搜索过的关键字 使用短路表达式从本地缓存获取
      }
    },
    methods: {
		// 点击 × 清空历史记录 事件
		removeHistory(){
			// 1. 本地清空历史记录  
			this.history=[]
			// 2.清空本地缓存的历史记录 uni.removeStorageSync('键名')
			uni.removeStorageSync('history')
		},
		// 回车触发的事件
		goList(){
			// 2.回车 把搜索关键字加入到data历史搜索中
		    this.history.push(this.keyword)
			this.keyword='' // 回车清空输入框
			// 历史记录去重
			this.history=[...new Set(this.history)]
			// 存入本地缓存  (注意 要把历史纪录 取出来渲染页面)
			// wx.setStorage('键名','值可以是任何类型')
			uni.setStorageSync('history',this.history)
			
			// 1.应该跳到跳转到商品列表页面  并携带文本框的关键字为参数
			// wx.navigateTo 小程序中的js跳转
			uni.navigateTo({
				url:'/pages/list/index?query='+this.keyword // 跳转的地址?参数
			})
		},
	  	// 输入框发生变化的时候执行
		async query(){
			// 调用接口 获取联想数据
			const res=await this.http({
				url:"/api/public/v1/goods/qsearch",
				data:{
					query:this.keyword // 传入data参数 是当前文本框输入的关键字
				}
			})
			// await 下面 执行成功
			// console.log(res);
			this.list=res.message // 结果赋值给data中
		},
      goSearch (ev) {
        // 获取焦点 isfocus true 加上 active
        this.isfocus=true;
        // 获取屏幕高度 微信提供了
        // wx. ---》换成 uni. 就行
        let res= uni.getSystemInfoSync()
        // console.log('结果',res)
        this.$emit("my",res.windowHeight+'px')

        // 隐藏tabBar
        uni.hideTabBar();
      },
	//   点击取消事件 
      goCancel () {
		//   1.清空输入框 2.清空联想搜索列表
		this.keyword='' //清空输入框
		this.list=[] // 清空联想搜索列表
        // 取消 isfocus false 加上 active
        this.isfocus=false;

        // 触发父组件自定义事件
        this.$emit('my', 'auto');

        // 显示tabBar
        uni.showTabBar();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    flex-direction: column;
    
    // 搜索框
    .input-wrap {
      display: flex;
      height: 100rpx;
      padding: 20rpx 30rpx;
      background-color: #ea4451;
      box-sizing: border-box;
      position: relative;

      // &::before,
      // &::after {
      //   height: 44rpx;
      //   line-height: 1;
      //   background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      //   background-size: 32rpx;
      //   background-position: 6rpx center;
      //   background-repeat: no-repeat;

      //   position: absolute;
      //   top: 28rpx;
      //   z-index: 9;
      // }

      // &::before {
      //   content: '搜索';
      //   display: block;

      //   width: 100rpx;
      //   padding: 11rpx 0 10rpx 44rpx;
      //   box-sizing: border-box;
      //   color: #666;
      //   font-size: 24rpx;
      //   left: 325rpx;
      // }

      // &::after {
      //   display: none;
      //   content: '';
      //   width: 44rpx;
      //   left: 40rpx;
      // }

      input {
        flex: 1;
        height: 60rpx;
        padding: 0 20rpx 0 64rpx;
        background-color: #fff;
        border-radius: 8rpx;
        font-size: 24rpx;
        color: #666;
      }

      span.cancle {
        display: none;
        width: 80rpx;
        text-align: right;
        line-height: 60rpx;
        font-size: 27rpx;
        color: #666;
      }
    }

    // 搜索结果
    .search-content {
      display: none;
      flex: 1;
      padding: 27rpx;
      background-color: #fff;
      position: relative;

      .title {
        font-size: 27rpx;
        line-height: 1;
        color: #333;
      }

      .clear {
        display: block;
        width: 27rpx;
        height: 27rpx;
        float: right;
        background-image: url(http://static.botue.com/ugo/images/clear.png);
        background-size: cover;
      }

      .history {
        padding-top: 30rpx;

        navigator {
          display: inline-block;
          line-height: 1;
          padding: 15rpx 20rpx 12rpx;
          background-color: #ddd;
          font-size: 24rpx;
          margin-right: 20rpx;
          margin-bottom: 15rpx;
          color: #333;
        }
      }

      .result {
        // display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;

        navigator {
          line-height: 1;
          padding: 20rpx 30rpx;
          font-size: 24rpx;
          color: #666;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    
    // 获得焦点状态
    &.active {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 9;

      .input-wrap {
        background-color: #eee;

       
      }

      span.cancle {
        display: block;
      }

      .search-content {
        display: block;
      }
    }
  }
</style>