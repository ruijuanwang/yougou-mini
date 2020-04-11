<template>
<!-- 首页 -->
	<view class="index" :style="{overflow:'hidden',height:h}">
		<!--1. 搜索 组件-->
		<!-- 接收自定义事件并且接收参数 -->
		<search @my="getHeight"></search>
		<!--2. 轮播图 -->
		<view class="swiper-box">
			<!-- 轮播图组件  indicator-dots 显示圆圈 autoplay 自动播放 -->
			<swiper indicator-dots :autoplay="true" >
				<!-- 轮播图 循环生成-->
				<swiper-item v-for="(item,index) in swiperdata" :key="index">  
					<!-- 点击图片要跳转 要用导航组件包裹 -->
					<navigator url="/pages/goods/index">
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
		</swiper>
		</view>
		<!-- 3.导航菜单 -->
		<view class="navs">
			<!-- 导航组件包裹图片 点击图片要跳转  文字和图标是一张图片 -->
			<!-- 循坏导航 -->
			<navigator v-for="(item,index) in navslist" :key="index" url="/pages/category/index">
				<image :src="item.image_src">
				</image>
			</navigator>
		</view>
		<!-- 4.楼层 外面大盒子，里面有第三个楼层-->
	     <view class="box">
			<!-- 4.1 第1个楼层时尚女装  标题是尚女装是个图片，下面是五张图片点击可跳转 -->
			<view v-for="(item,index) in floors" :key="index" class="floor">
				<!-- 4.1.1标题 -->
				<view class="floor-title">
					<image :src="item.floor_title.image_src"></image>
				</view>
				<!-- 4.1.2 五张图片 外面用一个view 里面 用导航包裹每一张图片 -->
				<view class="item">
					<navigator v-for="pro in item.product_list"  :key="pro"  url="">
						<image :src="pro.image_src"></image>
					</navigator>
				</view>				
			</view>
		 </view>
	
	</view>
</template>

<script>
import search from '@/components/search.vue' // 引入搜索组件
	export default {
		// 注册组件
		components:{
			search  // 注册搜索组件
		},
		data(){
			return{
				h:'auto' ,// 绑定 height 默认auto
				swiperdata:[], // 接收轮播图的数组
				navslist:[], // 接收导航九宫格菜单 数据
				floors:[] // 接收楼层数据
			}
		},
		methods:{
			// h接收子传来的值
			getHeight(h){
				this.h=h // 给到data中的高度height

			},
			// 请求轮播图的方法

			// // ----------------------------------------第1种请求方式：回调的方法
			// getSwiper(){
			// 	// 调用接口 原生是wx.request({}) 这里要用 uni.request({}) 
			// 	uni.request({
			// 		url:'https://www.uinav.com/api/public/v1/home/swiperdata',
			// 		method:'GET',
			// 		success:(res)=>{
			// 			console.log(res);						
			// 		}

			// 	})

		
			// // ----------------------------------------第2种请求方式：promise方式 uniapp封装的
			// async getSwiper(){
			// 	const res = await uni.request({
			// 		url:'https://www.uinav.com/api/public/v1/home/swiperdata',
			// 	})
			// 	// 请求成功 执行await下面的代码
			// 	console.log(res);	 //res = [null, {…}]	
			// 	//  res[0] 是 null 轮播图数据在 res[1].data中  
			// }
			// // ----------------------------------------使用我们在main.js中封装的请求方法
			// 1.发送请求 获取轮播图数据
			async getSwiper(){
			// 调用方法 传入options 请求参数对象 通过 this.http()调用
			// 注意这里返回的是一个 promise 所以我们要用 async和 await
				const res = await this.http({
					url:'/api/public/v1/home/swiperdata' // 请求地址 只传后面的 因为封装的时候已经传入了基地址
			})
			// await 下面的 表示成功执行
			console.log("轮播图数据：",res);
			this.swiperdata=res.message // 轮播图数组赋值到data数组中			
			},
			// 2.发送请求 获取导航九宫格数据
			async getNavs(){
				// 用自己封装的发送请求
				const res = await this.http({
					 url:"/api/public/v1/home/catitems"
				})
				// await 下面 表示执行成功
				console.log('导航菜单',res);
				this.navslist=res.message // 导航菜单数据给到data数组中
				
			},
			// 3.发送请求 获取楼层数据
			async getFloors(){
				const res= await this.http({
					 url:"/api/public/v1/home/floordata"
				})
				// await 下面 成功执行
				console.log("楼层数据",res);
				this.floors=res.message // 楼层数据给到data数组中
				
			}			
		},
		// 钩子函数 onLoad中获取数据
			onLoad(){
				this.getSwiper() // 获取轮播图数据
				this.getNavs() // 获取导航菜单数据
				this.getFloors() // 获取楼层数据
			}
	
	}
</script>


<style lang='less' scoped>

// 2.轮播图
.swiper-box{
	swiper{
		height: 340rpx;
	}
	image{
		width: 750rpx;
		height: 340rpx;
	}
}
// 3.导航菜单
.navs {
   display: flex;
   flex-wrap: wrap;
   padding: 30rpx 0;
   navigator{
     width: 25%;
     display: flex;
     justify-content: center;
     align-items: center;
     image {
       width: 128rpx;
       height: 140rpx;
     }
   }
}
.box {
    .floor {
        .floor-title{
          padding-top: 30rpx;
          background-color: #f4f4f4;
          image {
            width: 750rpx;
            height: 60rpx;
          }
        }
        // 五个图片
        .item {
            padding: 20rpx 15rpx;
            overflow: hidden; // 清除浮动 有高度
            navigator{
              float: left;
              margin-left: 10rpx;
              margin-bottom: 10rpx;
              width: 193rpx;
              height: 188rpx;           
            }
            navigator:nth-child(1){
                margin-left:0;
                width: 232rpx;
                height: 386rpx;
            }
            navigator:nth-child(2),
            navigator:nth-child(5){
                width: 272rpx;
            }

        }
    }
    // 处理 第一个floor 的 2 5 两张图片宽度
    .floor:nth-child(1){
      .item{
        navigator{
          width: 233rpx;
        }
      }
       
    }
}
</style>
