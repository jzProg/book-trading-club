<template>
  <div id = "app">
   <!-- <img src = "./assets/logo.png"> -->
    <i v-if = "(!isLoggedIn() || notAuthPage()) &&  !isExcludedPage()"
       class = "fas fa-book fa-10x"
       style = "color:green;margin-bottom: 2%">
    </i>
    <div v-if = "username" class = "container" style = "margin-right:2%">
      <div class = "row">
        <div class = "col-md-12" style = "position: relative;">
          <a @click.prevent = "showOptions">
            <h3 id = 'notificationText' v-if = "numOfUnreadNotifications">{{ numOfUnreadNotifications }}</h3>
            <img src = "./assets/profile_default.png"
                 alt = "profile image"
                 style = "width:80px; height:80px; border-radius:50px; float:right; margin-right:5%">
          </a>
          <OptionsModal v-if = "showOptionsModal"
                        :username = "username"
                        :logout = "logout"
                        :notifications = "getNotifications"
                        @close = "onOptionsClose">
          </OptionsModal>
        </div>
      </div>
      <div class = "row">
        <div class = "col-md-12">
          <h4 style = "float:right">Welcome, {{ username }}! </h4>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import bus from "@/common/eventBus";
  import firebaseConfigProperties from "@/common/firebaseConfigProperties";
  import OptionsModal from '@/components/modals/OptionsModal';
  import { mapActions, mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'app',
    mixins: [firebaseConfigProperties],
    components: { OptionsModal },
    data() {
      return {
        username: '',
        showOptionsModal: false,
      };
    },
    methods: {
      ...mapMutations([
          'setLoginUsername',
      ]),
      ...mapActions([
        'userLogout',
        'clearUserData',
        'fetchNotifications',
      ]),
      showOptions() {
        this.showOptionsModal = true;
      },
      onOptionsClose() {
        this.showOptionsModal = false;
      },
      logout() {
        this.userLogout().then(() => {
          this.clearUserData();
          this.showOptionsModal = false;
          this.$router.push('/');
        });
      },
      isExcludedPage () {
        const fullUrl = window.location.href;
        return fullUrl.substr(fullUrl.indexOf('#') + 2).includes('profile');
      },
      isLoggedIn() {
        return localStorage.getItem('token');
      },
      notAuthPage() {
        const fullUrl = window.location.href;
        return fullUrl.substr(fullUrl.indexOf('#') + 2) !== 'home';
      }
    },
    created() {
      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(this.config);
      }
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('loggedIn!');
          // User is signed in.
          this.username = user.displayName;
          this.setLoginUsername({ value: user.displayName });
          this.fetchNotifications(user.displayName);
  //        var email = user.email;
  //        var emailVerified = user.emailVerified;
  //        var photoURL = user.photoURL;
  //        var isAnonymous = user.isAnonymous;
  //        var uid = user.uid;
  //        var providerData = user.providerData;
          user.getIdToken().then((token) => {
            localStorage.setItem('token', token);
            bus.$emit('login', user.displayName);
          });
        } else {
          console.log('loggedOut!');
          this.username = '';
        }
      });
    },
    computed: {
      ...mapGetters([
        'getNotifications',
      ]),
      numOfUnreadNotifications() {
          return this.getNotifications ? this.getNotifications.length : 0;
      }
    }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #notificationText{
    border-radius: 50%;
    position: absolute;
    top: -30px;
    right: 70px;
    width: 30px;
    font-weight: bold;
    color: red;
    background-color: lightblue;
  }
</style>
