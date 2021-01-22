<template>
  <div class="title">
    {{name}}
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    name: {
      type: String
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  position: relative;
  height: 116px;
  padding-left: 58px;
  line-height: 116px;
  font-size: 40px;
  color: @font_color;
  font-weight: bold;
  border-bottom: 4px solid @body_color;
  background: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 30px;
    top: 38px;
    display: block;
    width: 8px;
    height: 36px;
    background: @main_color;
  }
}
</style>