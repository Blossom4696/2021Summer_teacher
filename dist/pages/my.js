'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
            Tid: null,
            teacher: {},
            imgList: [],
            isClickEdit: false,
            imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            copyTeacher: {},
            copyImgList: []
        }, _this.methods = {
            onClickEditPassword: function onClickEditPassword() {
                var self = this;
                _wepy2.default.navigateTo({ url: 'edit-password' + '?tid=' + self.Tid });
            },
            onClickExitLogin: function onClickExitLogin() {
                var self = this;
                wx.showModal({
                    title: '退出登录',
                    content: '确定要退出登录吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            // 清除session缓存
                            _wepy2.default.removeStorageSync("sessionToken");
                            _wepy2.default.removeStorageSync("sessionDate");
                            _wepy2.default.removeStorageSync("sessionUserInfo");
                            console.log("remove session!");
                            _wepy2.default.$instance.onLaunch();
                            self.onShow();
                            self.$apply();
                        }
                    }
                });
            },
            onClickEditTeacher: function onClickEditTeacher() {
                var self = this;
                self.isClickEdit = self.isClickEdit ? false : true;
            },
            ChooseImage: function ChooseImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'],
                    success: function success(res) {
                        self.imgList = res.tempFilePaths;
                        self.$apply();
                    }
                });
            },
            ViewImage: function ViewImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.previewImage({
                    urls: self.imgList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelImg: function DelImg(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.showModal({
                    title: '删除题目图片',
                    content: '确定要删除这张图片吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function success(res) {
                        if (res.confirm) {
                            self.imgList.splice(e.currentTarget.dataset.index, 1);
                            self.$apply();
                        }
                    }
                });
            },
            formSubmit: function formSubmit(e) {
                var self = this;

                var successUp = 0; //成功
                var failUp = 0; //失败
                var count = 0; //第几张
                var length = self.imgList.length; //总数

                var sendFormData = e.detail.value; // form 表单数据
                sendFormData['Tid'] = Number(self.Tid);

                if (self.imgList.length == 0) {
                    sendFormData['Ticon'] = "";
                } else if (self.imgList[0].indexOf(self.imgUrl) != -1) {
                    sendFormData['Ticon'] = self.imgList[0].replace(self.imgUrl, "");
                } else {
                    var lastindex = self.imgList[0].lastIndexOf("/");
                    sendFormData['Ticon'] = "user_avatar/" + self.imgList[0].substring(lastindex + 1, self.imgList[0].length);
                }

                console.log(sendFormData);
                _wepy2.default.request({
                    url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/update_teacher',
                    method: 'POST',
                    data: sendFormData,
                    header: _wepy2.default.$instance.setHeader(),
                    success: function success(res) {
                        console.log(res);
                        if (res.data.Code == 1) {
                            wx.showToast({
                                title: '修改成功', //提示的内容,
                                icon: 'success', //图标,
                                mask: true, //显示透明蒙层，防止触摸穿透,
                                success: function success(res) {}
                            });

                            //添加头像
                            if (length > 0 && self.imgList[0].indexOf(self.imgUrl) == -1) {
                                self.recursionImgUpload(self, self.imgList, successUp, failUp, count, length);
                            } else {
                                self.getTeacherData();
                            }

                            self.isClickEdit = false;

                            self.$apply();
                        }
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Teacher, [{
        key: 'recursionImgUpload',


        // 递归方式上传多张图片
        value: function recursionImgUpload(self, imgPaths, successUp, failUp, count, length) {
            var _wepy$uploadFile;

            _wepy2.default.uploadFile((_wepy$uploadFile = {
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/file/upload_file', //开发者服务器 url
                header: _wepy2.default.$instance.setHeader(),
                filePath: imgPaths[count], //要上传文件资源的路径
                name: 'uploadFile', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                formData: {
                    dirName: "images/user_avatar"
                }
            }, _defineProperty(_wepy$uploadFile, 'header', {
                'content-type': 'multipart/form-data'
            }), _defineProperty(_wepy$uploadFile, 'success', function success(e) {
                if (e.data.Code == 1) {
                    console.log("上传成功第" + count + "张");
                }
                successUp++; //成功+1
            }), _defineProperty(_wepy$uploadFile, 'fail', function fail(e) {
                failUp++; //失败+1
            }), _defineProperty(_wepy$uploadFile, 'complete', function complete(e) {

                count++;
                if (count == length) {
                    console.log("上传成功");
                    self.getTeacherData();
                } else {
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);
                }
            }), _wepy$uploadFile));
        }
    }, {
        key: 'getTeacherData',
        value: function getTeacherData() {
            var self = this;
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_teacher',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Tid: self.Tid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.teacher = res.data.Data;
                        self.copyTeacher = JSON.parse(JSON.stringify(self.teacher)); //深拷贝

                        self.imgList = [];
                        self.imgList.push(self.imgUrl + res.data.Data.Ticon);
                        self.copyImgList = JSON.parse(JSON.stringify(self.imgList)); //深拷贝
                        self.$apply();
                    }
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {}
    }, {
        key: 'onShow',
        value: function onShow() {
            var self = this;
            console.log(_wepy2.default.$instance.globalData);
            if (_wepy2.default.$instance.globalData.userInfo != null) {
                self.Tid = _wepy2.default.$instance.globalData.userInfo.Tid;
            } else {
                self.Tid = null;
                self.teacher = {};
                self.copyTeacher = {};
                self.copyImgList = [];
            }

            self.getTeacherData();
        }
    }]);

    return Teacher;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Teacher , 'pages/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIlRlYWNoZXIiLCJkYXRhIiwiVGlkIiwidGVhY2hlciIsImltZ0xpc3QiLCJpc0NsaWNrRWRpdCIsImltZ1VybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwiY29weVRlYWNoZXIiLCJjb3B5SW1nTGlzdCIsIm1ldGhvZHMiLCJvbkNsaWNrRWRpdFBhc3N3b3JkIiwic2VsZiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvbkNsaWNrRXhpdExvZ2luIiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiY29uc29sZSIsImxvZyIsIm9uTGF1bmNoIiwib25TaG93IiwiJGFwcGx5Iiwib25DbGlja0VkaXRUZWFjaGVyIiwiQ2hvb3NlSW1hZ2UiLCJlIiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJWaWV3SW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiY3VycmVudCIsIkRlbEltZyIsInNwbGljZSIsImluZGV4IiwiZm9ybVN1Ym1pdCIsInN1Y2Nlc3NVcCIsImZhaWxVcCIsImxlbmd0aCIsInNlbmRGb3JtRGF0YSIsImRldGFpbCIsInZhbHVlIiwiTnVtYmVyIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJsYXN0aW5kZXgiLCJsYXN0SW5kZXhPZiIsInN1YnN0cmluZyIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJDb2RlIiwic2hvd1RvYXN0IiwiaWNvbiIsIm1hc2siLCJyZWN1cnNpb25JbWdVcGxvYWQiLCJnZXRUZWFjaGVyRGF0YSIsImltZ1BhdGhzIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwiZGlyTmFtZSIsIkRhdGEiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJwdXNoIiwiVGljb24iLCJ1c2VySW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxJLEdBQUs7QUFDREMsaUJBQUssSUFESjtBQUVEQyxxQkFBUyxFQUZSO0FBR0RDLHFCQUFTLEVBSFI7QUFJREMseUJBQWEsS0FKWjtBQUtEQyxvQkFBT0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQywyQkFMNUM7QUFNREMseUJBQWEsRUFOWjtBQU9EQyx5QkFBYTtBQVBaLFMsUUFVTEMsTyxHQUFTO0FBQ0xDLCtCQURLLGlDQUNnQjtBQUNqQixvQkFBSUMsT0FBTyxJQUFYO0FBQ0FSLCtCQUFLUyxVQUFMLENBQWdCLEVBQUVDLEtBQUssa0JBQWtCLE9BQWxCLEdBQTRCRixLQUFLYixHQUF4QyxFQUFoQjtBQUNILGFBSkk7QUFNTGdCLDRCQU5LLDhCQU1hO0FBQ2Qsb0JBQUlILE9BQU8sSUFBWDtBQUNBSSxtQkFBR0MsU0FBSCxDQUFhO0FBQ1RDLDJCQUFPLE1BREU7QUFFVEMsNkJBQVMsV0FGQTtBQUdUQyxnQ0FBWSxJQUhIO0FBSVRDLGlDQUFhLElBSko7QUFLVEMsNkJBQVMsc0JBQU87QUFDM0IsNEJBQUlDLElBQUlDLE9BQVIsRUFBaUI7QUFDRTtBQUNBcEIsMkNBQUtxQixpQkFBTCxDQUF1QixjQUF2QjtBQUNBckIsMkNBQUtxQixpQkFBTCxDQUF1QixhQUF2QjtBQUNBckIsMkNBQUtxQixpQkFBTCxDQUF1QixpQkFBdkI7QUFDQUMsb0NBQVFDLEdBQVIsQ0FBWSxpQkFBWjtBQUNBdkIsMkNBQUtDLFNBQUwsQ0FBZXVCLFFBQWY7QUFDQWhCLGlDQUFLaUIsTUFBTDtBQUNBakIsaUNBQUtrQixNQUFMO0FBQ0g7QUFDaEI7QUFoQm9CLGlCQUFiO0FBa0JILGFBMUJJO0FB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O0FBQ0RhLHFCQUFLYixHQUFMLEdBQVcsSUFBWDtBQUNBYSxxQkFBS1osT0FBTCxHQUFlLEVBQWY7QUFDQVkscUJBQUtKLFdBQUwsR0FBbUIsRUFBbkI7QUFDQUkscUJBQUtILFdBQUwsR0FBbUIsRUFBbkI7QUFDSDs7QUFFREcsaUJBQUsyRCxjQUFMO0FBQ0g7Ozs7RUE5TmdDbkUsZUFBS2lGLEk7O2tCQUFyQnhGLE8iLCJmaWxlIjoibXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlciBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIFRpZDogbnVsbCxcclxuICAgICAgICB0ZWFjaGVyOiB7fSxcclxuICAgICAgICBpbWdMaXN0OiBbXSxcclxuICAgICAgICBpc0NsaWNrRWRpdDogZmFsc2UsXHJcbiAgICAgICAgaW1nVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgICAgIGNvcHlUZWFjaGVyOiB7fSxcclxuICAgICAgICBjb3B5SW1nTGlzdDogW10sXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz0ge1xyXG4gICAgICAgIG9uQ2xpY2tFZGl0UGFzc3dvcmQoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogJ2VkaXQtcGFzc3dvcmQnICsgJz90aWQ9JyArIHNlbGYuVGlkIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tFeGl0TG9naW4oKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+mAgOWHuueZu+W9lScsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB6YCA5Ye655m75b2V5ZCX77yfJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuXHRcdFx0XHRcdGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmuIXpmaRzZXNzaW9u57yT5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uVG9rZW5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYyhcInNlc3Npb25EYXRlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkucmVtb3ZlU3RvcmFnZVN5bmMoXCJzZXNzaW9uVXNlckluZm9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZW1vdmUgc2Vzc2lvbiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS4kaW5zdGFuY2Uub25MYXVuY2goKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uU2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tFZGl0VGVhY2hlcigpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuaXNDbGlja0VkaXQgPSBzZWxmLmlzQ2xpY2tFZGl0P2ZhbHNlOnRydWVcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgQ2hvb3NlSW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLCAvL+m7mOiupDlcclxuICAgICAgICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy/lj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0PSByZXMudGVtcEZpbGVQYXRoc1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWdMaXN0LFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIERlbEltZyhlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk6aKY55uu5Zu+54mHJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHliKDpmaTov5nlvKDlm77niYflkJfvvJ8nLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3Quc3BsaWNlKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmb3JtU3VibWl0KGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc1VwID0gMDsgLy/miJDlip9cclxuICAgICAgICAgICAgbGV0IGZhaWxVcCA9IDA7IC8v5aSx6LSlXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7IC8v56ys5Yeg5bygXHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBzZWxmLmltZ0xpc3QubGVuZ3RoOyAvL+aAu+aVsFxyXG5cclxuICAgICAgICAgICAgbGV0IHNlbmRGb3JtRGF0YSA9IGUuZGV0YWlsLnZhbHVlIC8vIGZvcm0g6KGo5Y2V5pWw5o2uXHJcbiAgICAgICAgICAgIHNlbmRGb3JtRGF0YVsnVGlkJ10gPSBOdW1iZXIoc2VsZi5UaWQpXHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gXCJcIlxyXG4gICAgICAgICAgICB9ZWxzZSBpZihzZWxmLmltZ0xpc3RbMF0uaW5kZXhPZihzZWxmLmltZ1VybCkgIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gc2VsZi5pbWdMaXN0WzBdLnJlcGxhY2Uoc2VsZi5pbWdVcmwsXCJcIilcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdGluZGV4ID0gc2VsZi5pbWdMaXN0WzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhWydUaWNvbiddID0gXCJ1c2VyX2F2YXRhci9cIiArIHNlbGYuaW1nTGlzdFswXS5zdWJzdHJpbmcobGFzdGluZGV4ICsgMSwgc2VsZi5pbWdMaXN0WzBdLmxlbmd0aClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbmRGb3JtRGF0YSlcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvdXBkYXRlX3RlYWNoZXInLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mt7vliqDlpLTlg49cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGVuZ3RoPjAgJiYgc2VsZi5pbWdMaXN0WzBdLmluZGV4T2Yoc2VsZi5pbWdVcmwpID09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsc2VsZi5pbWdMaXN0LCBzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdldFRlYWNoZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pc0NsaWNrRWRpdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOmAkuW9kuaWueW8j+S4iuS8oOWkmuW8oOWbvueJh1xyXG4gICAgcmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKXtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogaW1nUGF0aHNbY291bnRdLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJpbWFnZXMvdXNlcl9hdmF0YXJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEuQ29kZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip/nrKxcIiArIGNvdW50ICsgXCLlvKBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NVcCsrOy8v5oiQ5YqfKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChlKXtcclxuICAgICAgICAgICAgICAgIGZhaWxVcCsrOy8v5aSx6LSlKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA9PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0VGVhY2hlckRhdGEoKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocyxzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFRlYWNoZXJEYXRhKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RlYWNoZXIvZ2V0X3RlYWNoZXInLFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgVGlkOnNlbGYuVGlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50ZWFjaGVyID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weVRlYWNoZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYudGVhY2hlcikpIC8v5rex5ou36LSdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdCA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0LnB1c2goc2VsZi5pbWdVcmwgKyByZXMuZGF0YS5EYXRhLlRpY29uKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29weUltZ0xpc3QgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGYuaW1nTGlzdCkpIC8v5rex5ou36LSdXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBjb25zb2xlLmxvZyh3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhKVxyXG4gICAgICAgIGlmKHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckluZm8hPW51bGwpe1xyXG4gICAgICAgICAgICBzZWxmLlRpZCA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudXNlckluZm8uVGlkXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNlbGYuVGlkID0gbnVsbFxyXG4gICAgICAgICAgICBzZWxmLnRlYWNoZXIgPSB7fVxyXG4gICAgICAgICAgICBzZWxmLmNvcHlUZWFjaGVyID0ge31cclxuICAgICAgICAgICAgc2VsZi5jb3B5SW1nTGlzdCA9IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmdldFRlYWNoZXJEYXRhKClcclxuICAgIH1cclxuXHJcbn1cclxuIl19