import Vue from 'vue';
import fetch from '../../utils/fetch';
import option from '../../utils/option';

window.pageInit = ({
  list = [],
  page = 1,
  pagesize = 10,
  total = 10,
}) => new Vue({
  el: '#app',
  data() {
    return {
      // 店铺列表
      list,

      page,

      pagesize,

      total,
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
