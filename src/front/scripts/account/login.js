import Vue from 'vue';
import fetch from '../../utils/fetch';

new Vue({
  el: '.login-container',
  data() {
    return {
      type: 1,

      timeout: 60,

      hasCaptcha: false,

      loginForm: {
        username: '',
        password: '',
      },

      registerForm: {
        username: '',
        password: '',
        password_repeat: '',
        captcha: '',
      },

      resetpasswordForm: {
        username: '',
        password: '',
        password_repeat: '',
        captcha: '',
      },
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
    },

    handleCaptcha(mobile) {
      if (this.hasCaptcha) return;
      fetch({
        url: '/api/captcha',
        type: 'post',
        data: { mobile },
      })
        .then(
          () => {
            this.hasCaptcha = true;
            const interval = setInterval(
              () => {
                if (this.timeout > 1) {
                  this.timeout -= 1;
                } else {
                  this.timeout = 60;
                  clearInterval(interval);
                  this.hasCaptcha = false;
                }
              },
              1000,
            );
          },
        );
    },

    handleLogin(e) {
      e.preventDefault();
      fetch({
        url: '/api/login',
        type: 'POST',
        data: this.loginForm,
      })
      .then((r) => {
        if (r.success) window.location.href = '/shopList';
        else this.$message('用户名或密码错误，请重试。');
      });
    },

    handleRegister(e) {
      e.preventDefault();
      fetch({
        url: '/api/register',
        type: 'POST',
        data: this.registerForm,
      })
      .then(
         () => window.location.href = '/shopList',
         () => this.$message('注册失败，请重试。'),
      );
    },

    handleResetpassword(e) {
      e.preventDefault();
      fetch({
        url: '/api/resetpassword',
        type: 'POST',
        data: this.resetpasswordForm,
      })
      .then(() => window.location.href = '/shopList');
    },
  },
});
