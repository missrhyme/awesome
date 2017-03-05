import Vue from 'vue';
import fetch from '../../utils/fetch';

const defaultForm = {
  mail: '',
  content: '',
};

window.pageInit = ({
  list = [],
  keywords = [],
  pageType = 'mail',
}) => new Vue({
  el: '#app',
  data() {
    return {
      list,

      keywords,

      pageType,

      dialogOpen: false,

      isEdit: false,

      form: defaultForm,
    };
  },

  methods: {
    handleCreate() {
      this.form = defaultForm;
      this.isEdit = false;
      this.dialogOpen = true;
    },

    handleSubmit() {
      const url = this.isEdit ? `/api/${pageType}Template/edit` : `/api/${pageType}Template/add`;
      fetch({
        url,
        type: 'POST',
        data: this.form,
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
              url: `/api/${pageType}Template/delete`,
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

    // Just for test
    handleTest() {
      const email = window.prompt('输入要发送的邮箱地址');
      const id = window.prompt('输入模板id');
      fetch({
        url: '/api/mailTemplate/test',
        type: 'POST',
        data: {
          id,
          email,
        },
      })
      .then(
        (r) => {
          if (r.success) this.$message('发送成功');
        },
      );
    },

  },
});
