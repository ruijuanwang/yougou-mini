<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类  左侧 class="active"被激活的样式-->
      <view class="sup">
        <scroll-view  scroll-y>
          <!-- 绑定点击事件 传入点击的索引 -->
          <text :class="{active:activeIndex===index}" @click="getSubcate(index)" v-for="(item,index) in allCategory" :key="index" >{{item.cat_name}}</text>
        </scroll-view>
      </view>
      <!-- 子级分类 右侧-->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          <view v-for="sub in allCategory[activeIndex].children" :key="sub.cat_id" class="children">
            <view class="title">{{sub.cat_name}}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator v-for="brand in sub.children" :key="brand.cat_id" url="/pages/list/index">
                <image :src="brand.cat_icon"></image>
                <text>{{brank.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {
    
    components: {
      search
    },
    data(){
      return{
        allCategory:[], // 用来接收分类的数据
        activeIndex:0 // 当前点击选中的索引
      }
    },
    methods:{
      // 点击左侧切换右侧分类 
      getSubcate(index){
        // index 点击的索引
        this.activeIndex=index // 当前点击索引赋值到data中 

      },
      // 获取分类 的方法
      async getCategory(){
        // 调接口
        const res = await this.http({
          url:"/api/public/v1/categories"
        })
        // await 下面 执行成功
        console.log(res);
        this.allCategory=res.message // 把获取的数据给到data中       
      }
    },
    onLoad(){
      // 页面加载 获取分类
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
