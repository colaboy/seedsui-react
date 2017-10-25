<style lang="less" scoped>
  @import "../../../assets/seedsui/seedsui-variables.less";
  .app-full{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: @sub-color;
    background-color: @body-bg;
    z-index: 1;
  }
  .app-full img{
    width:120px;
  }
  .app-full p{
    margin-top: 20px;
  }
  .app-full .app-full-content{
    position: absolute;
    top:40%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    text-align: center;
  }
  .app-icon-nowifi{
    background-image:url('data:image/png;base64,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')
  }
</style>
<template>
  <div class="app-full" v-if="show" :style="css">
    <div class="app-full-content" @click.stop.prevent="click">
      <i class="icon app-icon-nowifi" style="width:120px;height:120px;font-size:120px;"></i>
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'NoData',
    components: {
    },
    props: {
      css: {
        type: String
      },
      text: {
        type: String,
        default: '无网络，请先连网'
      },
      show: {
        type: Boolean
      },
      click: {
        type: Function,
        default: function () {}
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      onClickRefresh () {
      }
    }
  }
</script>
