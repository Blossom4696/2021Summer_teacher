'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
    _inherits(Login, _wepy$page);

    function Login() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Login);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {}
        }, _this.data = {
            icon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=miniprogram_icon.png'
        }, _this.methods = {
            formSubmit: function formSubmit(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/login/teacher_login',
                    method: 'GET',
                    data: {
                        username: e.detail.value.username,
                        password: e.detail.value.password
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {

                            if (res.data.Msg == "Teacher login success!") {
                                _wepy2.default.setStorageSync("sessionDate", Date.parse(new Date()));
                                _wepy2.default.setStorageSync("sessionToken", res.data.Data["token"]);
                                _wepy2.default.setStorageSync("sessionUserInfo", res.data.Data["userinfo"]);
                                _wepy2.default.$instance.globalData.userInfo = res.data.Data["userinfo"];
                                console.log("login success");
                                self.$apply();
                                setTimeout(function () {
                                    _wepy2.default.navigateBack({ delta: 1 });
                                }, 1000);
                            }
                        } else if (res.data.Code == 2) {
                            if (res.data.Msg == "Password not correct!") {
                                wx.showToast({
                                    title: '密码错误', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "Name not exist!") {
                                wx.showToast({
                                    title: '用户名不存在', //提示的内容,
                                    icon: 'error', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            }
                        }
                    }
                });
            },
            inputChange: function inputChange(e) {
                var self = this;
                self.userinfo[e.currentTarget.dataset.name] = e.detail.value.trim();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Login, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsImljb24iLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZHMiLCJmb3JtU3VibWl0IiwiZSIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidXNlcm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsInBhc3N3b3JkIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJDb2RlIiwiTXNnIiwic2V0U3RvcmFnZVN5bmMiLCJEYXRlIiwicGFyc2UiLCJEYXRhIiwidXNlckluZm8iLCIkYXBwbHkiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwibWFzayIsImlucHV0Q2hhbmdlIiwidXNlcmluZm8iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJ0cmltIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTEMsNkJBQWlCO0FBRFosUyxRQU1UQyxJLEdBQUs7QUFDREMsa0JBQUtDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0M7QUFEMUMsUyxRQUlMQyxPLEdBQVU7QUFFTkMsc0JBRk0sc0JBRUtDLENBRkwsRUFFTztBQUNULG9CQUFJQyxPQUFPLElBQVg7O0FBRUFQLCtCQUFLUSxPQUFMLENBQWE7QUFDVEMseUJBQUlULGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMEJBRGpDO0FBRVRPLDRCQUFPLEtBRkU7QUFHVFosMEJBQUs7QUFDRGEsa0NBQVNMLEVBQUVNLE1BQUYsQ0FBU0MsS0FBVCxDQUFlRixRQUR2QjtBQUVERyxrQ0FBU1IsRUFBRU0sTUFBRixDQUFTQyxLQUFULENBQWVDO0FBRnZCLHFCQUhJO0FBT1RDLDZCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLGdDQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSw0QkFBR0EsSUFBSWxCLElBQUosQ0FBU3FCLElBQVQsSUFBaUIsQ0FBcEIsRUFBdUI7O0FBRW5CLGdDQUFHSCxJQUFJbEIsSUFBSixDQUFTc0IsR0FBVCxJQUFnQix3QkFBbkIsRUFBNEM7QUFDeENwQiwrQ0FBS3FCLGNBQUwsQ0FBb0IsYUFBcEIsRUFBbUNDLEtBQUtDLEtBQUwsQ0FBVyxJQUFJRCxJQUFKLEVBQVgsQ0FBbkM7QUFDQXRCLCtDQUFLcUIsY0FBTCxDQUFvQixjQUFwQixFQUFtQ0wsSUFBSWxCLElBQUosQ0FBUzBCLElBQVQsQ0FBYyxPQUFkLENBQW5DO0FBQ0F4QiwrQ0FBS3FCLGNBQUwsQ0FBb0IsaUJBQXBCLEVBQXNDTCxJQUFJbEIsSUFBSixDQUFTMEIsSUFBVCxDQUFjLFVBQWQsQ0FBdEM7QUFDQXhCLCtDQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJ1QixRQUExQixHQUFxQ1QsSUFBSWxCLElBQUosQ0FBUzBCLElBQVQsQ0FBYyxVQUFkLENBQXJDO0FBQ0FQLHdDQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBWCxxQ0FBS21CLE1BQUw7QUFDQUMsMkNBQVcsWUFBWTtBQUNuQjNCLG1EQUFLNEIsWUFBTCxDQUFrQixFQUFDQyxPQUFNLENBQVAsRUFBbEI7QUFDSCxpQ0FGRCxFQUVHLElBRkg7QUFHSDtBQUNKLHlCQWJELE1BYU0sSUFBR2IsSUFBSWxCLElBQUosQ0FBU3FCLElBQVQsSUFBaUIsQ0FBcEIsRUFBc0I7QUFDeEIsZ0NBQUdILElBQUlsQixJQUFKLENBQVNzQixHQUFULElBQWdCLHVCQUFuQixFQUEyQztBQUN2Q1UsbUNBQUdDLFNBQUgsQ0FBYTtBQUNYQywyQ0FBTyxNQURJLEVBQ0k7QUFDZmpDLDBDQUFNLE9BRkssRUFFSTtBQUNma0MsMENBQU0sSUFISyxFQUdDO0FBQ1psQiw2Q0FBUyxzQkFBTyxDQUFFO0FBSlAsaUNBQWI7QUFNSCw2QkFQRCxNQU9PLElBQUdDLElBQUlsQixJQUFKLENBQVNzQixHQUFULElBQWdCLGlCQUFuQixFQUFxQztBQUN4Q1UsbUNBQUdDLFNBQUgsQ0FBYTtBQUNYQywyQ0FBTyxRQURJLEVBQ007QUFDakJqQywwQ0FBTSxPQUZLLEVBRUk7QUFDZmtDLDBDQUFNLElBSEssRUFHQztBQUNabEIsNkNBQVMsc0JBQU8sQ0FBRTtBQUpQLGlDQUFiO0FBTUg7QUFDSjtBQUNKO0FBdkNRLGlCQUFiO0FBeUNILGFBOUNLO0FBaURObUIsdUJBakRNLHVCQWlETTVCLENBakROLEVBaURTO0FBQ1gsb0JBQUlDLE9BQU8sSUFBWDtBQUNBQSxxQkFBSzRCLFFBQUwsQ0FBYzdCLEVBQUU4QixhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsSUFBdEMsSUFBOENoQyxFQUFFTSxNQUFGLENBQVNDLEtBQVQsQ0FBZTBCLElBQWYsRUFBOUM7QUFDSDtBQXBESyxTOzs7OztpQ0F3REQsQ0FHUjs7OztFQXRFOEJ2QyxlQUFLd0MsSTs7a0JBQW5CN0MsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGE9e1xyXG4gICAgICAgIGljb246d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPW1pbmlwcm9ncmFtX2ljb24ucG5nJyxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG5cclxuICAgICAgICBmb3JtU3VibWl0KGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvbG9naW4vdGVhY2hlcl9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTplLmRldGFpbC52YWx1ZS51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDplLmRldGFpbC52YWx1ZS5wYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuQ29kZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5Nc2cgPT0gXCJUZWFjaGVyIGxvZ2luIHN1Y2Nlc3MhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25EYXRlXCIsIERhdGUucGFyc2UobmV3IERhdGUoKSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKFwic2Vzc2lvblRva2VuXCIscmVzLmRhdGEuRGF0YVtcInRva2VuXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcInNlc3Npb25Vc2VySW5mb1wiLHJlcy5kYXRhLkRhdGFbXCJ1c2VyaW5mb1wiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMuZGF0YS5EYXRhW1widXNlcmluZm9cIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOjF9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlcy5kYXRhLkNvZGUgPT0gMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLk1zZyA9PSBcIlBhc3N3b3JkIG5vdCBjb3JyZWN0IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5a+G56CB6ZSZ6K+vJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLk1zZyA9PSBcIk5hbWUgbm90IGV4aXN0IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55So5oi35ZCN5LiN5a2Y5ZyoJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi51c2VyaW5mb1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXSA9IGUuZGV0YWlsLnZhbHVlLnRyaW0oKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==