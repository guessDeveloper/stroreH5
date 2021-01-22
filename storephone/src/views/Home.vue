<template>
  <div class="home">

  </div>
</template>

<script>


export default {
  name: 'Home',
  data() {
    return {

    }
  },
  mounted() {

    window.location.href = `yldauction://?url=${window.encodeURIComponent('http://172.20.10.6:8080/static/close.html')}`
  }
}
</script>
