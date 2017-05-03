import Vue from 'vue';
import '../../components/layout';
import fetch from '../../utils/fetch';
import option from '../../utils/option';

new Vue({
  el: '#app',
  // components: {
  //   'amz-layout': layout,
  // },
  data() {
    return {
      // 店铺列表
      list: [
        {
          "id": '10000',
          "sku": 'EU-OU12-3XQ4',
          "name": "商品1",
          "status": "1",
          "catalog": "",
          "buyer": "",
          "total": "10",
          "notDeliver": "20",
          "weight": 0.01,
          "volume": '0/19/20'
        },
        {
          "id": '10001',
          "sku": 'EU-OU12-3XQ4',
          "name": "商品2",
          "status": "2",
          "catalog": "",
          "buyer": "",
          "total": "109",
          "notDeliver": "210",
          "weight": 10.01,
          "volume": '0/123/20'
        },
      ],
    };
  },

  methods: {
    // 删除
    handleDelete(item, index) {
      option({
        url: '/api/commodity/remove',
        type: 'POST',
        data: { id: item.id },
        context: this,
        successFunc: () => this.list.splice(index, 1),
      });
    },

    // 编辑
    handleEdit(item) {
      // fetch({
      //   url: '/api/shop/detail',
      //   data: { id: item.id },
      // })
      // .then(
      //   (res) => {
      //     if (res.success) {
      //       this.form = res.detail;
      //       this.isEdit = true;
      //       this.dialogOpen = true;
      //     } else {
      //       this.$message('获取店铺信息失败，请重试');
      //     }
      //   },
      // );
    },

  },
});
