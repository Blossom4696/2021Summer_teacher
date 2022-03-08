"use strict";

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
            "usingComponents": {
                "mp-slideview": "weui-miniprogram/slideview/slideview",
                "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog"
            }
        }, _this.data = {
            exerciseList: [],
            exerciseField: {},
            screenCur: {
                subjectCur: 0,
                difficultyCur: 0,
                typeCur: 0,
                gradeCur: 0,
                unitCur: 0
            },
            exerciseIndex: -1,
            difficultyColor: {
                "简单": "cyan",
                "中等": "olive",
                "困难": "pink",
                "竞赛": "black"
            },

            imageScreen: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/screen.png',
            modalName: "",
            slideButtons: [{
                type: 'warn',
                src: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/del.png'
            }],
            buttons: [{
                text: '取消'
            }, {
                text: '确定',
                extClass: 'DeleteButton'
            }],
            dialogShow: false,
            deleteIndex: -1,
            isClickPrint: false,
            selectIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/select.png',
            nonselectIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/nonselect.png',
            selectIconOfExercise: [],
            isPrintAnswer: false
        }, _this.methods = {
            tabSelectIndex: function tabSelectIndex(e) {
                var self = this;
                self.screenCur[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
                self.methods.getExerciseSort(self);
            },
            tabSelect: function tabSelect(e) {
                var self = this;
                self.screenCur[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
            },
            onClickSelectIcon: function onClickSelectIcon(e) {
                var self = this;
                self.selectIconOfExercise[e.currentTarget.dataset.id] = self.selectIconOfExercise[e.currentTarget.dataset.id] == self.selectIcon ? self.nonselectIcon : self.selectIcon;
            },
            showModal: function showModal(e) {
                var self = this;
                self.modalName = e.currentTarget.dataset.target;
            },
            hideModal: function hideModal(e) {
                var self = this;
                self.modalName = null;
                self.methods.getExerciseSort(self);
            },
            slideButtonTap: function slideButtonTap(e) {
                var self = this;
                self.deleteIndex = e.currentTarget.dataset.index;
                self.dialogShow = true;
            },
            tapDeleteDialogButton: function tapDeleteDialogButton(e) {
                var self = this;
                self.dialogShow = false;
                if (e.detail.index == 1) {
                    self.methods.deleteExercise(self);
                }
            },
            dialogClose: function dialogClose(e) {
                var self = this;
                self.dialogShow = false;
            },
            checkboxChange: function checkboxChange(e) {
                var self = this;
                self.isPrintAnswer = self.isPrintAnswer ? false : true;
            },
            onClickReset: function onClickReset() {
                var self = this;
                self.screenCur = {
                    subjectCur: 0,
                    difficultyCur: 0,
                    typeCur: 0,
                    gradeCur: 0,
                    unitCur: 0
                };
            },
            onClickExercise: function onClickExercise(e) {
                var self = this;
                self.exerciseIndex = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "exercise-detail?eid=" + self.exerciseList[self.exerciseIndex].Eid

                });
            },
            onClickCreateExercise: function onClickCreateExercise(e) {
                console.log(e);
                this.$navigate({ url: "create-exercise" });
            },
            clickPrint: function clickPrint() {
                var self = this;
                self.isClickPrint = self.isClickPrint ? false : true;
            },
            clickPrintSubmut: function clickPrintSubmut() {
                var self = this;
                self.isClickPrint = false;

                var eidList = [];
                for (var i = 0; i < self.selectIconOfExercise.length; i++) {
                    if (self.selectIconOfExercise[i] == self.selectIcon) {
                        eidList.push(self.exerciseList[i].Eid);
                    }
                }

                console.log(eidList);
                if (eidList.length == 0) {
                    return;
                }

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/generate_exercise_pdf',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        Eids: eidList,
                        isPrintAnswer: self.isPrintAnswer == true ? "1" : "0"
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.getPrintPdf(res.data.Data["filePath"]);
                        } else if (res.data.Code == -1) {
                            _wepy2.default.showToast({
                                title: '打印失败', //提示的内容,
                                icon: 'error', //图标,
                                duration: 2000, //延迟时间,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });
                        }
                    }
                });
            },
            getExercise: function getExercise(self) {
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/get_all_exercise',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.exerciseList = res.data.Data;
                            self.selectIconOfExercise = [];
                            for (var i = 0; i < self.exerciseList.length; i++) {
                                self.selectIconOfExercise.push(self.nonselectIcon);
                            }
                            self.$apply();
                        }
                    },
                    fail: function fail(res) {
                        self.exerciseList = [];
                    }
                });
            },
            getExerciseField: function getExerciseField(self) {
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/get_exercise_field',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.exerciseField = res.data.Data;
                            self.$apply();
                        }
                    },
                    fail: function fail(res) {
                        self.exerciseField = [];
                    }
                });
            },
            getExerciseSort: function getExerciseSort(self) {
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/get_sorted_exercise',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        subject: self.exerciseField.Esubject[self.screenCur.subjectCur],
                        type: self.exerciseField.Etype[self.exerciseField.Esubject[self.screenCur.subjectCur]][self.screenCur.typeCur],
                        unit: self.exerciseField.Eunit[self.exerciseField.Esubject[self.screenCur.subjectCur]][self.screenCur.unitCur],
                        difficulty: self.exerciseField.Edifficulty[self.screenCur.difficultyCur],
                        grade: self.exerciseField.Egrade[self.screenCur.gradeCur]
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.exerciseList = res.data.Data;
                            self.$apply();
                        }
                    }
                });
            },
            deleteExercise: function deleteExercise(self) {
                if (self.deleteIndex == -1) return;
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/delete_exercise/:id' + '?Eid=' + self.exerciseList[self.deleteIndex].Eid.toString(),
                    method: 'DELETE',
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '删除成功'
                            });
                            self.methods.getExercise(self);
                            self.methods.getExerciseField(self);
                        }
                    }
                });
            },
            inputChangeSearch: function inputChangeSearch(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/search_exercise',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        word: e.detail.value
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.exerciseList = res.data.Data;
                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: "getPrintPdf",
        value: function getPrintPdf(path) {
            console.log(path);
            _wepy2.default.downloadFile({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_pdf' + "?name=" + path,
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.statusCode === 200) {
                        _wepy2.default.showToast({
                            title: '打印成功', //提示的内容,
                            icon: 'success', //图标,
                            duration: 2000, //延迟时间,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });

                        wx.saveFile({
                            tempFilePath: res.tempFilePath,
                            success: function success(res) {
                                var savedFilePath = res.savedFilePath;

                                wx.openDocument({
                                    filePath: savedFilePath,
                                    fildType: 'pdf',
                                    showMenu: true,
                                    success: function success(res) {
                                        console.log('打开文档成功');
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            var self = this;

            self.methods.getExercise(self);
            self.methods.getExerciseField(self);
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/exercise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZXJjaXNlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsImV4ZXJjaXNlTGlzdCIsImV4ZXJjaXNlRmllbGQiLCJzY3JlZW5DdXIiLCJzdWJqZWN0Q3VyIiwiZGlmZmljdWx0eUN1ciIsInR5cGVDdXIiLCJncmFkZUN1ciIsInVuaXRDdXIiLCJleGVyY2lzZUluZGV4IiwiZGlmZmljdWx0eUNvbG9yIiwiaW1hZ2VTY3JlZW4iLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1vZGFsTmFtZSIsInNsaWRlQnV0dG9ucyIsInR5cGUiLCJzcmMiLCJidXR0b25zIiwidGV4dCIsImV4dENsYXNzIiwiZGlhbG9nU2hvdyIsImRlbGV0ZUluZGV4IiwiaXNDbGlja1ByaW50Iiwic2VsZWN0SWNvbiIsIm5vbnNlbGVjdEljb24iLCJzZWxlY3RJY29uT2ZFeGVyY2lzZSIsImlzUHJpbnRBbnN3ZXIiLCJtZXRob2RzIiwidGFiU2VsZWN0SW5kZXgiLCJlIiwic2VsZiIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibmFtZSIsImlkIiwiZ2V0RXhlcmNpc2VTb3J0IiwidGFiU2VsZWN0Iiwib25DbGlja1NlbGVjdEljb24iLCJzaG93TW9kYWwiLCJ0YXJnZXQiLCJoaWRlTW9kYWwiLCJzbGlkZUJ1dHRvblRhcCIsImluZGV4IiwidGFwRGVsZXRlRGlhbG9nQnV0dG9uIiwiZGV0YWlsIiwiZGVsZXRlRXhlcmNpc2UiLCJkaWFsb2dDbG9zZSIsImNoZWNrYm94Q2hhbmdlIiwib25DbGlja1Jlc2V0Iiwib25DbGlja0V4ZXJjaXNlIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiRWlkIiwib25DbGlja0NyZWF0ZUV4ZXJjaXNlIiwiY29uc29sZSIsImxvZyIsIiRuYXZpZ2F0ZSIsImNsaWNrUHJpbnQiLCJjbGlja1ByaW50U3VibXV0IiwiZWlkTGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIkVpZHMiLCJzdWNjZXNzIiwicmVzIiwiQ29kZSIsImdldFByaW50UGRmIiwiRGF0YSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsImdldEV4ZXJjaXNlIiwiJGFwcGx5IiwiZmFpbCIsImdldEV4ZXJjaXNlRmllbGQiLCJzdWJqZWN0IiwiRXN1YmplY3QiLCJFdHlwZSIsInVuaXQiLCJFdW5pdCIsImRpZmZpY3VsdHkiLCJFZGlmZmljdWx0eSIsImdyYWRlIiwiRWdyYWRlIiwidG9TdHJpbmciLCJpbnB1dENoYW5nZVNlYXJjaCIsIndvcmQiLCJ2YWx1ZSIsInBhdGgiLCJkb3dubG9hZEZpbGUiLCJzdGF0dXNDb2RlIiwic2F2ZUZpbGUiLCJ0ZW1wRmlsZVBhdGgiLCJzYXZlZEZpbGVQYXRoIiwib3BlbkRvY3VtZW50IiwiZmlsZVBhdGgiLCJmaWxkVHlwZSIsInNob3dNZW51IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDTCwrQkFBbUI7QUFDZixnQ0FBZ0Isc0NBREQ7QUFFZiw2QkFBYTtBQUZFO0FBRGQsUyxRQU9UQyxJLEdBQU87QUFDSEMsMEJBQWEsRUFEVjtBQUVIQywyQkFBYyxFQUZYO0FBR0hDLHVCQUFXO0FBQ1BDLDRCQUFZLENBREw7QUFFUEMsK0JBQWUsQ0FGUjtBQUdQQyx5QkFBUSxDQUhEO0FBSVBDLDBCQUFVLENBSkg7QUFLUEMseUJBQVM7QUFMRixhQUhSO0FBVUhDLDJCQUFjLENBQUMsQ0FWWjtBQVdIQyw2QkFBZ0I7QUFDWixzQkFBSyxNQURPO0FBRVosc0JBQUssT0FGTztBQUdaLHNCQUFLLE1BSE87QUFJWixzQkFBSztBQUpPLGFBWGI7O0FBa0JIQyx5QkFBWUMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywwQ0FsQi9DO0FBbUJIQyx1QkFBWSxFQW5C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TUFESSxFQUNJO0FBQ2ZDLGtDQUFNLFNBRkssRUFFTTtBQUNqQkMsc0NBQVUsSUFIQyxFQUdLO0FBQ2hCQyxrQ0FBTSxJQUpLLEVBSUM7QUFDWlQscUNBQVMsc0JBQU8sQ0FBRTtBQUxQLHlCQUFmOztBQVFBbkIsMkJBQUdpRCxRQUFILENBQVk7QUFDUkMsMENBQWM5QixJQUFJOEIsWUFEVjtBQUVSL0IsbUNBRlEsbUJBRUNDLEdBRkQsRUFFTTtBQUNWLG9DQUFNK0IsZ0JBQWdCL0IsSUFBSStCLGFBQTFCOztBQUVBbkQsbUNBQUdvRCxZQUFILENBQWdCO0FBQ1pDLDhDQUFVRixhQURFO0FBRVpHLDhDQUFVLEtBRkU7QUFHWkMsOENBQVUsSUFIRTtBQUlacEMsMkNBSlksbUJBSUhDLEdBSkcsRUFJRTtBQUNWZixnREFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSDtBQU5XLGlDQUFoQjtBQVFIO0FBYk8seUJBQVo7QUFpQkg7QUFDSjtBQWhDYSxhQUFsQjtBQWtDSDs7O2lDQUVPLENBRVA7OztpQ0FFUTtBQUNMLGdCQUFJMUIsT0FBTyxJQUFYOztBQUVBQSxpQkFBS0gsT0FBTCxDQUFhb0QsV0FBYixDQUF5QmpELElBQXpCO0FBQ0FBLGlCQUFLSCxPQUFMLENBQWF1RCxnQkFBYixDQUE4QnBELElBQTlCO0FBRUg7Ozs7RUFoVWdDckIsZUFBS2lHLEk7O2tCQUFuQi9HLEsiLCJmaWxlIjoiZXhlcmNpc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgXCJ1c2luZ0NvbXBvbmVudHNcIjoge1xyXG4gICAgICAgICAgICBcIm1wLXNsaWRldmlld1wiOiBcIndldWktbWluaXByb2dyYW0vc2xpZGV2aWV3L3NsaWRldmlld1wiLFxyXG4gICAgICAgICAgICBcIm1wLWRpYWxvZ1wiOiBcIi9taW5pcHJvZ3JhbV9ucG0vd2V1aS1taW5pcHJvZ3JhbS9kaWFsb2cvZGlhbG9nXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgZXhlcmNpc2VMaXN0OltdLFxyXG4gICAgICAgIGV4ZXJjaXNlRmllbGQ6e30sXHJcbiAgICAgICAgc2NyZWVuQ3VyOiB7XHJcbiAgICAgICAgICAgIHN1YmplY3RDdXI6IDAsXHJcbiAgICAgICAgICAgIGRpZmZpY3VsdHlDdXI6IDAsXHJcbiAgICAgICAgICAgIHR5cGVDdXI6MCxcclxuICAgICAgICAgICAgZ3JhZGVDdXI6IDAsXHJcbiAgICAgICAgICAgIHVuaXRDdXI6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBleGVyY2lzZUluZGV4Oi0xLFxyXG4gICAgICAgIGRpZmZpY3VsdHlDb2xvcjp7XHJcbiAgICAgICAgICAgIFwi566A5Y2VXCI6XCJjeWFuXCIsXHJcbiAgICAgICAgICAgIFwi5Lit562JXCI6XCJvbGl2ZVwiLFxyXG4gICAgICAgICAgICBcIuWbsOmavlwiOlwicGlua1wiLFxyXG4gICAgICAgICAgICBcIuernui1m1wiOlwiYmxhY2tcIixcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbWFnZVNjcmVlbjp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9zY3JlZW4ucG5nJyxcclxuICAgICAgICBtb2RhbE5hbWUgOiBcIlwiLFxyXG4gICAgICAgIHNsaWRlQnV0dG9uczogW3tcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgICAgICAgIHNyYzp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9kZWwucG5nJyxcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgYnV0dG9uczogW3tcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgZXh0Q2xhc3M6ICdEZWxldGVCdXR0b24nLFxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICBkaWFsb2dTaG93OiBmYWxzZSxcclxuICAgICAgICBkZWxldGVJbmRleDotMSxcclxuICAgICAgICBpc0NsaWNrUHJpbnQgOmZhbHNlLFxyXG4gICAgICAgIHNlbGVjdEljb246d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vc2VsZWN0LnBuZycsXHJcbiAgICAgICAgbm9uc2VsZWN0SWNvbjp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9ub25zZWxlY3QucG5nJyxcclxuICAgICAgICBzZWxlY3RJY29uT2ZFeGVyY2lzZTogW10sXHJcbiAgICAgICAgaXNQcmludEFuc3dlcjogZmFsc2UsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0YWJTZWxlY3RJbmRleChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuc2NyZWVuQ3VyW2UuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWUrXCJDdXJcIl09IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5nZXRFeGVyY2lzZVNvcnQoc2VsZilcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YWJTZWxlY3QoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5zY3JlZW5DdXJbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZStcIkN1clwiXT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrU2VsZWN0SWNvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZkV4ZXJjaXNlW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXSA9IHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2VbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRdID09IHNlbGYuc2VsZWN0SWNvbiA/IHNlbGYubm9uc2VsZWN0SWNvbiA6IHNlbGYuc2VsZWN0SWNvblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dNb2RhbChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLm1vZGFsTmFtZT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZU1vZGFsKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYubW9kYWxOYW1lPSBudWxsXHJcbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5nZXRFeGVyY2lzZVNvcnQoc2VsZilcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzbGlkZUJ1dHRvblRhcChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRlbGV0ZUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICAgICAgc2VsZi5kaWFsb2dTaG93ID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRhcERlbGV0ZURpYWxvZ0J1dHRvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuaW5kZXggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5tZXRob2RzLmRlbGV0ZUV4ZXJjaXNlKHNlbGYpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaWFsb2dDbG9zZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZGlhbG9nU2hvdyA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hlY2tib3hDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzUHJpbnRBbnN3ZXIgPSBzZWxmLmlzUHJpbnRBbnN3ZXI/ZmFsc2U6dHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tSZXNldCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5zY3JlZW5DdXI9e1xyXG4gICAgICAgICAgICAgICAgc3ViamVjdEN1cjogMCxcclxuICAgICAgICAgICAgICAgIGRpZmZpY3VsdHlDdXI6IDAsXHJcbiAgICAgICAgICAgICAgICB0eXBlQ3VyOjAsXHJcbiAgICAgICAgICAgICAgICBncmFkZUN1cjogMCxcclxuICAgICAgICAgICAgICAgIHVuaXRDdXI6IDAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrRXhlcmNpc2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5leGVyY2lzZUluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6XCJleGVyY2lzZS1kZXRhaWw/ZWlkPVwiK3NlbGYuZXhlcmNpc2VMaXN0W3NlbGYuZXhlcmNpc2VJbmRleF0uRWlkLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0NyZWF0ZUV4ZXJjaXNlKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGUoe3VybDpcImNyZWF0ZS1leGVyY2lzZVwifSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbGlja1ByaW50KCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tQcmludCA9IHNlbGYuaXNDbGlja1ByaW50P2ZhbHNlOnRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbGlja1ByaW50U3VibXV0KCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrUHJpbnQgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgbGV0IGVpZExpc3QgPSBbXVxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2UubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLnNlbGVjdEljb25PZkV4ZXJjaXNlW2ldID09IHNlbGYuc2VsZWN0SWNvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgZWlkTGlzdC5wdXNoKHNlbGYuZXhlcmNpc2VMaXN0W2ldLkVpZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZWlkTGlzdClcclxuICAgICAgICAgICAgaWYoZWlkTGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90ZWFjaGVyL2dlbmVyYXRlX2V4ZXJjaXNlX3BkZicsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEVpZHM6ZWlkTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmludEFuc3dlcjogc2VsZi5pc1ByaW50QW5zd2VyPT10cnVlP1wiMVwiOlwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFByaW50UGRmKHJlcy5kYXRhLkRhdGFbXCJmaWxlUGF0aFwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy5kYXRhLkNvZGUgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aJk+WNsOWksei0pScsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RXhlcmNpc2Uoc2VsZikge1xyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X2FsbF9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV4ZXJjaXNlTGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RJY29uT2ZFeGVyY2lzZSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi5leGVyY2lzZUxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZkV4ZXJjaXNlLnB1c2goc2VsZi5ub25zZWxlY3RJY29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmV4ZXJjaXNlTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RXhlcmNpc2VGaWVsZChzZWxmKSB7XHJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9nZXRfZXhlcmNpc2VfZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUZpZWxkID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUZpZWxkID0gW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRFeGVyY2lzZVNvcnQoc2VsZikge1xyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X3NvcnRlZF9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdDpzZWxmLmV4ZXJjaXNlRmllbGQuRXN1YmplY3Rbc2VsZi5zY3JlZW5DdXIuc3ViamVjdEN1cl0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTpzZWxmLmV4ZXJjaXNlRmllbGQuRXR5cGVbc2VsZi5leGVyY2lzZUZpZWxkLkVzdWJqZWN0W3NlbGYuc2NyZWVuQ3VyLnN1YmplY3RDdXJdXVtzZWxmLnNjcmVlbkN1ci50eXBlQ3VyXSxcclxuICAgICAgICAgICAgICAgICAgICB1bml0OnNlbGYuZXhlcmNpc2VGaWVsZC5FdW5pdFtzZWxmLmV4ZXJjaXNlRmllbGQuRXN1YmplY3Rbc2VsZi5zY3JlZW5DdXIuc3ViamVjdEN1cl1dW3NlbGYuc2NyZWVuQ3VyLnVuaXRDdXJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6c2VsZi5leGVyY2lzZUZpZWxkLkVkaWZmaWN1bHR5W3NlbGYuc2NyZWVuQ3VyLmRpZmZpY3VsdHlDdXJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYWRlOnNlbGYuZXhlcmNpc2VGaWVsZC5FZ3JhZGVbc2VsZi5zY3JlZW5DdXIuZ3JhZGVDdXJdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsZXRlRXhlcmNpc2Uoc2VsZikge1xyXG4gICAgICAgICAgICBpZihzZWxmLmRlbGV0ZUluZGV4ID09IC0xKSByZXR1cm5cclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2V4ZXJjaXNlL2RlbGV0ZV9leGVyY2lzZS86aWQnICsgJz9FaWQ9JyArIHNlbGYuZXhlcmNpc2VMaXN0W3NlbGYuZGVsZXRlSW5kZXhdLkVpZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifliKDpmaTmiJDlip8nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWV0aG9kcy5nZXRFeGVyY2lzZShzZWxmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1ldGhvZHMuZ2V0RXhlcmNpc2VGaWVsZChzZWxmKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dENoYW5nZVNlYXJjaChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3VzZXIvY29tbW9uL3NlYXJjaF9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQ6ZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2VMaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpbnRQZGYocGF0aCl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGF0aClcclxuICAgICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X3BkZicgKyBcIj9uYW1lPVwiICsgcGF0aCxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aJk+WNsOaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2F2ZUZpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2F2ZWRGaWxlUGF0aCA9IHJlcy5zYXZlZEZpbGVQYXRoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gub3BlbkRvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogc2F2ZWRGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxkVHlwZTogJ3BkZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lbnU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiZPlvIDmlofmoaPmiJDlip8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgc2VsZi5tZXRob2RzLmdldEV4ZXJjaXNlKHNlbGYpXHJcbiAgICAgICAgc2VsZi5tZXRob2RzLmdldEV4ZXJjaXNlRmllbGQoc2VsZilcclxuICAgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4iXX0=