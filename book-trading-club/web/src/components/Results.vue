<template>
  <div>
    <pagination v-if="getSearchResults.length > pageLimit"
                :has-next="hasNext()"
                :has-prev="hasPrev()"
                @next="goToNextPage"
                @prev="goToPreviousPage"/>
    <book-list :book-list="getBookList"
               @selectBook="chooseBook"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import bookApi from '@/common/BookApi';
import BookList from '@/components/BookList';
import Pagination from '@/components/shared/Pagination';

export default {
  name: 'results',
  mixins: [bookApi],
  emits: ['select'],
  components: {
    BookList,
    Pagination
  },
  data () {
    return {
      page: 1,
      pageLimit: 9
    }
  },
  methods: {
    chooseBook (isbn) {
      this.$emit('select', this.getSearchResults.find(book => book.isbn[0] === isbn));
    },
    hasPrev() {
      return this.page > 1;
    },
    hasNext() {
      return this.page * this.pageLimit < this.getSearchResults.length;
    },
    goToNextPage () {
      this.page++;
    },
    goToPreviousPage () {
      this.page--;
    }
  },
  computed: {
    ...mapGetters([
      'getSearchResults'
    ]),
    getBookList () {
      const startIndex = (this.page - 1) * this.pageLimit;
      return this.getSearchResults.slice(startIndex, startIndex + this.pageLimit).map(book => {
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
