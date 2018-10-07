<template>
  <div>
    <div id = 'bookListContent' class = "container">
      <div class = "row">
        <Book v-for = '(book,index) in sortedBookList'
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
import Book from './Book.vue'

export default{
  name: 'BookList',
  props: ['bookList'],
  components: {
    Book,
  },
  computed: {
   sortedBookList() {
     return this.bookList.sort((book1, book2) => {
       return book1.title > book2.title;
     });
   },
  }
}
</script>
