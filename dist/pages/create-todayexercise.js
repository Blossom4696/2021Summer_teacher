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
            activeTab: 0,
            tabbar: ['习题', '学生'],
            exerciseList: [],
            copyExerciseList: [],
            exerciseField: {},
            exerciseScreen: {
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
            studentList: [],
            copyStudentList: [],
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            noUserIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=none_userinfo.png',
            selectIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/select.png',
            nonselectIcon: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=icon/nonselect.png',
            selectIconOfExercise: {},
            selectIconOfStudent: {},
            isSelectAll: false
        }, _this.methods = {
            tabSelectIndex: function tabSelectIndex(e) {
                var self = this;
                self.activeTab = e.currentTarget.dataset.id;
                // if(self.tabbar[e.currentTarget.dataset.id] == '习题'){
                //     self.methods.getExerciseSort(self)
                // }else{
                //     self.getStudentData()
                // }
            },
            tabSelect: function tabSelect(e) {
                var self = this;
                self.exerciseScreen[e.currentTarget.dataset.name + "Cur"] = e.currentTarget.dataset.id;
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
            dialogClose: function dialogClose(e) {
                var self = this;
                self.dialogShow = false;
            },
            onClickExercise: function onClickExercise(e) {
                var self = this;
                var index = e.currentTarget.dataset.id;
                self.selectIconOfExercise[self.exerciseList[index].Eid] = self.selectIconOfExercise[self.exerciseList[index].Eid] == self.selectIcon ? self.nonselectIcon : self.selectIcon;
            },
            onClickStudent: function onClickStudent(e) {
                var self = this;
                var index = e.currentTarget.dataset.id;
                self.selectIconOfStudent[self.studentList[index].Sid] = self.selectIconOfStudent[self.studentList[index].Sid] == self.selectIcon ? self.nonselectIcon : self.selectIcon;
            },
            onClickReset: function onClickReset() {
                var self = this;
                self.exerciseScreen = {
                    subjectCur: 0,
                    difficultyCur: 0,
                    typeCur: 0,
                    gradeCur: 0,
                    unitCur: 0
                };
            },
            onClickSelectAll: function onClickSelectAll() {
                var self = this;
                if (self.activeTab == 0) {
                    for (var i = 0; i < self.exerciseList.length; i++) {
                        self.selectIconOfExercise[self.exerciseList[i].Eid] = self.selectIcon;
                    }
                } else if (self.activeTab == 1) {
                    for (var _i = 0; _i < self.studentList.length; _i++) {
                        self.selectIconOfStudent[self.studentList[_i].Sid] = self.selectIcon;
                    }
                }
                self.isSelectAll = true;
            },
            onClickNonSelectAll: function onClickNonSelectAll() {
                var self = this;
                if (self.activeTab == 0) {
                    for (var i = 0; i < self.exerciseList.length; i++) {
                        self.selectIconOfExercise[self.exerciseList[i].Eid] = self.nonselectIcon;
                    }
                } else if (self.activeTab == 1) {
                    for (var _i2 = 0; _i2 < self.studentList.length; _i2++) {
                        self.selectIconOfStudent[self.studentList[_i2].Sid] = self.nonselectIcon;
                    }
                }
                self.isSelectAll = false;
            },
            onClickSubmit: function onClickSubmit() {
                var self = this;
                var today = new Date();
                console.log(today.toLocaleDateString());
                var Eids = [];
                var Sids = [];
                for (var key in self.selectIconOfExercise) {
                    if (self.selectIconOfExercise[key] == self.selectIcon) {
                        Eids.push(Number(key));
                    }
                }
                for (var key in self.selectIconOfStudent) {
                    if (self.selectIconOfStudent[key] == self.selectIcon) {
                        Sids.push(Number(key));
                    }
                }

                if (Eids.length == 0) {
                    wx.showToast({
                        title: '请选择习题', //提示的内容,
                        icon: 'error', //图标,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: function success(res) {}
                    });
                    return;
                } else if (Sids.length == 0) {
                    wx.showToast({
                        title: '请选择学生', //提示的内容,
                        icon: 'error', //图标,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                        success: function success(res) {}
                    });
                    return;
                }

                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/insert_today_exercise',
                    data: {
                        Sids: Sids,
                        Eids: Eids,
                        Date: today.toLocaleDateString()
                    },
                    method: 'POST',
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        wx.showToast({
                            title: '布置习题成功', //提示的内容,
                            icon: 'success', //图标,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });
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
                            self.copyExerciseList = JSON.parse(JSON.stringify(self.exerciseList)); //深拷贝

                            // 选中图标
                            for (var i = 0; i < self.exerciseList.length; i++) {
                                self.selectIconOfExercise[self.exerciseList[i].Eid] = self.nonselectIcon;
                            }
                            self.$apply();
                        }
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
                    }
                });
            },
            getExerciseSort: function getExerciseSort(self) {
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/get_sorted_exercise',
                    method: 'GET',
                    header: _wepy2.default.$instance.setHeader(),
                    data: {
                        subject: self.exerciseField.Esubject[self.exerciseScreen.subjectCur],
                        type: self.exerciseField.Etype[self.exerciseField.Esubject[self.exerciseScreen.subjectCur]][self.exerciseScreen.typeCur],
                        unit: self.exerciseField.Eunit[self.exerciseField.Esubject[self.exerciseScreen.subjectCur]][self.exerciseScreen.unitCur],
                        difficulty: self.exerciseField.Edifficulty[self.exerciseScreen.difficultyCur],
                        grade: self.exerciseField.Egrade[self.exerciseScreen.gradeCur]
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
            inputChangeSearchExercise: function inputChangeSearchExercise(e) {
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
            },
            inputChangeSearchStudent: function inputChangeSearchStudent(e) {
                var self = this;

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
        key: "getStudentData",
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
                        self.copyStudentList = JSON.parse(JSON.stringify(self.studentList)); //深拷贝

                        // 图标
                        for (var i = 0; i < self.studentList.length; i++) {
                            self.selectIconOfStudent[self.studentList[i].Sid] = self.nonselectIcon;
                        }
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: "getSortedStudentList",
        value: function getSortedStudentList(sortName, sortDir) {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_student_sorted_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
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
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            var self = this;

            self.methods.getExercise(self);
            self.methods.getExerciseField(self);

            self.getStudentData();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/create-todayexercise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS10b2RheWV4ZXJjaXNlLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsImFjdGl2ZVRhYiIsInRhYmJhciIsImV4ZXJjaXNlTGlzdCIsImNvcHlFeGVyY2lzZUxpc3QiLCJleGVyY2lzZUZpZWxkIiwiZXhlcmNpc2VTY3JlZW4iLCJzdWJqZWN0Q3VyIiwiZGlmZmljdWx0eUN1ciIsInR5cGVDdXIiLCJncmFkZUN1ciIsInVuaXRDdXIiLCJleGVyY2lzZUluZGV4IiwiZGlmZmljdWx0eUNvbG9yIiwiaW1hZ2VTY3JlZW4iLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1vZGFsTmFtZSIsInN0dWRlbnRMaXN0IiwiY29weVN0dWRlbnRMaXN0IiwiaW1nVXJsIiwibm9Vc2VySWNvbiIsInNlbGVjdEljb24iLCJub25zZWxlY3RJY29uIiwic2VsZWN0SWNvbk9mRXhlcmNpc2UiLCJzZWxlY3RJY29uT2ZTdHVkZW50IiwiaXNTZWxlY3RBbGwiLCJtZXRob2RzIiwidGFiU2VsZWN0SW5kZXgiLCJlIiwic2VsZiIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJ0YWJTZWxlY3QiLCJuYW1lIiwic2hvd01vZGFsIiwidGFyZ2V0IiwiaGlkZU1vZGFsIiwiZ2V0RXhlcmNpc2VTb3J0IiwiZGlhbG9nQ2xvc2UiLCJkaWFsb2dTaG93Iiwib25DbGlja0V4ZXJjaXNlIiwiaW5kZXgiLCJFaWQiLCJvbkNsaWNrU3R1ZGVudCIsIlNpZCIsIm9uQ2xpY2tSZXNldCIsIm9uQ2xpY2tTZWxlY3RBbGwiLCJpIiwibGVuZ3RoIiwib25DbGlja05vblNlbGVjdEFsbCIsIm9uQ2xpY2tTdWJtaXQiLCJ0b2RheSIsIkRhdGUiLCJjb25zb2xlIiwibG9nIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiRWlkcyIsIlNpZHMiLCJrZXkiLCJwdXNoIiwiTnVtYmVyIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwic3VjY2VzcyIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJyZXMiLCJnZXRFeGVyY2lzZSIsIkNvZGUiLCJEYXRhIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiJGFwcGx5IiwiZ2V0RXhlcmNpc2VGaWVsZCIsInN1YmplY3QiLCJFc3ViamVjdCIsInR5cGUiLCJFdHlwZSIsInVuaXQiLCJFdW5pdCIsImRpZmZpY3VsdHkiLCJFZGlmZmljdWx0eSIsImdyYWRlIiwiRWdyYWRlIiwiaW5wdXRDaGFuZ2VTZWFyY2hFeGVyY2lzZSIsIndvcmQiLCJkZXRhaWwiLCJ2YWx1ZSIsImlucHV0Q2hhbmdlU2VhcmNoU3R1ZGVudCIsInNvcnROYW1lIiwic29ydERpciIsImdldFN0dWRlbnREYXRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxNLEdBQVM7QUFDTCwrQkFBbUI7QUFDZixnQ0FBZ0Isc0NBREQ7QUFFZiw2QkFBYTtBQUZFO0FBRGQsUyxRQU9UQyxJLEdBQU87QUFDSEMsdUJBQVcsQ0FEUjtBQUVIQyxvQkFBUSxDQUFDLElBQUQsRUFBTSxJQUFOLENBRkw7QUFHSEMsMEJBQWEsRUFIVjtBQUlIQyw4QkFBa0IsRUFKZjtBQUtIQywyQkFBYyxFQUxYO0FBTUhDLDRCQUFnQjtBQUNaQyw0QkFBWSxDQURBO0FBRVpDLCtCQUFlLENBRkg7QUFHWkMseUJBQVEsQ0FISTtBQUlaQywwQkFBVSxDQUpFO0FBS1pDLHlCQUFTO0FBTEcsYUFOYjtBQWFIQywyQkFBYyxDQUFDLENBYlo7QUFjSEMsNkJBQWdCO0FBQ1osc0JBQUssTUFETztBQUVaLHNCQUFLLE9BRk87QUFHWixzQkFBSyxNQUhPO0FBSVosc0JBQUs7QUFKTyxhQWRiOztBQXFCSEMseUJBQVlDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMENBckIvQztBQXNCSEMs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Q0FEckM7QUFFTHVELHdCQUFPLEtBRkY7QUFHTEMsd0JBQVEzRCxlQUFLQyxTQUFMLENBQWUyRCxTQUFmLEVBSEg7QUFJTDNFLHNCQUFLO0FBQ0RvRyw4QkFBU0EsUUFEUjtBQUVEQyw2QkFBUUE7QUFGUCxpQkFKQTtBQVFML0IseUJBQVMsaUJBQVNNLEdBQVQsRUFBYztBQUNuQm5CLDRCQUFRQyxHQUFSLENBQVlrQixHQUFaO0FBQ0Esd0JBQUlBLElBQUk1RSxJQUFKLENBQVM4RSxJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25COUMsNkJBQUtaLFdBQUwsR0FBbUJ3RCxJQUFJNUUsSUFBSixDQUFTK0UsSUFBNUI7QUFDQS9DLDZCQUFLbUQsTUFBTDtBQUNIO0FBQ0o7QUFkSSxhQUFiO0FBZ0JIOzs7aUNBRU8sQ0FFUDs7O2lDQUVRO0FBQ0wsZ0JBQUluRCxPQUFPLElBQVg7O0FBRUFBLGlCQUFLSCxPQUFMLENBQWFnRCxXQUFiLENBQXlCN0MsSUFBekI7QUFDQUEsaUJBQUtILE9BQUwsQ0FBYXVELGdCQUFiLENBQThCcEQsSUFBOUI7O0FBRUFBLGlCQUFLc0UsY0FBTDtBQUVIOzs7O0VBcFZnQ3ZGLGVBQUt3RixJOztrQkFBbkJ6RyxLIiwiZmlsZSI6ImNyZWF0ZS10b2RheWV4ZXJjaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIFwidXNpbmdDb21wb25lbnRzXCI6IHtcclxuICAgICAgICAgICAgXCJtcC1zbGlkZXZpZXdcIjogXCJ3ZXVpLW1pbmlwcm9ncmFtL3NsaWRldmlldy9zbGlkZXZpZXdcIixcclxuICAgICAgICAgICAgXCJtcC1kaWFsb2dcIjogXCIvbWluaXByb2dyYW1fbnBtL3dldWktbWluaXByb2dyYW0vZGlhbG9nL2RpYWxvZ1wiLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGFjdGl2ZVRhYjogMCxcclxuICAgICAgICB0YWJiYXI6IFsn5Lmg6aKYJywn5a2m55SfJ10sXHJcbiAgICAgICAgZXhlcmNpc2VMaXN0OltdLFxyXG4gICAgICAgIGNvcHlFeGVyY2lzZUxpc3Q6IFtdLFxyXG4gICAgICAgIGV4ZXJjaXNlRmllbGQ6e30sXHJcbiAgICAgICAgZXhlcmNpc2VTY3JlZW46IHtcclxuICAgICAgICAgICAgc3ViamVjdEN1cjogMCxcclxuICAgICAgICAgICAgZGlmZmljdWx0eUN1cjogMCxcclxuICAgICAgICAgICAgdHlwZUN1cjowLFxyXG4gICAgICAgICAgICBncmFkZUN1cjogMCxcclxuICAgICAgICAgICAgdW5pdEN1cjogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4ZXJjaXNlSW5kZXg6LTEsXHJcbiAgICAgICAgZGlmZmljdWx0eUNvbG9yOntcclxuICAgICAgICAgICAgXCLnroDljZVcIjpcImN5YW5cIixcclxuICAgICAgICAgICAgXCLkuK3nrYlcIjpcIm9saXZlXCIsXHJcbiAgICAgICAgICAgIFwi5Zuw6Zq+XCI6XCJwaW5rXCIsXHJcbiAgICAgICAgICAgIFwi56ue6LWbXCI6XCJibGFja1wiLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGltYWdlU2NyZWVuOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL3NjcmVlbi5wbmcnLFxyXG4gICAgICAgIG1vZGFsTmFtZSA6IFwiXCIsXHJcbiAgICAgICAgc3R1ZGVudExpc3Q6W10sXHJcbiAgICAgICAgY29weVN0dWRlbnRMaXN0OiBbXSxcclxuICAgICAgICBpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICAgICAgbm9Vc2VySWNvbiA6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1ub25lX3VzZXJpbmZvLnBuZycsXHJcbiAgICAgICAgc2VsZWN0SWNvbjp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9zZWxlY3QucG5nJyxcclxuICAgICAgICBub25zZWxlY3RJY29uOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL25vbnNlbGVjdC5wbmcnLFxyXG4gICAgICAgIHNlbGVjdEljb25PZkV4ZXJjaXNlOiB7fSxcclxuICAgICAgICBzZWxlY3RJY29uT2ZTdHVkZW50OiB7fSxcclxuICAgICAgICBpc1NlbGVjdEFsbDogZmFsc2UsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0YWJTZWxlY3RJbmRleChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuYWN0aXZlVGFiID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgLy8gaWYoc2VsZi50YWJiYXJbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRdID09ICfkuaDpopgnKXtcclxuICAgICAgICAgICAgLy8gICAgIHNlbGYubWV0aG9kcy5nZXRFeGVyY2lzZVNvcnQoc2VsZilcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBzZWxmLmdldFN0dWRlbnREYXRhKClcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YWJTZWxlY3QoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5leGVyY2lzZVNjcmVlbltlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lK1wiQ3VyXCJdPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNob3dNb2RhbChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLm1vZGFsTmFtZT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGlkZU1vZGFsKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYubW9kYWxOYW1lPSBudWxsXHJcbiAgICAgICAgICAgIHNlbGYubWV0aG9kcy5nZXRFeGVyY2lzZVNvcnQoc2VsZilcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkaWFsb2dDbG9zZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZGlhbG9nU2hvdyA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0V4ZXJjaXNlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2Vbc2VsZi5leGVyY2lzZUxpc3RbaW5kZXhdLkVpZF0gPSBzZWxmLnNlbGVjdEljb25PZkV4ZXJjaXNlW3NlbGYuZXhlcmNpc2VMaXN0W2luZGV4XS5FaWRdID09IHNlbGYuc2VsZWN0SWNvbiA/IHNlbGYubm9uc2VsZWN0SWNvbiA6IHNlbGYuc2VsZWN0SWNvblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrU3R1ZGVudChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZlN0dWRlbnRbc2VsZi5zdHVkZW50TGlzdFtpbmRleF0uU2lkXSA9IHNlbGYuc2VsZWN0SWNvbk9mU3R1ZGVudFtzZWxmLnN0dWRlbnRMaXN0W2luZGV4XS5TaWRdID09IHNlbGYuc2VsZWN0SWNvbiA/IHNlbGYubm9uc2VsZWN0SWNvbiA6IHNlbGYuc2VsZWN0SWNvblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tSZXNldCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5leGVyY2lzZVNjcmVlbj17XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0Q3VyOiAwLFxyXG4gICAgICAgICAgICAgICAgZGlmZmljdWx0eUN1cjogMCxcclxuICAgICAgICAgICAgICAgIHR5cGVDdXI6MCxcclxuICAgICAgICAgICAgICAgIGdyYWRlQ3VyOiAwLFxyXG4gICAgICAgICAgICAgICAgdW5pdEN1cjogMCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tTZWxlY3RBbGwoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmKHNlbGYuYWN0aXZlVGFiID09IDApe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTxzZWxmLmV4ZXJjaXNlTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RJY29uT2ZFeGVyY2lzZVtzZWxmLmV4ZXJjaXNlTGlzdFtpXS5FaWRdID0gc2VsZi5zZWxlY3RJY29uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihzZWxmLmFjdGl2ZVRhYiA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGk8c2VsZi5zdHVkZW50TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RJY29uT2ZTdHVkZW50W3NlbGYuc3R1ZGVudExpc3RbaV0uU2lkXSA9IHNlbGYuc2VsZWN0SWNvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuaXNTZWxlY3RBbGwgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja05vblNlbGVjdEFsbCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYoc2VsZi5hY3RpdmVUYWIgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHNlbGYuZXhlcmNpc2VMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZkV4ZXJjaXNlW3NlbGYuZXhlcmNpc2VMaXN0W2ldLkVpZF0gPSBzZWxmLm5vbnNlbGVjdEljb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHNlbGYuYWN0aXZlVGFiID09IDEpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaTxzZWxmLnN0dWRlbnRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZlN0dWRlbnRbc2VsZi5zdHVkZW50TGlzdFtpXS5TaWRdID0gc2VsZi5ub25zZWxlY3RJY29uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5pc1NlbGVjdEFsbCA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja1N1Ym1pdCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RheS50b0xvY2FsZURhdGVTdHJpbmcoKSlcclxuICAgICAgICAgICAgbGV0IEVpZHMgPSBbXVxyXG4gICAgICAgICAgICBsZXQgU2lkcyA9IFtdXHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5zZWxlY3RJY29uT2ZFeGVyY2lzZVtrZXldID09IHNlbGYuc2VsZWN0SWNvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgRWlkcy5wdXNoKE51bWJlcihrZXkpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIHNlbGYuc2VsZWN0SWNvbk9mU3R1ZGVudCl7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLnNlbGVjdEljb25PZlN0dWRlbnRba2V5XSA9PSBzZWxmLnNlbGVjdEljb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIFNpZHMucHVzaChOdW1iZXIoa2V5KSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmKEVpZHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeS5oOmimCcsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIGlmKFNpZHMubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWtpueUnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvaW5zZXJ0X3RvZGF5X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIFNpZHM6IFNpZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgRWlkczogRWlkcyxcclxuICAgICAgICAgICAgICAgICAgICBEYXRlOnRvZGF5LnRvTG9jYWxlRGF0ZVN0cmluZygpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfluIPnva7kuaDpopjmiJDlip8nLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RXhlcmNpc2Uoc2VsZikge1xyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X2FsbF9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV4ZXJjaXNlTGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5RXhlcmNpc2VMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZWxmLmV4ZXJjaXNlTGlzdCkpIC8v5rex5ou36LSdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDpgInkuK3lm77moIdcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmV4ZXJjaXNlTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0SWNvbk9mRXhlcmNpc2Vbc2VsZi5leGVyY2lzZUxpc3RbaV0uRWlkXSA9IHNlbGYubm9uc2VsZWN0SWNvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RXhlcmNpc2VGaWVsZChzZWxmKSB7XHJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC91c2VyL2NvbW1vbi9nZXRfZXhlcmNpc2VfZmllbGQnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5leGVyY2lzZUZpZWxkID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEV4ZXJjaXNlU29ydChzZWxmKSB7XHJcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9leGVyY2lzZS9nZXRfc29ydGVkX2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0OnNlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLmV4ZXJjaXNlU2NyZWVuLnN1YmplY3RDdXJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6c2VsZi5leGVyY2lzZUZpZWxkLkV0eXBlW3NlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLmV4ZXJjaXNlU2NyZWVuLnN1YmplY3RDdXJdXVtzZWxmLmV4ZXJjaXNlU2NyZWVuLnR5cGVDdXJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuaXQ6c2VsZi5leGVyY2lzZUZpZWxkLkV1bml0W3NlbGYuZXhlcmNpc2VGaWVsZC5Fc3ViamVjdFtzZWxmLmV4ZXJjaXNlU2NyZWVuLnN1YmplY3RDdXJdXVtzZWxmLmV4ZXJjaXNlU2NyZWVuLnVuaXRDdXJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZpY3VsdHk6c2VsZi5leGVyY2lzZUZpZWxkLkVkaWZmaWN1bHR5W3NlbGYuZXhlcmNpc2VTY3JlZW4uZGlmZmljdWx0eUN1cl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGU6c2VsZi5leGVyY2lzZUZpZWxkLkVncmFkZVtzZWxmLmV4ZXJjaXNlU2NyZWVuLmdyYWRlQ3VyXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2VMaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0Q2hhbmdlU2VhcmNoRXhlcmNpc2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3VzZXIvY29tbW9uL3NlYXJjaF9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQ6ZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2VMaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dENoYW5nZVNlYXJjaFN0dWRlbnQoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3VzZXIvY29tbW9uL3NlYXJjaF9zdHVkZW50X2Zyb21fdGVhY2hlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQ6ZS5kZXRhaWwudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3R1ZGVudExpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R1ZGVudERhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvZ2V0X3N0dWRlbnRfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3R1ZGVudExpc3QgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29weVN0dWRlbnRMaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZWxmLnN0dWRlbnRMaXN0KSkgLy/mt7Hmi7fotJ1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWbvuagh1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHNlbGYuc3R1ZGVudExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdEljb25PZlN0dWRlbnRbc2VsZi5zdHVkZW50TGlzdFtpXS5TaWRdID0gc2VsZi5ub25zZWxlY3RJY29uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRTb3J0ZWRTdHVkZW50TGlzdChzb3J0TmFtZSxzb3J0RGlyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvZ2V0X3N0dWRlbnRfc29ydGVkX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnROYW1lOnNvcnROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnREaXI6c29ydERpclxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdHVkZW50TGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLm1ldGhvZHMuZ2V0RXhlcmNpc2Uoc2VsZilcclxuICAgICAgICBzZWxmLm1ldGhvZHMuZ2V0RXhlcmNpc2VGaWVsZChzZWxmKVxyXG5cclxuICAgICAgICBzZWxmLmdldFN0dWRlbnREYXRhKClcclxuICAgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4iXX0=