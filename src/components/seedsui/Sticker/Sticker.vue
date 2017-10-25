<template>
  <span :class="'sticker sticker-icon '+position">
  	<slot></slot>
  </span>
</template>
<script>
export default {
  name: 'Sticker',
  props: {
    position: {
      type: String,
      default: 'top right'
    }
  }
}
</script>
