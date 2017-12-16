<template>
  <div>
    <header class="header">
      <div class="back iconfont">&#xe624;</div>
      <div class="search">
        <i class=" fdj iconfont">&#xe60b;</i>
        <a href="#" class="prompt">输入城市/景点/游玩主题</a>
      </div>
      <div class="city"><a href="#" class="city-content">城市</a><i class="iconfont">&#xe62d;</i></div>
    </header>

    <swiper :options="swiperOption">
      <swiper-slide v-for="item in swiperInfo" :key="item.id">
        <div class="swiper-img-con">
          <img  class="swiper-img" :src="item.imgUrl"/>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

    <swiper>
      <swiper-slide v-for="(pageInfo, index) in pages" :key="index">
        <div class="icon-wrapper">
          <div v-for="item in pageInfo" :key="item.id" class="icon-item">
            <div class="icon-img-con">
              <img  class="icon-img" :src="item.imgUrl"/>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
export default {
  name: 'Index',

  data () {
    return {
      swiperInfo: [],
      iconInfo: [],
      swiperOption: {
        autoplay: 10000,
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },

  computed: {
    pages () {
      const pages = []
      this.iconInfo.forEach((value, index) => {
        let page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(value)
      })
      return pages
    }
  },

  methods: {
    handleSwiperDate () {
      this.$http.get('/static/index.json')
          .then(this.handleSwiperDateSucc.bind(this))
    },

    handleSwiperDateSucc (res) {
      this.swiperInfo = res.body.data.swiper
      this.iconInfo = res.body.data.icons
    }
  },

  created: function () {
    this.handleSwiperDate()
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    background: #05bad5;
    color: #fff;
  }
  .back {
    width: .64rem;
    line-height: .86rem;
    text-align: center;
  }
  .search {
    flex: 1;
    margin: .14rem .18rem;
    background: #fff;
    border-radius: .1rem;
    padding-top: 0.16rem;
  }
  .fdj{
    color: #e4e7ea;
    float: left;
    margin-left: 0.3rem;
    margin-right: 0.24rem;
  }
  .prompt{
    font-size: 0.2rem;
    color: #e4e7ea;  
  }
  .city {
    width: 1.14rem;
    line-height: .86rem;
    text-align: center;
  }
  .city-content{
    color: #fff;
    display: block;
    float: left;
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .swiper-img-con {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 31.25%;
    /*防止抖屏，将高度设置为零，加一个padding-bottom 比例为高度/宽度*/
  }
  .swiper-img {
    width: 100%;
  }
  .icon-wrapper {

  }
  .icon-item {
    box-sizing: border-box;
    float: left;
    width: 25%;
    padding: .4rem;
  }
  .icon-img-con {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
  }
  .icon-img {
    width: 100%;
  }
</style>
