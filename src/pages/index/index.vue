<template>
<!-- 首页 -->
	<view class="content">
		<!-- 搜索 -->
		<view class="search">
			<!-- 搜索框 -->
			<view class="search-input">
				<input type="text" placeholder="请输入要搜索的商品" >
			</view>
			<!-- 搜索内容 -->
			<view class="search-content">
			
			</view>
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

</style>
