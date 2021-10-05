import axios from 'axios';

const bookApi = {
  data() {
    return {
      searchApiEndpoint: 'http://openlibrary.org/search.json',
      imagesEndpoint: 'http://covers.openlibrary.org/b/isbn/',
    }
  },
  methods: {
    getBookImage (isbn) {
      return `${this.imagesEndpoint}${isbn}-S.jpg`;
    },
    searchBookByTitle (title) {
      return axios.get(`${this.searchApiEndpoint}?title=${title}`);
    }
  }
}

export default bookApi;
