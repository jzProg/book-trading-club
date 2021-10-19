<template>
  <book-list :book-list="getBookList" @selectBook="chooseBook"/>
</template>

<script>
import { mapGetters } from 'vuex';
import bookApi from '@/common/BookApi';
import BookList from '@/components/BookList';

export default {
  name: 'results',
  mixins: [bookApi],
  emits: ['select'],
  components: {
    BookList
  },
  methods: {
    chooseBook (isbn) {
      this.$emit('select', this.getSearchResults.find(book => book.isbn[0] === isbn));
    }
  },
  computed: {
    ...mapGetters([
      'getSearchResults'
    ]),
    getBookList () {
      return this.getSearchResults.map(book => {
        return {
          bookId: book.isbn[0],
          title: book.title,
          author: book.author_name &&  book.author_name.length ? book.author_name[0] : 'Unknown author',
          image: this.getBookImage(book.isbn[0]),
          first_publish_year: book.first_publish_year,
          pages: book.pages,
          publisher: book.publisher,
          subject: book.subject,
          description: book.description
        };
       });
    }
  }
};
</script>
