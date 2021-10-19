<template>
  <div>
    <input type="text"
           placeholder="search term"
           @keyup.enter="searchForBook"
           v-model="enteredTerm">
    <button type="button"
            class="btn btn-primary"
            style="margin-top: 2%; margin-bottom: 2%"
            @click.prevent="searchForBook">
      <i class="fas fa-search"></i>
    </button>
    <results @select="onBookSelected"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Results from '@/components/Results';
import bookApi from '@/common/BookApi';

export default {
  name: 'search',
  components: {
    Results
  },
  mixins: [bookApi],
  data() {
    return {
      enteredTerm: ''
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
      this.searchBookByTerm(this.enteredTerm).then(response => {
        this.setSearchResults({ value: response.data.docs.filter(doc => doc.isbn && doc.isbn.length) });
      })
    },
    onBookSelected (book) {
      const bookId = book.isbn[0];
      const author = book.author_name[0];
      const image = this.getBookImage(book.isbn[0], 'L');
      this.getBookDetailedInfo(bookId).then(response => {
        const res = Object.values(response.data)[0];
        const description = res.subtitle || '';
        const pages = res.number_of_pages || 0;
        const subjects = res.subjects;
        const subject = subjects && subjects.length ? subjects[0].name : '';
        const publishers = res.publishers;
        const publisher = publishers && publishers.length ? publishers[0].name : '';
        this.addNewBook({ ...book, bookId, author, image, description, pages, subject, publisher });
        this.setSearchResults({ value: this.getSearchResults.filter(doc => doc.isbn[0] !== bookId) });
      });
    }
  },
  computed: {
    ...mapGetters([
      'getSearchResults'
    ])
  }
};
</script>
