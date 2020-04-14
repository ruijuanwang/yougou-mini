<template>
  <view class="wrapper">
    <!-- 商品图片 -->
    <swiper class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <!-- 循环渲染轮播图  -->
      <swiper-item v-for="item in goods.pics" :key="item.goods_id">
        <image :src="item.pics_big_url"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <view class="meta">
      <view class="price">￥{{ goods.goods_price }}</view>
      <view class="name">{{ goods.goods_name }}</view>
      <view class="shipment">快递: 免运费</view>
      <text class="collect icon-star">收藏</text>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <rich-text :nodes="goods.goods_introduce"></rich-text>
    </view>
    <!-- 操作 -->
    <view class="action">
      <button open-type="contact" class="icon-handset">联系客服</button>
      <text class="cart icon-cart" @click="goCart">购物车</text>
      <text class="add">加入购物车</text>
      <text class="buy" @click="createOrder">立即购买</text>
    </view>
  </view>
</template>

<script>
  export default {
    data(){
      return{
        goodId:0, // 商品id
        goods:null  // 用来接收商品详情数据 是个数组[]
      }
    },
    methods: {
      // 通过id 获取详情页的数据方法
      async getGoodsDetail(){
        // 调用接口
        const res = await this.http({
          url:"/api/public/v1/goods/detail",
          data:{
            goods_id:this.goodId // 传入data参数 商品id
          }
        })
        // await 下面 成功执行
        console.log('商品详情',res);
        this.goods = res.message // 商品详情数据赋值到data数组中       
      },
      goCart () {
        uni.switchTab({
          url: '/pages/cart/index'
        })
      },
      createOrder () {
        uni.navigateTo({
          url: '/pages/order/index'
        })
      }
    },
    onLoad(params){
      // 接收商品id
      console.log('商品id：',params.id);
      this.goodId=params.id // 商品id赋值到data
      // 2. 获取商品详情
      this.getGoodsDetail()
     
      
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 640rpx;
  }
  
  .meta {
    height: 250rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 20rpx;
    }

    .name {
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 24rpx;
      color: #999;

      position: absolute;
      right: 10rpx;
      top: 91rpx;
    }

    [class*="icon-"]::before {
      display: block;
      font-size: 45rpx;
      margin-bottom: 10rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    text {
      display: block;
    }

    .add, .buy {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 210rpx;
      text-align: center;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      text-align: center;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
    }

    [class*="icon"]::before {
      display: block;
      font-size: 45rpx;
      margin-bottom: 2rpx;
    }
  }
</style>
