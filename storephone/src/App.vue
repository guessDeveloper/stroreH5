<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>
<script>
export default {
  data() {

  },
  mounted() {
    
    // https % 3a % 2f % 2fwww.baidu.com
  }
}
</script>
<style lang="less" >
@import url("./assets/less/reset.less");
</style>
