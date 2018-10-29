import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      booksPosted: [],
      loginUsername: '',
      notifications: [],
      messages: [],
    },
    allBooksPosted: [],
    errorLoginMessage: '',
    errorRegisterMessage: '',
  },
  getters: {
    getMessages(state) {
      return state.userInfo.messages;
    },
    getNotifications(state) {
      return state.userInfo.notifications;
    },
    getErrorRegisterMessage(state) {
      return state.errorRegisterMessage;
    },
    getErrorLoginMessage(state) {
      return state.errorLoginMessage;
    },
    getUserBooks(state) {
      return state.userInfo.booksPosted;
    },
    getAllBooksPosted(state) {
      return state.allBooksPosted;
    },
    getLoginUsername(state) {
      return state.userInfo.loginUsername;
    }
  },
  mutations: {
    setNotifications(state, payload) {
      state.userInfo.notifications = payload.value;
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
    setAllBookList(state, payload) {
      state.allBooksPosted = payload.value;
    },
    setBookList (state, payload) {
      state.userInfo.booksPosted = payload.value;
    },
    setMessages(state, payload) {
      state.userInfo.messages = payload.value;
    },
  },
  actions: {
    trade({ commit, state }, payload) {
      return  firebase.database().ref('trades/' + payload.tradeId).set({
                tradeId: payload.tradeId,
                requester: payload.requester,
                receiver: state.userInfo.loginUsername,
                bookToTrade: payload.bookToTrade,
                bookToOffer: payload.bookToOffer,
      }).then(() => {
          firebase.database().ref('books/' + payload.bookToTrade).update({
            postedBy: payload.requester,
          });
          firebase.database().ref('books/' + payload.bookToOffer).update({
            postedBy: state.userInfo.loginUsername,
          });
      });
    },
    removeMessage({ commit, state }, payload) {
      return  firebase.database().ref('users/').once("value", (userObject) => {
        if (userObject.val()) {
          Object.values(userObject.val()).forEach((user) => {
            if (user.username === state.userInfo.loginUsername) {
              const newMessages = user.messages.filter(( mes ) => {
                return mes.messageId !== payload.messageId;
              });
              firebase.database().ref('users/' + user.userId).update({
                messages: newMessages,
              });
            }
          });
        }});
    },
    removeNotification({ commit, state }, payload) {
      return  firebase.database().ref('users/').once("value", (userObject) => {
        if (userObject.val()) {
          Object.values(userObject.val()).forEach((user) => {
            if (user.username === state.userInfo.loginUsername) {
              const newNotif = user.notifications.filter(( not ) => {
                return not.tradeId !== payload.notificationId;
              });
              firebase.database().ref('users/' + user.userId).update({
                notifications: newNotif,
              });
            }
          });
        }});
    },
    sendTradeMessage({ commit }, payload) {
      firebase.database().ref('users/').once("value", (userObject) => {
        if (userObject.val()) {
          Object.values(userObject.val()).forEach((user) => {
            const newEntry = {
              messageId: payload.messageId,
              message: payload.message,
              isPositive: payload.isPositive,
            };
            if (user.username === payload.sendTo) {
              if (user.messages) user.messages.push(newEntry);
              else user.messages = [newEntry];
              firebase.database().ref('users/' + user.userId).update({
                messages: user.messages,
              });
            }
          });
        }});
    },
    fetchTradeMessages({ commit }, username) {
      return firebase.database().ref('users/').on("value", (userObject) => {
        if (userObject.val()) {
          Object.values(userObject.val()).forEach((user) => {
            if (user.username === username) {
              commit({ type: 'setMessages', value: user.messages });
            }
          });
        }});
    },
    fetchNotifications({ commit }, username) {
      return firebase.database().ref('users/').on("value", (userObject) => {
        if (userObject.val()) {
          Object.values(userObject.val()).forEach((user) => {
            if (user.username === username) {
              commit({ type: 'setNotifications', value: user.notifications });
            }
          });
        }});
    },
    sendNotification({ commit }, payload) {
      firebase.database().ref('users/').once("value", (userObject) => {
        if (userObject.val()) {
          Object.values(userObject.val()).forEach((user) => {
            const newEntry = {
                               tradeId: payload.tradeId,
                               requester: payload.requester,
                               bookToTrade: payload.bookToTrade,
                               bookToOffer: payload.bookToOffer};
            if (user.username === payload.trader) {
              if (user.notifications) user.notifications.push(newEntry);
              else user.notifications = [newEntry];
              firebase.database().ref('users/' + user.userId).update({
                notifications: user.notifications,
              })
            }
          });
        }});
    },
    addNewBook({ commit, state }, payload) {
      const results = state.userInfo.booksPosted.find(book => {
          return book.title === payload.title && book.postedBy === payload.postedBy;
      });
      if (results) {
        return firebase.database().ref('books/' + results.bookId)
          .update({ copies: ( results.copies? results.copies + 1 : 2 ) });
      }
      return firebase.database().ref('books/' + payload.bookId).set({
        bookId: payload.bookId,
        title: payload.title,
        author: payload.author,
        image: payload.image,
        copies: 1,
        postedBy: payload.postedBy,
      });
    },
    fetchBooks({commit}, username) {
       firebase.database().ref('books/').on("value", (bookObject) => {
        const filteredBooks = [];
        if (bookObject.val()) {
          Object.values(bookObject.val()).forEach((book) => {
            if (book.postedBy === username) {
              filteredBooks.push(book);
            }
          });
         commit({ type: 'setBookList', value: filteredBooks});
        }
      }, (errorObject) => {
        console.log("Can't fetch books! The read failed: " + errorObject.code);
      });
    },
    fetchAllBooks({commit}) {
      console.log('in fetch all books');
      firebase.database().ref('books/').on("value", (bookObject) => {
        const allBookList = [];
        if (bookObject.val()) {
          Object.values(bookObject.val()).forEach((book) => {
            allBookList.push(book);
          });
          commit({ type: 'setAllBookList', value: allBookList});
        }
      }, (errorObject) => {
        console.log("Can't fetch books! The read failed: " + errorObject.code);
      });
    },
    deleteBook({ commit }, payload) {
      return  firebase.database().ref('books/' + payload.bookId).remove();
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
