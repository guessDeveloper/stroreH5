<template>
  <div class="">
    <div class="banner">
      <nut-swiper direction="horizontal" :swiperData="bannerList" :lazyLoad="true" :paginationVisible="true" ref="demo5" v-show="!error">
        <div v-for="(item,index) in bannerList" :key="index" class="nut-swiper-slide ">
          <img :data-src="item.imgSrc" style="max-width:100%; max-height:100%" class="nut-img-lazyload" />
        </div>
      </nut-swiper>
      <div class="error" v-show="error">

      </div>
    </div>
    <section class="content">
      <div class="title">{{title}}</div>
      <div class="price">
        <span class="price-pr">￥</span>{{price}} <span>{{fanli}}</span>
      </div>
      <div class="tip">
        <div class="item">
          <span class="middle">
            <img src="../../assets/img/app/product-1.png" alt=""><span class="tip-item-name">购买商品</span>
          </span>
        </div>
        <div class="arrow">
          <img src="../../assets/img/app/midde-arrow.png" alt="">
        </div>
        <div class="item">
          <span class="middle">
            <img src="../../assets/img/app/product-2.png" alt=""><span class="tip-item-name">确认收货</span>
          </span>
        </div>
        <div class="arrow">
          <img src="../../assets/img/app/midde-arrow.png" alt="">
        </div>
        <div class="item">
          <span class="middle">
            <img src="../../assets/img/app/product-3.png" alt=""><span class="tip-item-name">等待结算</span>
          </span>
        </div>
        <div class="arrow">
          <img src="../../assets/img/app/midde-arrow.png" alt="">
        </div>
        <div class="item">
          <span>
            <img src="../../assets/img/app/product-4.png" alt=""><span class="tip-item-name">获得奖励</span>
          </span>
        </div>
      </div>
      <button class="buy" @click="getUserToken">立即购买</button>
    </section>
    <section class="detail-content">
      <subtitle name="商品详情"></subtitle>
      <!-- <div>

      </div> -->
      <iframe :src="iframeSrc" frameborder="0" class="iframe" id="productIframe" @load="iframeHeight"></iframe>
    </section>
    <section class="">
      <subtitle name="同类商品推荐"></subtitle>
      <div class="same-part">
        <nut-swiper direction="horizontal" :swiperData="SameClassproducts" :lazyLoad="true" :paginationVisible="true" ref="demo3">
          <div>
            <div v-for="(item,index) in SameClassproducts" :key="index" class="list-box">
              <div class="list-item" v-for="(item2,index2) in item" :key="index2">
                <goodCard :cardData="item2"></goodCard>
              </div>
            </div>
          </div>
        </nut-swiper>
      </div>
    </section>
    <section class="hot-box">
      <div class="hot-title">24小时热销榜</div>
      <div class="hot-list">
        <div class="hot-item" v-for="(hotItem,hotIndex) in hotList" :key="hotIndex">
          <goodCard :cardData="hotItem"></goodCard>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from 'vue';
