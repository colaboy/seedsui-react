<template>
  <div>
    <p class="color-sub" style="margin-top:1em;padding-left:0.5em">图片上传({{imgs.length}}/{{max}})</p>
    <ul class="grid app-grid-photo" data-col="3">
      <li v-for="(img,index) in imgs" :key="index">
        <!-- <a :index="index" :key="index" class="grid-icon" :style="{backgroundImage:'url('+img+')'}">
          <span class="close" @click="deleteImg(index)"><i class="icon icon-close">X</i></span>
        </a> -->
        <a :index="index" :key="index" class="grid-icon">
          <div style="width:100%;height:100%;overflow:hidden;">
            <img :src="img" style="width:100%;" />
          </div>
          <span class="close" @click="deleteImg(img)"><i class="icon icon-close">X</i></span>
        </a>
      </li>
      <li v-show="isMax < max">
        <a class="grid-icon app-grid-icon-add" @click="loadImg">
          <i class="icon icon-plus size40"></i>
        </a>
      </li>
      </ul>
  </div>
</template>
<script>
import Weixin from './../bridge/weixin.js'
export default {
  name: 'WxPhoto',
  props: {
    max: Number,
    sourcetype: {
      type: Array,
      default: ['album', 'camera']
    },
    sizeType: {
      type: Array,
      default: ['original', 'compressed']
    }
  },
  data () {
    return {
      wxImage: null,
      imgs: [],
      imgMap: {}
    }
  },
  created () {
    this.wxImage = new Weixin.Image({
      max: this.max,
      sourceType: this.sourcetype,
      sizeType: this.sizeType,
      onChooseSuccess: this.onChooseSuccess,
      onChooseFail: this.onChooseFail,
      onUploadsSuccess: this.onUploadsSuccess,
      onDeleteSuccess: this.onDeleteSuccess
    })
  },
  methods: {
    onChooseSuccess (imgs, imgMap) {
      this.imgs = imgs
      this.imgMap = imgMap
    },
    onChooseFail (imgs, imgMap) {
      this.imgs = imgs
      this.imgMap = imgMap
    },
    onUploadsSuccess (imgs, imgMap) {
      this.imgs = imgs
      this.imgMap = imgMap
    },
    onDeleteSuccess (imgs, imgMap) {
      this.imgs = imgs
      this.imgMap = imgMap
    },
    loadImg () {
      this.wxImage.choose()
    },
    deleteImg (key) {
      this.wxImage.deleteImg(key)
    }
  },
  computed: {
    isMax () {
      return this.imgs.length
    }
  },
  mounted () {
    this.$on('inspireUploadReset', () => {
      this.wxImage.destory()
    })
  }
}
</script>
<style lang="less">
  .icon-plus{
    background-size: cover;
    background-image: url('../assets/plus.png');
  }
  .app-grid-photo li{
    padding: 0.5em;
  }
  .app-grid-photo .grid-icon{
    height: 180px;
    width: 100%;
    background-color: #FAFAFA;
    background-size: cover;
    color: #e5e5e5;
  }
  .app-grid-photo .app-grid-icon-add{
    border:1px dashed #A6A6A6;
  }
  .app-grid-photo .close{
    position: absolute;
    top:-12px;
    left:-12px;
    background-color: #FF6A54
  }
  .app-grid-photo .icon{
    pointer-events:none;
  }
</style>
