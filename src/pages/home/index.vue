<template>
  <div>
    <!-- 搜索条 -->
    <div class="search">
      <div class="search-bar">
        <icon type="search" size="18"/>
        <span>搜索</span>
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper
      autoplay
      indicator-dots
      indicator-color
      indicator-active-color="#fff"
      circular
      interval="2000"
    >
      <swiper-item v-for="(item,k) in imgList" :key="k">
        <img :src="item.image_src" class="slide-image">
      </swiper-item>
    </swiper>
    <!-- 首页分类  -->
    <div class="menu">
      <img :src="item.image_src" alt class="img" v-for="(item,k) in menuList" :key="k">
    </div>
    <!-- 楼层 -->
    <div class="floor" v-for="(item,k) in floorList" :key="k">
      <div class="floor-title">
        <img :src="item.floor_title.image_src" alt>
      </div>
      <div class="floor-content">
        <div class="left">
          <img :src="item.product_list[0].image_src" alt>
        </div>
        <div class="right">
          <div v-for="(item1,k1) in item.product_list" :key="k1" v-if="k1>0">
            <img :src="item1.image_src" alt>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div class="backTop" v-if="isShow" @click="backTop">
      ︿
      <p>顶部</p>
    </div>
    <!-- footer -->
    <div class="footer">
      <p>我是有底线的~~~</p>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      imgList: [],
      menuList: [],
      floorList: [],
      isShow: false
    };
  },
  methods: {
    // 回到顶部事件
    backTop() {
      // 将页面滚动到目标位置
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    async init() {
      // 获取首页轮播图数据
      let imgRes = await request("home/swiperdata");
      this.imgList = imgRes.data.message;

      // 获取首页分类选项数据
      let menuRes = await request("home/catitems");
      this.menuList = menuRes.data.message;

      // 获取首页楼层数据
      let floorRes = await request("home/floordata");
      this.floorList = floorRes.data.message;
    }
  },
  // 回到顶部，监听用户滑动页面事件。
  onPageScroll(e) {
    this.isShow = e.scrollTop > 50;
  },
  // 监听用户下拉刷新事件。
  onPullDownRefresh() {
    this.init();
  }
};
</script>

<style  scoped lang="scss">
.search {
  background-color: #ff2d4a;
  padding: 10px;
}
.search .search-bar {
  height: 25px;
  background-color: #fff;
  text-align: center;
}
icon {
  margin-right: 10px;
  vertical-align: middle;
}
swiper-item image {
  height: 100%;
}
.menu {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.img {
  width: 70px;
  height: 70px;
}
.floor {
  margin: 10px;
}
.floor .floor-title {
  height: 30px;
  margin-bottom: 10px;
  background-color: #eee;
  padding-top: 10px;
}
.floor .floor-title img {
  height: 100%;
}
.floor-content {
  display: flex;

  justify-content: space-between;
  width: 100%;
}
.left img {
  width: 232rpx;
  height: 385rpx;
}

.floor-content .right {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.right img {
  width: 232rpx;
  height: 188rpx;
  border-radius: 4px;
  margin-left: 5px;
}

/* 底部 */
.footer {
  height: 50px;
  background-color: #f4f4f4;
  text-align: center;
  padding-top: 20px;
}
.footer p {
  font-size: 14px;
  color: #999;
}
.backTop {
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.6);
  padding-top: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
  position: fixed;
  bottom: 100px;
  right: 10px;
}
</style>
