<template>
  <div :style="'position:relative;background-color:white;line-height:0;'+css">
    <textarea class="input-pre" style="width:100%;margin:8px 0;" :placeholder="placeholder" @input="onInput">{{value}}</textarea>
    <pre style="width:100%" ref="refPre"><span>{{value}}</span></pre>
  </div>
</template>
<script>
export default {
  name: 'InputPre',
  props: {
    css: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
    },
    change: {
      type: Function
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onInput (e) {
      var textarea = e.target
      var pre = this.$refs.refPre
      pre.children[0].innerText = textarea.value
      textarea.style.height = pre.clientHeight + 'px'
      if (this.change) this.change(textarea.value)
    }
  }
}
</script>
