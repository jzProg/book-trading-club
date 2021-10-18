<template>
  <div class="outer">
   <div :style="{ backgroundColor: 'green', width: percentage, height: '100%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    progress: Number,
    total: Number
  },
  computed: {
    percentage () {
      return this.progress / this.total * 100 + '%'
    }
  }
}
</script>

<style scoped>
 .outer {
    background-color: black;
    width: 100%;
    height: 15px;
    margin-top: 1%
 }
</style>
