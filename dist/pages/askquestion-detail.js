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
            AQid: null,
            askquestion: {},
            student: {},
            exercise: {},

            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            imageListOfName: [],
            imageListOfAnswer: []
        }, _this.methods = {
            ViewImageOfName: function ViewImageOfName(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfName,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            ViewImageOfAnswer: function ViewImageOfAnswer(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfAnswer,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            onClickSolved: function onClickSolved() {
                var self = this;
                wx.showModal({
                    title: '已解决',
                    content: '确定已经解决此问题？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            _wepy2.default.request({
                                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/update_ask_question',
                                method: 'POST',
                                data: {
                                    AQid: Number(self.AQid),
                                    AQisSolved: 1
                                },
                                header: _wepy2.default.$instance.setHeader(),
                                success: function success(res) {
                                    console.log(res);
                                    if (res.data.Code == 1) {
                                        console.log("Update Success!");
                                        _wepy2.default.showToast({
                                            title: '已解决', //提示的内容,
                                            icon: 'success', //图标,
                                            duration: 2000, //延迟时间,
                                            mask: true, //显示透明蒙层，防止触摸穿透,
                                            success: function success() {
                                                setTimeout(function () {
                                                    _wepy2.default.navigateBack({
                                                        delta: 1
                                                    });
                                                }, 1000);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
        key: 'getAskQuestionData',
        value: function getAskQuestionData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_ask_question',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    AQid: self.AQid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.askquestion = res.data.Data;

                        self.$apply();

                        self.getStudentData();
                        if (self.askquestion.Eid != -1) {

                            self.getExerciseData();
                        }
                    }
                }
            });
        }
    }, {
        key: 'getStudentData',
        value: function getStudentData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_student',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.askquestion.Sid
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
        key: 'getExerciseData',
        value: function getExerciseData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/get_exercise',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Eid: self.askquestion.Eid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.exercise = res.data.Data;
                        if (res.data.Data.EnamePath != "") {
                            var tmpList = res.data.Data.EnamePath.split(";");
                            self.imageListOfName = tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.EanswerPath != "") {
                            var _tmpList = res.data.Data.EanswerPath.split(";");
                            self.imageListOfAnswer = _tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.AQid = options.aqid;

            self.getAskQuestionData();
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/askquestion-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFza3F1ZXN0aW9uLWRldGFpbC5qcyJdLCJuYW1lcyI6WyJUZWFjaGVyIiwiZGF0YSIsIkFRaWQiLCJhc2txdWVzdGlvbiIsInN0dWRlbnQiLCJleGVyY2lzZSIsImltYWdlVXJsIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJhdWRpb1VybCIsImltYWdlTGlzdE9mTmFtZSIsImltYWdlTGlzdE9mQW5zd2VyIiwibWV0aG9kcyIsIlZpZXdJbWFnZU9mTmFtZSIsImUiLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidXJsIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiY3VycmVudCIsIlZpZXdJbWFnZU9mQW5zd2VyIiwib25DbGlja1NvbHZlZCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVxdWVzdCIsIm1ldGhvZCIsIk51bWJlciIsIkFRaXNTb2x2ZWQiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJDb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIkRhdGEiLCIkYXBwbHkiLCJnZXRTdHVkZW50RGF0YSIsIkVpZCIsImdldEV4ZXJjaXNlRGF0YSIsIlNpZCIsIkVuYW1lUGF0aCIsInRtcExpc3QiLCJzcGxpdCIsIm1hcCIsIngiLCJFYW5zd2VyUGF0aCIsIm9wdGlvbnMiLCJhcWlkIiwiZ2V0QXNrUXVlc3Rpb25EYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQUs7QUFDREMsa0JBQU0sSUFETDtBQUVEQyx5QkFBYSxFQUZaO0FBR0RDLHFCQUFTLEVBSFI7QUFJREMs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QUVBL0MsaUJBQUtnRCxrQkFBTDtBQUlIOzs7O0VBaktnQzFELGVBQUsyRCxJOztrQkFBckJsRSxPIiwiZmlsZSI6ImFza3F1ZXN0aW9uLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFjaGVyIGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgZGF0YT17XHJcbiAgICAgICAgQVFpZDogbnVsbCxcclxuICAgICAgICBhc2txdWVzdGlvbjoge30sXHJcbiAgICAgICAgc3R1ZGVudDoge30sXHJcbiAgICAgICAgZXhlcmNpc2U6IHt9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGltYWdlVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgICAgIGF1ZGlvVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfYXVkaW8/bmFtZT0nLFxyXG4gICAgICAgIGltYWdlTGlzdE9mTmFtZTogW10sXHJcbiAgICAgICAgaW1hZ2VMaXN0T2ZBbnN3ZXI6IFtdLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9IHtcclxuICAgICAgICBWaWV3SW1hZ2VPZk5hbWUoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybClcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1hZ2VMaXN0T2ZOYW1lLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2VPZkFuc3dlcihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsKVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWFnZUxpc3RPZkFuc3dlcixcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgb25DbGlja1NvbHZlZCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5bey6Kej5YazJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrprlt7Lnu4/op6PlhrPmraTpl67popjvvJ8nLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci91cGRhdGVfYXNrX3F1ZXN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBUWlkOk51bWJlcihzZWxmLkFRaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFRaXNTb2x2ZWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgU3VjY2VzcyFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflt7Lop6PlhrMnLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRBc2tRdWVzdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci9nZXRfYXNrX3F1ZXN0aW9uJyxcclxuICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIEFRaWQ6c2VsZi5BUWlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hc2txdWVzdGlvbiA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuYXNrcXVlc3Rpb24uRWlkIT0tMSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldEV4ZXJjaXNlRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHVkZW50RGF0YSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci9nZXRfc3R1ZGVudCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICBTaWQ6c2VsZi5hc2txdWVzdGlvbi5TaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0dWRlbnQgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRFeGVyY2lzZURhdGEoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBFaWQ6c2VsZi5hc2txdWVzdGlvbi5FaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2UgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGEuRW5hbWVQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5FbmFtZVBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mTmFtZSA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5FYW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHJlcy5kYXRhLkRhdGEuRWFuc3dlclBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mQW5zd2VyID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIHNlbGYuQVFpZCA9IG9wdGlvbnMuYXFpZFxyXG5cclxuICAgICAgICBzZWxmLmdldEFza1F1ZXN0aW9uRGF0YSgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==