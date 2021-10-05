<template>
 <div>
   <i v-if = "(!isLoggedIn() || notAuthPage()) &&  !isExcludedPage()"
      class = "fas fa-book fa-10x"
      style = "color:green;margin-bottom: 2%">
   </i>
   <h1 class = 'text-center'>{{ title }} </h1>
   <Login></Login>
 </div>
</template>

<script>
  import  Login  from './Login.vue';
  import { mapActions } from 'vuex';
  import bus from "@/common/eventBus";
  import urlAuthMixin from "@/common/helpers/urlAuth";

  export default {
    name: 'Welcome',
    mixins: [urlAuthMixin],
    data () {
      return {
        title: 'Welcome to JZ Book Track',
      }
    },
    components:{
      Login
    },
    created(){
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
    },
  }
</script>
