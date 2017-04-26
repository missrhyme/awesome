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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = option;
function success(_ref) {
  var context = _ref.context,
      msg = _ref.msg;

  context.$message(msg);
}

function fail(_ref2) {
  var context = _ref2.context,
      msg = _ref2.msg;

  context.$message(msg);
}

function cancel(_ref3) {
  var context = _ref3.context,
      msg = _ref3.msg;

  context.$message({
    type: 'info',
    message: msg
  });
}

function option(_ref4) {
  var url = _ref4.url,
      _ref4$type = _ref4.type,
      type = _ref4$type === undefined ? 'GET' : _ref4$type,
      data = _ref4.data,
      context = _ref4.context,
      _ref4$optionName = _ref4.optionName,
      optionName = _ref4$optionName === undefined ? '删除' : _ref4$optionName,
      _ref4$confirm = _ref4.confirm,
      confirm = _ref4$confirm === undefined ? true : _ref4$confirm,
      _ref4$confirmMsg = _ref4.confirmMsg,
      confirmMsg = _ref4$confirmMsg === undefined ? '确认删除?' : _ref4$confirmMsg,
      _ref4$successFunc = _ref4.successFunc,
      successFunc = _ref4$successFunc === undefined ? success : _ref4$successFunc,
      _ref4$failFunc = _ref4.failFunc,
      failFunc = _ref4$failFunc === undefined ? fail : _ref4$failFunc,
      _ref4$cancelFunc = _ref4.cancelFunc,
      cancelFunc = _ref4$cancelFunc === undefined ? cancel : _ref4$cancelFunc;

  var promise = confirm ? context.$confirm(confirmMsg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }) : Promise.resolve();
  promise.then(function () {
    fetch({
      url: url,
      type: type,
      data: data
    }).then(function (r) {
      if (r.success) {
        // context.$message('停用成功');
        successFunc({
          context: context,
          data: r.data,
          msg: optionName + '\u6210\u529F'
        });
        // this.list[index].status = 0;
      } else {
        // context.$message('停用失败，请重试');
        failFunc({
          context: context,
          data: r.data,
          msg: optionName + '\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5'
        });
      }
    });
  }).catch(function () {
    cancelFunc({
      context: context,
      // data: r.data,
      msg: '\u5DF2\u53D6\u6D88' + optionName
    });
  });
}

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(0);

var _vue2 = _interopRequireDefault(_vue);

var _option = __webpack_require__(10);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.pageInit = function (_ref) {
  var _ref$list = _ref.list,
      list = _ref$list === undefined ? [] : _ref$list,
      _ref$page = _ref.page,
      page = _ref$page === undefined ? 1 : _ref$page,
      _ref$pagesize = _ref.pagesize,
      pagesize = _ref$pagesize === undefined ? 10 : _ref$pagesize,
      _ref$total = _ref.total,
      total = _ref$total === undefined ? 10 : _ref$total;
  return new _vue2.default({
    el: '#app',
    data: function data() {
      return {
        // 店铺列表
        list: list,

        page: page,

        pagesize: pagesize,

        total: total
      };
    },


    methods: {
      // 删除
      handleDelete: function handleDelete(item, index) {
        var _this = this;

        (0, _option2.default)({
          url: '/api/order/remove',
          type: 'POST',
          data: { id: item.id },
          context: this,
          successFunc: function successFunc() {
            return _this.list.splice(index, 1);
          }
        });
      },


      // 编辑
      handleEdit: function handleEdit(item) {
        // fetch({
        //   url: '/api/shop/detail',
        //   data: { id: item.id },
        // })
        // .then(
        //   (res) => {
        //     if (res.success) {
        //       this.form = res.detail;
        //       this.isEdit = true;
        //       this.dialogOpen = true;
        //     } else {
        //       this.$message('获取店铺信息失败，请重试');
        //     }
        //   },
        // );
      }
    }
  });
};
// import fetch from '../../utils/fetch';

/***/ })

/******/ });