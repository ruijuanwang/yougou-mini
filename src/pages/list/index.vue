<template>
  <view class="list">
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <view class="goods">
      <!-- 循环goodsList 数据 生成商品列表数据 -->
      <view v-for="item in goodsList" :key="item.goods_id" class="item" @click="goDetail">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <view class="meta">
          <!-- 商品名称 -->
          <view class="name">{{item.goods_name}}</view>
          <view class="price">
            <text>￥</text>{{item.goods_price}}<text>.00</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 商品列表加载完毕的时候 显示-->
    <view class="isend" v-show="isend"> 没有更多商品了哦~ </view>   
  </view>
</template>

<script>
  export default {
    data(){
      return{
        query:'', // 搜索关键字
        pagenum:1, // 获取第几页数据 默认第 1 页
        pagesize:20, // 一页请求多少条数据
        total:0 , // 总页数
        goodsList:[], // 用来接收商品列表数据
        isend:false // 控制页面显示 没有商品列表的 提示文字
      }
    },

    methods: {
      goDetail () {
        uni.navigateTo({
          url: '/pages/goods/index'
        })
      }
    },
    methods:{
      // 获取商品列表数据方法
      async getGoodsList(){
        // 调用接口
        const res = await this.http({
          url:'/api/public/v1/goods/search',
          data:{
            query:this.query, // 关键字
            pagenum:this.pagenum, // 获取第几页
            pagesize:this.pagesize // 每页获取几条
          }
        })
        // await 下面 请求成功的
        console.log('商品列表数据',res);
        // 1.3 请求来的20条数据 追加合并进数组中 第一页的 第二页的...
        this.goodsList=[...this.goodsList,...res.message.goods] // 商品列表数据赋值到data数组中       
        this.total = res.message.total // 赋值总页码
      }

    },
    onLoad(params){
      // 1.params 搜索回车传来的搜索关键字 
      console.log('参数',params);
      this.query=params.query // 关键字赋值到data中    

      // 2.调用获取商品类表的方法
      this.getGoodsList()
    },
    // 上拉加载事件 和钩子函数同级
    onReachBottom(){
      // 总有拉到底的时候，我们应该判断 
      // 商品列表数组长度 this.goodslist === 总页码 total  如果等于 就说明数据加载完了 我们应该return
      if(this.goodsList.length===this.total){ 
          this.isend=true // 显示页面加载完毕的提示
          return 
        }
      // 当距离顶部到50px  会触发该事件
      // console.log('底部了');
      // 1.拉倒底部，应该去加载更多商品列表数据 调用接口
      // 1.1 请求 页码+1 的数据 
      this.pagenum++
      // 1.2直接调用上次请求 请求20条数据
      this.getGoodsList()            
    }

  }
</script>

<style scoped lang="scss">
.isend{
  width: 310rpx;
  margin: 0 auto;
}
  .list{
    padding-top: 100rpx;
  }
  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    background-color: #fff;

    text {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

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
  }
</style>
