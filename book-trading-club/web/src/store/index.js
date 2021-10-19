import Vue from 'vue';
import Vuex from 'vuex';
import uniqueIdGenerator from '../common/helpers/uniqueIdsGenerator';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      books: [],
      userId: null,
      loginUsername: '',
    },
    searchResults: [],
    errorLoginMessage: '',
    errorRegisterMessage: '',
    load: false,
    selectedCategory: 'Reading',
    users: 0,
    ratings: {}
  },
  getters: {
    getRatings(state) {
      return state.ratings;
    },
    getNumberOfUsers(state) {
      return state.users;
    },
    getSelectedCategory(state) {
      return state.selectedCategory;
    },
    getLoad(state) {
      return state.load;
    },
    getErrorRegisterMessage(state) {
      return state.errorRegisterMessage;
    },
    getErrorLoginMessage(state) {
      return state.errorLoginMessage;
    },
    getUserBooks(state) {
      return state.userInfo.books;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getLoginUsername(state) {
      return state.userInfo.loginUsername;
    }
  },
  mutations: {
    setRatings(state, payload) {
      const { value } = payload;
      state.ratings = value;
    },
    storeNumberOfUsers(state, payload) {
      state.users = payload.value;
    },
    setSelectedCategory(state, payload) {
      state.selectedCategory = payload.value;
    },
    setLoad(state, payload) {
      state.load = payload.value;
    },
    setRegisterErrorMessage(state, payload) {
      state.errorRegisterMessage = payload.value;
    },
    setLoginErrorMessage(state, payload) {
      state.errorLoginMessage = payload.value;
    },
    setLoginUsername(state, payload) {
      state.userInfo.loginUsername = payload.value;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload.value;
    },
    setUserId(state, payload) {
      state.userInfo.userId = payload.value;
    },
    setBookList (state, payload) {
      state.userInfo.books = payload.value;
    }
  },
  actions: {
    fetchBookRatings({ commit, state }) {
      const bookEntry = firebase.database().ref('books/').on("value", (bookObject) => {
        commit({ type: 'setRatings', value: bookObject.val() });
      })
    },
    initBookEntry({ commit, state }, payload) {
      const { isbn } = payload;
      return firebase.database().ref('books/' + isbn).set({
        id: isbn,
        rating: 0
      });
    },
    rateBook({ commit, state }, payload) {
      const { isbn, liked } = payload;
      return firebase.database().ref('books/' + isbn).update({
        rating: liked ? firebase.database.ServerValue.increment(1) : firebase.database.ServerValue.increment(-1)
      });
    },
    toggleLiked ({ commit, state, dispatch }, payload) {
      const { books, userId } = state.userInfo;
      const bookToBeEdited = books.find(book => {
          return book.bookId === payload.bookId;
      });
      bookToBeEdited.liked = !bookToBeEdited.liked;
      dispatch('rateBook', { isbn: payload.bookId, liked: bookToBeEdited.liked });
      return firebase.database().ref('users/' + userId).update({
        books: [ ...books.filter(book => book.bookId !== payload.bookId), bookToBeEdited]
      });
    },
    updateBookProgress ({ commit, state }, payload) {
      const { books, userId } = state.userInfo;
      const bookToBeEdited = books.find(book => {
          return book.bookId === payload.bookId;
      });
      bookToBeEdited.progress = payload.progress;
      return firebase.database().ref('users/' + userId).update({
        books: [ ...books.filter(book => book.bookId !== payload.bookId), bookToBeEdited]
      });
    },
    updateBookStatus ({ commit, state }, payload) {
      const { books, userId } = state.userInfo;
      const bookToBeEdited = books.find(book => {
          return book.bookId === payload.bookId;
      });
      bookToBeEdited.category = payload.status;
      return firebase.database().ref('users/' + userId).update({
        books: [ ...books.filter(book => book.bookId !== payload.bookId), bookToBeEdited]
      });
    },
    addNewBook({ commit, state, dispatch }, payload) {
      const { books, userId } = state.userInfo;
      const results = books.find(book => {
          return book.bookId === payload.bookId;
      });
      if (results) {
        return;
      }
      dispatch('initBookEntry', { isbn: payload.bookId });
      const newBook = {
        bookId: payload.bookId,
        title: payload.title,
        author: payload.author,
        image: payload.image,
        first_publish_year: payload.first_publish_year,
        category: 'Plan to Read',
        description: payload.description,
        publisher: payload.publisher,
        subject: payload.subject,
        pages: payload.pages,
        progress: 0,
      }
      return firebase.database().ref('users/' + userId).update({
        books: [ ...books, newBook ]
      });
    },
    deleteBook({ commit, state }, payload) {
      const { books, userId } = state.userInfo;
      return firebase.database().ref('users/' + userId).update({
        books: books.filter(book => book.bookId !== payload.bookId)
      });
    },
    userLogin({ commit }, payload) {
      return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .catch((error) => {
            console.log('login error! Error info: ', error);
            commit({ type: 'setLoginErrorMessage', value: error.message });
      });
    },
    userAuth({ commit }, payload) {
      return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .catch((error) => {
          console.log('register error! Error info: ', error);
          commit({ type: 'setRegisterErrorMessage', value: error.message });
        });
    },
    createUserProfile({ commit }, payload) {
      return firebase.database().ref('users/' + payload.userId).set({
        userId: payload.userId,
        username: payload.username,
        mail: payload.mail,
        books: [],
      }).then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: payload.username,
        }).catch((error) => {
          console.log('profile update error: ', error);
        });
      });
    },
    userLogout({ commit }) {
      return firebase.auth().signOut()
        .then(() => {
          localStorage.setItem('token', '');
        }).catch((error) => {
          console.log('logout error: ', error);
        });
    },
    storeUsername({ commit }, username) {
      commit({ type: 'setLoginUsername', value: username });
    },
    clearUserData({ commit }) {
      commit({ type: 'setLoginUsername', value: '' });
      commit({ type: 'setBookList', value: []});
    }
  }
});
