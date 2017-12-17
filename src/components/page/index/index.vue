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
          <img  class="swiper-img" :src="'../../../static/image/'+item.imgUrl+''"/>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

    <swiper>
      <swiper-slide v-for="(pageInfo, index) in pages" :key="index">
        <div class="icon-wrapper">
          <div v-for="item in pageInfo" :key="item.id" class="icon-item">
            <div class="icon-img-con">
              <img  class="icon-img" :src="'../../../static/image/'+item.imgUrl+''"/>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <main class="main">
      <ul id="list1">
        <li>
          <i class="iconfont">&#xe600;</i>
          <span>定位失败</span>
        </li>
        <li>
          <i class="iconfont">&#xe654;</i>
          <span>5折泡温泉</span>
        </li>
      </ul>

      <ul id="list2">
        <li class="list2Item" v-for="item in list1Info">
          <div class="listText">
            <p class="listTit">{{item.tit}}</p>
            <p class="listDes">{{item.des}}</p>
          </div>
          <div class="listImgCon">
            <img class="listImg" :src="'../../../static/image/'+item.imgUrl+''">
          </div>
        </li>
        <li class="list2Item" v-for="item in list2Info">
          <div class="listText">
            <p class="listTit">{{item.tit}}</p>
            <p class="listDes">{{item.des}}</p>
          </div>
          <div class="listImgCon">
            <img class="listImg" :src="'../../../static/image/'+item.imgUrl+''">
          </div>
        </li>
      </ul>

      <div id="hot">
        <h2>热销推荐</h2>
        <ul>
          <li v-for="item in hotInfo" :key="item.id">
            <div class="hotImg"><img :src="'../../../static/image/'+item.imgUrl+''"></div>
            <div class="hotText">
              <h3>{{item.tit}}</h3>
              <h4>{{item.des}}</h4>
              <h5><i>{{item.price}}</i>起</h5>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Index',

  data () {
    return {
      swiperInfo: [],
      iconInfo: [],
      list2Info: [],
      list1Info: [],
      hotInfo: [],
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
    },

    handleList2Data () {
      this.$http.get('/static/index.json')
        .then(this.handleList2DataSucc.bind(this))
    },

    handleList2DataSucc (res) {
      this.list1Info = res.body.data.list1
      this.list2Info = res.body.data.list2
    },

    handleHotData () {
      this.$http.get('/static/index.json')
        .then(this.handleHotDataSucc.bind(this))
    },

    handleHotDataSucc (res) {
      this.hotInfo = res.body.data.hotsight
    }
  },

  created: function () {
    this.handleSwiperDate()
    this.handleList2Data()
    this.handleHotData()
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
  .main{
    background-color: #f5f5f5;
  }
  .main ul{
    position: relative;
    background-color: #fff;
  }
  .main ul::before{
    content:"";
    width:100%;
    height:1px;
    background:#e0e0e0;
    position:absolute;
    top:0;
    transform:scaleY(0.5);
    transform-origin:left bottom;
  }
  .main ul li:first-of-type::before{
    content:"";
    height:100%;
    width:1px;
    background:#e0e0e0;
    position:absolute;
    right:0;
    transform:scaleX(0.5);
    transform-origin:left bottom;
  }
  #list1{
    height: 1.46rem;
    margin-bottom: 0.3rem;
  }
  #list1 li{
    height: 100%;
    width: 50%;
    text-align: center;
    line-height: 1.46rem;
    float: left;
    font-size: 0.4rem;
    color: #212121;
    position: relative;
  }
  #list2 {
    width: 100%;
    height: 1.4rem;
    position: relative;
  }
  #list2::after{
    content:"";
    width:100%;
    height:1px;
    background:#e0e0e0;
    position:absolute;
    bottom:0;
    transform:scaleY(0.5);
    transform-origin:left bottom;
  }
  .list2Item {
    width: 50%;
    height: 1.4rem;
    background: #fff;
    float:left;
    box-sizing: border-box;
    padding-left: .48rem;
  }
  .list2Item:first-child {
    box-sizing: border-box;
    border-right: 1px solid #e1e1e1;
  }
  .listText {
    height: .65rem;
    float: left;
    margin-top: .35rem;
  }
  .listTit {
    width: 1.1rem;
    font-size: .24rem;
    color: #ff3738;
    margin-bottom: .2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listDes {
    width: 1.1rem;
    font-size: .18rem;
    color: #525252;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listImgCon {
    width: 1.31rem;
    height: .98rem;
    float: left;
    margin-left: .55rem;
    margin-top: .2rem;
  }
  .listImg {
    width: 100%;
  }
  #hot h2{
    margin-left: 0.32rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.4rem;
    color: #212121;
  }
  #hot ul li{
    padding-top: 0.33rem;
    background-color: #fff;
    position: relative;
    height: 2.76rem;
  }
  #hot ul li::after{
    content:"";
    width:100%;
    height:1px;
    background:#e0e0e0;
    position:absolute;
    bottom:0;
    transform:scaleY(0.5);
    transform-origin:left bottom;
  }
  .hotImg{
    width: 2.1rem;
    height: 2.1rem;
    float: left;
    margin: 0 0.33rem ;
  }
  .hotImg img{
    width: 100%;
    height: 100%;
  }
  .hotText h3{
    font-size: 0.42rem;
    color: #212121;
  }
  .hotText h4{
    width: 56%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.38rem;
    color: #9e9e9e;
    margin: 0.3rem 0 0.4rem;
  }
  .hotText h5{
    font-size: 0.32rem;
    color: #9e9e9e;
  }
  .hotText h5 i{
    font-size: 0.38rem;
    color: #ef8a33;
  }
</style>
