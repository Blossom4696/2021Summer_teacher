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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {}
        }, _this.data = {
            Eid: 0,
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
            onClickEditExercise: function onClickEditExercise(e) {
                var self = this;
                wx.navigateTo({
                    url: "edit-exercise?eid=" + self.exercise.Eid
                });
            },
            onClickDeleteExercise: function onClickDeleteExercise(e) {
                var self = this;
                wx.showModal({
                    title: '删除习题',
                    content: '确定要删除此习题？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            _wepy2.default.request({
                                url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/delete_exercise/:id' + '?Eid=' + self.exercise.Eid.toString(),
                                method: 'DELETE',
                                header: _wepy2.default.$instance.setHeader(),
                                success: function success(res) {
                                    console.log(res);
                                    if (res.data.Code == 1) {
                                        _wepy2.default.showToast({
                                            title: '删除成功', //提示的内容,
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

    _createClass(Index, [{
        key: 'getExerciseData',
        value: function getExerciseData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/get_exercise',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Eid: self.Eid
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

            self.Eid = options.eid;
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getExerciseData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/exercise-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZXJjaXNlLWRldGFpbC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsInVzaW5nQ29tcG9uZW50cyIsImRhdGEiLCJFaWQiLCJleGVyY2lzZSIsImltYWdlVXJsIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJhdWRpb1VybCIsImltYWdlTGlzdE9mTmFtZSIsImltYWdlTGlzdE9mQW5zd2VyIiwibWV0aG9kcyIsIlZpZXdJbWFnZU9mTmFtZSIsImUiLCJzZWxmIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwidXJsIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiY3VycmVudCIsIlZpZXdJbWFnZU9mQW5zd2VyIiwib25DbGlja0VkaXRFeGVyY2lzZSIsIm5hdmlnYXRlVG8iLCJvbkNsaWNrRGVsZXRlRXhlcmNpc2UiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInJlcXVlc3QiLCJ0b1N0cmluZyIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIkNvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJtYXNrIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiRGF0YSIsIkVuYW1lUGF0aCIsInRtcExpc3QiLCJzcGxpdCIsIm1hcCIsIngiLCJFYW5zd2VyUGF0aCIsIiRhcHBseSIsIm9wdGlvbnMiLCJlaWQiLCJnZXRFeGVyY2lzZURhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNMQyw2QkFBZ0I7QUFEWCxTLFFBS1RDLEksR0FBTztBQUNIQyxpQkFBSSxDQUREO0FBRUhDLHNCQUFTLEVBRk47QUFHSEMsc0JBQVND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LE9BQU8sSUFBWDtBQUNBQSxpQkFBSzZDLGVBQUw7QUFDSDs7OztFQXBIOEJ2RCxlQUFLd0QsSTs7a0JBQW5CL0QsSyIsImZpbGUiOiJleGVyY2lzZS1kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICB1c2luZ0NvbXBvbmVudHM6e1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIEVpZDowLFxyXG4gICAgICAgIGV4ZXJjaXNlOnt9LFxyXG4gICAgICAgIGltYWdlVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgICAgIGF1ZGlvVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfYXVkaW8/bmFtZT0nLFxyXG4gICAgICAgIGltYWdlTGlzdE9mTmFtZTogW10sXHJcbiAgICAgICAgaW1hZ2VMaXN0T2ZBbnN3ZXI6IFtdLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVmlld0ltYWdlT2ZOYW1lKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltYWdlTGlzdE9mTmFtZSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlT2ZBbnN3ZXIoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybClcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1hZ2VMaXN0T2ZBbnN3ZXIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tFZGl0RXhlcmNpc2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDpcImVkaXQtZXhlcmNpc2U/ZWlkPVwiK3NlbGYuZXhlcmNpc2UuRWlkLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tEZWxldGVFeGVyY2lzZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTkuaDpopgnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOatpOS5oOmimO+8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9leGVyY2lzZS9kZWxldGVfZXhlcmNpc2UvOmlkJyArICc/RWlkPScgKyBzZWxmLmV4ZXJjaXNlLkVpZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFeGVyY2lzZURhdGEoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBFaWQ6c2VsZi5FaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2UgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGEuRW5hbWVQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5FbmFtZVBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mTmFtZSA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5FYW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHJlcy5kYXRhLkRhdGEuRWFuc3dlclBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mQW5zd2VyID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIHNlbGYuRWlkID0gb3B0aW9ucy5laWRcclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBzZWxmLmdldEV4ZXJjaXNlRGF0YSgpXHJcbiAgICB9XHJcbn1cclxuIl19