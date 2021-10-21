<template>
  <div style="margin-top: 2%">
    <pagination v-if="bookList.length > pageLimit"
                :page="page"
                :page-limit="pageLimit"
                :list-size="bookList.length"
                @next="goToNextPage"
                @prev="goToPreviousPage"/>
    <div id='bookListContent' class="container">
      <div class="row">
        <Book v-for='(book,index) in sortedBookList'
              class="col-md-4"
              :key="index"
              :bookId="book.bookId"
              :title="book.title"
              :author="book.author"
              :image="book.image"
              :publish-year="book.first_publish_year"
              :category="book.category"
              :progress="book.progress"
              :totalPages="book.pages"
              :liked="book.liked"
              @selectBook="(event) => $emit('selectBook', event)">
        </Book>
      </div>
    </div>
  </div>
</template>

<script>
import Book from './Book.vue';
import Pagination from '@/components/shared/Pagination';

export default{
  name: 'book-list',
  emits: ['selectBook'],
  props: {
    bookList: Array
  },
  components: {
    Book,
    Pagination
  },
  data () {
    return {
      page: 1,
      pageLimit: 9
    }
  },
  methods: {
    goToNextPage () {
      this.page++;
    },
    goToPreviousPage () {
      this.page--;
    }
  },
  computed: {
   sortedBookList() {
     const startIndex = (this.page - 1) * this.pageLimit;
     return this.bookList.sort((book1, book2) => {
       return book1.title > book2.title;
     }).slice(startIndex, startIndex + this.pageLimit);
   }
  }
}
</script>
