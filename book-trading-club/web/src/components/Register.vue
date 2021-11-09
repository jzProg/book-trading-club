<template>
 <div id="container" class="container">
   <div id="rowDiv" class="row">
     <h1 class="text-center registerTitle">Be A Member!</h1>
     <input-form :fields="formItems"
                :error-message="getErrorRegisterMessage"
                :on-focus="removeErrorMessage"
                :on-submit="register"/>
     <div id="alreadyAccount">
       <i>Already an account? </i>
       <router-link :to = "{ path:'/' }">Sign in here</router-link>
     </div>
   </div>
 </div>
</template>

<script>
  import uniqueIdGeneratorMixin from '@/common/helpers/uniqueIdsGenerator';
  import bus from "@/common/eventBus";
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import InputForm from '@/components/shared/InputForm';

  export default {
    name: 'Register',
    mixins: [uniqueIdGeneratorMixin],
    components: { InputForm },
    data () {
      return {
        formItems: [
          { type: 'text', id: 'username', text: 'Username', placeholder: 'enter username here' },
          { type: 'text', id: 'email', text: 'Email', placeholder: 'enter mail here' },
          { type: 'password', id: 'pass', text: 'Password', placeholder: 'enter password here' }
        ],
        showModal: false,
      };
    },
    created() {
      bus.$on('login', () => {
        this.$router.push('home');
      });
    },
    mounted() {
      this.removeErrorMessage();
    },
    methods: {
      ...mapMutations([
          'setRegisterErrorMessage',
      ]),
      ...mapActions([
        'userAuth',
        'userLogin',
        'createUserProfile',
        'getUserLoginInfo',
        'storeUsername',
      ]),
      register(values) {
        const newUserEntry = {
          email: values[1],
          password: values[2],
        };
        this.userAuth(newUserEntry).then(() => {
          this.storeUsername(values[0]);
          this.userLogin(newUserEntry).then(authObject => {
            this.createUserProfile({ userId: authObject.user.uid, username: values[0], mail: values[1] });
          });
        });
      },
      removeErrorMessage() {
        this.setRegisterErrorMessage({ value: '' });
      },
    },
    computed: {
      ...mapGetters([
          'getErrorRegisterMessage',
      ])
    }
  }
</script>

<style scoped>
  .formContainer {
    text-align: left;
  }

  .registerTitle {
    margin-top: 5%;
  }

  #container {
    margin: 0 auto;
    width: 100%;
  }

  #submitBtn {
    margin-right: 2%;
  }

  #alreadyAccount {
    margin-top: 2%;
  }

  #errorRegisterSpan {
    color: red;
  }

  @media only screen and (max-width: 750px) {
    #container {
      width: 40%;
    }
  }
</style>
