<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <view class="dt">收货人: </view>
      <view class="dd meta">
        <text class="name">刘德华</text>
        <text class="phone">13535337057</text>
      </view>
      <view class="dt">收货地址:</view>
      <view class="dd">广东省广州市天河区一珠吉</view>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <!-- 循环渲染 购物车数据 carts -->
        <view v-for="(item,index) in carts" :key="item.goods_id" class="goods">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_small_logo"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{item.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <!-- 点击减 传入当前点击索引 数量减1  -->
              <text @click="reduceNum(index)" class="reduce">-</text>
              <!-- 商品数量 -->
              <!-- 可以自己输入 输入框发生变化 触发@input事件  -->
              <input @input="setValue(index,$event)" type="number" :value="item.goods_number" class="number">
              <!-- 点击+ 数量加1 触发点击事件 并传入当前商品的索引 -->
              <text @click="addNum(index)" class="plus">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <!-- color="#ea4451" 勾选颜色  color="#ccc"  未勾选颜色 根据item.goods_checked 的布尔值来判断-->
            <!-- 默认 true -->
            <!-- 点击图标 勾选变未勾选， 未勾选变勾选 -->
            <icon @click="toggle(index)" type="success" size="20" :color="item.goods_checked ? '#ea4451':'#ccc'"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
		<!--全选根据计算属性来判断 是全部勾选或者不是全部勾选 allChecked是计算属性 -->
        <icon type="success" :color="allChecked ?'#ea4451':'#ccc'" size="20"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label>14110</label><text>.00</text>
      </view>
      <view class="pay">结算(3)</view>
    </view>
  </view>
</template>

<script>
  export default {
    data(){
      return{
        carts:[] // 用来存 购物车信息的数组
      }
    },
    computed:{
      // 计算属性名 ：方法
      // checkedGoods 计算属性的值 是全部勾选的状态
      checkedGoods(){
        // 用来判断cards中 goods_checked 为true的 商品 返回选中的商品
        // 使用filter 循环数组 他会返回一个满足条件的新数组 checkedGoods
       let checkedGoods =  this.carts.filter(item=>{
          // 找到所有勾选的商品
          return item.goods_checked===true // 找到满足条件的 要返回
        })
        // 返回这个新数组 给计算属性 计算属性必须要有返回值
        return checkedGoods
      },
      // allChecked 计算属性的值是个布尔值 
      allChecked(){
        // 购物车商品的总数===购物车选中的商品数
        // 所有商品carts 的数组长度 是否等于 当前勾选的商品 checkedGoods 的数量==> 如果是 那全选按钮应该是勾选的状态
        // 这个计算属性和页面中的 全选图标的color 进行绑定
        return this.carts.length === this.checkedGoods.length // 会返回布尔值 true表示等于 说明勾选 全选状态 否则false 不勾选全选状态
        // 当勾选状态发生变化 计算属性  会实时计算 实时更新
      }
    },
    methods:{
      // 1.点击+触发事件
      addNum(index){
        // index 传入的当前点击的商品索引
        // 让 数量加1 也就是 cards中的 goods_number+1  他加1了 由于数量goods_number是动态绑定页面的 会实时更新页面的 数据变化视图更新
        // 但是加之前需要判断 :1.商品数量不能加到大于库存量（假设库存量为 10 件） 如果大于 直接return
        if(this.carts[index].goods_number>=10){
          return
        }
        this.carts[index].goods_number+=1 // 说明没有大于库存量 此时商品数量+1
        // 此时只是页面数据cards数组更新 本地缓存中并没有更新  所以我们应该 重新存入本地缓存 同步
        uni.setStorageSync('cards',this.carts)
      },
      // 2.点击 - 触发该事件
      reduceNum(index){
        // 点击- 的时候 应该把商品数量-1 但是 要判断不能<=-1 
        if(this.carts[index].goods_number===1){
          return
        }
        this.carts[index].goods_number-=1 // 说明数量>=1 可以继续减 1
        // 同步到本地
        uni.setStorageSync('cards',this.carts)
      },
      // 3.文本输入框 发生变化 触发该事件
      setValue(index,e){
        // 会接受两个参数 1.当前点击商品索引 2.事件对象
        // 输入框发生变化 说明用户手动输入了商品的 数量 我们应该把 输入的数量给到value (value此时绑定的是goods_number) 所以我们只需要修改goods_number的值，然后同步本地数据
        // 但是修改 数量的之前 得判断一下当前输入的值 ：1.不能大于库存数(假设库存是10) 2.输入的不能是负数
        // 注意：这里不能用const 因为const 定义的 val 是不能被修改的 es6规定的
        let val = e.detail.value // 文本框输入的值
        if(val>=10){
          // 说明 >=库存量 我们强制让他等于库存量 10
          val=10
        }
        if(val<=1){
          // 说明是负数 我们强制 让他等于最小数量 1
          val=1
        }
        // 如果输入框输入 8 本地是个"8"的字符串，点击加号 数量应该加1，但由于他是字符串 会变成 81 拼接字符串
        // 此时应该把 val字符串转成 数字 就可以正常加一了 
        val=parseInt(val)
        // 然后把输入的值赋值到文本框的值
        this.carts[index].goods_number=val
        // 同步至本地数据
        uni.setStorageSync('cards',this.carts)
      },
      // 4.点击勾选图标时触发该事件
      toggle(index){
        // index 当前点击商品的索引
        // 点击时候 1.勾选变未勾选 2.未勾选要变成勾选 。
        // 勾选和 未勾选 是通过 goods_checked 来判断的 直接对他取反就好
        this.carts[index].goods_checked=!this.carts[index].goods_checked
      }

    },
    onLoad(){
      // // 打开页面，应该获取购物车数据 渲染页面 没接口  我们从本地获取购物车信息
      // this.carts = uni.getStorageSync('cards') || [] // 获取本地数据 赋值到 data中
    },
    onShow(){
      // 由于onLoad  只会第一次进入页面会执行 第二次不会执行onLoad 那它就会回获取本地最新的数据了 。所以要在onShow里面获取数据
       // 打开页面，应该获取购物车数据 渲染页面 从本地获取购物车信息
      this.carts = uni.getStorageSync('cards') || [] // 获取本地数据 赋值到 data中
    }
    
  }
</script>

<style scoped lang="scss">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
        bottom: 0;

        color: #ea4451;
        font-size: 33rpx;

        text {
          font-size: 22rpx;
        }
      }

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>

