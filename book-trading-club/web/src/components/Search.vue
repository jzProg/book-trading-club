<template>
  <div>
    <h3>Search Books</h3>
    <input type="text" placeholder="Title" v-model="enteredTitle">
    <button type="button"
            class="btn btn-primary"
            style="margin-top: 5%; margin-bottom:5%;"
            @click.prevent="searchForBook">
      Search
    </button>
    <results @select="onBookSelected"/>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import Results from '@/components/Results';
import bookApi from '@/common/BookApi';
import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';

export default {
  name: 'search',
  components: {
    Results
  },
  mixins: [bookApi, uniqueIdGeneratorMixin],
  data() {
    return {
      enteredTitle: ''
    }
  },
  methods: {
    ...mapMutations([
      'setSearchResults'
    ]),
    ...mapActions([
      'addNewBook'
    ]),
    searchForBook () {
      this.searchBookByTitle(this.enteredTitle).then(response => {
        this.setSearchResults({ value: response.data.docs.filter(doc => doc.isbn && doc.isbn.length) });
      })
    },
    onBookSelected (book) {
      const bookId = this.guid();
      const author = book.author_name[0];
      const image = this.getBookImage(book.isbn[0], 'L');
      this.addNewBook({ ...book, bookId, author, image });
      this.$router.push('/home');
    }
  }
};
</script>
