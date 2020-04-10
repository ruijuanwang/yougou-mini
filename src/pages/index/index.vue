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
	
	</view>
</template>

<script>
	export default {
	
	}
</script>


<style lang='less' scoped>
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

</style>
