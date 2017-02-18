const defaultForm = {
  name: '',
  account: '',
  type: 1,
  access: '',
  secret: '',
  seller: '',
  marketplace: ''
}

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

      // 新建/编辑是否打开
      dialogOpen: false,

      // 是否为编辑状态
      isEdit: false,

      form: defaultForm
    }
  },

  methods: {
    // 停用
    handleStop(item) {
      this.$confirm(`确认停用店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '停用成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },

    // 删除
    handleDelete(item) {
      this.$confirm(`确认删除店铺${item.name}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 编辑
    handleEdit(item) {
      // get value here
      const data = {
         "id": "10000",
         "name": "很厉害的店铺",
         "status": 1,
         "token": true,
         "account": "moemoe@163.com",
         "type": 1,
         "access": "testAccessKey",
         "secret": "testSecretKey",
         "seller": "AED2FSFS823",
         "marketplace": "SADF82317313"
      };
      this.form = data;
      this.isEdit = true;
      this.dialogOpen = true;
    },

    // 新建
    handleCreate() {
      this.form = defaultForm;
      this.isEdit = false;
      this.dialogOpen = true;
    },

    handleCurrentChange(val) {
      console.log(val);
    }
  }
})
