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

var Teacher = function (_wepy$page) {
    _inherits(Teacher, _wepy$page);

    function Teacher() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Teacher);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Teacher.__proto__ || Object.getPrototypeOf(Teacher)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            Tid: null
        }, _this.methods = {
            onClickCancel: function onClickCancel() {
                var self = this;
                _wepy2.default.navigateBack({
                    delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
                });
            },
            formSubmit: function formSubmit(e) {
                var self = this;

                var sendFormData = e.detail.value; // form 表单数据
                sendFormData['Tid'] = Number(self.Tid);

                console.log(sendFormData);

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/update_password',
                    method: 'PUT',
                    data: sendFormData,
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '修改密码成功', //提示的内容,
                                icon: 'success', //图标,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success() {
                                    setTimeout(function () {
                                        _wepy2.default.navigateBack({
                                            delta: 1
                                        });
                                    }, 1000);
                                }
                            });
                        } else if (res.data.Code == 2) {
                            if (res.data.Msg == "Password not correct!") {
                                wx.showToast({
                                    title: '旧密码不正确', //提示的内容,
                                    icon: 'none', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "The two passwords are correct!") {
                                wx.showToast({
                                    title: '新密码不能与旧密码相同', //提示的内容,
                                    icon: 'none', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "Password is empty!") {
                                wx.showToast({
                                    title: '新密码为空', //提示的内容,
                                    icon: 'none', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            } else if (res.data.Msg == "Password not consistent!") {
                                wx.showToast({
                                    title: '两次新密码不一致', //提示的内容,
                                    icon: 'none', //图标,
                                    mask: true, //显示透明蒙层，防止触摸穿透,
                                    success: function success(res) {}
                                });
                            }
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Tid = options.tid;
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/edit-password'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtcGFzc3dvcmQuanMiXSwibmFtZXMiOlsiVGVhY2hlciIsImRhdGEiLCJUaWQiLCJtZXRob2RzIiwib25DbGlja0NhbmNlbCIsInNlbGYiLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJmb3JtU3VibWl0IiwiZSIsInNlbmRGb3JtRGF0YSIsImRldGFpbCIsInZhbHVlIiwiTnVtYmVyIiwiY29uc29sZSIsImxvZyIsInJlcXVlc3QiLCJ1cmwiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwic3VjY2VzcyIsInJlcyIsIkNvZGUiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1hc2siLCJzZXRUaW1lb3V0IiwiTXNnIiwib3B0aW9ucyIsInRpZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSSxHQUFLO0FBQ0RDLGlCQUFJO0FBREgsUyxRQUtMQyxPLEdBQVM7QUFDTEMseUJBREssMkJBQ1U7QUFDWCxvQkFBSUMsT0FBTyxJQUFYO0FBQ0FDLCtCQUFLQyxZQUFMLENBQWtCO0FBQ2RDLDJCQUFPLENBRE8sQ0FDTDtBQURLLGlCQUFsQjtBQUlILGFBUEk7QUFTTEMsc0JBVEssc0JBU01DLENBVE4sRUFTUTtBQUNULG9CQUFJTCxPQUFPLElBQVg7O0FBRUEsb0JBQUlNLGVBQWVELEVBQUVFLE1BQUYsQ0FBU0MsS0FBNUIsQ0FIUyxDQUd5QjtBQUNsQ0YsNkJBQWEsS0FBYixJQUFzQkcsT0FBT1QsS0FBS0gsR0FBWixDQUF0Qjs7QUFFQWEsd0JBQVFDLEdBQVIsQ0FBWUwsWUFBWjs7QUFFQUwsK0JBQUtXLE9BQUwsQ0FBYTtBQUNUQyx5QkFBSVosZUFBS2EsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyw4QkFEakM7QUFFVEMsNEJBQU8sS0FGRTtBQUdUckIsMEJBQU1VLFlBSEc7QUFJVFksNEJBQVFqQixlQUFLYSxTQUFMLENBQWVLLFNBQWYsRUFKQztBQUtUQyw2QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CWCxnQ0FBUUMsR0FBUixDQUFZVSxHQUFaO0FBQ0EsNEJBQUlBLElBQUl6QixJQUFKLENBQVMwQixJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25CQywrQkFBR0MsU0FBSCxDQUFhO0FBQ0xDLHVDQUFPLFFBREYsRUFDWTtBQUNqQkMsc0NBQU0sU0FGRCxFQUVZO0FBQ2pCQyxzQ0FBTSxJQUhELEVBR087QUFDWlAseUNBQVMsbUJBQVU7QUFDWFEsK0NBQVcsWUFBVTtBQUNqQjNCLHVEQUFLQyxZQUFMLENBQWtCO0FBQ2RDLG1EQUFPO0FBRE8seUNBQWxCO0FBR0gscUNBSkQsRUFJRyxJQUpIO0FBS0g7QUFWQSw2QkFBYjtBQVlILHlCQWJELE1BYU8sSUFBR2tCLElBQUl6QixJQUFKLENBQVMwQixJQUFULElBQWlCLENBQXBCLEVBQXNCO0FBQ3pCLGdDQUFHRCxJQUFJekIsSUFBSixDQUFTaUMsR0FBVCxJQUFnQix1QkFBbkIsRUFBMkM7QUFDdkNOLG1DQUFHQyxTQUFILENBQWE7QUFDVEMsMkNBQU8sUUFERSxFQUNRO0FBQ2pCQywwQ0FBTSxNQUZHLEVBRUs7QUFDZEMsMENBQU0sSUFIRyxFQUdHO0FBQ1pQLDZDQUFTLHNCQUFPLENBQUU7QUFKVCxpQ0FBYjtBQU1ILDZCQVBELE1BT00sSUFBR0MsSUFBSXpCLElBQUosQ0FBU2lDLEdBQVQsSUFBZ0IsZ0NBQW5CLEVBQW9EO0FBQ3RETixtQ0FBR0MsU0FBSCxDQUFhO0FBQ1RDLDJDQUFPLGFBREUsRUFDYTtBQUN0QkMsMENBQU0sTUFGRyxFQUVLO0FBQ2RDLDBDQUFNLElBSEcsRUFHRztBQUNaUCw2Q0FBUyxzQkFBTyxDQUFFO0FBSlQsaUNBQWI7QUFNSCw2QkFQSyxNQU9BLElBQUdDLElBQUl6QixJQUFKLENBQVNpQyxHQUFULElBQWdCLG9CQUFuQixFQUF3QztBQUMxQ04sbUNBQUdDLFNBQUgsQ0FBYTtBQUNUQywyQ0FBTyxPQURFLEVBQ087QUFDaEJDLDBDQUFNLE1BRkcsRUFFSztBQUNkQywwQ0FBTSxJQUhHLEVBR0c7QUFDWlAsNkNBQVMsc0JBQU8sQ0FBRTtBQUpULGlDQUFiO0FBTUgsNkJBUEssTUFPQSxJQUFHQyxJQUFJekIsSUFBSixDQUFTaUMsR0FBVCxJQUFnQiwwQkFBbkIsRUFBOEM7QUFDaEROLG1DQUFHQyxTQUFILENBQWE7QUFDVEMsMkNBQU8sVUFERSxFQUNVO0FBQ25CQywwQ0FBTSxNQUZHLEVBRUs7QUFDZEMsMENBQU0sSUFIRyxFQUdHO0FBQ1pQLDZDQUFTLHNCQUFPLENBQUU7QUFKVCxpQ0FBYjtBQU1IO0FBQ0o7QUFDSjtBQW5EUSxpQkFBYjtBQXFESDtBQXRFSSxTOzs7OzsrQkF5RUZVLE8sRUFBUztBQUNaLGdCQUFJOUIsT0FBTyxJQUFYOztBQUVBQSxpQkFBS0gsR0FBTCxHQUFXaUMsUUFBUUMsR0FBbkI7QUFDSDs7OztFQW5GZ0M5QixlQUFLK0IsSTs7a0JBQXJCckMsTyIsImZpbGUiOiJlZGl0LXBhc3N3b3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlciBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgICAgICBkYXRhPXtcclxuICAgICAgICAgICAgVGlkOm51bGwsXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbWV0aG9kcz0ge1xyXG4gICAgICAgICAgICBvbkNsaWNrQ2FuY2VsKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YTogMSAvL+i/lOWbnueahOmhtemdouaVsO+8jOWmguaenCBkZWx0YSDlpKfkuo7njrDmnInpobXpnaLmlbDvvIzliJnov5Tlm57liLDpppbpobUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZm9ybVN1Ym1pdChlKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZW5kRm9ybURhdGEgPSBlLmRldGFpbC52YWx1ZSAvLyBmb3JtIOihqOWNleaVsOaNrlxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWQnXSA9IE51bWJlcihzZWxmLlRpZClcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci91cGRhdGVfcGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonUFVUJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZW5kRm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55a+G56CB5oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXMuZGF0YS5Db2RlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuTXNnID09IFwiUGFzc3dvcmQgbm90IGNvcnJlY3QhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pen5a+G56CB5LiN5q2j56GuJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlcy5kYXRhLk1zZyA9PSBcIlRoZSB0d28gcGFzc3dvcmRzIGFyZSBjb3JyZWN0IVwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aWsOWvhueggeS4jeiDveS4juaXp+WvhueggeebuOWQjCcsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXMuZGF0YS5Nc2cgPT0gXCJQYXNzd29yZCBpcyBlbXB0eSFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmlrDlr4bnoIHkuLrnqbonLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYocmVzLmRhdGEuTXNnID09IFwiUGFzc3dvcmQgbm90IGNvbnNpc3RlbnQhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Lik5qyh5paw5a+G56CB5LiN5LiA6Ie0JywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICAgICAgc2VsZi5UaWQgPSBvcHRpb25zLnRpZFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiJdfQ==