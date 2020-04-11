<template>
  <!-- 搜索组件 -->
  <view class="search active">
			<!-- 搜索框 -->
			<view class="search-input">
				<input type="text" placeholder="请输入要搜索的商品" >
				<text class="cancel">取消</text>
			</view>
			<!-- 搜索内容 -->
			<view class="search-content">
			
			</view>
	</view>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
// 1.搜索
.search {
	.search-input{
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
	// 取消的原本 样式  是隐藏的
	 .cancel{
      display: none; //默认隐藏
      width: 100rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      color: #333;
  }

	}
   
	// .search.active 交集选择器 控制获取焦点样式
	&.active{
		.search-input{
			display: flex;
			background-color: #eee; // 背景色变成灰色
			input{
				flex:1;		
			}
			// 获取焦点 时取消的样式
			.cancel{
				display: block;

		}
			}
	}
} 	

</style>