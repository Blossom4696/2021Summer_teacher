"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabbar = function (_wepy$component) {
    _inherits(Tabbar, _wepy$component);

    function Tabbar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Tabbar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabbar.__proto__ || Object.getPrototypeOf(Tabbar)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {
                "mp-tabbar": "/miniprogram_npm/weui-miniprogram/tabbar/tabbar"
            }
        }, _this.props = {
            tabBarList: {
                type: [Number, String],
                coerce: function coerce(v) {
                    return +v;
                },
                default: 50
            }
        }, _this.data = {
            tabBarList: [{
                "text": "主页",
                "iconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/homepage.png",
                "selectedIconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/homepagefill.png"
            }, {
                "text": "习题",
                "iconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/exercise.png",
                "selectedIconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/exercisefill.png"
            }, {
                "text": "我的",
                "iconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/my.png",
                "selectedIconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/myfill.png"
            }]
        }, _this.methods = {
            tabChange: function tabChange(e) {
                var self = this;
                console.log(e);
                switch (e.detail.index) {
                    case 0:
                        wx.switchTab({ url: 'index' });
                        break;
                    case 1:
                        wx.switchTab({ url: 'exercise' });
                        break;
                    case 2:
                        wx.switchTab({ url: 'example' });
                        break;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Tabbar;
}(_wepy2.default.component);

exports.default = Tabbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYmJhci5qcyJdLCJuYW1lcyI6WyJUYWJiYXIiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJwcm9wcyIsInRhYkJhckxpc3QiLCJ0eXBlIiwiTnVtYmVyIiwiU3RyaW5nIiwiY29lcmNlIiwidiIsImRlZmF1bHQiLCJkYXRhIiwibWV0aG9kcyIsInRhYkNoYW5nZSIsImUiLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsImluZGV4Iiwid3giLCJzd2l0Y2hUYWIiLCJ1cmwiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsNkJBQWdCO0FBQ1osNkJBQWE7QUFERDtBQURULFMsUUFNVEMsSyxHQUFRO0FBQ05DLHdCQUFZO0FBQ1ZDLHNCQUFNLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxDQURJO0FBRVZDLHdCQUFRLGdCQUFVQyxDQUFWLEVBQWE7QUFDbkIsMkJBQU8sQ0FBQ0EsQ0FBUjtBQUNELGlCQUpTO0FBS1ZDLHlCQUFTO0FBTEM7QUFETixTLFFBVVJDLEksR0FBTztBQUNIUCx3QkFBWSxDQUFDO0FBQ1Qsd0JBQVEsSUFEQztBQUVULDRCQUFZLHFFQUZIO0FBR1Qsb0NBQW9CO0FBSFgsYUFBRCxFQUtaO0FBQ0ksd0JBQVEsSUFEWjtBQUVJLDRCQUFZLHFFQUZoQjtBQUdJLG9DQUFvQjtBQUh4QixhQUxZLEVBVVo7QUFDSSx3QkFBUSxJQURaO0FBRUksNEJBQVksK0RBRmhCO0FBR0ksb0NBQW9CO0FBSHhCLGFBVlk7QUFEVCxTLFFBa0JQUSxPLEdBQVU7QUFDTkMscUJBRE0scUJBQ0lDLENBREosRUFDTztBQUNULG9CQUFJQyxPQUFPLElBQVg7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWUgsQ0FBWjtBQUNBLHdCQUFPQSxFQUFFSSxNQUFGLENBQVNDLEtBQWhCO0FBQ0EseUJBQUssQ0FBTDtBQUNJQywyQkFBR0MsU0FBSCxDQUFhLEVBQUVDLEtBQUssT0FBUCxFQUFiO0FBQ0E7QUFDSix5QkFBSyxDQUFMO0FBQ0lGLDJCQUFHQyxTQUFILENBQWEsRUFBRUMsS0FBSyxVQUFQLEVBQWI7QUFDQTtBQUNKLHlCQUFLLENBQUw7QUFDSUYsMkJBQUdDLFNBQUgsQ0FBYSxFQUFFQyxLQUFLLFNBQVAsRUFBYjtBQUNBO0FBVEo7QUFXSDtBQWZLLFM7Ozs7RUFuQ3dCQyxlQUFLQyxTOztrQkFBcEJ4QixNIiwiZmlsZSI6InRhYmJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgdXNpbmdDb21wb25lbnRzOntcclxuICAgICAgICAgIFwibXAtdGFiYmFyXCI6IFwiL21pbmlwcm9ncmFtX25wbS93ZXVpLW1pbmlwcm9ncmFtL3RhYmJhci90YWJiYXJcIixcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3BzID0ge1xyXG4gICAgICB0YWJCYXJMaXN0OiB7XHJcbiAgICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcclxuICAgICAgICBjb2VyY2U6IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICByZXR1cm4gK3ZcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlZmF1bHQ6IDUwXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHRhYkJhckxpc3Q6IFt7XHJcbiAgICAgICAgICAgIFwidGV4dFwiOiBcIuS4u+mhtVwiLFxyXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaHR0cDovLzE1OS4xMzguMy4xOTQ6ODA4MC9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL2hvbWVwYWdlLnBuZ1wiLFxyXG4gICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJodHRwOi8vMTU5LjEzOC4zLjE5NDo4MDgwL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vaG9tZXBhZ2VmaWxsLnBuZ1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInRleHRcIjogXCLkuaDpophcIixcclxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImh0dHA6Ly8xNTkuMTM4LjMuMTk0OjgwODAvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9leGVyY2lzZS5wbmdcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaHR0cDovLzE1OS4xMzguMy4xOTQ6ODA4MC9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL2V4ZXJjaXNlZmlsbC5wbmdcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5oiR55qEXCIsXHJcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJodHRwOi8vMTU5LjEzOC4zLjE5NDo4MDgwL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vbXkucG5nXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImh0dHA6Ly8xNTkuMTM4LjMuMTk0OjgwODAvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9teWZpbGwucG5nXCIsXHJcbiAgICAgICAgfV0sXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0YWJDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICAgICAgc3dpdGNoKGUuZGV0YWlsLmluZGV4KXtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnaW5kZXgnIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJ2V4ZXJjaXNlJyB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICdleGFtcGxlJyB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuIl19