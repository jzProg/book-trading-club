<template>
  <div>
    <label>Available Books for Trade!</label><br>
    <span v-if = "!isLoggedIn()">To be able to trade, you must first
        <a @click.prevent = "goToLogin">sign in</a>
    </span>
    <div id = 'bookListContent' class = "container">
      <div class = "row">
        <Book v-for = '(book, index) in sortedBookList'
              class = "col-md-4"
              :key = "index"
              :bookId = "book.bookId"
              :title = "book.title"
              :author = "book.author"
              :image = "book.image"
              :copies = "book.copies"
              :owner = "book.postedBy"
              :postedBy = "book.postedBy">
        </Book>
      </div>
    </div>
  </div>
</template>

<script>
  import Book from './Book.vue';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AllBooks',
    components: { Book },
    created() {
      this.fetchAllBooks();
    },
    methods: {
      ...mapActions([
          'fetchAllBooks',
      ]),
      isLoggedIn() {
        return localStorage.getItem('token');
      },
      goToLogin() {
          this.$router.push('/');
      }
    },
    computed: {
        sortedBookList() {
          if (localStorage.getItem('token')) {
            return this.getAllBooksPosted.filter((book)=> {
                return book.postedBy !== this.getLoginUsername;
            }).sort((book1, book2) => {
              return book1.postedBy > book2.postedBy;
            });
          }
          return this.getAllBooksPosted.sort((book1, book2) => {
            return book1.postedBy > book2.postedBy;
          });
        },
      ...mapGetters([
          'getAllBooksPosted',
          'getLoginUsername',
      ]),
    }
  }
</script>

<style scoped>

</style>
