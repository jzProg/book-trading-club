const urlAuthMixin = {
  methods: {
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
    },
    isInPath(path) {
      const fullUrl = window.location.href;
      return fullUrl.substr(fullUrl.indexOf('#') + 2) === path;
    }
  }
};

export default urlAuthMixin;
