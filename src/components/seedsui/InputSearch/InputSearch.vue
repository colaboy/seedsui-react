<template>
  <form class="inputbox inputbox-search border-b" data-input="clear" @submit="onSubmit">
    <input type="search" class="search input-text" @input="onInput" @blur="onBlur">
    <i class="color-placeholder icon icon-rdoclose-fill hide size20"></i>
    <div v-show="showPlaceholder" class="inputbox-search-placeholder">
      <i class="inputbox-search-icon icon-search"></i>
      <span class="inputbox-search-font">{{placeholder}}</span>
    </div>
  </form>
</template>
<script>
export default {
  name: 'InputSearch',
  props: {
    css: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    change: {
      type: Function
    },
    submit: {
      type: Function
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showPlaceholder: true
    }
  },
  mounted () {
  },
  methods: {
    onInput (e) {
      if (this.change) this.change(e.target.value)
    },
    onSubmit (e) {
      if (this.submit) this.submit(e.target.querySelector('input[type=search]').value)
      e.preventDefault()
    },
    onBlur (e) {
      if (e.target.value) this.showPlaceholder = false
      else this.showPlaceholder = true
    }
  }
}
</script>
