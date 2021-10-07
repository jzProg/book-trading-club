<template>
  <div id="app">
    <div class="NavHeader">
        <h3 id="logoDiv" @click.prevent="goToHome">
            <b>Book Track</b>
        </h3>
        <div id="profileDiv" v-if="username">
          <div v-if="$route.meta.hasProfileHeader">
              <a @click.prevent="showOptions">
                <img :src="getImage()"
                     alt="profile image"
                     class="profileItem"
                     id="profileImg">
              </a>
          </div>
          <h4 style="margin-left: 2%; color: white"><b>{{ username }}</b></h4>
        </div>
        <profile-modal v-if="showOptionsModal"
                     class="fragment"
                     :username="username"
                     @logout="logout"
                     @close="onOptionsClose"/>
    </div>
    <div class="fragment">
      <router-view/>
    </div>
    <Loading v-if="getLoad"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import bus from "@/common/eventBus";
  import firebaseConfigProperties from "@/common/firebaseConfigProperties";
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import firebase from "firebase/app";
  import 'firebase/database';
  import 'firebase/auth';
  import { VBToggle } from 'bootstrap-vue';
  import 'bootstrap-vue/dist/bootstrap-vue.css';
  import ProfileModal from '@/components/modals/ProfileModal';
  import Loading from '@/components/shared/Loading';

  export default {
    name: 'app',
    directives: {
      'b-toggle': VBToggle
    },
    mixins: [firebaseConfigProperties],
    components: {
      ProfileModal,
      Loading
    },
    data() {
      return {
        username: '',
        showOptionsModal: false,
      };
    },
    methods: {
      ...mapMutations([
        'setLoginUsername',
        'setBookList',
        'setUserId',
      ]),
      ...mapActions([
        'userLogout',
        'clearUserData',
      ]),
      getImage() {
        return require(`./assets/profile_default.png`);
      },
      goToHome(){
        this.$router.push('/');
      },
      showOptions() {
        this.showOptionsModal = true;
      },
      onOptionsClose() {
        this.showOptionsModal = false;
      },
      fetchInitialUserInfo(mail)  {
        console.log('fetching user info...');
        firebase.database().ref('users/').on("value", (userObject) => {
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
        this.onOptionsClose();
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
        'getLoad',
      ]),
    }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  body {
    background-color: lightblue;
  }

  .NavHeader {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: black;
    align-content: space-between;
  }

  .profileItem {
    margin: 2%;
    cursor: pointer;
  }

  #logoDiv {
   color: white;
   cursor: pointer;
   margin-left: 2%;
   flex: 3;
  }

  #profileDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  #profileImg {
    width: 80px;
    height: 80px;
    border-radius: 50px;
  }

  .appLogo {
    flex: 3;
  }

  .appLogoCenter {
     flex: 4;
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

  @media only screen and (max-width: 980px) {
    .appLogo img {
      width: 50px !important;
      height: 50px !important;
    }
  }
</style>
