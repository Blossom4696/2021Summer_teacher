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

var Index = function (_wepy$page) {
    _inherits(Index, _wepy$page);

    function Index() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Index);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            Sid: null,
            student: {},
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name='
        }, _this.methods = {
            onClick: function onClick(e) {
                var self = this;
                wx.navigateTo({
                    url: e.currentTarget.dataset.url + "?sid=" + self.Sid
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'getStudentData',
        value: function getStudentData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_student',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.student = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Sid = options.sid;

            self.getStudentData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/student-second'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnQtc2Vjb25kLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsIlNpZCIsInN0dWRlbnQiLCJpbWdVcmwiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZHMiLCJvbkNsaWNrIiwiZSIsInNlbGYiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsIkNvZGUiLCJEYXRhIiwiJGFwcGx5Iiwib3B0aW9ucyIsInNpZCIsImdldFN0dWRlbnREYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBRWpCQyxJLEdBQUs7QUFDREMsaUJBQUksSUFESDtBQUVEQyxxQkFBUSxFQUZQO0FBR0RDLG9CQUFPQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDO0FBSDVDLFMsUUFNTEMsTyxHQUFRO0FBQ0pDLG1CQURJLG1CQUNJQyxDQURKLEVBQ087QUFDUCxvQkFBSUMsT0FBTyxJQUFYO0FBQ0FDLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQUlKLEVBQUVLLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRixHQUF4QixHQUE0QixPQUE1QixHQUFvQ0gsS0FBS1Y7QUFEbkMsaUJBQWQ7QUFHSDtBQU5HLFM7Ozs7O3lDQVNTO0FBQ2IsZ0JBQUlVLE9BQU8sSUFBWDtBQUNBUCwyQkFBS2EsT0FBTCxDQUFhO0FBQ1RILHFCQUFJVixlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLDBCQURqQztBQUVUVyx3QkFBTyxLQUZFO0FBR1RDLHdCQUFRZixlQUFLQyxTQUFMLENBQWVlLFNBQWYsRUFIQztBQUlUcEIsc0JBQUs7QUFDREMseUJBQUlVLEtBQUtWO0FBRFIsaUJBSkk7QUFPVG9CLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLDRCQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSx3QkFBSUEsSUFBSXRCLElBQUosQ0FBU3lCLElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkJkLDZCQUFLVCxPQUFMLEdBQWVvQixJQUFJdEIsSUFBSixDQUFTMEIsSUFBeEI7QUFDQWYsNkJBQUtnQixNQUFMO0FBQ0g7QUFDSjtBQWJRLGFBQWI7QUFlSDs7OytCQUVNQyxPLEVBQVM7QUFDWixnQkFBSWpCLE9BQU8sSUFBWDs7QUFFQUEsaUJBQUtWLEdBQUwsR0FBVzJCLFFBQVFDLEdBQW5COztBQUVBbEIsaUJBQUttQixjQUFMO0FBQ0g7Ozs7RUExQzhCMUIsZUFBSzJCLEk7O2tCQUFuQmhDLEsiLCJmaWxlIjoic3R1ZGVudC1zZWNvbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcblxyXG4gICAgZGF0YT17XHJcbiAgICAgICAgU2lkOm51bGwsXHJcbiAgICAgICAgc3R1ZGVudDp7fSxcclxuICAgICAgICBpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDplLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwrXCI/c2lkPVwiK3NlbGYuU2lkLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci9nZXRfc3R1ZGVudCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0dWRlbnQgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLlNpZCA9IG9wdGlvbnMuc2lkXHJcblxyXG4gICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==