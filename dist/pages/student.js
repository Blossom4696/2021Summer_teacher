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
            studentList: [],
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            noUserIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=none_userinfo.png',
            studentField: ['姓名', '年级', '校区'],
            fieldCur: 0,
            sortImg: [_wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sortup.png', _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sort.png', _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/sort.png'],
            searchString: ""
        }, _this.methods = {
            onClickStudent: function onClickStudent(e) {
                var self = this;
                var studentId = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "student-second?sid=" + self.studentList[studentId].Sid

                });
            },
            tabSelectIndex: function tabSelectIndex(e) {
                var self = this;
                var sortName = self.studentField[e.currentTarget.dataset.id];
                var sortDir = "";
                if (self.fieldCur == e.currentTarget.dataset.id) {
                    var curDir = self.sortImg[self.fieldCur].indexOf("sortup");
                    if (curDir != -1) {
                        self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("up", "down");
                        sortDir = "desc";
                    } else {
                        self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("down", "up");
                        sortDir = "asc";
                    }
                } else {
                    // 首先替换为sort
                    self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("down", "").replace("up", "");

                    self.fieldCur = e.currentTarget.dataset.id;

                    // 再把选中的替换为sortup
                    self.sortImg[self.fieldCur] = self.sortImg[self.fieldCur].replace("sort", "sortup");
                    sortDir = "asc";
                }

                self.getSortedStudentList(sortName, sortDir);
            },
            inputChangeSearch: function inputChangeSearch(e) {
                var self = this;
                self.searchString = e.detail.value;
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/search_student_from_teacher',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        word: e.detail.value
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.studentList = res.data.Data;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'getStudentData',
        value: function getStudentData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_student_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),

                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.studentList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'getSortedStudentList',
        value: function getSortedStudentList(sortName, sortDir) {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_student_sorted_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    word: self.searchString,
                    sortName: sortName,
                    sortDir: sortDir
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.studentList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getStudentData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/student'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnQuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJkYXRhIiwic3R1ZGVudExpc3QiLCJpbWdVcmwiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm5vVXNlckljb24iLCJzdHVkZW50RmllbGQiLCJmaWVsZEN1ciIsInNvcnRJbWciLCJzZWFyY2hTdHJpbmciLCJtZXRob2RzIiwib25DbGlja1N0dWRlbnQiLCJlIiwic2VsZiIsInN0dWRlbnRJZCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJTaWQiLCJ0YWJTZWxlY3RJbmRleCIsInNvcnROYW1lIiwic29ydERpciIsImN1ckRpciIsImluZGV4T2YiLCJyZXBsYWNlIiwiZ2V0U29ydGVkU3R1ZGVudExpc3QiLCJpbnB1dENoYW5nZVNlYXJjaCIsImRldGFpbCIsInZhbHVlIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIndvcmQiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsIkNvZGUiLCJEYXRhIiwiJGFwcGx5IiwiZ2V0U3R1ZGVudERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTztBQUNIQyx5QkFBWSxFQURUO0FBRUhDLG9CQUFPQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLDJCQUYxQztBQUdIQyx3QkFBYUosZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyw0Q0FIaEQ7QUFJSEUsMEJBQWMsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsQ0FKWDtBQUtIQyxzQkFBVSxDQUxQO0FBTUhDLHFCQUFRLENBQ0pQLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMENBRGxD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QVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkI1Qiw2QkFBS2QsV0FBTCxHQUFtQnVDLElBQUl4QyxJQUFKLENBQVM0QyxJQUE1QjtBQUNBN0IsNkJBQUs4QixNQUFMO0FBQ0g7QUFDSjtBQWZJLGFBQWI7QUFpQkg7OztpQ0FFUTtBQUNMLGdCQUFJOUIsT0FBTyxJQUFYO0FBQ0FBLGlCQUFLK0IsY0FBTDtBQUNIOzs7O0VBcEg4QjNDLGVBQUs0QyxJOztrQkFBbkJoRCxLIiwiZmlsZSI6InN0dWRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHN0dWRlbnRMaXN0OltdLFxyXG4gICAgICAgIGltZ1VybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9JyxcclxuICAgICAgICBub1VzZXJJY29uIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPW5vbmVfdXNlcmluZm8ucG5nJyxcclxuICAgICAgICBzdHVkZW50RmllbGQ6IFsn5aeT5ZCNJywn5bm057qnJywn5qCh5Yy6J10sXHJcbiAgICAgICAgZmllbGRDdXI6IDAsXHJcbiAgICAgICAgc29ydEltZzpbXHJcbiAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL3NvcnR1cC5wbmcnLFxyXG4gICAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9zb3J0LnBuZycsXHJcbiAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL3NvcnQucG5nJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNlYXJjaFN0cmluZzpcIlwiLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIG9uQ2xpY2tTdHVkZW50KGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBzdHVkZW50SWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDpcInN0dWRlbnQtc2Vjb25kP3NpZD1cIitzZWxmLnN0dWRlbnRMaXN0W3N0dWRlbnRJZF0uU2lkLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGFiU2VsZWN0SW5kZXgoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgc29ydE5hbWUgPSBzZWxmLnN0dWRlbnRGaWVsZFtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZF1cclxuICAgICAgICAgICAgbGV0IHNvcnREaXIgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmKHNlbGYuZmllbGRDdXI9PSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyRGlyID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLmluZGV4T2YoXCJzb3J0dXBcIilcclxuICAgICAgICAgICAgICAgIGlmKGN1ckRpciE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydEltZ1tzZWxmLmZpZWxkQ3VyXSA9IHNlbGYuc29ydEltZ1tzZWxmLmZpZWxkQ3VyXS5yZXBsYWNlKFwidXBcIixcImRvd25cIilcclxuICAgICAgICAgICAgICAgICAgICBzb3J0RGlyID0gXCJkZXNjXCJcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc29ydEltZ1tzZWxmLmZpZWxkQ3VyXSA9IHNlbGYuc29ydEltZ1tzZWxmLmZpZWxkQ3VyXS5yZXBsYWNlKFwiZG93blwiLFwidXBcIilcclxuICAgICAgICAgICAgICAgICAgICBzb3J0RGlyID0gXCJhc2NcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8g6aaW5YWI5pu/5o2i5Li6c29ydFxyXG4gICAgICAgICAgICAgICAgc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLnJlcGxhY2UoXCJkb3duXCIsXCJcIikucmVwbGFjZShcInVwXCIsXCJcIilcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLmZpZWxkQ3VyPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWGjeaKiumAieS4reeahOabv+aNouS4unNvcnR1cFxyXG4gICAgICAgICAgICAgICAgc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdID0gc2VsZi5zb3J0SW1nW3NlbGYuZmllbGRDdXJdLnJlcGxhY2UoXCJzb3J0XCIsXCJzb3J0dXBcIilcclxuICAgICAgICAgICAgICAgIHNvcnREaXIgPSBcImFzY1wiXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuZ2V0U29ydGVkU3R1ZGVudExpc3Qoc29ydE5hbWUsc29ydERpcilcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dENoYW5nZVNlYXJjaChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuc2VhcmNoU3RyaW5nID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9zZWFyY2hfc3R1ZGVudF9mcm9tX3RlYWNoZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JkOmUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0dWRlbnRMaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvZ2V0X3N0dWRlbnRfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3R1ZGVudExpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U29ydGVkU3R1ZGVudExpc3Qoc29ydE5hbWUsc29ydERpcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90ZWFjaGVyL2dldF9zdHVkZW50X3NvcnRlZF9saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICB3b3JkOiBzZWxmLnNlYXJjaFN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0TmFtZTpzb3J0TmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0RGlyOnNvcnREaXJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3R1ZGVudExpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==