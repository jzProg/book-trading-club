<template>
  <div>
    <h2>{{ userName }} </h2>
    <img id = 'userImg'
         src = "../assets/profile_default.png"
         alt = "Profile Image"
         style = "border-radius: 100px">
    <div id = 'bookListContent'
         class = "container">
      <div class = "row">
        <Book v-for = '(book, index) in sortedBookList'
              class = "col-md-4"
              :key = "index"
              :bookId = "book.bookId"
              :title = "book.title"
              :author = "book.author"
              :image = "book.image"
              :copies = "book.copies"
              :postedBy = "null">
        </Book>
      </div>
    </div>
  </div>
</template>

<script>
  import Book from './Book.vue';
  import { mapActions, mapGetters } from 'vuex';

 export default {
     name: 'Profile',
     components: { Book },
     data() {
       return {
         userName: '',
         userImage: '../assets/profile_default.png',
       }
     },
     created() {
       this.userName = this.$route.query.user;
      // this.userImage =
       this.fetchBooks(this.userName);
     },
     methods: {
       ...mapActions([
           'fetchBooks',
         ]),
       },
     computed: {
       ...mapGetters([
           'getUserBooks',
       ]),
       sortedBookList() {
         return this.getUserBooks.sort((book1, book2) => {
           return book1.title > book2.title;
         });
       },
     }
   }
</script>

<style scoped>
  #userImg {
    height: 200px;
    width: 200px;
  }
</style>
