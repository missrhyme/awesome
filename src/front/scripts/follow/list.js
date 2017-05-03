import Vue from 'vue';
import fetch from '../../utils/fetch';
import '../../components/layout';
import option from '../../utils/option';

const defaultForm = {
  lowPrice: '',
  step: '',
  phone: '',
  phonetemplate: '',
  email: '',
  emailtemplate: '',
  withsellcount: 0,
};

const vm = new Vue({
  el: '#app',
  data() {
    return {
      // 店铺列表
      list: [],

      form: defaultForm,

      dialogOpen: false,

      total: 0,

      pagesize: 10,

      page: 1
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
          (res) => {
            this.list = res.list;
            this.total = res.total;
          },
        );
    },

    // 翻页
    handleCurrentChange(val) {
      this.getList(val);
      this.page = val;
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
    handleSet(item) {
      fetch({
        url: '/withsell/get.sj',
        type: 'POST',
        data: { goods: item.shopId },
      })
      .then(
        (res) => {
          this.form = res;
          this.dialogOpen = true;
        },
      );
    },

    // 提交
    handleConfirm() {
      fetch({
        url: '/withsell/set.sj',
        type: 'POST',
        data: this.form,
      })
        .then(
          () => {
            this.$message('设置成功！');
            this.dialogOpen = false;
          },
        );
    }
  },
});

vm.getList();
