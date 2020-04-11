<template>
<!-- 首页 -->
	<view class="content">
		<!--1. 搜索 -->
		<view class="search">
			<!-- 搜索框 -->
			<view class="search-input">
				<input type="text" placeholder="请输入要搜索的商品" >
			</view>
			<!-- 搜索内容 -->
			<view class="search-content">
			
			</view>
		</view>
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
	
	</view>
</template>

<script>
	export default {
	
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
</style>
