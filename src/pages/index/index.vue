<template>
<!-- 首页 -->
	<view class="index">
		<!--1. 搜索 组件-->
		<search></search>
		<!--2. 轮播图 -->
		<view class="swiper-box">
			<!-- 轮播图组件  indicator-dots 显示圆圈 autoplay 自动播放 -->
			<swiper indicator-dots :autoplay="true" >
				<!-- 第一个轮播图 -->
				<swiper-item>  
					<!-- 点击图片要跳转 要用导航组件包裹 -->
					<navigator url="">
						<image src="../../static/uploads/banner1.png"></image>
					</navigator>
				</swiper-item>
				<!-- 第二个轮播图 -->
				<swiper-item>  
					<navigator url="">
						<image src="../../static/uploads/banner2.png"></image>
					</navigator>
				</swiper-item>
				<!-- 第三个轮播图 -->
				<swiper-item>  
					<navigator url="">
						<image src="../../static/uploads/banner3.png"></image>
					</navigator>
				</swiper-item>
		</swiper>
		</view>
		<!-- 3.导航菜单 -->
		<view class="navs">
			<!-- 导航组件包裹图片 点击图片要跳转  文字和图标是一张图片 -->
			<!-- 第1个导航 -->
			<navigator>
				<image src="../../static/uploads/icon_index_nav_1@2x.png">
				</image>
			</navigator>
			<!-- 第2个导航 -->
			<navigator>
				<image src="../../static/uploads/icon_index_nav_2@2x.png">
				</image>
			</navigator>
			<!-- 第3个导航 -->
			<navigator>
				<image src="../../static/uploads/icon_index_nav_3@2x.png">
				</image>
			</navigator>
			<!-- 第4个导航 -->
			<navigator>
				<image src="../../static/uploads/icon_index_nav_4@2x.png">
				</image>
			</navigator>
		</view>
		<!-- 4.楼层 外面大盒子，里面有第三个楼层-->
	     <view class="box">
			<!-- 4.1 第1个楼层时尚女装  标题是尚女装是个图片，下面是五张图片点击可跳转 -->
			<view class="floor">
				<!-- 4.1.1标题 -->
				<view class="floor-title">
					<image src="../../static/uploads/pic_floor01_title.png"></image>
				</view>
				<!-- 4.1.2 五张图片 外面用一个view 里面 用导航包裹每一张图片 -->
				<view class="item">
					<navigator url="">
						<image src="../../static/uploads/pic_floor01_1@2x.png"></image>
					</navigator>
					<navigator url="">
						<image src="../../static/uploads/pic_floor01_2@2x.png"></image>
					</navigator>
					<navigator url="">
						<image src="../../static/uploads/pic_floor01_3@2x.png"></image>
					</navigator>
					<navigator url="">
						<image src="../../static/uploads/pic_floor01_4@2x.png"></image>
					</navigator>
					<navigator url="">
						<image src="../../static/uploads/pic_floor01_5@2x.png"></image>
					</navigator>
				</view>
				
			</view>
			<!-- 4.2 第2个楼层 -->
			<view class="floor">
				<!-- 4.2.1标题 -->
				<view class="floor-title">
					<image src="../../static/uploads/pic_floor01_1@2x.png"></image>
				</view>
				<!-- 4.2.2 五张图片 外面用一个view 里面 用导航包裹每一张图片 -->
				<view class="item">
					<navigator>
                        <image src="../../static/uploads/pic_floor02_1@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor02_2@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor02_3@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor02_4@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor02_5@2x.png"></image>
                    </navigator>
				</view>
				
			</view>
			<!-- 4.3 第3个楼层 -->
			<view class="floor">
				<!-- 4.3.1标题 -->
				<view class="floor-title">
					<image src="../../static/uploads/pic_floor02_title.png"></image>
				</view>
				<!-- 4.3.2 五张图片 外面用一个view 里面 用导航包裹每一张图片 -->
				<view class="item">
					<navigator>
                        <image src="../../static/uploads/pic_floor03_1@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor03_2@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor03_3@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor03_4@2x.png"></image>
                    </navigator>
                    <navigator>
                        <image src="../../static/uploads/pic_floor03_5@2x.png"></image>
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
		methods:{
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
			async getSwiper(){
			// 调用方法 传入options 请求参数对象 通过 this.http()调用
			// 注意这里返回的是一个 promise 所以我们要用 async和 await
				const res = await this.http({
					url:'/api/public/v1/home/swiperdata' // 请求地址 只传后面的 因为封装的时候已经传入了基地址
			})
			// await 下面的 表示成功执行
			console.log(res);
			
			}			
		},
		// 钩子函数 onLoad中获取数据
			onLoad(){
				this.getSwiper() // 获取轮播图数据
			}
	
	}
</script>


<style lang='less' scoped>
// 1.搜索
.search .search-input{
	background-color: #ea4451;
	padding: 20rpx 15rpx;
		input {
		background-color: #fff;
		height: 60rpx;
		border-radius: 5rpx;
		font-size: 28rpx;
		color: #ccc;
		padding-left: 10rpx;
	}	
}
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
