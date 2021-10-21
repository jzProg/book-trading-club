<template>
  <div id="app">
    <nav-bar :categories="categories"
             :username="username"
             @categorySelected="(category) => { updateKey++; setSelectedCategory({ value: category.name }) }"
             @navigateToHome="goToHome"
             @logout="logout"/>
    <div class="fragment" :key="updateKey">
      <router-view/>
    </div>
    <Loading v-if="getLoad"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import Vue from 'vue';
  import bus from '@/common/eventBus';
  import firebaseConfigProperties from '@/common/firebaseConfigProperties';
  import firebase from 'firebase/app';
  import 'firebase/database';
  import 'firebase/auth';
  import Loading from '@/components/shared/Loading';
  import NavBar from '@/components/shared/NavBar';

  export default {
    name: 'app',
    directives: {
      'b-toggle': VBToggle
    },
    mixins: [firebaseConfigProperties],
    components: {
      Loading,
      NavBar
    },
    data() {
      return {
        username: '',
        categories: [
          { name: 'Reading', icon: 'fas fa-book-open'},
          { name: 'Completed', icon: 'fas fa-check-square'},
          { name: 'Plan to Read',  icon: 'fas fa-stream'}
        ],
        updateKey: 0
      };
    },
    methods: {
      ...mapMutations([
        'setLoginUsername',
        'setBookList',
        'setUserId',
        'setSelectedCategory',
        'storeNumberOfUsers'
      ]),
      ...mapActions([
        'userLogout',
        'clearUserData',
      ]),
      goToHome(){
        this.$router.push('/');
      },
      fetchInitialUserInfo(mail)  {
        console.log('fetching user info...');
        firebase.database().ref('users/').on("value", (userObject) => {
          this.storeNumberOfUsers({ value: userObject.numChildren() });
          if (userObject.val()) {
            Object.values(userObject.val()).forEach((user) => {
              if (user.mail.toLowerCase() === mail.toLowerCase()) {
                console.log('user found!');
                localStorage.setItem('userId', user.userId);
                this.setBookList({ value: user.books || [] });
                this.username = user.username;
                this.setLoginUsername({ value: user.username });
                this.setUserId({ value: user.userId });
                bus.$emit('login', user.username);
              }
            });
          }
      });},
      logout() {
        this.userLogout().then(() => {
          this.clearUserData();
          this.$router.push('/');
        });
      }
    },
    created() {
      // Initialize Firebase
      if (!firebase.apps.length) {
        console.log('firebase created!');
        firebase.initializeApp(this.config);
      }
      const vm = this;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('loggedIn!');
          // User is signed in.
          user = firebase.auth().currentUser;
          user.getIdToken().then(token => {
            localStorage.setItem('token', token);
            vm.fetchInitialUserInfo(user.email);
          });
        } else {
          console.log('loggedOut!');
          vm.username = '';
          localStorage.setItem('token', '');
        }
      });
    },
    computed: {
      ...mapGetters([
        'getLoad'
      ]),
    }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: gray;
  }

  body {
    background-color: #282c34;
  }

  .fragment {
    text-align: center;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 1 0 5px grey;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
</style>
