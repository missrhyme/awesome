import Vue from 'vue';
import '../../components/layout';
// import fetch from '../../utils/fetch';
//

window.pageInit = ({
  list = [],
}) => new Vue({
  el: '#app',
  data() {
    return {
      list,
    };
  },

  methods: {

  },
});
