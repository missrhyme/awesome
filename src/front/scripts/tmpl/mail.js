import Vue from 'vue';
import '../../components/layout';
import fetch from '../../utils/fetch';

const defaultForm = {
  name: '',
  content: '',
};

const vm = new Vue({
  el: '#app',
  data() {
    return {
      list: [],

      keywords: [],

      dialogOpen: false,

      isEdit: false,

      currentId: null,

      total: 0,

      page: 1,

      pagesize: 10,

      form: defaultForm,
    };
  },

  methods: {
    handleCreate() {
      this.form = defaultForm;
      this.isEdit = false;
      this.dialogOpen = true;
    },

    getList(pageIndex = 1) {
      fetch({
        url: '/emailtemplate/list.sj',
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

    handleSubmit() {
      const d = this.isEdit ? { id: this.currentId } : {};
      d.name = this.form.name;
      d.content = this.form.content;
      fetch({
        url: '/emailtemplate/save.sj',
        type: 'POST',
        data: d,
      })
        .then(
          () => {
            this.dialogOpen = false;
            this.$message('新增模板成功！');
          },
        );
    },

    handleEdit(item) {
      this.form = item;
      this.currentId = item.id;
      this.isEdit = true;
      this.dialogOpen = true;
    },

    handleDelete(item) {
      this.$confirm('确认删除模板？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(
          () => {
            fetch({
              url: '/emailtemplate/delete.sj',
              type: 'POST',
              data: {
                id: item.id,
              },
            })
              .then(
                () => this.$message('删除模板成功！'),
              );
          },
        );
    },

    handleKeywords(item) {
      this.form.content += item.value;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getList(val);
    },
  },
});

vm.getList();
