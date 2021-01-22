<template>
  <div class="card" @click="goDetail">
    <div class="img-box">
      <div class="logo">
        <img :src="cardData.logo" alt="">
      </div>
      <div v-lazy:background-image="cardData.picurl" class="img"></div>
    </div>
    <div class="content">
      <div class="title">{{cardData.titleA}}</div>
      <div class="band">{{cardData.MerchantName}}SFASDFA</div>
      <div class="tip">{{cardData.titleB}}</div>
      <div class="price">￥{{cardData.price}}</div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Lazyload } from '@nutui/nutui'
Lazyload.install(Vue)
export default {
  data() {
    return {

    }
  },
  props: {
    cardData: {
      type: Object
    }
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: '/productDetail',
        query: {
          goodsType: this.cardData.type == 'Taobao' ? '2' : '1',
          goodsId: this.cardData.Id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.card {
  width: 330px;
  background: #fff;
  .img-box {
    position: relative;
    .logo {
      position: absolute;
      top: 0;
      right: 0;
      width: 20 / @p;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .img {
    width: 330px;
    height: 330px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content {
    padding: 0 18px;
    text-align: center;
    height: 113 / @p;
    .title {
      font-size: 24px;
      color: @font_color;
      margin-top: 32px;
      .onelineText;
      line-height: 50px;
    }
    .band {
      font-size: 24px;
      color: #2f92f9;
      line-height: 25 / @p;
      .onelineText;
    }
    .tip {
      font-size: 10 / @p;
      color: @subtitle_color;
      line-height: 25 / @p;
    }
    .price {
      font-size: 16 / @p;
      color: @money_color;
      line-height: 25 / @p;
      font-weight: bold;
    }
  }
}
</style>