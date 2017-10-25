<template>
	<input type="radio" class="input-radio" :style="css" :name="name" :value="value"/>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    css: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
