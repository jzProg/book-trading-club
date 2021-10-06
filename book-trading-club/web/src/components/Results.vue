<template>
  <div>
    <div v-for="(book, index) in getSearchResults"
         @click.prevent="chooseBook(book)"
         class="book"
         style="margin-top:5%;border-style: solid;padding: 2%;cursor: pointer;">
       <img width="50px"
            height="60px"
            :src="getBookImage(book.isbn[0])"
            @load="getAlternativeImage($event)"><br>
       <label>{{ book.title }}</label><br>
       <label v-if="book.author_name">{{ book.author_name[0] }}</label>
     </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import bookApi from '@/common/BookApi';

export default {
  name: 'results',
  mixins: [bookApi],
  emits: ['select'],
  data () {
    return {

    }
  },
  methods: {
    chooseBook (book) {
      this.$emit('select', book);
    },
    getClass(index) {
      return this.selectedIndex === index ? 'selected' : ''
    },
    getAlternativeImage (event) {
      if (event.target.naturalWidth === 1 || event.target.naturalHeight === 1) {
          event.target.src = require('@/assets/GenericBookCover.jpg');
      }
    }
  },
  computed: {
    ...mapGetters([
      'getSearchResults'
    ])
  }
};
</script>

<style scoped>
  .book:hover {
    border-color: green;
  }
</style>
