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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultForm = {
  name: '',
  account: '',
  type: 1,
  access: '',
  secret: '',
  seller: '',
  marketplace: ''
};

new Vue({
  el: '#app',
  data: function data() {
    return {
      // 店铺列表
      list: [{
        "id": "10000",
        "name": "很厉害的店铺",
        "status": 1,
        "token": true
      }, {
        "id": "10001",
        "name": "很厉害的店铺2",
        "status": 0,
        "token": true
      }],

      // 新建/编辑是否打开
      dialogOpen: false,

      // 是否为编辑状态
      isEdit: false,

      form: defaultForm
    };
  },


  methods: {
    // 停用
    handleStop: function handleStop(item) {
      var _this = this;

      this.$confirm('\u786E\u8BA4\u505C\u7528\u5E97\u94FA' + item.name + '\uFF1F', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        _this.$message({
          type: 'success',
          message: '停用成功!'
        });
      }).catch(function () {
        _this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },


    // 删除
    handleDelete: function handleDelete(item) {
      var _this2 = this;

      this.$confirm('\u786E\u8BA4\u5220\u9664\u5E97\u94FA' + item.name + '\uFF1F', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        _this2.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(function () {
        _this2.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    // 编辑
    handleEdit: function handleEdit(item) {
      // get value here
      var data = {
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
    handleCreate: function handleCreate() {
      this.form = defaultForm;
      this.isEdit = false;
      this.dialogOpen = true;
    },
    handleCurrentChange: function handleCurrentChange(val) {
      console.log(val);
    }
  }
});

/***/ })

/******/ });