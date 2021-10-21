const urlAuthMixin = {
  methods: {
    isLoggedIn() {
      return localStorage.getItem('token');
    },
    isInPath(path) {
      return this.$route.name === path;
    }
  },
  computed: {
    isHome() {
      return this.$route.name === 'Home';
    },
  }
};

export default urlAuthMixin;