import { swiper } from '@nutui/nutui'
import subtitle from '@components/common/subtitle'
import goodCard from '@components/common/goodCard'
import GoodCard from '../../components/common/goodCard.vue';
swiper.install(Vue)
export default {
  data() {
    return {
      goodsId: '',
      goodsType: '',
      bannerList: [], //轮播图
      iframeSrc: '',
      SameClassproducts: [],
      hotList: [],
      title: '',
      price: '',
      fanli: '',
      html: '',
      error: false,
    }
  },
  components: {
    subtitle,
    goodCard
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId
    this.goodsType = this.$route.query.goodsType

    this.getData();
    // this.getUserToken();
  },
  watch: {
    '$route'(to, from) {
      this.bannerList = []
      if (this.$route.query.goodsType) {
        this.goodsType = this.$route.query.goodsType
      }
      if (this.$route.query.goodsId) {
        this.goodsId = this.$route.query.goodsId
      }
      this.getData();
    }
  },
  methods: {
    getData() {
      const loading = this.$toast.loading();
      this.$http.get(this.$api.GetMaterialGoodsById, {
        GoodType: this.goodsType,
        GoodID: this.goodsId
      }).then(res => {
        if (res.data.Code == 1) {
          this.title = res.data.Data.titleA
          this.price = res.data.Data.Picper
          this.fanli = res.data.Data.Fanli
          this.bannerList = [];
          let arry = [];
          res.data.Data.piclist.forEach(element => {
            arry.push({ imgSrc: element })
          });
          this.bannerList = arry
          this.iframeSrc = res.data.Data.imglist
          this.SameClassproducts = [];
          this.SameClassproducts = this.changeArray(res.data.Data.SameClassproducts)
          this.hotList = [];
          this.hotList = res.data.Data.PopProducts
        } else {
          this.error = true;
          this.$toast.text(res.data.Msg);
        }
        loading.hide()
      })
    },
    //数组转换
    changeArray(arry) {
      let att = [];
      let length = arry.length;
      let count = Math.ceil(length / 4)
      let num = 0
      for (let i = 0; i < count; i++) {
        let attr = [];
        arry[num + 0] ? attr.push(arry[num + 0]) : ''
        arry[num + 1] ? attr.push(arry[num + 1]) : ''
        arry[num + 2] ? attr.push(arry[num + 2]) : ''
        arry[num + 3] ? attr.push(arry[num + 3]) : ''
        att.push(attr)
        num++
      }
      return att
    },
    //获取iframe高度
    iframeHeight() {


      this.$nextTick(() => {
        // window.document.domain = 'apitest.youledui.com';
        let iframe = document.querySelector('#productIframe')
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;//兼容
        if (iframeWin.document.body) {
          iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;//滚动条高度
        }

      })

    },
    //在app内获取用户token
    getUserToken() {
      console.log(1)
      if (this.$util.isAnd) {
        let token = window.android && window.android.TokenFromJS()
        // window.android && window.android.finishFromJS()
        if (token) {
          sessionStorage.setItem('token', token)
          if (this.goodsType == 1) {
            this.getPddPass(token, () => {
              this.goBuy(token)
            })
          } else {
            this.getTbPass(token, () => {
              this.goBuy(token)
            })
          }
        } else {
          window.android && window.android.finishFromJS()
        }
      } else {
        window.webkit.messageHandlers.TokenFromJS.postMessage("")
        window.webkit_get_token = (token) => {
          // console.log(token, 'ssssssss')
          if (token) {
            sessionStorage.setItem('token', token)
            if (this.goodsType == 1) {
              this.getPddPass(token, () => {
                this.goBuy(token)
              })
            } else {
              this.getTbPass(token, () => {
                this.goBuy(token)
              })
            }
          } else {
            window.webkit && window.webkit.messageHandlers.finishFromJS.postMessage("")
          }
        }
        // window.android && window.android.finishFromJS()

        // console.log(token)

      }
    },
    goBuy(token) {
      let data = {
        token: token,
        type: this.goodsType,
        id: this.goodsId
      }
      this.$http.get(this.$api.clickTobuy, data).then(res => {
        if (res.data.Code == 1) {
          window.location.href = res.data.Data
        }
      })
    },
    //获取授权链接
    getPddPassLink(token) {

      this.$http.get(this.$api.UserKeepOnRecord, { token: token }).then(res => {
        if (res.data.Code == 1) {
          // this.$alert.alert(`<iframe src=${res.data.Data.url} width="100%" height="400px" style="border:0;height:70vh;"></iframe>`, '拼多多授权', {
          //   dangerouslyUseHTMLString: true,
          //   showConfirmButton: false
          // });
          window.location.href = res.data.Data.url
        } else {
          this.$toast.text(res.data.Msg);
        }
      })
    },
    //查看拼多多是否授权
    getPddPass(token, callback) {
      this.$http.get(this.$api.GetUserIsKeepOnRecord, {
        token: token
      }).then(res => {
        console.log(res)
        if (res.data.Code == 1) {
          if (res.data.Data.IsKeepOnRecord == false) {
            this.getPddPassLink(token);
          } else {
            callback && callback(token)
          }
        } else {
          callback && callback(token)
        }
      }).catch(res => {
        console.log(res)
      })
    },
    //查看淘宝是否授权
    getTbPass(token, callback) {
      this.$http.get(this.$api.GetUserIsKeepOnRecordTB, {
        token: token
      }).then(res => {
        console.log(res)
        if (res.data.Code == 1) {
          if (res.data.Data.IsKeepOnRecord == false) {
            this.getTbPassLink(token);
          } else {
            callback && callback(token)
          }
        } else {
          callback && callback(token)
        }
      }).catch(res => {
        console.log(res)
      })
    },
    //获取淘宝授权链接
    getTbPassLink(token) {
      this.$http.get(this.$api.GetTBAuthorizationLink, { token: token }).then(res => {
        if (res.data.Code == 1) {
          // this.$alert.alert(`<iframe src=${res.data.Data.url} width="100%" height="400px" style="border:0;height:70vh;"></iframe>`, '拼多多授权', {
          //   dangerouslyUseHTMLString: true,
          //   showConfirmButton: false
          // });
          window.location.href = res.data.Data.url
        } else {
          this.$toast.text(res.data.Msg);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.banner {
  width: 750px;
  height: 750px;
  .nut-swiper {
    height: 100%;
  }
  .error {
    width: 100%;
    height: 100%;
    background: url(../../assets/img/app/error.png) no-repeat center center;
  }

  img {
    width: 100%;
    height: 100%;
  }
  // background: #000;
}
.content {
  padding: 0 30px;
  overflow: hidden;
  background: #fff;
  .title {
    font-size: 40px;
    line-break: 60px;
    color: @font_color;
    font-weight: bold;
    margin-top: 40px;
  }
  .price {
    font-size: 54px;
    line-height: 54px;
    color: @money_color;
    font-weight: bold;
    margin-top: 28px;
    margin-bottom: 68px;
    .price-pr {
      font-size: 40px;
      color: @money_color;
      margin-left: 0;
      font-weight: bold;
    }
    span {
      color: @subtitle_color;
      font-size: 28px;
      margin-left: 30px;
      font-weight: normal;
    }
  }
}
.tip {
  display: flex;
  color: @main_color;
  justify-content: space-between;
  text-align: center;
  .arrow {
    width: 54px;
    margin-top: 38px;
    img {
      display: block;
      width: 100%;
    }
  }
  .item {
    width: 110px;
    img {
      display: block;
      width: 100%;
    }
    .tip-item-name {
      display: block;
      font-size: 22px;
      line-height: 64px;
    }
    .middle {
      width: 100px;
    }
  }
}
.buy {
  display: block;
  width: 690px;
  height: 100px;
  margin: 46px auto 40px;
  border: 2px solid @main_color;
  background: none;
  color: @main_color;
  font-size: 36px;
}
.detail-content {
  background: #fff;
  margin-top: 20px;
  .iframe {
    width: 100%;
    height: 700 / @p;
    overflow-x: hidden;
  }
}
//同类推荐
.same-part {
  // height: 1220px;
  .nut-swiper {
    height: auto;
  }
  .list-box {
    display: flex;
    // width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 16 / @p 15 / @p 34 / @p 15 / @p;
    justify-content: space-between;
    .list-item {
      display: inline-block;
      margin-bottom: 10 / @p;
    }
  }
}
//24小时推荐
.hot-box {
  text-align: center;
  margin-top: 30 / @p;
  .hot-title {
    font-size: 20 / @p;
    color: @font_color;
    font-weight: bold;
  }
  .hot-list {
    display: flex;
    margin-top: 30 / @p;
    margin-bottom: 30 / @p;
    padding: 0 15 / @p;
    flex-wrap: wrap;
    justify-content: space-between;
    .hot-item {
      margin-bottom: 10 / @p;
    }
  }
}
</style>