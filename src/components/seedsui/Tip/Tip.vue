<template>
  <span class="tip">{{text}}</span>
</template>
<script>
export default {
  name: 'Mark',
  props: {
    text: {
      type: String,
      default: '按钮'
    }
  }
}
</script>
