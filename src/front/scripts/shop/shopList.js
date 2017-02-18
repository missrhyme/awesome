new Vue({
  el: '#app',
  data () {
    return {
      // 店铺列表
      list: [
        {
         "id": "10000",
         "name": "很厉害的店铺",
         "status": 1,
         "token": true
        },
        {
         "id": "10001",
         "name": "很厉害的店铺2",
         "status": 0,
         "token": true
        }
      ],

      dialogOpen: false,

      form: {
        name: '',
        account: '',
        type: 1,
        access: '',
        secret: '',
        seller: '',
        marketplace: ''
      }
    }
  },

  methods: {
    //删除Dialog

  }
})
