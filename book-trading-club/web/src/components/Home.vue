<template>
  <div>
    <div id="addBookBtn">
      <i class="fas fa-plus-circle fa-3x" @click.prevent="postBook"></i>
    </div>
    <books :book-list="getBooksByCategory" @selectBook="onSelectBook"/>
    <edit-book v-if="showEdit" :bookInfo="getSelectedBook" @close="showEdit = false"/>
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
        selectedBookIsbn: null
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
          'storeUsername'
      ]),
      onSelectBook (isbn) {
        this.selectedBookIsbn = isbn;
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
      },
      getSelectedBook () {
        return this.getUserBooks.find(book => book.bookId === this.selectedBookIsbn);
      }
    }
  }
</script>

<style scoped>
  #addBookBtn {
    float: left;
    margin-left: 10%;
    color: rgb(51, 122, 183);
    cursor: pointer;
  }
</style>
