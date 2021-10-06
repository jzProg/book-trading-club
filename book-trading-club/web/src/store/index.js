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
  },
  getters: {
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
    addNewBook({ commit, state }, payload) {
      const {  books, userId } = state.userInfo;
      const results = books.find(book => {
          return book.title === payload.title;
      });
      if (results) {
        return;
      }
      const newBook = {
        bookId: payload.bookId,
        title: payload.title,
        author: payload.author,
        image: payload.image,
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
