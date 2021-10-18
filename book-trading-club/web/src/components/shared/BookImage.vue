<template>
  <img :class="'book'"
       id="bookImg"
       :src='getImage()'
       @load="getAlternativeImage($event)"
       alt="book cover">
</template>

<script>
export default {
  name: 'book-image',
  props: {
    image: String
  },
  methods: {
    getImage() {
       return this.image || require('@/assets/GenericBookCover.jpg');
    },
    getAlternativeImage (event) {
      if (event.target.naturalWidth === 1 || event.target.naturalHeight === 1) {
          event.target.src = require('@/assets/GenericBookCover.jpg');
      }
    },
  }
}
</script>

<style scoped>
  #bookImg {
    width: 40%;
    height: 40%;
    margin-bottom: 2%;
  }
</style>
