import Vue from 'vue';
import fetch from '../../utils/fetch';
import '../../components/layout';
import option from '../../utils/option';

const vm = new Vue({
  el: '#app',
  data() {
    return {
      // 店铺列表
      list: [],
    };
  },

  methods: {
    // 获取列表
    getList(pageIndex = 1) {
      fetch({
        url: '/withsell/list.sj',
        type: 'POST',
        data: {
          pageIndex,
        },
      })
        .then(
          (res) => { this.list = res.data; },
        );
    },

    // 删除
    handleDelete(item, index) {
      option({
        url: '/withsell/list.sj',
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

vm.getList();
