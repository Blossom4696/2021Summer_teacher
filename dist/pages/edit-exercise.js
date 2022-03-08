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

var recoderManager = wx.getRecorderManager();
var innerAudioContext = wx.createInnerAudioContext();

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
            exercise: {},
            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            imgList: {
                name: [],
                answer: []
            },
            gradePicker: ['七年级上', '七年级下', '八年级上', '八年级下', '九年级上', '九年级下'],
            subjectPicker: ['语文', '数学', '英语', '物理'],
            typePicker: {
                '语文': ['默写', '听写'],
                '数学': ['选择题', '填空题', '解答题'],
                '英语': ['默写', '听写'],
                '物理': ['选择题', '填空题', '解答题']
            },
            difficultyPicker: ['简单', '中等', '困难', '竞赛'],
            gradeIndex: null,
            subjectIndex: null,
            typeIndex: null,
            difficultyIndex: 0,
            nameUploadPath: "",
            answerUploadPath: "",
            audioUploadPath: "",
            recordingTimeqwe: 0, //录音计时
            setInter: "", //录音名称
            duration: "",
            audioSelectList: [{
                value: "0",
                name: "文件上传",
                checked: true
            }, {
                value: "1",
                name: "自行录音",
                checked: false
            }],
            audioName: null
        }, _this.methods = {
            pickerDifficultyChange: function pickerDifficultyChange(e) {
                var self = this;
                self.difficultyIndex = e.detail.value;
            },
            pickerGradeChange: function pickerGradeChange(e) {
                var self = this;
                self.gradeIndex = e.detail.value;
            },
            pickerSubjectChange: function pickerSubjectChange(e) {
                var self = this;
                if (self.subjectIndex != e.detail.value) {
                    self.typeIndex = null;
                }
                self.subjectIndex = e.detail.value;
            },
            pickerTypeChange: function pickerTypeChange(e) {
                var self = this;
                self.typeIndex = e.detail.value;
            },
            audioSelectRadioChange: function audioSelectRadioChange(e) {
                var self = this;
                console.log('radio发生change事件，携带value值为：', e.detail.value);

                for (var i = 0, len = self.audioSelectList.length; i < len; ++i) {
                    self.audioSelectList[i].checked = self.audioSelectList[i].value === e.detail.value;
                }
            },
            ChooseImage: function ChooseImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.chooseImage({
                    count: 9, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'],
                    success: function success(res) {
                        if (self.imgList[file].length != 0) {
                            self.imgList[file] = self.imgList[file].concat(res.tempFilePaths);
                        } else {
                            self.imgList[file] = res.tempFilePaths;
                        }
                        self.$apply();
                    }
                });
            },
            ViewImage: function ViewImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.previewImage({
                    urls: self.imgList[file],
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
                            self.imgList[file].splice(e.currentTarget.dataset.index, 1);
                            self.$apply();
                        }
                    }
                });
            },
            startRecord: function startRecord(e) {
                var options = {
                    duration: 10000,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    encodeBitRate: 48000,
                    format: 'mp3',
                    frameSize: 50
                };
                recoderManager.start(options);
                recoderManager.onStart(function () {
                    console.log("开始录音");
                });
            },
            endRecord: function endRecord(e) {
                var self = this;
                recoderManager.stop();
                recoderManager.onStop(function (res) {
                    console.log("停止录音", res);
                    self.audioUploadPath = res.tempFilePath;
                    self.duration = Math.floor(res.duration / 1000) + "'" + res.duration % 1000 + "s";
                    self.$apply();
                    wx.showToast({
                        title: '录音完成'
                    });
                });
            },
            onClickPlayRecord: function onClickPlayRecord() {
                var self = this;
                innerAudioContext.src = self.audioUploadPath;
                innerAudioContext.play();
                innerAudioContext.onEnded(function () {
                    innerAudioContext.stop();
                });
            },
            onClickUploadMP3: function onClickUploadMP3(e) {
                var self = this;
                wx.chooseMessageFile({
                    count: 1,
                    type: 'file',
                    success: function success(res) {
                        // 上传文件为MP3文件
                        if (res.tempFiles[0].name.indexOf(".mp3") != -1) {
                            self.audioUploadPath = res.tempFiles[0].path;
                            self.audioName = res.tempFiles[0].name;
                            self.$apply();
                        }
                    }
                });
            },
            formSubmit: function formSubmit(e) {
                var self = this;

                var sendFormData = e.detail.value; // form 表单数据
                sendFormData["Eid"] = Number(self.Eid);
                var successUp = 0; //成功
                var failUp = 0; //失败
                var count = 0; //第几张

                if (self.imgList.name.length > 0 && self.typePicker[self.subjectPicker[self.subjectIndex]][self.typeIndex] != '听写') {
                    // 图片上传
                    var length = self.imgList.name.length; //总数
                    self.recursionImgUpload(self, self.imgList.name, successUp, failUp, count, length);
                    if (failUp > 0) {
                        _wepy2.default.showToast({
                            title: '上传图片出错', //提示的内容,
                            icon: 'error', //图标,
                            duration: 2000, //延迟时间,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });
                        return;
                    }

                    // 处理题目图片第一个
                    var lastindexOfName = self.imgList.name[0].lastIndexOf("/");
                    sendFormData["EnamePath"] = self.imgList.name.length == 0 ? "" : "exercise/" + self.imgList.name[0].substring(lastindexOfName + 1, self.imgList.name[0].length);
                    // 处理剩余题目图片
                    for (var i = 1; i < self.imgList.name.length; i++) {
                        lastindexOfName = self.imgList.name[i].lastIndexOf("/");
                        sendFormData["EnamePath"] += ";exercise/" + self.imgList.name[i].substring(lastindexOfName + 1, self.imgList.name[i].length);
                    }
                } else if (self.audioUploadPath != '' && self.typePicker[self.subjectPicker[self.subjectIndex]][self.typeIndex] == '听写') {
                    // 音频上传
                    self.audioUpload(self, failUp);
                    var lastindexOfAudio = self.audioUploadPath.lastIndexOf("/");

                    sendFormData["EnamePath"] = "exercise/" + self.audioUploadPath.substring(lastindexOfAudio + 1, self.audioUploadPath.length);
                }

                if (self.imgList.answer.length > 0) {
                    var _length = self.imgList.answer.length; //总数
                    self.recursionImgUpload(self, self.imgList.answer, successUp, failUp, count, _length);
                    if (failUp > 0) {
                        _wepy2.default.showToast({
                            title: '上传图片出错', //提示的内容,
                            icon: 'error', //图标,
                            duration: 2000, //延迟时间,
                            mask: true, //显示透明蒙层，防止触摸穿透,
                            success: function success(res) {}
                        });
                        return;
                    }
                    // 处理答案图片第一个
                    var lastindexOfAnswer = self.imgList.answer[0].lastIndexOf("/");
                    sendFormData["EanswerPath"] = self.imgList.answer.length == 0 ? "" : "exercise/" + self.imgList.answer[0].substring(lastindexOfAnswer + 1, self.imgList.answer[0].length);
                    // 处理剩余答案图片
                    for (var _i = 1; _i < self.imgList.answer.length; _i++) {
                        lastindexOfAnswer = self.imgList.answer[_i].lastIndexOf("/");
                        sendFormData["EanswerPath"] += ";exercise/" + self.imgList.answer[_i].substring(lastindexOfAnswer + 1, self.imgList.answer[_i].length);
                    }
                }
                console.log(sendFormData);
                if (failUp == 0) {
                    _wepy2.default.request({
                        url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/update_exercise',
                        method: 'PUT',
                        data: sendFormData,
                        header: _wepy2.default.$instance.setHeader(),
                        success: function success(res) {
                            console.log(res);
                            if (res.data.Code == 1) {
                                _wepy2.default.showToast({
                                    title: '修改成功', //提示的内容,
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
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
                    dirName: "images/exercise"
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
                } else {
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);
                }
            }), _wepy$uploadFile));
        }

        // 上传音频

    }, {
        key: 'audioUpload',
        value: function audioUpload(self, failUp) {
            var _wepy$uploadFile2;

            _wepy2.default.uploadFile((_wepy$uploadFile2 = {
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/file/upload_file', //开发者服务器 url
                header: _wepy2.default.$instance.setHeader(),
                filePath: self.audioUploadPath, //要上传文件资源的路径
                name: 'uploadFile', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                formData: {
                    dirName: "audios/exercise"
                }
            }, _defineProperty(_wepy$uploadFile2, 'header', {
                'content-type': 'multipart/form-data'
            }), _defineProperty(_wepy$uploadFile2, 'success', function success(e) {
                console.log("录音保存成功");
            }), _defineProperty(_wepy$uploadFile2, 'fail', function fail(e) {
                failUp++;
                console.log("录音保存失败");
            }), _wepy$uploadFile2));
        }
    }, {
        key: 'findIndex',
        value: function findIndex() {
            var self = this;
            for (var i = 0; i < self.gradePicker.length; i++) {
                if (self.gradePicker[i] == self.exercise.Egrade) {
                    self.gradeIndex = i;
                }
            }
            for (var _i2 = 0; _i2 < self.subjectPicker.length; _i2++) {
                if (self.subjectPicker[_i2] == self.exercise.Esubject) {
                    self.subjectIndex = _i2;
                }
            }
            for (var _i3 = 0; _i3 < self.typePicker[self.subjectPicker[self.subjectIndex]].length; _i3++) {
                if (self.typePicker[self.subjectPicker[self.subjectIndex]][_i3] == self.exercise.Etype) {
                    self.typeIndex = _i3;
                }
            }
            for (var _i4 = 0; _i4 < self.difficultyPicker.length; _i4++) {
                if (self.difficultyPicker[_i4] == self.exercise.Edifficulty) {
                    self.difficultyIndex = _i4;
                }
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Eid = options.eid;

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
                        if (self.exercise.Etype != "听写") {
                            if (res.data.Data.EnamePath != "") {
                                var tmpList = res.data.Data.EnamePath.split(";");
                                self.imgList.name = tmpList.map(function (x) {
                                    return self.imageUrl + x;
                                });
                            }
                        } else {
                            self.audioUploadPath = self.audioUrl + self.exercise.EnamePath;
                            self.audioName = self.exercise.EnamePath.length > 15 ? '未知音频.mp3' : self.exercise.EnamePath;
                        }

                        if (res.data.Data.EanswerPath != "") {
                            var _tmpList = res.data.Data.EanswerPath.split(";");
                            self.imgList.answer = _tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }

                        self.findIndex();
                        self.$apply();
                    }
                }
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/edit-exercise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtZXhlcmNpc2UuanMiXSwibmFtZXMiOlsicmVjb2Rlck1hbmFnZXIiLCJ3eCIsImdldFJlY29yZGVyTWFuYWdlciIsImlubmVyQXVkaW9Db250ZXh0IiwiY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQiLCJJbmRleCIsImRhdGEiLCJleGVyY2lzZSIsImltYWdlVXJsIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJhdWRpb1VybCIsImltZ0xpc3QiLCJuYW1lIiwiYW5zd2VyIiwiZ3JhZGVQaWNrZXIiLCJzdWJqZWN0UGlja2VyIiwidHlwZVBpY2tlciIsImRpZmZpY3VsdHlQaWNrZXIiLCJncmFkZUluZGV4Iiwic3ViamVjdEluZGV4IiwidHlwZUluZGV4IiwiZGlmZmljdWx0eUluZGV4IiwibmFtZVVwbG9hZFBhdGgiLCJhbnN3ZXJVcGxvYWRQYXRoIiwiYXVkaW9VcGxvYWRQYXRoIiwicmVjb3JkaW5nVGltZXF3ZSIsInNldEludGVyIiwiZHVyYXRpb24iLCJhdWRpb1NlbGVjdExpc3QiLCJ2YWx1ZSIsImNoZWNrZWQiLCJhdWRpb05hbWUiLCJtZXRob2RzIiwicGlja2VyRGlmZmljdWx0eUNoYW5nZSIsImUiLCJzZWxmIiwiZGV0YWlsIiwicGlja2VyR3JhZGVDaGFuZ2UiLCJwaWNrZXJTdWJqZWN0Q2hhbmdlIiwicGlja2VyVHlwZUNoYW5nZSIsImF1ZGlvU2VsZWN0UmFkaW9DaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiaSIsImxlbiIsImxlbmd0aCIsIkNob29zZUltYWdlIiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25jYXQiLCJ0ZW1wRmlsZVBhdGhzIiwiJGFwcGx5IiwiVmlld0ltYWdlIiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJ1cmwiLCJEZWxJbWciLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJjb25maXJtIiwic3BsaWNlIiwiaW5kZXgiLCJzdGFydFJlY29yZCIsIm9wdGlvbnMiLCJzYW1wbGVSYXRlIiwibnVtYmVyT2ZDaGFubmVscyIsImVuY29kZUJpdFJhdGUiLCJmb3JtYXQiLCJmcmFtZVNpemUiLCJzdGFydCIsIm9uU3RhcnQiLCJlbmRSZWNvcmQiLCJzdG9wIiwib25TdG9wIiwidGVtcEZpbGVQYXRoIiwiTWF0aCIsImZsb29yIiwic2hvd1RvYXN0Iiwib25DbGlja1BsYXlSZWNvcmQiLCJzcmMiLCJwbGF5Iiwib25FbmRlZCIsIm9uQ2xpY2tVcGxvYWRNUDMiLCJjaG9vc2VNZXNzYWdlRmlsZSIsInR5cGUiLCJ0ZW1wRmlsZXMiLCJpbmRleE9mIiwicGF0aCIsImZvcm1TdWJtaXQiLCJzZW5kRm9ybURhdGEiLCJOdW1iZXIiLCJFaWQiLCJzdWNjZXNzVXAiLCJmYWlsVXAiLCJyZWN1cnNpb25JbWdVcGxvYWQiLCJpY29uIiwibWFzayIsImxhc3RpbmRleE9mTmFtZSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiYXVkaW9VcGxvYWQiLCJsYXN0aW5kZXhPZkF1ZGlvIiwibGFzdGluZGV4T2ZBbnN3ZXIiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImltZ1BhdGhzIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJkaXJOYW1lIiwiRWdyYWRlIiwiRXN1YmplY3QiLCJFdHlwZSIsIkVkaWZmaWN1bHR5IiwiZWlkIiwiRGF0YSIsIkVuYW1lUGF0aCIsInRtcExpc3QiLCJzcGxpdCIsIm1hcCIsIngiLCJFYW5zd2VyUGF0aCIsImZpbmRJbmRleCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7OztBQUZBLElBQU1BLGlC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YW5hZ2VyID0gd3guZ2V0UmVjb3JkZXJNYW5hZ2VyKClcclxuY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgZGF0YT17XHJcbiAgICAgICAgZXhlcmNpc2U6e30sXHJcbiAgICAgICAgaW1hZ2VVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICAgICAgYXVkaW9Vcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9hdWRpbz9uYW1lPScsXHJcbiAgICAgICAgaW1nTGlzdDoge1xyXG4gICAgICAgICAgICBuYW1lOltdLFxyXG4gICAgICAgICAgICBhbnN3ZXI6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+S4g+W5tOe6p+S4iicsJ+S4g+W5tOe6p+S4iycsJ+WFq+W5tOe6p+S4iicsJ+WFq+W5tOe6p+S4iycsJ+S5neW5tOe6p+S4iicsJ+S5neW5tOe6p+S4iyddLFxyXG4gICAgICAgIHN1YmplY3RQaWNrZXI6Wyfor63mlocnLCfmlbDlraYnLCfoi7Hor60nLCfniannkIYnXSxcclxuICAgICAgICB0eXBlUGlja2VyOntcclxuICAgICAgICAgICAgJ+ivreaWhyc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+aVsOWtpic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICAgICAgJ+iLseivrSc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+eJqeeQhic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZpY3VsdHlQaWNrZXI6IFtcclxuICAgICAgICAgICAgJ+eugOWNlScsXHJcbiAgICAgICAgICAgICfkuK3nrYknLFxyXG4gICAgICAgICAgICAn5Zuw6Zq+JyxcclxuICAgICAgICAgICAgJ+ernui1mycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBncmFkZUluZGV4Om51bGwsXHJcbiAgICAgICAgc3ViamVjdEluZGV4Om51bGwsXHJcbiAgICAgICAgdHlwZUluZGV4Om51bGwsXHJcbiAgICAgICAgZGlmZmljdWx0eUluZGV4OjAsXHJcbiAgICAgICAgbmFtZVVwbG9hZFBhdGg6XCJcIixcclxuICAgICAgICBhbnN3ZXJVcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgYXVkaW9VcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgcmVjb3JkaW5nVGltZXF3ZTowLC8v5b2V6Z+z6K6h5pe2XHJcbiAgICAgICAgc2V0SW50ZXI6XCJcIiwvL+W9lemfs+WQjeensFxyXG4gICAgICAgIGR1cmF0aW9uOlwiXCIsXHJcbiAgICAgICAgYXVkaW9TZWxlY3RMaXN0Olt7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjBcIixcclxuICAgICAgICAgICAgbmFtZTogXCLmlofku7bkuIrkvKBcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIuiHquihjOW9lemfs1wiLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICB9XSxcclxuICAgICAgICBhdWRpb05hbWU6IG51bGwsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz0ge1xyXG4gICAgICAgIHBpY2tlckRpZmZpY3VsdHlDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5kaWZmaWN1bHR5SW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpY2tlckdyYWRlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5ncmFkZUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJTdWJqZWN0Q2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYoc2VsZi5zdWJqZWN0SW5kZXggIT0gZS5kZXRhaWwudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi50eXBlSW5kZXggPSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5zdWJqZWN0SW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJUeXBlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi50eXBlSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGF1ZGlvU2VsZWN0UmFkaW9DaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JhZGlv5Y+R55SfY2hhbmdl5LqL5Lu277yM5pC65bimdmFsdWXlgLzkuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxmLmF1ZGlvU2VsZWN0TGlzdC5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hdWRpb1NlbGVjdExpc3RbaV0uY2hlY2tlZCA9IHNlbGYuYXVkaW9TZWxlY3RMaXN0W2ldLnZhbHVlID09PSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENob29zZUltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogOSwgLy/pu5jorqQ5XHJcbiAgICAgICAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sIC8v5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmltZ0xpc3RbZmlsZV0ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0W2ZpbGVdPXNlbGYuaW1nTGlzdFtmaWxlXS5jb25jYXQocmVzLnRlbXBGaWxlUGF0aHMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0W2ZpbGVdPSByZXMudGVtcEZpbGVQYXRoc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZpZXdJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1nTGlzdFtmaWxlXSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBEZWxJbWcoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOmimOebruWbvueJhycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5Yig6Zmk6L+Z5byg5Zu+54mH5ZCX77yfJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0W2ZpbGVdLnNwbGljZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRSZWNvcmQoZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVSYXRlOiAxNjAwMCxcclxuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhbm5lbHM6IDEsXHJcbiAgICAgICAgICAgICAgICBlbmNvZGVCaXRSYXRlOiA0ODAwMCxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDonbXAzJyxcclxuICAgICAgICAgICAgICAgIGZyYW1lU2l6ZTogNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5zdGFydChvcHRpb25zKVxyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5vblN0YXJ0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vlvZXpn7NcIilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmRSZWNvcmQoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5zdG9wKClcclxuICAgICAgICAgICAgcmVjb2Rlck1hbmFnZXIub25TdG9wKChyZXMpID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlgZzmraLlvZXpn7NcIixyZXMpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcclxuICAgICAgICAgICAgICAgIHNlbGYuZHVyYXRpb24gPSBNYXRoLmZsb29yKHJlcy5kdXJhdGlvbi8xMDAwKSArIFwiJ1wiICsgcmVzLmR1cmF0aW9uJTEwMDAgKyBcInNcIlxyXG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTon5b2V6Z+z5a6M5oiQJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrUGxheVJlY29yZCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gc2VsZi5hdWRpb1VwbG9hZFBhdGhcclxuICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xyXG4gICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DbGlja1VwbG9hZE1QMyhlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4iuS8oOaWh+S7tuS4uk1QM+aWh+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy50ZW1wRmlsZXNbMF0ubmFtZS5pbmRleE9mKFwiLm1wM1wiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkUGF0aCA9IHJlcy50ZW1wRmlsZXNbMF0ucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvTmFtZSA9IHJlcy50ZW1wRmlsZXNbMF0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbmRGb3JtRGF0YSA9IGUuZGV0YWlsLnZhbHVlIC8vIGZvcm0g6KGo5Y2V5pWw5o2uXHJcbiAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVpZFwiXSA9IE51bWJlcihzZWxmLkVpZClcclxuICAgICAgICAgICAgbGV0IHN1Y2Nlc3NVcCA9IDA7IC8v5oiQ5YqfXHJcbiAgICAgICAgICAgIGxldCBmYWlsVXAgPSAwOyAvL+Wksei0pVxyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwOyAvL+esrOWHoOW8oFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoc2VsZi5pbWdMaXN0Lm5hbWUubGVuZ3RoPjAgJiYgc2VsZi50eXBlUGlja2VyW3NlbGYuc3ViamVjdFBpY2tlcltzZWxmLnN1YmplY3RJbmRleF1dW3NlbGYudHlwZUluZGV4XSE9J+WQrOWGmScpey8vIOWbvueJh+S4iuS8oFxyXG4gICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aDsgLy/mgLvmlbBcclxuICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsc2VsZi5pbWdMaXN0Lm5hbWUsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgaWYoZmFpbFVwPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiK5Lyg5Zu+54mH5Ye66ZSZJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG6aKY55uu5Zu+54mH56ys5LiA5LiqXHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdGluZGV4T2ZOYW1lID0gc2VsZi5pbWdMaXN0Lm5hbWVbMF0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJFbmFtZVBhdGhcIl0gPSBzZWxmLmltZ0xpc3QubmFtZS5sZW5ndGggPT0gMD8gXCJcIiA6IFwiZXhlcmNpc2UvXCIgKyBzZWxmLmltZ0xpc3QubmFtZVswXS5zdWJzdHJpbmcobGFzdGluZGV4T2ZOYW1lICsgMSwgc2VsZi5pbWdMaXN0Lm5hbWVbMF0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG5Ymp5L2Z6aKY55uu5Zu+54mHXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RpbmRleE9mTmFtZSA9IHNlbGYuaW1nTGlzdC5uYW1lW2ldLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVuYW1lUGF0aFwiXSArPSBcIjtleGVyY2lzZS9cIiArIHNlbGYuaW1nTGlzdC5uYW1lW2ldLnN1YnN0cmluZyhsYXN0aW5kZXhPZk5hbWUgKyAxLCBzZWxmLmltZ0xpc3QubmFtZVtpXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoc2VsZi5hdWRpb1VwbG9hZFBhdGghPScnICYmIHNlbGYudHlwZVBpY2tlcltzZWxmLnN1YmplY3RQaWNrZXJbc2VsZi5zdWJqZWN0SW5kZXhdXVtzZWxmLnR5cGVJbmRleF09PSflkKzlhpknKXsvLyDpn7PpopHkuIrkvKBcclxuICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9VcGxvYWQoc2VsZiwgZmFpbFVwKVxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mQXVkaW8gPSBzZWxmLmF1ZGlvVXBsb2FkUGF0aC5sYXN0SW5kZXhPZihcIi9cIilcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiRW5hbWVQYXRoXCJdID0gXCJleGVyY2lzZS9cIiArIHNlbGYuYXVkaW9VcGxvYWRQYXRoLnN1YnN0cmluZyhsYXN0aW5kZXhPZkF1ZGlvICsgMSwgc2VsZi5hdWRpb1VwbG9hZFBhdGgubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aDsgLy/mgLvmlbBcclxuICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsc2VsZi5pbWdMaXN0LmFuc3dlciwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuetlOahiOWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mQW5zd2VyID0gc2VsZi5pbWdMaXN0LmFuc3dlclswXS5sYXN0SW5kZXhPZihcIi9cIilcclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVhbnN3ZXJQYXRoXCJdID0gc2VsZi5pbWdMaXN0LmFuc3dlci5sZW5ndGggPT0gMD8gXCJcIiA6IFwiZXhlcmNpc2UvXCIgKyBzZWxmLmltZ0xpc3QuYW5zd2VyWzBdLnN1YnN0cmluZyhsYXN0aW5kZXhPZkFuc3dlciArIDEsIHNlbGYuaW1nTGlzdC5hbnN3ZXJbMF0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG5Ymp5L2Z562U5qGI5Zu+54mHXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPHNlbGYuaW1nTGlzdC5hbnN3ZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdGluZGV4T2ZBbnN3ZXIgPSBzZWxmLmltZ0xpc3QuYW5zd2VyW2ldLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVhbnN3ZXJQYXRoXCJdICs9IFwiO2V4ZXJjaXNlL1wiICsgc2VsZi5pbWdMaXN0LmFuc3dlcltpXS5zdWJzdHJpbmcobGFzdGluZGV4T2ZBbnN3ZXIgKyAxLCBzZWxmLmltZ0xpc3QuYW5zd2VyW2ldLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZW5kRm9ybURhdGEpXHJcbiAgICAgICAgICAgIGlmKGZhaWxVcCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2V4ZXJjaXNlL3VwZGF0ZV9leGVyY2lzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQVVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmAkuW9kuaWueW8j+S4iuS8oOWkmuW8oOWbvueJh1xyXG4gICAgcmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKXtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogaW1nUGF0aHNbY291bnRdLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJpbWFnZXMvZXhlcmNpc2VcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEuQ29kZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip/nrKxcIiArIGNvdW50ICsgXCLlvKBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NVcCsrOy8v5oiQ5YqfKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChlKXtcclxuICAgICAgICAgICAgICAgIGZhaWxVcCsrOy8v5aSx6LSlKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA9PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocyxzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4iuS8oOmfs+mikVxyXG4gICAgYXVkaW9VcGxvYWQoc2VsZiwgZmFpbFVwKSB7XHJcbiAgICAgICAgd2VweS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvdXBsb2FkX2ZpbGUnLCAvL+W8gOWPkeiAheacjeWKoeWZqCB1cmxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZmlsZVBhdGg6IHNlbGYuYXVkaW9VcGxvYWRQYXRoLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJhdWRpb3MvZXhlcmNpc2VcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2V6Z+z5L+d5a2Y5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZSl7XHJcbiAgICAgICAgICAgICAgICBmYWlsVXArK1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZXpn7Pkv53lrZjlpLHotKVcIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGZpbmRJbmRleCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi5ncmFkZVBpY2tlci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoc2VsZi5ncmFkZVBpY2tlcltpXSA9PSBzZWxmLmV4ZXJjaXNlLkVncmFkZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdyYWRlSW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLnN1YmplY3RQaWNrZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHNlbGYuc3ViamVjdFBpY2tlcltpXSA9PSBzZWxmLmV4ZXJjaXNlLkVzdWJqZWN0KXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3ViamVjdEluZGV4ID0gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi50eXBlUGlja2VyW3NlbGYuc3ViamVjdFBpY2tlcltzZWxmLnN1YmplY3RJbmRleF1dLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1baV0gPT0gc2VsZi5leGVyY2lzZS5FdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnR5cGVJbmRleCA9IGlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MDtpPHNlbGYuZGlmZmljdWx0eVBpY2tlci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoc2VsZi5kaWZmaWN1bHR5UGlja2VyW2ldID09IHNlbGYuZXhlcmNpc2UuRWRpZmZpY3VsdHkpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kaWZmaWN1bHR5SW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgc2VsZi5FaWQgPSBvcHRpb25zLmVpZFxyXG5cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBFaWQ6c2VsZi5FaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2UgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZXhlcmNpc2UuRXR5cGUhPVwi5ZCs5YaZXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5FbmFtZVBhdGghPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5FbmFtZVBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0Lm5hbWUgPSB0bXBMaXN0Lm1hcCh4ID0+IHNlbGYuaW1hZ2VVcmwgKyB4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9VcGxvYWRQYXRoID0gc2VsZi5hdWRpb1VybCArIHNlbGYuZXhlcmNpc2UuRW5hbWVQYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvTmFtZSA9IHNlbGYuZXhlcmNpc2UuRW5hbWVQYXRoLmxlbmd0aD4xNT8n5pyq55+l6Z+z6aKRLm1wMyc6c2VsZi5leGVyY2lzZS5FbmFtZVBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5FYW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHJlcy5kYXRhLkRhdGEuRWFuc3dlclBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3QuYW5zd2VyID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZmluZEluZGV4KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=