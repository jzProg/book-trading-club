import axios from 'axios';

const bookApi = {
  data() {
    return {
      limit: 100,
      searchApiEndpoint: 'https://openlibrary.org/search.json',
      imagesEndpoint: 'https://covers.openlibrary.org/b/isbn/',
    }
  },
  methods: {
    getBookImage (isbn, size = 'S') {
      return `${this.imagesEndpoint}${isbn}-${size}.jpg`;
    },
    searchBookByTitle (title) {
      return axios.get(`${this.searchApiEndpoint}?title=${title}&fields=title,author_name,isbn,first_publish_year&limit=${this.limit}`);
    },
    searchBookByTerm (term) {
      return axios.get(`${this.searchApiEndpoint}?q=${term}&fields=title,author_name,isbn,first_publish_year&limit=${this.limit}`);
    }
  }
}

export default bookApi;
