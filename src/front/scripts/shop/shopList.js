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

      // 新建/编辑是否打开
      dialogOpen: false,

      // 是否为编辑状态
      isEdit: false,

      form: defaultForm,

      rules: {
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    // 停用
    handleStop(item, index) {
      this.$confirm(`确认停用店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        fetch({
          url: '/api/shop/stop',
          type: 'POST',
          data: {
            id: item.id,
          },
        })
        .then((r) => {
          if (r.success) {
            this.$message('停用成功');
            this.list[index].status = 0;
          } else {
            this.$message('停用失败，请重试');
          }
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用',
        });
      });
    },

    // 启用
    handleRestart(item, index) {
      this.$confirm(`确认启用店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        fetch({
          url: '/api/shop/restart',
          type: 'POST',
          data: {
            id: item.id,
          },
        })
        .then((r) => {
          if (r.success) {
            this.$message('启用成功');
            this.list[index].status = 1;
          } else {
            this.$message('启用失败，请重试');
          }
        });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用',
        });
      });
    },

    // 删除
    handleDelete(item, index) {
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
          })
          .then((r) => {
            if (r.success) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.list.splice(index, 1);
            } else {
              this.$message('删除失败，请重试');
            }
          });
        })
        .catch(() => {
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
          if (res.success) {
            this.form = res.detail;
            this.isEdit = true;
            this.dialogOpen = true;
          } else {
            this.$message('获取店铺信息失败，请重试');
          }
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
      this.$refs.ruleForm.validate(
        (valid) => {
          if (!valid) {
            this.$message('表格不完整，请检查后提交！');
          } else if (this.isEdit) {
            this.handleEditSubmit();
          } else {
            this.handleCreateSubmit();
          }
        },
      );
    },

    handleCreateSubmit() {
      fetch({
        url: '/api/shop/add',
        type: 'POST',
        data: this.form,
      })
      .then(
        (r) => {
          if (r.success) {
            this.$message('新建成功');
            this.list.unshift(r.detail);
            this.dialogOpen = false;
          } else {
            this.$message('新建失败，请重试');
          }
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
          if (r.success) {
            this.dialogOpen = false;
            this.$message('编辑成功');
          } else {
            this.$message('编辑失败，请重试');
          }
        },
      );
    },

    handleCurrentChange(val) {
      location.href = `/shopList/?page=${val}`;
    },
  },
});
