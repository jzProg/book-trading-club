<template>
  <div>
    <div id="addBookBtn"
         class="btn btn-primary"
         style="border-radius:40px"
         @click.prevent="postBook">
      <i class="fas fa-plus"></i>
    </div>
    <Books :bookList="getBooksByCategory" @selectBook="onSelectBook"/>
    <edit-book v-if="showEdit" :bookInfo="selectedBook" @close="showEdit = false"/>
  </div>
</template>

<script>
  import Books from './BookList.vue';
  import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';
  import bus from "@/common/eventBus";
  import { mapActions, mapGetters } from 'vuex';
  import EditBook from "@/components/modals/EditBook";

  export default {
    name: 'Home',
    components: {
      Books,
      EditBook
    },
    mixins: [uniqueIdGeneratorMixin],
    data() {
      return {
        userBooks: [],
        showEdit: false,
        selectedBook: {}
      }
    },
    created() {
      if (!this.getLoginUsername) {
        bus.$on('login', (username) => {
          this.storeUsername(username);
        });
      }
    },
    methods: {
      ...mapActions([
          'fetchBooks',
          'addNewBook',
          'deleteBook',
          'storeUsername',
      ]),
      onSelectBook (isbn) {
        const book = this.getUserBooks.find(book => book.bookId === isbn);
        this.selectedBook = book;
        this.showEdit = true;
      },
      postBook() {
        this.$router.push('/search');
      },
      deleteBook(bookId) {
        this.deleteBook({ bookId }).then(() => {
          this.fetchBooks(this.getLoginUsername);
        });
      },
    },
    computed: {
      ...mapGetters([
          'getUserBooks',
          'getLoginUsername',
          'getSelectedCategory'
      ]),
      getBooksByCategory () {
        return (this.getUserBooks || []).filter(book => !book.category || book.category === this.getSelectedCategory)
      }
    }
  }
</script>

<style scoped>
  #addBookBtn {
    float: left;
    margin-left: 10%;
  }
</style>
