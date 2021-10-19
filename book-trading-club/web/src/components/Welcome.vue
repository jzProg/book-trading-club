<template>
 <div>
   <i v-if="(!isLoggedIn() || notAuthPage()) &&  !isExcludedPage()" class="fas fa-book fa-10x" id="logo"></i>
   <h1 class="text-center">
     {{ title }}
   </h1>
   <Login></Login>
 </div>
</template>

<script>
  import Login from '@/components/Login';
  import { mapActions } from 'vuex';
  import bus from '@/common/eventBus';
  import urlAuthMixin from '@/common/helpers/urlAuth';

  export default {
    name: 'welcome',
    mixins: [urlAuthMixin],
    data () {
      return {
        title: 'Welcome to JZ Book Track',
      }
    },
    components: {
      Login
    },
    created() {
      bus.$on('login', (username) => {
        this.storeUsername(username).then(() => {
          this.$router.push('home');
        });
      });
    },
    methods: {
      ...mapActions([
          'storeUsername',
      ]),
    }
  }
</script>

<style scoped>
  #logo {
    color: rgb(51, 122, 183);
    margin-bottom: 2%;
  }
</style>
