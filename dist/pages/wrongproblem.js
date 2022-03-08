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
            Sid: -1,
            student: {},
            wrongProblemList: null,
            exerciseField: null,
            activeTab: 0,
            screenCur: {
                subjectCur: 0,
                difficultyCur: 0,
                typeCur: 0,
                gradeCur: 0,
                unitCur: 0
            },
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
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            isClickPrint: false,
            selectIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/select.png',
            nonselectIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/nonselect.png',
            selectIconOfExercise: []
        }, _this.methods = {
            onTabClick: function onTabClick(e) {
                var self = this;
                var index = e.detail.index;
                self.activeTab = index;
            },
            onTabChange: function onTabChange(e) {
                var self = this;
                var index = e.detail.index;
                self.activeTab = index;
            },
            onClickSelectIcon: function onClickSelectIcon(e) {
                var self = this;
                self.selectIconOfExercise[e.currentTarget.dataset.id] = self.selectIconOfExercise[e.currentTarget.dataset.id] == self.selectIcon ? self.nonselectIcon : self.selectIcon;
            },
            tabSelectIndex: function tabSelectIndex(e) {
                var self = this;
                self.screenCur[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
                self.getSortedWrongProblem(self);
            },
            tabSelect: function tabSelect(e) {
                var self = this;
                self.screenCur[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
            },
            showModal: function showModal(e) {
                var self = this;
                self.modalName = e.currentTarget.dataset.target;
            },
            hideModal: function hideModal(e) {
                var self = this;
                self.modalName = null;
                self.getSortedWrongProblem();
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
                    self.deleteWrongProblem();
                }
            },
            onClickWrongProblem: function onClickWrongProblem(e) {
                var self = this;
                var exerciseIndex = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "wrongproblem-detail?wid=" + self.wrongProblemList[exerciseIndex].Wid + "&sname=" + self.student.Snickname

                });
            },
            onClickCreateWrongProblem: function onClickCreateWrongProblem(e) {
                var self = this;
                wx.navigateTo({
                    url: "create-wrongproblem?sid=" + self.Sid
                });
            },
            clickPrint: function clickPrint() {
                var self = this;
                self.isClickPrint = self.isClickPrint ? false : true;
            },
            clickPrintSubmut: function clickPrintSubmut() {
                var self = this;
                self.isClickPrint = false;

                var widList = [];
                for (var i = 0; i < self.selectIconOfExercise.length; i++) {
                    if (self.selectIconOfExercise[i] == self.selectIcon) {
                        widList.push(self.wrongProblemList[i].Wid);
                    }
                }

                console.log(widList);
                if (widList.length == 0) {
                    return;
                }

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/generate_wrong_problem_pdf',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        Wids: widList
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
            inputChangeSearch: function inputChangeSearch(e) {
                var self = this;

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/user/common/search_wrong_problem',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        Sid: self.Sid,
                        word: e.detail.value
                    },
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            self.wrongProblemList = res.data.Data;
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
        key: "getWrongProblem",
        value: function getWrongProblem() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_wrong_problem_list',
                method: 'GET',
                data: {
                    Sid: self.Sid
                },
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.wrongProblemList = res.data.Data;
                        self.selectIconOfExercise = [];
                        for (var i = 0; i < self.wrongProblemList.length; i++) {
                            self.selectIconOfExercise.push(self.nonselectIcon);
                        }
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "getExerciseField",
        value: function getExerciseField() {
            var self = this;
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
                }
            });
        }
    }, {
        key: "getSortedWrongProblem",
        value: function getSortedWrongProblem() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_sorted_wrong_problem',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid,
                    subject: self.exerciseField.Esubject[self.screenCur.subjectCur],
                    type: self.exerciseField.Etype[self.exerciseField.Esubject[self.screenCur.subjectCur]][self.screenCur.typeCur],
                    unit: self.exerciseField.Eunit[self.exerciseField.Esubject[self.screenCur.subjectCur]][self.screenCur.unitCur],
                    difficulty: self.exerciseField.Edifficulty[self.screenCur.difficultyCur],
                    grade: self.exerciseField.Egrade[self.screenCur.gradeCur]
                },
                success: function success(res) {
                    if (res.data.Code == 1) {
                        self.wrongProblemList = res.data.Data;
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "deleteWrongProblem",
        value: function deleteWrongProblem() {
            var self = this;
            if (self.deleteIndex == -1) return;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/delete_wrong_problem/:id' + '?Wid=' + self.wrongProblemList[self.deleteIndex].Wid.toString(),
                method: 'DELETE',
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        wx.showToast({
                            title: '删除成功'
                        });
                        self.getWrongProblem();
                        self.getExerciseField();
                    }
                }
            });
        }
    }, {
        key: "getStudentData",
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
        key: "onLoad",
        value: function onLoad(options) {
            var self = this;
            console.log(options);

            self.Sid = options.sid;
        }
    }, {
        key: "onShow",
        value: function onShow(options) {
            var self = this;
            self.getWrongProblem();
            self.getExerciseField();
            self.getStudentData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/wrongproblem'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyb25ncHJvYmxlbS5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsImRhdGEiLCJTaWQiLCJzdHVkZW50Iiwid3JvbmdQcm9ibGVtTGlzdCIsImV4ZXJjaXNlRmllbGQiLCJhY3RpdmVUYWIiLCJzY3JlZW5DdXIiLCJzdWJqZWN0Q3VyIiwiZGlmZmljdWx0eUN1ciIsInR5cGVDdXIiLCJncmFkZUN1ciIsInVuaXRDdXIiLCJkaWZmaWN1bHR5Q29sb3IiLCJpbWFnZVNjcmVlbiIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibW9kYWxOYW1lIiwic2xpZGVCdXR0b25zIiwidHlwZSIsInNyYyIsImJ1dHRvbnMiLCJ0ZXh0IiwiZXh0Q2xhc3MiLCJkaWFsb2dTaG93IiwiZGVsZXRlSW5kZXgiLCJpbWdVcmwiLCJpc0NsaWNrUHJpbnQiLCJzZWxlY3RJY29uIiwibm9uc2VsZWN0SWNvbiIsInNlbGVjdEljb25PZkV4ZXJjaXNlIiwibWV0aG9kcyIsIm9uVGFiQ2xpY2siLCJlIiwic2VsZiIsImluZGV4IiwiZGV0YWlsIiwib25UYWJDaGFuZ2UiLCJvbkNsaWNrU2VsZWN0SWNvbiIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0YWJTZWxlY3RJbmRleCIsIm5hbWUiLCJnZXRTb3J0ZWRXcm9uZ1Byb2JsZW0iLCJ0YWJTZWxlY3QiLCJzaG93TW9kYWwiLCJ0YXJnZXQiLCJoaWRlTW9kYWwiLCJzbGlkZUJ1dHRvblRhcCIsInRhcERlbGV0ZURpYWxvZ0J1dHRvbiIsImRlbGV0ZVdyb25nUHJvYmxlbSIsIm9uQ2xpY2tXcm9uZ1Byb2JsZW0iLCJleGVyY2lzZUluZGV4Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiV2lkIiwiU25pY2tuYW1lIiwib25DbGlja0NyZWF0ZVdyb25nUHJvYmxlbSIsImNsaWNrUHJpbnQiLCJjbGlja1ByaW50U3VibXV0Iiwid2lkTGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJXaWRzIiwic3VjY2VzcyIsInJlcyIsIkNvZGUiLCJnZXRQcmludFBkZiIsIkRhdGEiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJpbnB1dENoYW5nZVNlYXJjaCIsIndvcmQiLCJ2YWx1ZSIsIiRhcHBseSIsInBhdGgiLCJkb3dubG9hZEZpbGUiLCJzdGF0dXNDb2RlIiwic2F2ZUZpbGUiLCJ0ZW1wRmlsZVBhdGgiLCJzYXZlZEZpbGVQYXRoIiwib3BlbkRvY3VtZW50IiwiZmlsZVBhdGgiLCJmaWxkVHlwZSIsInNob3dNZW51Iiwic3ViamVjdCIsIkVzdWJqZWN0IiwiRXR5cGUiLCJ1bml0IiwiRXVuaXQiLCJkaWZmaWN1bHR5IiwiRWRpZmZpY3VsdHkiLCJncmFkZSIsIkVncmFkZSIsInRvU3RyaW5nIiwiZ2V0V3JvbmdQcm9ibGVtIiwiZ2V0RXhlcmNpc2VGaWVsZCIsIm9wdGlvbnMiLCJzaWQiLCJnZXRTdHVkZW50RGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0wsK0JBQW1CO0FBQ2YsZ0NBQWdCLHNDQUREO0FBRWYsNkJBQWE7QUFGRTtBQURkLFMsUUFPVEMsSSxHQUFLO0FBQ0RDLGlCQUFNLENBQUMsQ0FETjtBQUVEQyxxQkFBUyxFQUZSO0FBR0RDLDhCQUFtQixJQUhsQjtBQUlEQywyQkFBZ0IsSUFKZjtBQUtEQyx1QkFBVyxDQUxWO0FBTURDLHVCQUFXO0FBQ1BDLDRCQUFZLENBREw7QUFFUEMsK0JBQWUsQ0FGUjtBQUdQQyx5QkFBUSxDQUhEO0FBSVBDLDBCQUFVLENBSkg7QUFLUEMseUJBQVM7QUFMRixhQU5WO0FBYURDLDZCQUFnQjtBQUNaLHNCQUFLLE1BRE87QUFFWixzQkFBSyxPQUZPO0FBR1osc0JBQUssTUFITztBQUlaLHNC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QkFBbkJuSCxLIiwiZmlsZSI6Indyb25ncHJvYmxlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgICAgIFwibXAtc2xpZGV2aWV3XCI6IFwid2V1aS1taW5pcHJvZ3JhbS9zbGlkZXZpZXcvc2xpZGV2aWV3XCIsXHJcbiAgICAgICAgICAgIFwibXAtZGlhbG9nXCI6IFwiL21pbmlwcm9ncmFtX25wbS93ZXVpLW1pbmlwcm9ncmFtL2RpYWxvZy9kaWFsb2dcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YT17XHJcbiAgICAgICAgU2lkIDogLTEsXHJcbiAgICAgICAgc3R1ZGVudDoge30sXHJcbiAgICAgICAgd3JvbmdQcm9ibGVtTGlzdCA6IG51bGwsXHJcbiAgICAgICAgZXhlcmNpc2VGaWVsZCA6IG51bGwsXHJcbiAgICAgICAgYWN0aXZlVGFiOiAwLFxyXG4gICAgICAgIHNjcmVlbkN1cjoge1xyXG4gICAgICAgICAgICBzdWJqZWN0Q3VyOiAwLFxyXG4gICAgICAgICAgICBkaWZmaWN1bHR5Q3VyOiAwLFxyXG4gICAgICAgICAgICB0eXBlQ3VyOjAsXHJcbiAgICAgICAgICAgIGdyYWRlQ3VyOiAwLFxyXG4gICAgICAgICAgICB1bml0Q3VyOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlmZmljdWx0eUNvbG9yOntcclxuICAgICAgICAgICAgXCLnroDljZVcIjpcImN5YW5cIixcclxuICAgICAgICAgICAgXCLkuK3nrYlcIjpcIm9saXZlXCIsXHJcbiAgICAgICAgICAgIFwi5Zuw6Zq+XCI6XCJwaW5rXCIsXHJcbiAgICAgICAgICAgIFwi56ue6LWbXCI6XCJibGFja1wiLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGltYWdlU2NyZWVuOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL3NjcmVlbi5wbmcnLFxyXG4gICAgICAgIG1vZGFsTmFtZSA6IFwiXCIsXHJcbiAgICAgICAgc2xpZGVCdXR0b25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgICAgICAgc3JjOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL2RlbC5wbmcnLFxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICBidXR0b25zOiBbe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBleHRDbGFzczogJ0RlbGV0ZUJ1dHRvbicsXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgIGRpYWxvZ1Nob3c6IGZhbHNlLFxyXG4gICAgICAgIGRlbGV0ZUluZGV4Oi0xLFxyXG4gICAgICAgIGltZ1VybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9JyxcclxuICAgICAgICBpc0NsaWNrUHJpbnQgOmZhbHNlLFxyXG4gICAgICAgIHNlbGVjdEljb246d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vc2VsZWN0LnBuZycsXHJcbiAgICAgICAgbm9uc2VsZWN0SWNvbjp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9ub25zZWxlY3QucG5nJyxcclxuICAgICAgICBzZWxlY3RJY29uT2ZFeGVyY2lzZTogW10sXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICAgb25UYWJDbGljayhlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBlLmRldGFpbC5pbmRleFxyXG4gICAgICAgICAgICBzZWxmLmFjdGl2ZVRhYj0gaW5kZXhcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvblRhYkNoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBlLmRldGFpbC5pbmRleFxyXG4gICAgICAgICAgICBzZWxmLmFjdGl2ZVRhYj0gaW5kZXhcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrU2VsZWN0SWNvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZkV4ZXJjaXNlW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXSA9IHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2VbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRdID09IHNlbGYuc2VsZWN0SWNvbiA/IHNlbGYubm9uc2VsZWN0SWNvbiA6IHNlbGYuc2VsZWN0SWNvblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRhYlNlbGVjdEluZGV4KGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5zY3JlZW5DdXJbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZStcIkN1clwiXT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgc2VsZi5nZXRTb3J0ZWRXcm9uZ1Byb2JsZW0oc2VsZilcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YWJTZWxlY3QoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5zY3JlZW5DdXJbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZStcIkN1clwiXT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzaG93TW9kYWwoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5tb2RhbE5hbWU9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGhpZGVNb2RhbChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLm1vZGFsTmFtZT0gbnVsbFxyXG4gICAgICAgICAgICBzZWxmLmdldFNvcnRlZFdyb25nUHJvYmxlbSgpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2xpZGVCdXR0b25UYXAoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5kZWxldGVJbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgICAgICAgIHNlbGYuZGlhbG9nU2hvdyA9IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YXBEZWxldGVEaWFsb2dCdXR0b24oZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5kaWFsb2dTaG93ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlV3JvbmdQcm9ibGVtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tXcm9uZ1Byb2JsZW0oZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGV4ZXJjaXNlSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDpcIndyb25ncHJvYmxlbS1kZXRhaWw/d2lkPVwiK3NlbGYud3JvbmdQcm9ibGVtTGlzdFtleGVyY2lzZUluZGV4XS5XaWQgKyBcIiZzbmFtZT1cIitzZWxmLnN0dWRlbnQuU25pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0NyZWF0ZVdyb25nUHJvYmxlbShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDpcImNyZWF0ZS13cm9uZ3Byb2JsZW0/c2lkPVwiK3NlbGYuU2lkLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrUHJpbnQoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuaXNDbGlja1ByaW50ID0gc2VsZi5pc0NsaWNrUHJpbnQ/ZmFsc2U6dHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrUHJpbnRTdWJtdXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tQcmludCA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBsZXQgd2lkTGlzdCA9IFtdXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi5zZWxlY3RJY29uT2ZFeGVyY2lzZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2VbaV0gPT0gc2VsZi5zZWxlY3RJY29uKXtcclxuICAgICAgICAgICAgICAgICAgICB3aWRMaXN0LnB1c2goc2VsZi53cm9uZ1Byb2JsZW1MaXN0W2ldLldpZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2cod2lkTGlzdClcclxuICAgICAgICAgICAgaWYod2lkTGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90ZWFjaGVyL2dlbmVyYXRlX3dyb25nX3Byb2JsZW1fcGRmJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2lkczp3aWRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0UHJpbnRQZGYocmVzLmRhdGEuRGF0YVtcImZpbGVQYXRoXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzLmRhdGEuQ29kZSA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5omT5Y2w5aSx6LSlJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpbnB1dENoYW5nZVNlYXJjaChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3VzZXIvY29tbW9uL3NlYXJjaF93cm9uZ19wcm9ibGVtJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2lkOiBzZWxmLlNpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZDplLmRldGFpbC52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53cm9uZ1Byb2JsZW1MaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpbnRQZGYocGF0aCl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGF0aClcclxuICAgICAgICB3ZXB5LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X3BkZicgKyBcIj9uYW1lPVwiICsgcGF0aCxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aJk+WNsOaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2F2ZUZpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2F2ZWRGaWxlUGF0aCA9IHJlcy5zYXZlZEZpbGVQYXRoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gub3BlbkRvY3VtZW50KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogc2F2ZWRGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxkVHlwZTogJ3BkZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd01lbnU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmiZPlvIDmlofmoaPmiJDlip8nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V3JvbmdQcm9ibGVtKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3dyb25nX3Byb2JsZW0vZ2V0X3dyb25nX3Byb2JsZW1fbGlzdCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndyb25nUHJvYmxlbUxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RJY29uT2ZFeGVyY2lzZSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLndyb25nUHJvYmxlbUxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2UucHVzaChzZWxmLm5vbnNlbGVjdEljb24pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RXhlcmNpc2VGaWVsZCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9nZXRfZXhlcmNpc2VfZmllbGQnLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUZpZWxkID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U29ydGVkV3JvbmdQcm9ibGVtKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3dyb25nX3Byb2JsZW0vZ2V0X3NvcnRlZF93cm9uZ19wcm9ibGVtJyxcclxuICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgIFNpZDogc2VsZi5TaWQsXHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0OnNlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLnNjcmVlbkN1ci5zdWJqZWN0Q3VyXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6c2VsZi5leGVyY2lzZUZpZWxkLkV0eXBlW3NlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLnNjcmVlbkN1ci5zdWJqZWN0Q3VyXV1bc2VsZi5zY3JlZW5DdXIudHlwZUN1cl0sXHJcbiAgICAgICAgICAgICAgICB1bml0OnNlbGYuZXhlcmNpc2VGaWVsZC5FdW5pdFtzZWxmLmV4ZXJjaXNlRmllbGQuRXN1YmplY3Rbc2VsZi5zY3JlZW5DdXIuc3ViamVjdEN1cl1dW3NlbGYuc2NyZWVuQ3VyLnVuaXRDdXJdLFxyXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eTpzZWxmLmV4ZXJjaXNlRmllbGQuRWRpZmZpY3VsdHlbc2VsZi5zY3JlZW5DdXIuZGlmZmljdWx0eUN1cl0sXHJcbiAgICAgICAgICAgICAgICBncmFkZTpzZWxmLmV4ZXJjaXNlRmllbGQuRWdyYWRlW3NlbGYuc2NyZWVuQ3VyLmdyYWRlQ3VyXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndyb25nUHJvYmxlbUxpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVXcm9uZ1Byb2JsZW0oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYoc2VsZi5kZWxldGVJbmRleCA9PSAtMSkgcmV0dXJuXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvd3JvbmdfcHJvYmxlbS9kZWxldGVfd3JvbmdfcHJvYmxlbS86aWQnICsgJz9XaWQ9JyArIHNlbGYud3JvbmdQcm9ibGVtTGlzdFtzZWxmLmRlbGV0ZUluZGV4XS5XaWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgbWV0aG9kOidERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifliKDpmaTmiJDlip8nXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFdyb25nUHJvYmxlbSgpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRFeGVyY2lzZUZpZWxkKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci9nZXRfc3R1ZGVudCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0dWRlbnQgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpXHJcblxyXG4gICAgICAgIHNlbGYuU2lkID0gb3B0aW9ucy5zaWRcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0V3JvbmdQcm9ibGVtKClcclxuICAgICAgICBzZWxmLmdldEV4ZXJjaXNlRmllbGQoKVxyXG4gICAgICAgIHNlbGYuZ2V0U3R1ZGVudERhdGEoKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==