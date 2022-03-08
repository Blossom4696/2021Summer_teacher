'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/index', 'pages/login', 'pages/example', 'pages/exercise', 'pages/exercise-detail', 'pages/create-exercise', 'pages/edit-exercise', 'pages/student', 'pages/student-second', 'pages/wrongproblem', 'pages/wrongproblem-detail', 'pages/create-wrongproblem', 'pages/edit-wrongproblem', 'pages/todaygrade', 'pages/create-todayexercise', 'pages/learnsituation', 'pages/my', 'pages/edit-password', 'pages/askquestion', 'pages/askquestion-detail'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      "tabBar": {
        "list": [{
          "pagePath": "pages/index",
          "iconPath": "images/homepage.png",
          "selectedIconPath": "images/homepagefill.png",
          "text": "主页"
        }, {
          "pagePath": "pages/exercise",
          "iconPath": "images/exercise.png",
          "selectedIconPath": "images/exercisefill.png",
          "text": "习题"
        }, {
          "pagePath": "pages/my",
          "iconPath": "images/my.png",
          "selectedIconPath": "images/myfill.png",
          "text": "我的"
        }]
      },
      useExtendedLib: {
        weui: true
      },
      usingComponents: {
        "cu-custom": "/colorui/components/cu-custom"
      }
    }, _this.globalData = {
      userInfo: null,
      serverUrl: "https://www.kaigestudy.top:8080"
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      var self = this;
      //检查sessionid是否过期
      self.onCheckSessionTimeout();

      if (_wepy2.default.getStorageSync("sessionUserInfo")) {
        this.globalData.userInfo = _wepy2.default.getStorageSync("sessionUserInfo");
      } else {
        this.globalData.userInfo = null;
      }
    }

    //检查sessionid是否过期的方法

  }, {
    key: 'onCheckSessionTimeout',
    value: function onCheckSessionTimeout() {
      var self = this;
      console.log("checking session");
      var SESSION_TIMEOUT = 3 * 60 * 60 * 1000; //登陆状态有效时间为3小时
      var sessionToken = _wepy2.default.getStorageSync("sessionToken");
      var sessionTime = _wepy2.default.getStorageSync("sessionDate");

      if (sessionToken == null || sessionToken == undefined || sessionToken == "" || sessionTime == null || sessionTime == undefined || sessionTime == "") {
        console.log("session is empty");
        return;
      }

      var aftertimestamp = Date.parse(new Date());
      if (aftertimestamp - sessionTime >= SESSION_TIMEOUT) {
        // 过期后清除session缓存
        _wepy2.default.removeStorageSync("sessionToken");
        _wepy2.default.removeStorageSync("sessionDate");
        _wepy2.default.removeStorageSync("sessionUserInfo");
        console.log("remove session!");
      }
    }
  }, {
    key: 'sleep',
    value: function sleep(s) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('promise resolved');
        }, s * 1000);
      });
    }

    // 设置带有cookie的request header，每次request都带这个header

  }, {
    key: 'setHeader',
    value: function setHeader() {
      var self = this;
      var header = {
        'Content-type': 'application/json; charset=utf-8',
        'TTToken': _wepy2.default.getStorageSync("sessionToken") //读取本地保存好的上一次cookie
      };
      return header;
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJ1c2VFeHRlbmRlZExpYiIsIndldWkiLCJ1c2luZ0NvbXBvbmVudHMiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJzZXJ2ZXJVcmwiLCJzZWxmIiwib25DaGVja1Nlc3Npb25UaW1lb3V0Iiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsIlNFU1NJT05fVElNRU9VVCIsInNlc3Npb25Ub2tlbiIsInNlc3Npb25UaW1lIiwidW5kZWZpbmVkIiwiYWZ0ZXJ0aW1lc3RhbXAiLCJEYXRlIiwicGFyc2UiLCJyZW1vdmVTdG9yYWdlU3luYyIsInMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXQiLCJoZWFkZXIiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFJRUEsTSxHQUFTO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLGVBSEssRUFJTCxnQkFKSyxFQUtMLHVCQUxLLEVBTUwsdUJBTkssRUFPTCxxQkFQSyxFQVFMLGVBUkssRUFTTCxzQkFUSyxFQVVMLG9CQVZLLEVBV0wsMkJBWEssRUFZTCwyQkFaSyxFQWFMLHlCQWJLLEVBY0wsa0JBZEssRUFlTCw0QkFmSyxFQWdCTCxzQkFoQkssRUFpQkwsVUFqQkssRUFrQkwscUJBbEJLLEVBbUJMLG1CQW5CSyxFQW9CTCwwQkFwQkssQ0FEQTtBQXVCUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLFFBSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQXZCRDtBQTZCUCxnQkFBVztBQUNULGdCQUFRLENBQ047QUFDSSxzQkFBWSxhQURoQjtBQUVJLHNCQUFZLHFCQUZoQjtBQUdJLDhCQUFvQix5QkFIeEI7QUFJSSxrQkFBUTtBQUpaLFNBRE0sRUFPTjtBQUNJLHNCQUFZLGdCQURoQjtBQUVJLHNCQUFZLHFCQUZoQjtBQUdJLDhCQUFvQix5QkFIeEI7QUFJSSxrQkFBUTtBQUpaLFNBUE0sRUFhTjtBQUNJLHNCQUFZLFVBRGhCO0FBRUksc0JBQVksZUFGaEI7QUFHSSw4QkFBb0IsbUJBSHhCO0FBSUksa0JBQVE7QUFKWixTQWJNO0FBREMsT0E3Qko7QUFtRFBDLHNCQUFnQjtBQUNkQyxjQUFNO0FBRFEsT0FuRFQ7QUFzRFBDLHVCQUFnQjtBQUNkLHFCQUFhO0FBREM7QUF0RFQsSyxRQTJEVEMsVSxHQUFhO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsaUJBQVc7QUFGQSxLOzs7OzsrQkFLRjtBQUNULFVBQUlDLE9BQU8sSUFBWDtBQUNBO0FBQ0FBLFdBQUtDLHFCQUFMOztBQUVBLFVBQUdDLGVBQUtDLGNBQUwsQ0FBb0IsaUJBQXBCLENBQUgsRUFBMEM7QUFDeEMsYUFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkJJLGVBQUtDLGNBQUwsQ0FBb0IsaUJBQXBCLENBQTNCO0FBQ0QsT0FGRCxNQUVLO0FBQ0gsYUFBS04sVUFBTCxDQUFnQkMsUUFBaEIsR0FBMkIsSUFBM0I7QUFDRDtBQUVGOztBQUdEOzs7OzRDQUN3QjtBQUN0QixVQUFJRSxPQUFPLElBQVg7QUFDQUksY0FBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0EsVUFBTUMsa0JBQWtCLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxJQUF0QyxDQUhzQixDQUdxQjtBQUMzQyxVQUFJQyxlQUFlTCxlQUFLQyxjQUFMLENBQW9CLGNBQXBCLENBQW5CO0FBQ0EsVUFBSUssY0FBY04sZUFBS0MsY0FBTCxDQUFvQixhQUFwQixDQUFsQjs7QUFFQSxVQUFJSSxnQkFBZ0IsSUFBaEIsSUFBd0JBLGdCQUFnQkUsU0FBeEMsSUFBcURGLGdCQUFnQixFQUFyRSxJQUF5RUMsZUFBZSxJQUF4RixJQUFnR0EsZUFBZUMsU0FBL0csSUFBNEhELGVBQWUsRUFBL0ksRUFBbUo7QUFDakpKLGdCQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDQTtBQUNEOztBQUVELFVBQUlLLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXLElBQUlELElBQUosRUFBWCxDQUFyQjtBQUNBLFVBQUlELGlCQUFpQkYsV0FBakIsSUFBZ0NGLGVBQXBDLEVBQXFEO0FBQ25EO0FBQ0FKLHVCQUFLVyxpQkFBTCxDQUF1QixjQUF2QjtBQUNBWCx1QkFBS1csaUJBQUwsQ0FBdUIsYUFBdkI7QUFDQVgsdUJBQUtXLGlCQUFMLENBQXVCLGlCQUF2QjtBQUNBVCxnQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0Q7QUFDRjs7OzBCQUdNUyxDLEVBQUc7QUFDUixhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENDLG1CQUFXLFlBQU07QUFDZkYsa0JBQVEsa0JBQVI7QUFDRCxTQUZELEVBRUdGLElBQUksSUFGUDtBQUdELE9BSk0sQ0FBUDtBQUtEOztBQUdEOzs7O2dDQUNZO0FBQ1YsVUFBSWQsT0FBTyxJQUFYO0FBQ0EsVUFBSW1CLFNBQVM7QUFDWCx3QkFBZ0IsaUNBREw7QUFFWCxtQkFBV2pCLGVBQUtDLGNBQUwsQ0FBb0IsY0FBcEIsQ0FGQSxDQUVvQztBQUZwQyxPQUFiO0FBSUEsYUFBT2dCLE1BQVA7QUFDRDs7OztFQXhIMEJqQixlQUFLa0IsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogW1xuICAgICAgJ3BhZ2VzL2luZGV4JyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvZXhhbXBsZScsXG4gICAgICAncGFnZXMvZXhlcmNpc2UnLFxuICAgICAgJ3BhZ2VzL2V4ZXJjaXNlLWRldGFpbCcsXG4gICAgICAncGFnZXMvY3JlYXRlLWV4ZXJjaXNlJyxcbiAgICAgICdwYWdlcy9lZGl0LWV4ZXJjaXNlJyxcbiAgICAgICdwYWdlcy9zdHVkZW50JyxcbiAgICAgICdwYWdlcy9zdHVkZW50LXNlY29uZCcsXG4gICAgICAncGFnZXMvd3Jvbmdwcm9ibGVtJyxcbiAgICAgICdwYWdlcy93cm9uZ3Byb2JsZW0tZGV0YWlsJyxcbiAgICAgICdwYWdlcy9jcmVhdGUtd3Jvbmdwcm9ibGVtJyxcbiAgICAgICdwYWdlcy9lZGl0LXdyb25ncHJvYmxlbScsXG4gICAgICAncGFnZXMvdG9kYXlncmFkZScsXG4gICAgICAncGFnZXMvY3JlYXRlLXRvZGF5ZXhlcmNpc2UnLFxuICAgICAgJ3BhZ2VzL2xlYXJuc2l0dWF0aW9uJyxcbiAgICAgICdwYWdlcy9teScsXG4gICAgICAncGFnZXMvZWRpdC1wYXNzd29yZCcsXG4gICAgICAncGFnZXMvYXNrcXVlc3Rpb24nLFxuICAgICAgJ3BhZ2VzL2Fza3F1ZXN0aW9uLWRldGFpbCcsXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnV2VDaGF0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuICAgIFwidGFiQmFyXCIgOiB7XG4gICAgICBcImxpc3RcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaW5kZXhcIixcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJpbWFnZXMvaG9tZXBhZ2UucG5nXCIsXG4gICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJpbWFnZXMvaG9tZXBhZ2VmaWxsLnBuZ1wiLFxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5Li76aG1XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJwYWdlUGF0aFwiOiBcInBhZ2VzL2V4ZXJjaXNlXCIsXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaW1hZ2VzL2V4ZXJjaXNlLnBuZ1wiLFxuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaW1hZ2VzL2V4ZXJjaXNlZmlsbC5wbmdcIixcbiAgICAgICAgICAgIFwidGV4dFwiOiBcIuS5oOmimFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9teVwiLFxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImltYWdlcy9teS5wbmdcIixcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImltYWdlcy9teWZpbGwucG5nXCIsXG4gICAgICAgICAgICBcInRleHRcIjogXCLmiJHnmoRcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB1c2VFeHRlbmRlZExpYjoge1xuICAgICAgd2V1aTogdHJ1ZVxuICAgIH0sXG4gICAgdXNpbmdDb21wb25lbnRzOntcbiAgICAgIFwiY3UtY3VzdG9tXCI6IFwiL2NvbG9ydWkvY29tcG9uZW50cy9jdS1jdXN0b21cIixcbiAgICB9LFxuICB9XG5cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBzZXJ2ZXJVcmw6IFwiaHR0cHM6Ly93d3cua2FpZ2VzdHVkeS50b3A6ODA4MFwiLFxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgLy/mo4Dmn6VzZXNzaW9uaWTmmK/lkKbov4fmnJ9cbiAgICBzZWxmLm9uQ2hlY2tTZXNzaW9uVGltZW91dCgpXG5cbiAgICBpZih3ZXB5LmdldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblVzZXJJbmZvXCIpKXtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJzZXNzaW9uVXNlckluZm9cIilcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IG51bGxcbiAgICB9XG4gICAgXG4gIH1cblxuXG4gIC8v5qOA5p+lc2Vzc2lvbmlk5piv5ZCm6L+H5pyf55qE5pa55rOVXG4gIG9uQ2hlY2tTZXNzaW9uVGltZW91dCgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICBjb25zb2xlLmxvZyhcImNoZWNraW5nIHNlc3Npb25cIilcbiAgICBjb25zdCBTRVNTSU9OX1RJTUVPVVQgPSAzICogNjAgKiA2MCAqIDEwMDAgLy/nmbvpmYbnirbmgIHmnInmlYjml7bpl7TkuLoz5bCP5pe2XG4gICAgbGV0IHNlc3Npb25Ub2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIilcbiAgICBsZXQgc2Vzc2lvblRpbWUgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKFwic2Vzc2lvbkRhdGVcIilcblxuICAgIGlmIChzZXNzaW9uVG9rZW4gPT0gbnVsbCB8fCBzZXNzaW9uVG9rZW4gPT0gdW5kZWZpbmVkIHx8IHNlc3Npb25Ub2tlbiA9PSBcIlwifHxzZXNzaW9uVGltZSA9PSBudWxsIHx8IHNlc3Npb25UaW1lID09IHVuZGVmaW5lZCB8fCBzZXNzaW9uVGltZSA9PSBcIlwiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNlc3Npb24gaXMgZW1wdHlcIilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBhZnRlcnRpbWVzdGFtcCA9IERhdGUucGFyc2UobmV3IERhdGUoKSlcbiAgICBpZiAoYWZ0ZXJ0aW1lc3RhbXAgLSBzZXNzaW9uVGltZSA+PSBTRVNTSU9OX1RJTUVPVVQpIHtcbiAgICAgIC8vIOi/h+acn+WQjua4hemZpHNlc3Npb27nvJPlrZhcbiAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIilcbiAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uRGF0ZVwiKVxuICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYyhcInNlc3Npb25Vc2VySW5mb1wiKVxuICAgICAgY29uc29sZS5sb2coXCJyZW1vdmUgc2Vzc2lvbiFcIilcbiAgICB9XG4gIH1cblxuXG4gIHNsZWVwIChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgICAgIH0sIHMgKiAxMDAwKVxuICAgIH0pXG4gIH1cblxuXG4gIC8vIOiuvue9ruW4puaciWNvb2tpZeeahHJlcXVlc3QgaGVhZGVy77yM5q+P5qyhcmVxdWVzdOmDveW4pui/meS4qmhlYWRlclxuICBzZXRIZWFkZXIoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgbGV0IGhlYWRlciA9IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAnVFRUb2tlbic6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIikgLy/or7vlj5bmnKzlnLDkv53lrZjlpb3nmoTkuIrkuIDmrKFjb29raWVcbiAgICB9O1xuICAgIHJldHVybiBoZWFkZXJcbiAgfVxufVxuIl19