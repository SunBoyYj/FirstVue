<template>
	<swiper :options="swiperOption">
    <swiper-slide v-for="(pageInfo, index) in pages" :key="index">
      <div class="icon-wrapper">
        <div v-for="item in pageInfo" :key="item.id" class="icon-item">
          <div class="icon-img-con">
            <img  class="icon-img" :src="'../../../static/image/'+item.imgUrl+''"/>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  props: ['pages'],
  data () {
    return {
      swiperOption: {
        autoplay: 10000,
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  }
}
</script>

<style scoped>
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