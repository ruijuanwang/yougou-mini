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
      <!-- open-type属性值为"contact" 点击后就会进入客服会话 -->
      <button open-type="contact" class="icon-handset">联系客服</button>
      <text class="cart icon-cart" @click="goCart">购物车</text>
      <text @click="addCard" class="add">加入购物车</text>
      <text class="buy" @click="createOrder">立即购买</text>
    </view>
  </view>
</template>

<script>
  export default {
    data(){
      return{
        goodId:0, // 商品id
        goods:null,  // 用来接收商品详情数据 是个数组[]
        cards:uni.getStorageSync('cards') || [] // 存储购物车的信息, 本地有就用本地的 本地没有就用空数组
      }
    },
    methods: {
      // 点击 加入购物车触发事件
      addCard(){
        // 当点击加入购物车 应该是调用购物车的接口 但是后端没有提供接口，所以加入到本地localstorage
        // 1. 商品信息太多，没必要都加入到本地缓存中 只需要把当前需要的信息 从商品信息里解构出来 加入到cards数组中 存储到本地
        // let { 商品id, 商品价格, 商品名称, 商品图片 } = this.goods
        let { goods_id, goods_price, goods_name, goods_small_logo } = this.goods // 解构需要的商品
        // 2. push之前，我们得判断 这件商品之前有没有加入到过购物车如果有 就把他的数量+1 => goods_number+1
        // 通过 findIndex 遍历 cards 数组 通过goods_id 来判断 
        const index = this.cards.findIndex(item=> {
          // 判断商品 id 是否和 当前商品id 一样
          return item.goods_id === this.goods.goods_id  
          // 找到会返回一个找到的索引 没找到 返回-1
        })
        // 3.判断 返回值是不是 -1 如果是 说明购物车没有此商品 那就应该把它 push 进去
        if( index === -1 ){
          // 说明 没找到
          this.cards.push({
          goods_id,
          goods_price,
          goods_name,
          goods_small_logo,
          goods_number:1, // 数量 默认加一条数据
          goods_checked:true // 需要通过他来判断当前商品在购物车页面是否勾选
        })       
        }else{
          // 说明找到了 购物车有这个商品 我们应该把数量 +1
          // 怎么找 这个 商品 就是 我们找到的这个索引项 就是它的 goods_id
          this.cards[index].goods_number+=1 // 数量 +1
        }
         // 4. 把购物车信息存到本地缓存
        //  uni.setStorageSync("键名",值)
        uni.setStorageSync("cards",this.cards)
        // 5.提示加入成功的信息
        uni.showToast({title:'加入购物车成功'})
       
      },
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
