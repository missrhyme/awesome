import Vue from 'vue';
import '../../components/layout';
// import fetch from '../../utils/fetch';
//
const defaultForm = {
  name: '',
  avatar: '',
  sex: '1',
  address: '',
  mobile: '',
  tel: '',
  email: '',
  birthday: '',
};

window.pageInit = () => new Vue({
  el: '#app',
  data() {
    const pwValidate = (rule, value, callback) =>  {
      const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (reg.test(value)) {
          // this.$refs.pwForm.validateField('new');
          callback();
        } else {
          callback(new Error('请输入数字、英文、特殊符号，至少包含两种以上'));
        }
      }
    };

    const pwValidate2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.$refs.pwForm.new) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      form: defaultForm,

      passwordForm: {
        old: '',
        new: '',
        repeat: '',
      },
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' },
        ],
      },

      pwRules: {
        old: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        new: [
          { validator: pwValidate, trigger: 'blur' },
        ],
        repeat: [
          { validator: pwValidate2, trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    handleConfirm() {
      this.$refs.ruleForm.validate(
        (valid) => {
          if (!valid) {
            this.$message('表格不完整，请检查后提交！');
          } else {
            this.$message('验证通过');
          }
        },
      );
    },

    handleConfirmPw() {
      this.$refs.pwForm.validate(
        (valid) => {
          if (!valid) {
            this.$message('表格不完整，请检查后提交！');
          } else {
            this.$message('验证通过');
          }
        },
      );
    },
  },
});
