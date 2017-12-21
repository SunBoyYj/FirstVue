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
    <img-swiper :swiperInfo="swiperInfo"></img-swiper>
    <icon-swiper :pages="pages"></icon-swiper>
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
      <hot :hotInfo="hotInfo"></hot>
      <div class="weekends">
        <h2 class="weekTittle">周末去哪儿</h2>
        <!-- <scroller class="weekend-con" :data="getWeekends"> -->
          <div v-for="(item, index) in getWeekends" class="weekendsCon">
            <a href="javascript:;">
              <div class="pictureBox">
                <img :src="item.imgUrl" alt="" class="picture">
              </div>
              <div class="weekendsInco">
                <div class="placename">{{item.place}}</div>
                <div class="description">{{item.description}}</div>
              </div>
            </a>
          </div>
        <!-- </scroller> -->
      </div>
    </main>
  </div>
</template>

<script>
import hot from './hot'
import imgSwiper from './imgSwiper'
import iconSwiper from './iconSwiper'
export default {
  name: 'Index',

  components: {
    hot,
    imgSwiper,
    iconSwiper
  },

  data () {
    return {
      swiperInfo: [],
      iconInfo: [],
      list2Info: [],
      list1Info: [],
      hotInfo: [],
      getWeekends: [],
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
    handleIndexDate () {
      this.$http.get('/api/index.json')
          .then(this.handleIndexDateSucc.bind(this))
    },

    handleIndexDateSucc (res) {
      this.swiperInfo = res.body.data.swiper
      this.iconInfo = res.body.data.icons
      this.getWeekends = res.body.data.weekends
      this.list1Info = res.body.data.list1
      this.list2Info = res.body.data.list2
      this.hotInfo = res.body.data.hotsight
    }
  },

  created: function () {
    this.handleIndexDate()
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
  .weekendsCon{
    background: #fff;
  }
  .weekTittle{
    height: .8rem;
    line-height: .8rem;
    color: #212121;
    padding-left: .26rem;
  }
  .pictureBox{
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 38%;
  }
  .picture{
    width: 100%;
  }
  .weekendsInco{
    padding: .14rem .2rem .2rem .2rem;
  }
  .placename{
    overflow: hidden;
    color: #212121;
    font-size: .28rem;
    line-height: .48rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .description{
    overflow: hidden;
    color: #616161;
    font-size: .24rem;
    line-height: .42rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .weekend-con {
    height: 6rem;
    overflow: hidden;
  }
</style>
