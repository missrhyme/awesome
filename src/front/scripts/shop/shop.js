import Vue from 'vue';
import '../../components/layout';
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

const vm = new Vue({
  el: '#app',
  data() {
    return {
      // 店铺列表
      list: [],

      page: 1,

      pagesize: 10,

      total: 0,

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
    // 获取列表
    getList(pageIndex = 1) {
      fetch({
        url: '/shop/list.sj',
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

    // 停用
    handleStop(item, index) {
      this.$confirm(`确认停用店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        fetch({
          url: '/shop/updatestatus.sj',
          type: 'POST',
          data: {
            id: item.shopId,
            status: 1,
          },
        })
        .then(() => {
          this.$message('停用成功');
          this.list[index].status = 0;
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
          url: '/shop/updatestatus.sj',
          type: 'POST',
          data: {
            id: item.shopId,
            status: 2,
          },
        })
        .then(() => {
          this.$message('启用成功');
          this.list[index].status = 1;
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
            url: '/shop/delete.sj',
            type: 'POST',
            data: { id: item.shopId },
          })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.list.splice(index, 1);
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
        url: '/shop/get.sj',
        data: { id: item.shopId },
      })
      .then(
        (res) => {
          this.form = res.detail;
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
        url: '/shop/save.sj',
        type: 'POST',
        data: this.form,
      })
      .then(
        (r) => {
          this.$message('新建成功');
          this.list.unshift(r);
          this.dialogOpen = false;
        },
      );
    },

    handleEditSubmit() {
      fetch({
        url: '/shop/save.sj',
        type: 'POST',
        data: this.form,
      })
      .then(
        () => {
          this.dialogOpen = false;
          this.$message('编辑成功');
        },
      );
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getList(val);
    },
  },
});

vm.getList();
