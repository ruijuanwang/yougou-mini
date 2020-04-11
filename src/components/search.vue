<template>
  <!-- 搜索组件  动态绑定类名 获取焦点显示 active 的样式-->
  <view class="search" :class="{active:isfocus}">
			<!-- 搜索框 -->
			<view class="search-input">
				<input @focus="goSearch" type="text" placeholder="请输入要搜索的商品" >
				<text @click="goCancel" class="cancel">取消</text>
			</view>
			<!-- 搜索内容  显示的时候要沾满屏幕-->
			<view class="search-content">
			
			</view>
	</view>
</template>

<script>
export default {
	data(){
		return{
			isfocus:false // 默认不显示类名
		}
	},
	methods:{
		// 获取焦点的方法
		goSearch(){
			this.isfocus=true // 显示类名

		},
		// 点击取消 
		goCancel(){
			this.isfocus=false //隐藏active 
		}
	}

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
   
// .search.active 交集选择器 控制获取焦点样式  获取焦点 才显示这些样式
&.active{
	 // 大盒子占满屏幕
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:999;
    background-color: pink;
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
	// 搜索历史内容部分占满剩下的 
    .search-content{
      position: absolute;
      top: 97rpx;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
    }
}
	
} 	

</style>