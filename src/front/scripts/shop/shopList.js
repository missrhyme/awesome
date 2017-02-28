import Vue from 'vue';
import fetch from '../../utils/fetch';

const defaultForm = {
  name: '',
  account: '',
  type: 1,
  access: '',
  secret: '',
  seller: '',
  marketplace: '',
};

window.pageInit = ({
  list = [],
}) => new Vue({
  el: '#app',
  data() {
    return {
      // 店铺列表
      list,

      // 新建/编辑是否打开
      dialogOpen: false,

      // 是否为编辑状态
      isEdit: false,

      form: defaultForm,
    };
  },

  methods: {
    // 停用
    handleStop(item) {
      this.$confirm(`确认停用店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        fetch({
          url: '/api/shop/update',
          type: 'POST',
          data: {
            id: item.id,
            status: 0,
          },
        });
      })
      .then(() => {
        this.$message({
          type: 'success',
          message: '停用成功!',
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用',
        });
      });
    },

    // 删除
    handleDelete(item) {
      this.$confirm(`确认删除店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        fetch({
          url: '/api/shop/remove',
          type: 'POST',
          data: { id: item.id },
        });
      })
      .then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },

    // 编辑
    handleEdit(item) {
      fetch({
        url: '/api/shop/detail',
        data: { id: item.id },
      })
      .then(
        (res) => {
          this.form = res;
          this.isEdit = true;
          this.dialogOpen = true;
        },
      );
    },

    // 新建窗口
    handleCreate() {
      this.form = defaultForm;
      this.isEdit = false;
      this.dialogOpen = true;
    },

    handleConfirm() {
      if (this.isEdit) this.handleEditSubmit();
      else this.handleCreateSubmit();
    },

    handleCreateSubmit() {
      fetch({
        url: '/api/shop/add',
        type: 'POST',
        data: this.form,
      })
      .then(
        (r) => {
          if (r.success) this.$message('新建成功');
        },
      );
    },

    handleEditSubmit() {
      fetch({
        url: '/api/shop/update',
        type: 'POST',
        data: this.form,
      })
      .then(
        (r) => {
          if (r.success) this.$message('编辑成功');
        },
      );
    },

    handleCurrentChange(val) {
      console.log(val); // eslint-disable-line
    },
  },
});
