<template>
  <div class="home">

  </div>
</template>

<script>


export default {
  name: 'Home',
  data() {
    return
    {

    }
  },
  mounted() {
    window.location.href = `yldauction://?url=${window.encodeURIComponent('http://192.168.199.125:8080/#/productDetail?goodsType=2&goodsId=623389024792')}`
  }
}
</script>
