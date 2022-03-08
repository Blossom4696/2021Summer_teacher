'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _moment = require('./../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

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
            Sid: null,
            learnSituationList: {},
            learnSituationId: -1,
            isClickCreateLearnSituation: false,
            isClickEditLearnSituation: false,
            slideButtons: [{
                type: 'warn',
                text: '删除',
                extClass: 'DeleteButton'
            }],
            buttons: [{
                text: '取消'
            }, {
                text: '确定',
                extClass: 'DeleteButton'
            }],
            dialogShow: false,
            deleteIndex: -1,
            insertLearnSituationData: { 'daily': ['', '', ''], 'exam': ['', '', ''] },
            insertLSDate: { 'daily': '', 'exam': '' },
            copyLearnSituationList: [],
            tabCur: 0,
            tabList: [{ value: 'daily', name: '平时' }, { value: 'exam', name: '考试' }]
        }, _this.methods = {
            onClickCreateLearnSituation: function onClickCreateLearnSituation() {
                var self = this;
                self.isClickCreateLearnSituation = true;
            },
            onClickEditLearnSituation: function onClickEditLearnSituation() {
                var self = this;
                self.isClickEditLearnSituation = true;
            },
            inputChangeEditLearnSituation: function inputChangeEditLearnSituation(e) {
                var self = this;
                var index = Number(e.currentTarget.dataset.id);
                var name = e.currentTarget.dataset.name;
                self.copyLearnSituationList[self.tabList[self.tabCur].value][index][name] = e.detail.value.trim();
            },
            inputChangeCreateLearnSituation: function inputChangeCreateLearnSituation(e) {
                var self = this;
                var index = Number(e.currentTarget.dataset.index);
                self.insertLearnSituationData[self.tabList[self.tabCur].value][index] = e.detail.value.trim();
            },
            bindDateChange: function bindDateChange(e) {
                var self = this;
                console.log('picker发送选择改变，携带值为', e.detail.value);
                if (self.isClickCreateLearnSituation) {
                    self.insertLSDate[self.tabList[self.tabCur].value] = e.detail.value;
                } else if (self.isClickEditLearnSituation) {
                    var index = Number(e.currentTarget.dataset.id);
                    self.copyLearnSituationList[self.tabList[self.tabCur].value][index]['LSdate'] = e.detail.value;
                }
            },
            onClickCancel: function onClickCancel() {
                var self = this;
                self.isClickEditLearnSituation = false;
                self.isClickCreateLearnSituation = false;
                this.$apply();
            },
            onClickSubmit: function onClickSubmit() {
                var self = this;
                if (self.isClickCreateLearnSituation) {
                    self.createLearnSituation(self.insertLearnSituationData);
                    self.isClickCreateLearnSituation = false;
                }
                if (self.isClickEditLearnSituation) {
                    var _self = this;
                    _self.editLearnSituation();
                    _self.isClickEditLearnSituation = false;
                }
            },
            slideButtonTap: function slideButtonTap(e) {
                var self = this;
                self.deleteIndex = e.currentTarget.dataset.id;
                self.dialogShow = true;
            },
            tabSelectBar: function tabSelectBar(e) {
                var self = this;
                self.tabCur = e.currentTarget.dataset.id;
            },
            tapDeleteDialogButton: function tapDeleteDialogButton(e) {
                var self = this;
                self.dialogShow = false;
                if (e.detail.index == 1) {
                    self.deleteLearnSituation();
                    self.getLearnSituationData();
                }
            },
            dialogClose: function dialogClose(e) {
                var self = this;
                self.dialogShow = false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'createLearnSituation',
        value: function createLearnSituation(cname) {
            var self = this;

            var sendData = {};
            sendData['Sid'] = Number(self.Sid);
            if (self.tabCur == 0) {
                sendData['LSattendence'] = self.insertLearnSituationData['daily'][0];
                sendData['LSperform'] = self.insertLearnSituationData['daily'][1];
                sendData['LShomework'] = self.insertLearnSituationData['daily'][2];
                sendData['LSdate'] = new Date(self.insertLSDate['daily']);
            } else {
                sendData['LSexam'] = self.insertLearnSituationData['exam'][0];
                sendData['LSsubject'] = self.insertLearnSituationData['exam'][1];
                sendData['LSgrade'] = self.insertLearnSituationData['exam'][2];
                sendData['LSdate'] = new Date(self.insertLSDate['exam']);
            }
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/insert_learn_situation',
                method: 'POST',
                header: _wepy2.default.$instance.setHeader(),
                data: sendData,
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        console.log("Insert LearnSituation Success!");
                        self.getLearnSituationData();
                    } else if (res.data.Code == 2) {
                        _wepy2.default.showToast({
                            title: res.data.Msg, //提示的内容,
                            icon: 'error', //图标,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });
                    }
                }
            });
        }
    }, {
        key: 'editLearnSituation',
        value: function editLearnSituation() {
            var self = this;

            var sendData = [];
            if (self.tabCur == 0) {
                sendData = self.copyLearnSituationList['daily'];
            } else if (self.tabCur == 1) {
                sendData = self.copyLearnSituationList['exam'];
            }

            for (var i = 0; i < sendData.length; i++) {
                sendData[i].LSdate = new Date(sendData[i].LSdate);
            }

            console.log(sendData);
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/update_learn_situation',
                method: 'PUT',
                header: _wepy2.default.$instance.setHeader(),
                data: sendData,
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        console.log("Edit LearnSituation Success!");
                        self.getLearnSituationData();
                    }
                }
            });
        }
    }, {
        key: 'deleteLearnSituation',
        value: function deleteLearnSituation() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/delete_learn_situation/:id' + '?LSid=' + self.learnSituationList[self.tabList[self.tabCur].value][self.deleteIndex].LSid.toString(),
                method: 'DELETE',
                header: _wepy2.default.$instance.setHeader(),
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        console.log("Delete LearnSituation Success!");
                    }
                }
            });
        }
    }, {
        key: 'getLearnSituationData',
        value: function getLearnSituationData() {
            var self = this;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_learn_situation_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Sid: self.Sid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.learnSituationList = res.data.Data;

                        for (var i = 0; i < self.learnSituationList['daily'].length; i++) {
                            self.learnSituationList['daily'][i].LSdate = self.learnSituationList['daily'][i].LSdate.substring(0, 10);
                        }

                        for (var _i = 0; _i < self.learnSituationList['exam'].length; _i++) {
                            self.learnSituationList['exam'][_i].LSdate = self.learnSituationList['exam'][_i].LSdate.substring(0, 10);
                        }

                        self.copyLearnSituationList = JSON.parse(JSON.stringify(self.learnSituationList)); //深拷贝
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
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;

            self.getLearnSituationData();

            var date = new Date();
            self.insertLSDate['daily'] = (0, _moment2.default)().format('YYYY-MM-DD');
            self.insertLSDate['exam'] = (0, _moment2.default)().format('YYYY-MM-DD');
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/learnsituation'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlYXJuc2l0dWF0aW9uLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZGF0YSIsIlNpZCIsImxlYXJuU2l0dWF0aW9uTGlzdCIsImxlYXJuU2l0dWF0aW9uSWQiLCJpc0NsaWNrQ3JlYXRlTGVhcm5TaXR1YXRpb24iLCJpc0NsaWNrRWRpdExlYXJuU2l0dWF0aW9uIiwic2xpZGVCdXR0b25zIiwidHlwZSIsInRleHQiLCJleHRDbGFzcyIsImJ1dHRvbnMiLCJkaWFsb2dTaG93IiwiZGVsZXRlSW5kZXgiLCJpbnNlcnRMZWFyblNpdHVhdGlvbkRhdGEiLCJpbnNlcnRMU0RhdGUiLCJjb3B5TGVhcm5TaXR1YXRpb25MaXN0IiwidGFiQ3VyIiwidGFiTGlzdCIsInZhbHVlIiwibmFtZSIsIm1ldGhvZHMiLCJvbkNsaWNrQ3JlYXRlTGVhcm5TaXR1YXRpb24iLCJzZWxmIiwib25DbGlja0VkaXRMZWFyblNpdHVhdGlvbiIsImlucHV0Q2hhbmdlRWRpdExlYXJuU2l0dWF0aW9uIiwiZSIsImluZGV4IiwiTnVtYmVyIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsImRldGFpbCIsInRyaW0iLCJpbnB1dENoYW5nZUNyZWF0ZUxlYXJuU2l0dWF0aW9uIiwiYmluZERhdGVDaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwib25DbGlja0NhbmNlbCIsIiRhcHBseSIsIm9uQ2xpY2tTdWJtaXQiLCJjcmVhdGVMZWFyblNpdHVhdGlvbiIsImVkaXRMZWFyblNpdHVhdGlvbiIsInNsaWRlQnV0dG9uVGFwIiwidGFiU2VsZWN0QmFyIiwidGFwRGVsZXRlRGlhbG9nQnV0dG9uIiwiZGVsZXRlTGVhcm5TaXR1YXRpb24iLCJnZXRMZWFyblNpdHVhdGlvbkRhdGEiLCJkaWFsb2dDbG9zZSIsImNuYW1lIiwic2VuZERhdGEiLCJEYXRlIiwid2VweSIsInJlcXVlc3QiLCJ1cmwiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwic3VjY2VzcyIsInJlcyIsIkNvZGUiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIk1zZyIsImljb24iLCJtYXNrIiwiaSIsImxlbmd0aCIsIkxTZGF0ZSIsIkxTaWQiLCJ0b1N0cmluZyIsIkRhdGEiLCJzdWJzdHJpbmciLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJvcHRpb25zIiwic2lkIiwiZGF0ZSIsImZvcm1hdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDTCwrQkFBbUI7QUFDZixnQ0FBZ0Isc0NBREQ7QUFFZiw2QkFBYTtBQUZFO0FBRGQsUyxRQU9UQyxJLEdBQU87QUFDSEMsaUJBQUksSUFERDtBQUVIQyxnQ0FBbUIsRUFGaEI7QUFHSEMsOEJBQWtCLENBQUMsQ0FIaEI7QUFJSEMseUNBQTZCLEtBSjFCO0FBS0hDLHVDQUEyQixLQUx4QjtBQU1IQywwQkFBYyxDQUFDO0FBQ1BDLHNCQUFNLE1BREM7QUFFUEMsc0JBQU0sSUFGQztBQUdQQywwQkFBVTtBQUhILGFBQUQsQ0FOWDtBQVdIQyxxQkFBUyxDQUFDO0FBQ0ZGLHNCQUFNO0FBREosYUFBRCxFQUVIO0FBQ0VBLHNCQUFNLElBRFI7QUFFRUMsMEJBQVU7QUFGWixhQUZHLENBWE47QUFpQkhFLHdCQUFZLEtBakJUO0FBa0JIQyx5QkFBWSxDQUFDLENBbEJWO0FBbUJIQyxzQ0FBeUIsRUFBQyxTQUFRLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLENBQVQsRUFBb0IsUUFBTyxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxDQUEzQixFQW5CdEI7QUFvQkhDLDBCQUFhLEVBQUMsU0FBUSxFQUFULEVBQVksUUFBTyxFQUFuQixFQXBCVjtBQXFCSEMsb0NBQXVCLEVBckJwQjtBQXNCSEMsb0JBQVEsQ0F0Qkw7QUF1QkhDLHFCQUFTLENBQUMsRUFBQ0MsT0FBTSxPQUFQLEVBQWVDLE1BQUssSUFBcEIsRUFBRCxFQUEyQixFQUFDRCxPQUFNLE1BQVAsRUFBY0MsTUFBSyxJQUFuQixFQUEzQjtBQXZCTixTLFFBMEJQQyxPLEdBQVU7QUFDTkMsdUNBRE0seUNBQ3VCO0FBQ3pCLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUtsQiwyQkFBTCxHQUFtQyxJQUFuQztBQUNILGFBSks7QUFNTm1CLHFDQU5NLHVDQU1xQjtBQUN2QixvQkFBSUQsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLakIseUJBQUwsR0FBaUMsSUFBakM7QUFDSCxhQVRLO0FBV05tQix5Q0FYTSx5Q0FXd0JDLENBWHhCLEVBVzJCO0FBQzdCLG9CQUFJSCxPQUFPLElBQVg7QUFDQSxvQkFBSUksUUFBUUMsT0FBT0YsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQS9CLENBQVo7QUFDQSxvQkFBSVgsT0FBT00sRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JWLElBQW5DO0FBQ0FHLHFCQUFLUCxzQkFBTCxDQUE0Qk8sS0FBS0wsT0FBTCxDQUFhSyxLQUFLTixNQUFsQixFQUEwQkUsS0FBdEQsRUFBNkRRLEtBQTdELEVBQW9FUCxJQUFwRSxJQUE0RU0sRUFBRU0sTUFBRixDQUFTYixLQUFULENBQWVjLElBQWYsRUFBNUU7QUFDSCxhQWhCSztBQWtCTkMsMkNBbEJNLDJDQWtCMEJSLENBbEIxQixFQWtCNEI7QUFDOUIsb0JBQUlILE9BQU8sSUFBWDtBQUNBLG9CQUFJSSxRQUFRQyxPQUFPRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkgsS0FBL0IsQ0FBWjtBQUNBSixxQkFBS1Qsd0JBQUwsQ0FBOEJTLEtBQUtMLE9BQUwsQ0FBYUssS0FBS04sTUFBbEIsRUFBMEJFLEtBQXhELEVBQStEUSxLQUEvRCxJQUF3RUQsRUFBRU0sTUFBRixDQUFTYixLQUFULENBQWVjLElBQWYsRUFBeEU7QUFDSCxhQXRCSztBQXdCTkUsMEJBeEJNLDBCQXdCU1QsQ0F4QlQsRUF3Qlk7QUFDZCxvQkFBSUgsT0FBTyxJQUFYO0FBQ0FhLHdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNYLEVBQUVNLE1BQUYsQ0FBU2IsS0FBMUM7QUFDQSxvQkFBR0ksS0FBS2xCLDJCQUFSLEVBQW9DO0FBQ2hDa0IseUJBQUtSLFlBQUwsQ0FBa0JRLEtBQUtMLE9BQUwsQ0FBYUssS0FBS04sTUFBbEIsRUFBMEJFLEtBQTVDLElBQXFETyxFQUFFTSxNQUFGLENBQVNiLEtBQTlEO0FBQ0gsaUJBRkQsTUFFTSxJQUFHSSxLQUFLakIseUJBQVIsRUFBa0M7QUFDcEMsd0JBQUlxQixRQUFRQyxPQUFPRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsRUFBL0IsQ0FBWjtBQUNBUix5QkFBS1Asc0JBQUwsQ0FBNEJPLEtBQUtMLE9BQUwsQ0FBYUssS0FBS04sTUFBbEIsRUFBMEJFLEtBQXRELEVBQTZEUSxLQUE3RCxFQUFvRSxRQUFwRSxJQUFnRkQsRUFBRU0sTUFBRixDQUFTYixLQUF6RjtBQUNIO0FBRUosYUFsQ0s7QUFvQ05tQix5QkFwQ00sMkJBb0NTO0FBQ1gsb0JBQUlmLE9BQU8sSUFBWDtBQUNBQSxxQkFBS2pCLHlCQUFMLEdBQWlDLEtBQWpDO0FBQ0FpQixxQkFBS2xCLDJCQUFMLEdBQW1DLEtBQW5DO0FBQ0EscUJBQUtrQyxNQUFMO0FBQ0gsYUF6Q0s7QUEyQ05DLHlCQTNDTSwyQkEyQ1M7QUFDWCxvQkFBSWpCLE9BQU8sSUFBWDtBQUNBLG9CQUFHQSxLQUFLbEIsMkJBQVIsRUFBb0M7QUFDaENrQix5QkFBS2tCLG9CQUFMLENBQTBCbEIsS0FBS1Qsd0JBQS9CO0FBQ0FTLHlCQUFLbEIsMkJBQUwsR0FBbUMsS0FBbkM7QUFFSDtBQUNELG9CQUFHa0IsS0FBS2pCLHlCQUFSLEVBQWtDO0FBQzlCLHdCQUFJaUIsUUFBTyxJQUFYO0FBQ0FBLDBCQUFLbUIsa0JBQUw7QUFDQW5CLDBCQUFLakIseUJBQUwsR0FBaUMsS0FBakM7QUFFSDtBQUNKLGFBeERLO0FBMEROcUMsMEJBMURNLDBCQTBEU2pCLENBMURULEVBMERZO0FBQ2Qsb0JBQUlILE9BQU8sSUFBWDtBQUNBQSxxQkFBS1YsV0FBTCxHQUFtQmEsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEVBQTNDO0FBQ0FSLHFCQUFLWCxVQUFMLEdBQWtCLElBQWxCO0FBQ0gsYUE5REs7QUFnRU5nQyx3QkFoRU0sd0JBZ0VPbEIsQ0FoRVAsRUFnRVU7QUFDWixvQkFBSUgsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLTixNQUFMLEdBQWNTLEVBQUVHLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxFQUF0QztBQUNILGFBbkVLO0FBcUVOYyxpQ0FyRU0saUNBcUVnQm5CLENBckVoQixFQXFFbUI7QUFDckIsb0JBQUlILE9BQU8sSUFBWDtBQUNBQSxxQkFBS1gsVUFBTCxHQUFrQixLQUFsQjtBQUNBLG9CQUFJYyxFQUFFTSxNQUFGLENBQVNMLEtBQVQsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDckJKLHlCQUFLdUIsb0JBQUw7QUFDQXZCLHlCQUFLd0IscUJBQUw7QUFDSDtBQUNKLGFBNUVLO0FBOEVOQyx1QkE5RU0sdUJBOEVNdEIsQ0E5RU4sRUE4RVE7QUFDVixvQkFBSUgsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLWCxVQUFMLEdBQWtCLEtBQWxCO0FBQ0g7QUFqRkssUzs7Ozs7NkNBb0ZXcUMsSyxFQUFPO0FBQ3hCLGdCQUFJMUIsT0FBTyxJQUFYOztBQUVBLGdCQUFJMkIsV0FBVyxFQUFmO0FBQ0FBLHFCQUFTLEtBQVQsSUFBa0J0QixPQUFPTCxLQUFLckIsR0FBWixDQUFsQjtBQUNBLGdCQUFHcUIsS0FBS04sTUFBTCxJQUFhLENBQWhCLEVBQWtCO0FBQ2RpQyx5QkFBUyxjQUFULElBQTJCM0IsS0FBS1Qsd0JBQUwsQ0FBOEIsT0FBOUIsRUFBdUMsQ0FBdkMsQ0FBM0I7QUFDQW9DLHlCQUFTLFdBQVQsSUFBd0IzQixLQUFLVCx3QkFBTCxDQUE4QixPQUE5QixFQUF1QyxDQUF2QyxDQUF4QjtBQUNBb0MseUJBQVMsWUFBVCxJQUF5QjNCLEtBQUtULHdCQUFMLENBQThCLE9BQTlCLEVBQXVDLENBQXZDLENBQXpCO0FBQ0FvQyx5QkFBUyxRQUFULElBQXFCLElBQUlDLElBQUosQ0FBUzVCLEtBQUtSLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBVCxDQUFyQjtBQUNILGFBTEQsTUFLSztBQUNEbUMseUJBQVMsUUFBVCxJQUFxQjNCLEtBQUtULHdCQUFMLENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQXJCO0FBQ0FvQyx5QkFBUyxXQUFULElBQXdCM0IsS0FBS1Qsd0JBQUwsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBeEI7QUFDQW9DLHlCQUFTLFNBQVQsSUFBc0IzQixLQUFLVCx3QkFBTCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUF0QjtBQUNBb0MseUJBQVMsUUFBVCxJQUFxQixJQUFJQyxJQUFKLENBQVM1QixLQUFLUixZQUFMLENBQWtCLE1BQWxCLENBQVQsQ0FBckI7QUFDSDtBQUNEcUMsMkJBQUtDLE9BQUwsQ0FBYTtBQUNMQyxxQkFBSUYsZUFBS0csU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyxxQ0FEckM7QUFFTEMsd0JBQU8sTUFGRjtBQUdMQyx3QkFBUVAsZUFBS0csU0FBTCxDQUFlSyxTQUFmLEVBSEg7QUFJTDNELHNCQUFNaUQsUUFKRDtBQUtMVyx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CMUIsNEJBQVFDLEdBQVIsQ0FBWXlCLEdBQVo7QUFDQSx3QkFBSUEsSUFBSTdELElBQUosQ0FBUzhELElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkIzQixnQ0FBUUMsR0FBUixDQUFZLGdDQUFaO0FBQ0FkLDZCQUFLd0IscUJBQUw7QUFDSCxxQkFIRCxNQUdPLElBQUdlLElBQUk3RCxJQUFKLENBQVM4RCxJQUFULElBQWlCLENBQXBCLEVBQXNCO0FBQ3pCWCx1Q0FBS1ksU0FBTCxDQUFlO0FBQ1hDLG1DQUFPSCxJQUFJN0QsSUFBSixDQUFTaUUsR0FETCxFQUNVO0FBQ3JCQyxrQ0FBTSxPQUZLLEVBRUk7QUFDZkMsa0NBQU0sSUFISyxFQUdDO0FBQ1pQLHFDQUFTLHNCQUFPLENBQUU7QUFKUCx5QkFBZjtBQU9IO0FBQ0o7QUFuQkksYUFBYjtBQXFCSDs7OzZDQUVvQjtBQUNqQixnQkFBSXRDLE9BQU8sSUFBWDs7QUFFQSxnQkFBSTJCLFdBQVcsRUFBZjtBQUNBLGdCQUFHM0IsS0FBS04sTUFBTCxJQUFlLENBQWxCLEVBQW9CO0FBQ2hCaUMsMkJBQVczQixLQUFLUCxzQkFBTCxDQUE0QixPQUE1QixDQUFYO0FBQ0gsYUFGRCxNQUVNLElBQUdPLEtBQUtOLE1BQUwsSUFBZSxDQUFsQixFQUFvQjtBQUN0QmlDLDJCQUFXM0IsS0FBS1Asc0JBQUwsQ0FBNEIsTUFBNUIsQ0FBWDtBQUNIOztBQUVELGlCQUFJLElBQUlxRCxJQUFFLENBQVYsRUFBWUEsSUFBRW5CLFNBQVNvQixNQUF2QixFQUE4QkQsR0FBOUIsRUFBa0M7QUFDOUJuQix5QkFBU21CLENBQVQsRUFBWUUsTUFBWixHQUFxQixJQUFJcEIsSUFBSixDQUFTRCxTQUFTbUIsQ0FBVCxFQUFZRSxNQUFyQixDQUFyQjtBQUNIOztBQUVEbkMsb0JBQVFDLEdBQVIsQ0FBWWEsUUFBWjtBQUNBRSwyQkFBS0MsT0FBTCxDQUFhO0FBQ0xDLHFCQUFJRixlQUFLRyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLHFDQURyQztBQUVMQyx3QkFBTyxLQUZGO0FBR0xDLHdCQUFRUCxlQUFLRyxTQUFMLENBQWVLLFNBQWYsRUFISDtBQUlMM0Qsc0JBQU1pRCxRQUpEO0FBS0xXLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkIxQiw0QkFBUUMsR0FBUixDQUFZeUIsR0FBWjtBQUNBLHdCQUFJQSxJQUFJN0QsSUFBSixDQUFTOEQsSUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQjNCLGdDQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDQWQsNkJBQUt3QixxQkFBTDtBQUNIO0FBQ0o7QUFYSSxhQUFiO0FBYUg7OzsrQ0FFc0I7QUFDbkIsZ0JBQUl4QixPQUFPLElBQVg7O0FBRUE2QiwyQkFBS0MsT0FBTCxDQUFhO0FBQ0xDLHFCQUFJRixlQUFLRyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLHlDQUF0QyxHQUFrRixRQUFsRixHQUE2RmxDLEtBQUtwQixrQkFBTCxDQUF3Qm9CLEtBQUtMLE9BQUwsQ0FBYUssS0FBS04sTUFBbEIsRUFBMEJFLEtBQWxELEVBQXlESSxLQUFLVixXQUE5RCxFQUEyRTJELElBQTNFLENBQWdGQyxRQUFoRixFQUQ1RjtBQUVMZix3QkFBTyxRQUZGO0FBR0xDLHdCQUFRUCxlQUFLRyxTQUFMLENBQWVLLFNBQWYsRUFISDtBQUlMQyx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CMUIsNEJBQVFDLEdBQVIsQ0FBWXlCLEdBQVo7QUFDQSx3QkFBSUEsSUFBSTdELElBQUosQ0FBUzhELElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkIzQixnQ0FBUUMsR0FBUixDQUFZLGdDQUFaO0FBQ0g7QUFDSjtBQVRJLGFBQWI7QUFXSDs7O2dEQUV1QjtBQUNwQixnQkFBSWQsT0FBTyxJQUFYOztBQUVBNkIsMkJBQUtDLE9BQUwsQ0FBYTtBQUNMQyxxQkFBSUYsZUFBS0csU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyx1Q0FEckM7QUFFTEMsd0JBQU8sS0FGRjtBQUdMQyx3QkFBUVAsZUFBS0csU0FBTCxDQUFlSyxTQUFmLEVBSEg7QUFJTDNELHNCQUFLO0FBQ0RDLHlCQUFJcUIsS0FBS3JCO0FBRFIsaUJBSkE7QUFPTDJELHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkIxQiw0QkFBUUMsR0FBUixDQUFZeUIsR0FBWjtBQUNBLHdCQUFJQSxJQUFJN0QsSUFBSixDQUFTOEQsSUFBVCxJQUFpQixDQUFyQixFQUF1QjtBQUNuQnhDLDZCQUFLcEIsa0JBQUwsR0FBMEIyRCxJQUFJN0QsSUFBSixDQUFTeUUsSUFBbkM7O0FBRUEsNkJBQUksSUFBSUwsSUFBSSxDQUFaLEVBQWVBLElBQUk5QyxLQUFLcEIsa0JBQUwsQ0FBd0IsT0FBeEIsRUFBaUNtRSxNQUFwRCxFQUE0REQsR0FBNUQsRUFBZ0U7QUFDNUQ5QyxpQ0FBS3BCLGtCQUFMLENBQXdCLE9BQXhCLEVBQWlDa0UsQ0FBakMsRUFBb0NFLE1BQXBDLEdBQTZDaEQsS0FBS3BCLGtCQUFMLENBQXdCLE9BQXhCLEVBQWlDa0UsQ0FBakMsRUFBb0NFLE1BQXBDLENBQTJDSSxTQUEzQyxDQUFxRCxDQUFyRCxFQUF3RCxFQUF4RCxDQUE3QztBQUNIOztBQUVELDZCQUFJLElBQUlOLEtBQUksQ0FBWixFQUFlQSxLQUFJOUMsS0FBS3BCLGtCQUFMLENBQXdCLE1BQXhCLEVBQWdDbUUsTUFBbkQsRUFBMkRELElBQTNELEVBQStEO0FBQzNEOUMsaUNBQUtwQixrQkFBTCxDQUF3QixNQUF4QixFQUFnQ2tFLEVBQWhDLEVBQW1DRSxNQUFuQyxHQUE0Q2hELEtBQUtwQixrQkFBTCxDQUF3QixNQUF4QixFQUFnQ2tFLEVBQWhDLEVBQW1DRSxNQUFuQyxDQUEwQ0ksU0FBMUMsQ0FBb0QsQ0FBcEQsRUFBdUQsRUFBdkQsQ0FBNUM7QUFDSDs7QUFFRHBELDZCQUFLUCxzQkFBTCxHQUE4QjRELEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsU0FBTCxDQUFldkQsS0FBS3BCLGtCQUFwQixDQUFYLENBQTlCLENBWG1CLENBVytEO0FBQ2xGb0IsNkJBQUtnQixNQUFMO0FBQ0g7QUFDSjtBQXZCSSxhQUFiO0FBeUJIOzs7K0JBRU13QyxPLEVBQVM7QUFDWixnQkFBSXhELE9BQU8sSUFBWDs7QUFFQUEsaUJBQUtyQixHQUFMLEdBQVc2RSxRQUFRQyxHQUFuQjtBQUNIOzs7aUNBRVE7QUFDTCxnQkFBSXpELE9BQU8sSUFBWDs7QUFFQUEsaUJBQUt3QixxQkFBTDs7QUFFQSxnQkFBSWtDLE9BQU8sSUFBSTlCLElBQUosRUFBWDtBQUNBNUIsaUJBQUtSLFlBQUwsQ0FBa0IsT0FBbEIsSUFBOEIsd0JBQVNtRSxNQUFULENBQWdCLFlBQWhCLENBQTlCO0FBQ0EzRCxpQkFBS1IsWUFBTCxDQUFrQixNQUFsQixJQUE2Qix3QkFBU21FLE1BQVQsQ0FBZ0IsWUFBaEIsQ0FBN0I7QUFDSDs7OztFQXZQOEI5QixlQUFLK0IsSTs7a0JBQW5CcEYsSyIsImZpbGUiOiJsZWFybnNpdHVhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7IFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBcInVzaW5nQ29tcG9uZW50c1wiOiB7XHJcbiAgICAgICAgICAgIFwibXAtc2xpZGV2aWV3XCI6IFwid2V1aS1taW5pcHJvZ3JhbS9zbGlkZXZpZXcvc2xpZGV2aWV3XCIsXHJcbiAgICAgICAgICAgIFwibXAtZGlhbG9nXCI6IFwiL21pbmlwcm9ncmFtX25wbS93ZXVpLW1pbmlwcm9ncmFtL2RpYWxvZy9kaWFsb2dcIixcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBTaWQ6bnVsbCxcclxuICAgICAgICBsZWFyblNpdHVhdGlvbkxpc3Q6e30sXHJcbiAgICAgICAgbGVhcm5TaXR1YXRpb25JZDogLTEsXHJcbiAgICAgICAgaXNDbGlja0NyZWF0ZUxlYXJuU2l0dWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBpc0NsaWNrRWRpdExlYXJuU2l0dWF0aW9uOiBmYWxzZSxcclxuICAgICAgICBzbGlkZUJ1dHRvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Yig6ZmkJyxcclxuICAgICAgICAgICAgICAgIGV4dENsYXNzOiAnRGVsZXRlQnV0dG9uJyxcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgYnV0dG9uczogW3tcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgZXh0Q2xhc3M6ICdEZWxldGVCdXR0b24nLFxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICBkaWFsb2dTaG93OiBmYWxzZSxcclxuICAgICAgICBkZWxldGVJbmRleDotMSxcclxuICAgICAgICBpbnNlcnRMZWFyblNpdHVhdGlvbkRhdGE6eydkYWlseSc6WycnLCcnLCcnXSwnZXhhbSc6WycnLCcnLCcnXX0sXHJcbiAgICAgICAgaW5zZXJ0TFNEYXRlOnsnZGFpbHknOicnLCdleGFtJzonJ30sXHJcbiAgICAgICAgY29weUxlYXJuU2l0dWF0aW9uTGlzdDpbXSxcclxuICAgICAgICB0YWJDdXI6IDAsXHJcbiAgICAgICAgdGFiTGlzdDogW3t2YWx1ZTonZGFpbHknLG5hbWU6J+W5s+aXtid9LHt2YWx1ZTonZXhhbScsbmFtZTon6ICD6K+VJ31dLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIG9uQ2xpY2tDcmVhdGVMZWFyblNpdHVhdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrQ3JlYXRlTGVhcm5TaXR1YXRpb24gPSB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja0VkaXRMZWFyblNpdHVhdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5pc0NsaWNrRWRpdExlYXJuU2l0dWF0aW9uID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlucHV0Q2hhbmdlRWRpdExlYXJuU2l0dWF0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IE51bWJlcihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICAgIHNlbGYuY29weUxlYXJuU2l0dWF0aW9uTGlzdFtzZWxmLnRhYkxpc3Rbc2VsZi50YWJDdXJdLnZhbHVlXVtpbmRleF1bbmFtZV0gPSBlLmRldGFpbC52YWx1ZS50cmltKClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbnB1dENoYW5nZUNyZWF0ZUxlYXJuU2l0dWF0aW9uKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gTnVtYmVyKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4KVxyXG4gICAgICAgICAgICBzZWxmLmluc2VydExlYXJuU2l0dWF0aW9uRGF0YVtzZWxmLnRhYkxpc3Rbc2VsZi50YWJDdXJdLnZhbHVlXVtpbmRleF0gPSBlLmRldGFpbC52YWx1ZS50cmltKClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaXNDbGlja0NyZWF0ZUxlYXJuU2l0dWF0aW9uKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuaW5zZXJ0TFNEYXRlW3NlbGYudGFiTGlzdFtzZWxmLnRhYkN1cl0udmFsdWVdID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfWVsc2UgaWYoc2VsZi5pc0NsaWNrRWRpdExlYXJuU2l0dWF0aW9uKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE51bWJlcihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZClcclxuICAgICAgICAgICAgICAgIHNlbGYuY29weUxlYXJuU2l0dWF0aW9uTGlzdFtzZWxmLnRhYkxpc3Rbc2VsZi50YWJDdXJdLnZhbHVlXVtpbmRleF1bJ0xTZGF0ZSddID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrQ2FuY2VsKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tFZGl0TGVhcm5TaXR1YXRpb24gPSBmYWxzZVxyXG4gICAgICAgICAgICBzZWxmLmlzQ2xpY2tDcmVhdGVMZWFyblNpdHVhdGlvbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja1N1Ym1pdCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYoc2VsZi5pc0NsaWNrQ3JlYXRlTGVhcm5TaXR1YXRpb24pe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVMZWFyblNpdHVhdGlvbihzZWxmLmluc2VydExlYXJuU2l0dWF0aW9uRGF0YSlcclxuICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0NyZWF0ZUxlYXJuU2l0dWF0aW9uID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHNlbGYuaXNDbGlja0VkaXRMZWFyblNpdHVhdGlvbil7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgICAgIHNlbGYuZWRpdExlYXJuU2l0dWF0aW9uKClcclxuICAgICAgICAgICAgICAgIHNlbGYuaXNDbGlja0VkaXRMZWFyblNpdHVhdGlvbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNsaWRlQnV0dG9uVGFwKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZGVsZXRlSW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdGFiU2VsZWN0QmFyKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYudGFiQ3VyID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0YXBEZWxldGVEaWFsb2dCdXR0b24oZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5kaWFsb2dTaG93ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlTGVhcm5TaXR1YXRpb24oKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRMZWFyblNpdHVhdGlvbkRhdGEoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGlhbG9nQ2xvc2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRpYWxvZ1Nob3cgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTGVhcm5TaXR1YXRpb24oY25hbWUpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgbGV0IHNlbmREYXRhID0ge31cclxuICAgICAgICBzZW5kRGF0YVsnU2lkJ10gPSBOdW1iZXIoc2VsZi5TaWQpXHJcbiAgICAgICAgaWYoc2VsZi50YWJDdXI9PTApe1xyXG4gICAgICAgICAgICBzZW5kRGF0YVsnTFNhdHRlbmRlbmNlJ10gPSBzZWxmLmluc2VydExlYXJuU2l0dWF0aW9uRGF0YVsnZGFpbHknXVswXVxyXG4gICAgICAgICAgICBzZW5kRGF0YVsnTFNwZXJmb3JtJ10gPSBzZWxmLmluc2VydExlYXJuU2l0dWF0aW9uRGF0YVsnZGFpbHknXVsxXVxyXG4gICAgICAgICAgICBzZW5kRGF0YVsnTFNob21ld29yayddID0gc2VsZi5pbnNlcnRMZWFyblNpdHVhdGlvbkRhdGFbJ2RhaWx5J11bMl1cclxuICAgICAgICAgICAgc2VuZERhdGFbJ0xTZGF0ZSddID0gbmV3IERhdGUoc2VsZi5pbnNlcnRMU0RhdGVbJ2RhaWx5J10pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNlbmREYXRhWydMU2V4YW0nXSA9IHNlbGYuaW5zZXJ0TGVhcm5TaXR1YXRpb25EYXRhWydleGFtJ11bMF1cclxuICAgICAgICAgICAgc2VuZERhdGFbJ0xTc3ViamVjdCddID0gc2VsZi5pbnNlcnRMZWFyblNpdHVhdGlvbkRhdGFbJ2V4YW0nXVsxXVxyXG4gICAgICAgICAgICBzZW5kRGF0YVsnTFNncmFkZSddID0gc2VsZi5pbnNlcnRMZWFyblNpdHVhdGlvbkRhdGFbJ2V4YW0nXVsyXVxyXG4gICAgICAgICAgICBzZW5kRGF0YVsnTFNkYXRlJ10gPSBuZXcgRGF0ZShzZWxmLmluc2VydExTRGF0ZVsnZXhhbSddKVxyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvdGVhY2hlci9pbnNlcnRfbGVhcm5fc2l0dWF0aW9uJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogc2VuZERhdGEsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5zZXJ0IExlYXJuU2l0dWF0aW9uIFN1Y2Nlc3MhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0TGVhcm5TaXR1YXRpb25EYXRhKClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzLmRhdGEuQ29kZSA9PSAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLk1zZywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRMZWFyblNpdHVhdGlvbigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VuZERhdGEgPSBbXVxyXG4gICAgICAgIGlmKHNlbGYudGFiQ3VyID09IDApe1xyXG4gICAgICAgICAgICBzZW5kRGF0YSA9IHNlbGYuY29weUxlYXJuU2l0dWF0aW9uTGlzdFsnZGFpbHknXVxyXG4gICAgICAgIH1lbHNlIGlmKHNlbGYudGFiQ3VyID09IDEpe1xyXG4gICAgICAgICAgICBzZW5kRGF0YSA9IHNlbGYuY29weUxlYXJuU2l0dWF0aW9uTGlzdFsnZXhhbSddXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2VuZERhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIHNlbmREYXRhW2ldLkxTZGF0ZSA9IG5ldyBEYXRlKHNlbmREYXRhW2ldLkxTZGF0ZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbmREYXRhKVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90ZWFjaGVyL3VwZGF0ZV9sZWFybl9zaXR1YXRpb24nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQVVQnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbmREYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVkaXQgTGVhcm5TaXR1YXRpb24gU3VjY2VzcyFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRMZWFyblNpdHVhdGlvbkRhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVMZWFyblNpdHVhdGlvbigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvZGVsZXRlX2xlYXJuX3NpdHVhdGlvbi86aWQnICsgJz9MU2lkPScgKyBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdFtzZWxmLnRhYkxpc3Rbc2VsZi50YWJDdXJdLnZhbHVlXVtzZWxmLmRlbGV0ZUluZGV4XS5MU2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZSBMZWFyblNpdHVhdGlvbiBTdWNjZXNzIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRMZWFyblNpdHVhdGlvbkRhdGEoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgXHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvZ2V0X2xlYXJuX3NpdHVhdGlvbl9saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBTaWQ6c2VsZi5TaWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdFsnZGFpbHknXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdFsnZGFpbHknXVtpXS5MU2RhdGUgPSBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdFsnZGFpbHknXVtpXS5MU2RhdGUuc3Vic3RyaW5nKDAsIDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZi5sZWFyblNpdHVhdGlvbkxpc3RbJ2V4YW0nXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdFsnZXhhbSddW2ldLkxTZGF0ZSA9IHNlbGYubGVhcm5TaXR1YXRpb25MaXN0WydleGFtJ11baV0uTFNkYXRlLnN1YnN0cmluZygwLCAxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb3B5TGVhcm5TaXR1YXRpb25MaXN0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZWxmLmxlYXJuU2l0dWF0aW9uTGlzdCkpIC8v5rex5ou36LSdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgc2VsZi5TaWQgPSBvcHRpb25zLnNpZFxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBcclxuICAgICAgICBzZWxmLmdldExlYXJuU2l0dWF0aW9uRGF0YSgpXHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxyXG4gICAgICAgIHNlbGYuaW5zZXJ0TFNEYXRlWydkYWlseSddID0gIG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpXHJcbiAgICAgICAgc2VsZi5pbnNlcnRMU0RhdGVbJ2V4YW0nXSA9ICBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==