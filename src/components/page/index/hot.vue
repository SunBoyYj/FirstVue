<template>
	<div id="hot" ref="hotCon">
    <h2>热销推荐</h2>
    <ul>
      <li v-for="item in hotInfo" :key="item.id">
        <div class="hotImg"><img :src="'../../../static/image/'+item.imgUrl+''"></div>
        <div class="hotText">
          <h3>{{item.tit}}</h3>
          <h4>{{item.des}}</h4>
          <h5><i>&yen;{{item.price}}</i>&nbsp;起</h5>
        </div>
      </li>
    </ul>
    <div class="moreRec">
        查看所有产品
    </div>
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
export default {
  props: ['hotInfo'],
  updated () {
    this.scroll = new BScroll(this.$refs.hotCon)
  }
}
</script>

<style scoped>
	#hot h2{
    margin-left: 0.32rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.26rem;
    color: #212121;
  }
  #hot ul li{
  	display: flex;
    padding-top: 0.33rem;
    background-color: #fff;
    position: relative;
    height: 1.66rem;
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
    width: 1.4rem;
    height: 1.4rem;
    float: left;
    margin: 0 0.24rem ;
  }
  .hotImg img{
    width: 100%;
    height: 100%;
  }
  .hotText h3{
    font-size: 0.28rem;
    color: #212121;
  }
  .hotText h4{
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.26rem;
    color: #9e9e9e;
    margin: 0.2rem 0 0.26rem;
  }
  .hotText h5{
    font-size: 0.26rem;
    color: #9e9e9e;
  }
  .hotText h5 i{
    font-size: 0.22rem;
    color: #ef8a33;
  }
  .moreRec{
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    text-align: center;
    background: #fff;
  }
</style>