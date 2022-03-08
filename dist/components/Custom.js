'use strict';

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

var Custom = function (_wepy$component) {
    _inherits(Custom, _wepy$component);

    function Custom() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Custom);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Custom.__proto__ || Object.getPrototypeOf(Custom)).call.apply(_ref, [this].concat(args))), _this), _this.options = {
            addGlobalClass: true,
            multipleSlots: true

            /**
             * 组件的对外属性
             */
        }, _this.props = {
            bgColor: {
                type: String,
                default: ''
            },
            isCustom: {
                type: [Boolean, String],
                default: false
            },
            isBack: {
                type: [Boolean, String],
                default: false
            },
            bgImage: {
                type: String,
                default: ''
            }

            /**
             * 组件的初始数据
             */
        }, _this.data = {
            StatusBar: _wepy2.default.$instance.globalData.StatusBar,
            CustomBar: _wepy2.default.$instance.globalData.CustomBar,
            Custom: _wepy2.default.$instance.globalData.Custom
            /**
             * 组件的方法列表
             */
        }, _this.methods = {
            BackPage: function BackPage() {
                wx.navigateBack({
                    delta: 1
                });
            },
            toHome: function toHome() {
                wx.reLaunch({
                    url: '/pages/index/index'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Custom;
}(_wepy2.default.component);

exports.default = Custom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkN1c3RvbS5qcyJdLCJuYW1lcyI6WyJDdXN0b20iLCJvcHRpb25zIiwiYWRkR2xvYmFsQ2xhc3MiLCJtdWx0aXBsZVNsb3RzIiwicHJvcHMiLCJiZ0NvbG9yIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJpc0N1c3RvbSIsIkJvb2xlYW4iLCJpc0JhY2siLCJiZ0ltYWdlIiwiZGF0YSIsIlN0YXR1c0JhciIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwiQ3VzdG9tQmFyIiwibWV0aG9kcyIsIkJhY2tQYWdlIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInRvSG9tZSIsInJlTGF1bmNoIiwidXJsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxPLEdBQVM7QUFDTEMsNEJBQWdCLElBRFg7QUFFTEMsMkJBQWU7O0FBR25COzs7QUFMUyxTLFFBUVRDLEssR0FBTztBQUNIQyxxQkFBUztBQUNUQyxzQkFBTUMsTUFERztBQUVUQyx5QkFBUztBQUZBLGFBRE47QUFLSEMsc0JBQVU7QUFDVkgsc0JBQU0sQ0FBQ0ksT0FBRCxFQUFVSCxNQUFWLENBREk7QUFFVkMseUJBQVM7QUFGQyxhQUxQO0FBU0hHLG9CQUFRO0FBQ1JMLHNCQUFNLENBQUNJLE9BQUQsRUFBVUgsTUFBVixDQURFO0FBRVJDLHlCQUFTO0FBRkQsYUFUTDtBQWFISSxxQkFBUztBQUNUTixzQkFBTUMsTUFERztBQUVUQyx5QkFBUztBQUZBOztBQU1iOzs7QUFuQk8sUyxRQXNCUEssSSxHQUFNO0FBQ0ZDLHVCQUFXQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJILFNBRG5DO0FBRUZJLHVCQUFXSCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBRm5DO0FBR0ZsQixvQkFBUWUsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCakI7QUFFdEM7OztBQUxNLFMsUUFRTm1CLE8sR0FBUztBQUNMQyxvQkFESyxzQkFDTTtBQUNYQyxtQkFBR0MsWUFBSCxDQUFnQjtBQUNaQywyQkFBTztBQURLLGlCQUFoQjtBQUdDLGFBTEk7QUFNTEMsa0JBTkssb0JBTUc7QUFDUkgsbUJBQUdJLFFBQUgsQ0FBWTtBQUNSQyx5QkFBSztBQURHLGlCQUFaO0FBR0M7QUFWSSxTOzs7O0VBdkN1QlgsZUFBS1ksUzs7a0JBQXBCM0IsTSIsImZpbGUiOiJDdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgb3B0aW9ucz0ge1xyXG4gICAgICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gICAgICAgIG11bHRpcGxlU2xvdHM6IHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7hOS7tueahOWvueWkluWxnuaAp1xyXG4gICAgICovXHJcbiAgICBwcm9wcz0ge1xyXG4gICAgICAgIGJnQ29sb3I6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgZGVmYXVsdDogJydcclxuICAgICAgICB9LCBcclxuICAgICAgICBpc0N1c3RvbToge1xyXG4gICAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxyXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0JhY2s6IHtcclxuICAgICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmdJbWFnZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog57uE5Lu255qE5Yid5aeL5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGRhdGE9IHtcclxuICAgICAgICBTdGF0dXNCYXI6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuU3RhdHVzQmFyLFxyXG4gICAgICAgIEN1c3RvbUJhcjogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5DdXN0b21CYXIsXHJcbiAgICAgICAgQ3VzdG9tOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLkN1c3RvbVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnu4Tku7bnmoTmlrnms5XliJfooahcclxuICAgICAqL1xyXG4gICAgbWV0aG9kcz0ge1xyXG4gICAgICAgIEJhY2tQYWdlKCkge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0hvbWUoKXtcclxuICAgICAgICB3eC5yZUxhdW5jaCh7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCcsXHJcbiAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19