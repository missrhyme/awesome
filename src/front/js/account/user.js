/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fetch from '../../utils/fetch';
//
var defaultForm = {
  name: '',
  avatar: '',
  sex: '1',
  address: '',
  mobile: '',
  tel: '',
  email: '',
  birthday: ''
};

window.pageInit = function () {
  return new _vue2.default({
    el: '#app',
    data: function data() {
      var _this = this;

      var pwValidate = function pwValidate(rule, value, callback) {
        var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
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

      var pwValidate2 = function pwValidate2(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== _this.$refs.pwForm.new) {
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
          repeat: ''
        },
        dialogFormVisible: false,
        rules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }],
          email: [{ required: true, message: '请输入Email', trigger: 'blur' }]
        },

        pwRules: {
          old: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
          new: [{ validator: pwValidate, trigger: 'blur' }],
          repeat: [{ validator: pwValidate2, trigger: 'blur' }]
        }
      };
    },


    methods: {
      handleConfirm: function handleConfirm() {
        var _this2 = this;

        this.$refs.ruleForm.validate(function (valid) {
          if (!valid) {
            _this2.$message('表格不完整，请检查后提交！');
          } else {
            _this2.$message('验证通过');
          }
        });
      },
      handleConfirmPw: function handleConfirmPw() {
        var _this3 = this;

        this.$refs.pwForm.validate(function (valid) {
          if (!valid) {
            _this3.$message('表格不完整，请检查后提交！');
          } else {
            _this3.$message('验证通过');
          }
        });
      }
    }
  });
};

/***/ })

/******/ });