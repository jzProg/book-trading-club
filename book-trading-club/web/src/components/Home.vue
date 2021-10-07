<template>
  <div>
    <div id="addBookBtn"
         class="btn btn-primary"
         style="border-radius:40px"
         @click.prevent="postBook">
      <i class="fas fa-plus"></i>
    </div>
    <Books :bookList="getUserBooks"></Books>
  </div>
</template>

<script>
  import Books from './BookList.vue';
  import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';
  import bus from "@/common/eventBus";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Home',
    components: { Books },
    mixins: [uniqueIdGeneratorMixin],
    data() {
      return {
        userBooks: [],
        showModal: false,
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
      postBook() {
        this.$router.push('/search');
      },
      deleteBook(bookId) {
        this.deleteBook({ bookId: bookId}).then(() => {
          this.fetchBooks(this.getLoginUsername);
        });
      },
    },
    computed: {
      ...mapGetters([
          'getUserBooks',
          'getLoginUsername',
      ]),
    }
  }
</script>

<style scoped>
  #addBookBtn {
    float: left;
    margin-left: 10%;
  }
</style>
