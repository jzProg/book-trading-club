<template>
  <div id="app">
    <nav-bar :categories="categories"
             :username="getUsername"
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
      fetchInitialUserInfo(uid)  {
        console.log('fetching user info...');
        firebase.database().ref('aggregation/').on('value', (userObject) => {
          this.storeNumberOfUsers({ value: userObject.val() ? userObject.val().totalUsers : 0 });
        });
        firebase.database().ref('users/' + uid).on('value', (snapshot) => {
           const user = snapshot.val();
           if (user) {
             localStorage.setItem('userId', user.userId);
             this.setBookList({ value: user.books || [] });
             this.username = user.username;
             this.setLoginUsername({ value: user.username });
             this.setUserId({ value: user.userId });
             bus.$emit('login', user.username);
           }
        });
      },
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
            vm.fetchInitialUserInfo(user.uid);
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
      getUsername() {
        return this.username;
      }
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
