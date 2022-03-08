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
            Wid: 0,
            Sname: "",
            wrongProblem: {},
            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            imageListOfName: [],
            imageListOfAnswer: [],
            imageListOfMyAnswer: []
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
            ViewImageOfMyAnswer: function ViewImageOfMyAnswer(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfMyAnswer,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            onClickEditWrongProblem: function onClickEditWrongProblem(e) {
                var self = this;
                wx.navigateTo({
                    url: "edit-wrongproblem?wid=" + self.wrongProblem.Wid
                });
            },
            onClickDeleteWrongProblem: function onClickDeleteWrongProblem() {
                var self = this;
                wx.showModal({
                    title: '删除错题',
                    content: '确定要删除此错题？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            _wepy2.default.request({
                                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/delete_wrong_problem/:id' + '?Wid=' + self.wrongProblem.Wid.toString(),
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
        key: 'getWrongProblem',
        value: function getWrongProblem() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_wrong_problem',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Wid: self.Wid,
                    Sid: self.Sid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.wrongProblem = res.data.Data;
                        if (res.data.Data.WproblemPath != "") {
                            var tmpList = res.data.Data.WproblemPath.split(";");
                            self.imageListOfName = tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.WanswerPath != "") {
                            var _tmpList = res.data.Data.WanswerPath.split(";");
                            self.imageListOfAnswer = _tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.WmyAnswerPath != "") {
                            var _tmpList2 = res.data.Data.WmyAnswerPath.split(";");
                            self.imageListOfMyAnswer = _tmpList2.map(function (x) {
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

            self.Wid = options.wid;
            self.Sname = options.sname;
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            self.getWrongProblem();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/wrongproblem-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyb25ncHJvYmxlbS1kZXRhaWwuanMiXSwibmFtZXMiOlsiSW5kZXgiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJkYXRhIiwiV2lkIiwiU25hbWUiLCJ3cm9uZ1Byb2JsZW0iLCJpbWFnZVVybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwiYXVkaW9VcmwiLCJpbWFnZUxpc3RPZk5hbWUiLCJpbWFnZUxpc3RPZkFuc3dlciIsImltYWdlTGlzdE9mTXlBbnN3ZXIiLCJtZXRob2RzIiwiVmlld0ltYWdlT2ZOYW1lIiwiZSIsInNlbGYiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ1cmwiLCJ3eCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJjdXJyZW50IiwiVmlld0ltYWdlT2ZBbnN3ZXIiLCJWaWV3SW1hZ2VPZk15QW5zd2VyIiwib25DbGlja0VkaXRXcm9uZ1Byb2JsZW0iLCJuYXZpZ2F0ZVRvIiwib25DbGlja0RlbGV0ZVdyb25nUHJvYmxlbSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwicmVxdWVzdCIsInRvU3RyaW5nIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJTaWQiLCJEYXRhIiwiV3Byb2JsZW1QYXRoIiwidG1wTGlzdCIsInNwbGl0IiwibWFwIiwieCIsIldhbnN3ZXJQYXRoIiwiV215QW5zd2VyUGF0aCIsIiRhcHBseSIsIm9wdGlvbnMiLCJ3aWQiLCJzbmFtZSIsImdldFdyb25nUHJvYmxlbSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7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QXJCO0FBQUEsNkJBQVosQ0FBdkI7QUFDSDtBQUNELDRCQUFHckIsSUFBSXJDLElBQUosQ0FBU3FELElBQVQsQ0FBY00sV0FBZCxJQUEyQixFQUE5QixFQUFpQztBQUM3QixnQ0FBSUosV0FBVWxCLElBQUlyQyxJQUFKLENBQVNxRCxJQUFULENBQWNNLFdBQWQsQ0FBMEJILEtBQTFCLENBQWdDLEdBQWhDLENBQWQ7QUFDQXhDLGlDQUFLTCxpQkFBTCxHQUF5QjRDLFNBQVFFLEdBQVIsQ0FBWTtBQUFBLHVDQUFLekMsS0FBS1osUUFBTCxHQUFnQnNELENBQXJCO0FBQUEsNkJBQVosQ0FBekI7QUFDSDtBQUNELDRCQUFHckIsSUFBSXJDLElBQUosQ0FBU3FELElBQVQsQ0FBY08sYUFBZCxJQUE2QixFQUFoQyxFQUFtQztBQUMvQixnQ0FBSUwsWUFBVWxCLElBQUlyQyxJQUFKLENBQVNxRCxJQUFULENBQWNPLGFBQWQsQ0FBNEJKLEtBQTVCLENBQWtDLEdBQWxDLENBQWQ7QUFDQXhDLGlDQUFLSixtQkFBTCxHQUEyQjJDLFVBQVFFLEdBQVIsQ0FBWTtBQUFBLHVDQUFLekMsS0FBS1osUUFBTCxHQUFnQnNELENBQXJCO0FBQUEsNkJBQVosQ0FBM0I7QUFDSDtBQUNEMUMsNkJBQUs2QyxNQUFMO0FBQ0g7QUFDSjtBQTFCSSxhQUFiO0FBNEJIOzs7K0JBRU1DLE8sRUFBUztBQUNaLGdCQUFJOUMsT0FBTyxJQUFYOztBQUVBQSxpQkFBS2YsR0FBTCxHQUFXNkQsUUFBUUMsR0FBbkI7QUFDQS9DLGlCQUFLZCxLQUFMLEdBQWE0RCxRQUFRRSxLQUFyQjtBQUNIOzs7aUNBRU87QUFDSixnQkFBSWhELE9BQU8sSUFBWDtBQUNBQSxpQkFBS2lELGVBQUw7QUFDSDs7OztFQXRJOEI1RCxlQUFLNkQsSTs7a0JBQW5CckUsSyIsImZpbGUiOiJ3cm9uZ3Byb2JsZW0tZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgdXNpbmdDb21wb25lbnRzOntcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBXaWQ6MCxcclxuICAgICAgICBTbmFtZTpcIlwiLFxyXG4gICAgICAgIHdyb25nUHJvYmxlbTp7fSxcclxuICAgICAgICBpbWFnZVVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9JyxcclxuICAgICAgICBhdWRpb1VybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2F1ZGlvP25hbWU9JyxcclxuICAgICAgICBpbWFnZUxpc3RPZk5hbWU6IFtdLFxyXG4gICAgICAgIGltYWdlTGlzdE9mQW5zd2VyOiBbXSxcclxuICAgICAgICBpbWFnZUxpc3RPZk15QW5zd2VyOiBbXSxcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIFZpZXdJbWFnZU9mTmFtZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsKVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWFnZUxpc3RPZk5hbWUsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZpZXdJbWFnZU9mQW5zd2VyKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltYWdlTGlzdE9mQW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2VPZk15QW5zd2VyKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltYWdlTGlzdE9mTXlBbnN3ZXIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgb25DbGlja0VkaXRXcm9uZ1Byb2JsZW0oZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDpcImVkaXQtd3Jvbmdwcm9ibGVtP3dpZD1cIitzZWxmLndyb25nUHJvYmxlbS5XaWQsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0RlbGV0ZVdyb25nUHJvYmxlbSgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk6ZSZ6aKYJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHliKDpmaTmraTplJnpopjvvJ8nLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvd3JvbmdfcHJvYmxlbS9kZWxldGVfd3JvbmdfcHJvYmxlbS86aWQnICsgJz9XaWQ9JyArIHNlbGYud3JvbmdQcm9ibGVtLldpZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRXcm9uZ1Byb2JsZW0oKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3dyb25nX3Byb2JsZW0vZ2V0X3dyb25nX3Byb2JsZW0nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIFdpZDpzZWxmLldpZCxcclxuICAgICAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndyb25nUHJvYmxlbSA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5XcHJvYmxlbVBhdGghPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcExpc3QgPSByZXMuZGF0YS5EYXRhLldwcm9ibGVtUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZOYW1lID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5EYXRhLldhbnN3ZXJQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5XYW5zd2VyUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZBbnN3ZXIgPSB0bXBMaXN0Lm1hcCh4ID0+IHNlbGYuaW1hZ2VVcmwgKyB4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGEuV215QW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHJlcy5kYXRhLkRhdGEuV215QW5zd2VyUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZNeUFuc3dlciA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLldpZCA9IG9wdGlvbnMud2lkXHJcbiAgICAgICAgc2VsZi5TbmFtZSA9IG9wdGlvbnMuc25hbWVcclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBzZWxmLmdldFdyb25nUHJvYmxlbSgpXHJcbiAgICB9XHJcbn1cclxuIl19