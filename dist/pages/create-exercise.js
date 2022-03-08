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
                        url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/insert_exercise',
                        method: 'POST',
                        data: sendFormData,
                        header: _wepy2.default.$instance.setHeader(),
                        success: function success(res) {
                            console.log(res);
                            if (res.data.Code == 1) {
                                _wepy2.default.showToast({
                                    title: '创建成功', //提示的内容,
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
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/create-exercise'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1leGVyY2lzZS5qcyJdLCJuYW1lcyI6WyJyZWNvZGVyTWFuYWdlciIsInd4IiwiZ2V0UmVjb3JkZXJNYW5hZ2VyIiwiaW5uZXJBdWRpb0NvbnRleHQiLCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dCIsIkluZGV4IiwiZGF0YSIsImltZ0xpc3QiLCJuYW1lIiwiYW5zd2VyIiwiZ3JhZGVQaWNrZXIiLCJzdWJqZWN0UGlja2VyIiwidHlwZVBpY2tlciIsImRpZmZpY3VsdHlQaWNrZXIiLCJncmFkZUluZGV4Iiwic3ViamVjdEluZGV4IiwidHlwZUluZGV4IiwiZGlmZmljdWx0eUluZGV4IiwibmFtZVVwbG9hZFBhdGgiLCJhbnN3ZXJVcGxvYWRQYXRoIiwiYXVkaW9VcGxvYWRQYXRoIiwicmVjb3JkaW5nVGltZXF3ZSIsInNldEludGVyIiwiZHVyYXRpb24iLCJhdWRpb1NlbGVjdExpc3QiLCJ2YWx1ZSIsImNoZWNrZWQiLCJhdWRpb05hbWUiLCJtZXRob2RzIiwicGlja2VyRGlmZmljdWx0eUNoYW5nZSIsImUiLCJzZWxmIiwiZGV0YWlsIiwicGlja2VyR3JhZGVDaGFuZ2UiLCJwaWNrZXJTdWJqZWN0Q2hhbmdlIiwicGlja2VyVHlwZUNoYW5nZSIsImF1ZGlvU2VsZWN0UmFkaW9DaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiaSIsImxlbiIsImxlbmd0aCIsIkNob29zZUltYWdlIiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJjb25jYXQiLCJ0ZW1wRmlsZVBhdGhzIiwiJGFwcGx5IiwiVmlld0ltYWdlIiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJ1cmwiLCJEZWxJbWciLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJjb25maXJtIiwic3BsaWNlIiwiaW5kZXgiLCJzdGFydFJlY29yZCIsIm9wdGlvbnMiLCJzYW1wbGVSYXRlIiwibnVtYmVyT2ZDaGFubmVscyIsImVuY29kZUJpdFJhdGUiLCJmb3JtYXQiLCJmcmFtZVNpemUiLCJzdGFydCIsIm9uU3RhcnQiLCJlbmRSZWNvcmQiLCJzdG9wIiwib25TdG9wIiwidGVtcEZpbGVQYXRoIiwiTWF0aCIsImZsb29yIiwic2hvd1RvYXN0Iiwib25DbGlja1BsYXlSZWNvcmQiLCJzcmMiLCJwbGF5Iiwib25FbmRlZCIsIm9uQ2xpY2tVcGxvYWRNUDMiLCJjaG9vc2VNZXNzYWdlRmlsZSIsInR5cGUiLCJ0ZW1wRmlsZXMiLCJpbmRleE9mIiwicGF0aCIsImZvcm1TdWJtaXQiLCJzZW5kRm9ybURhdGEiLCJzdWNjZXNzVXAiLCJmYWlsVXAiLCJyZWN1cnNpb25JbWdVcGxvYWQiLCJ3ZXB5IiwiaWNvbiIsIm1hc2siLCJsYXN0aW5kZXhPZk5hbWUiLCJsYXN0SW5kZXhPZiIsInN1YnN0cmluZyIsImF1ZGlvVXBsb2FkIiwibGFzdGluZGV4T2ZBdWRpbyIsImxhc3RpbmRleE9mQW5zd2VyIiwicmVxdWVzdCIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzZXJ2ZXJVcmwiLCJtZXRob2QiLCJoZWFkZXIiLCJzZXRIZWFkZXIiLCJDb2RlIiwic2V0VGltZW91dCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiaW1nUGF0aHMiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsImRpck5hbWUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFGQSxJQUFNQSxpQkFBaUJDLEdBQUdDLGtCQUFILEVBQXZCO0FBQ0EsSUFBTUMsb0JBQW9CRixHQUFHRyx1QkFBSCxFQUExQjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFLO0FBQ0RDLHFCQUFTO0FBQ0xDLHNCQUFLLEVBREE7QUFFTEMsd0JBQU87QUFGRixhQURSO0FBS0RDLHlCQUFZLENBQUMs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IiwiZmlsZSI6ImNyZWF0ZS1leGVyY2lzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCByZWNvZGVyTWFuYWdlciA9IHd4LmdldFJlY29yZGVyTWFuYWdlcigpXHJcbmNvbnN0IGlubmVyQXVkaW9Db250ZXh0ID0gd3guY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKVxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZXtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIGltZ0xpc3Q6IHtcclxuICAgICAgICAgICAgbmFtZTpbXSxcclxuICAgICAgICAgICAgYW5zd2VyOltdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ3JhZGVQaWNrZXI6WyfkuIPlubTnuqfkuIonLCfkuIPlubTnuqfkuIsnLCflhavlubTnuqfkuIonLCflhavlubTnuqfkuIsnLCfkuZ3lubTnuqfkuIonLCfkuZ3lubTnuqfkuIsnXSxcclxuICAgICAgICBzdWJqZWN0UGlja2VyOlsn6K+t5paHJywn5pWw5a2mJywn6Iux6K+tJywn54mp55CGJ10sXHJcbiAgICAgICAgdHlwZVBpY2tlcjp7XHJcbiAgICAgICAgICAgICfor63mlocnOlsn6buY5YaZJywn5ZCs5YaZJ10sXHJcbiAgICAgICAgICAgICfmlbDlraYnOlsn6YCJ5oup6aKYJywn5aGr56m66aKYJywn6Kej562U6aKYJ10sXHJcbiAgICAgICAgICAgICfoi7Hor60nOlsn6buY5YaZJywn5ZCs5YaZJ10sXHJcbiAgICAgICAgICAgICfniannkIYnOlsn6YCJ5oup6aKYJywn5aGr56m66aKYJywn6Kej562U6aKYJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaWZmaWN1bHR5UGlja2VyOiBbXHJcbiAgICAgICAgICAgICfnroDljZUnLFxyXG4gICAgICAgICAgICAn5Lit562JJyxcclxuICAgICAgICAgICAgJ+WbsOmavicsXHJcbiAgICAgICAgICAgICfnq57otZsnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZ3JhZGVJbmRleDpudWxsLFxyXG4gICAgICAgIHN1YmplY3RJbmRleDpudWxsLFxyXG4gICAgICAgIHR5cGVJbmRleDpudWxsLFxyXG4gICAgICAgIGRpZmZpY3VsdHlJbmRleDowLFxyXG4gICAgICAgIG5hbWVVcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgYW5zd2VyVXBsb2FkUGF0aDpcIlwiLFxyXG4gICAgICAgIGF1ZGlvVXBsb2FkUGF0aDpcIlwiLFxyXG4gICAgICAgIHJlY29yZGluZ1RpbWVxd2U6MCwvL+W9lemfs+iuoeaXtlxyXG4gICAgICAgIHNldEludGVyOlwiXCIsLy/lvZXpn7PlkI3np7BcclxuICAgICAgICBkdXJhdGlvbjpcIlwiLFxyXG4gICAgICAgIGF1ZGlvU2VsZWN0TGlzdDpbe1xyXG4gICAgICAgICAgICB2YWx1ZTogXCIwXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwi5paH5Lu25LiK5LygXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjFcIixcclxuICAgICAgICAgICAgbmFtZTogXCLoh6rooYzlvZXpn7NcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgYXVkaW9OYW1lOiBudWxsLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9IHtcclxuICAgICAgICBwaWNrZXJEaWZmaWN1bHR5Q2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZGlmZmljdWx0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJHcmFkZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuZ3JhZGVJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyU3ViamVjdENoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmKHNlbGYuc3ViamVjdEluZGV4ICE9IGUuZGV0YWlsLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHNlbGYudHlwZUluZGV4ID0gbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuc3ViamVjdEluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyVHlwZUNoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYudHlwZUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhdWRpb1NlbGVjdFJhZGlvQ2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyYWRpb+WPkeeUn2NoYW5nZeS6i+S7tu+8jOaQuuW4pnZhbHVl5YC85Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZi5hdWRpb1NlbGVjdExpc3QubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9TZWxlY3RMaXN0W2ldLmNoZWNrZWQgPSBzZWxmLmF1ZGlvU2VsZWN0TGlzdFtpXS52YWx1ZSA9PT0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDaG9vc2VJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDksIC8v6buY6K6kOVxyXG4gICAgICAgICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvL+WPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5pbWdMaXN0W2ZpbGVdLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdFtmaWxlXT1zZWxmLmltZ0xpc3RbZmlsZV0uY29uY2F0KHJlcy50ZW1wRmlsZVBhdGhzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdFtmaWxlXT0gcmVzLnRlbXBGaWxlUGF0aHNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBWaWV3SW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltZ0xpc3RbZmlsZV0sXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRGVsSW1nKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTpopjnm67lm77niYcnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWIoOmZpOi/meW8oOWbvueJh+WQl++8nycsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1nTGlzdFtmaWxlXS5zcGxpY2UoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0UmVjb3JkKGUpe1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwLFxyXG4gICAgICAgICAgICAgICAgc2FtcGxlUmF0ZTogMTYwMDAsXHJcbiAgICAgICAgICAgICAgICBudW1iZXJPZkNoYW5uZWxzOiAxLFxyXG4gICAgICAgICAgICAgICAgZW5jb2RlQml0UmF0ZTogNDgwMDAsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6J21wMycsXHJcbiAgICAgICAgICAgICAgICBmcmFtZVNpemU6IDUwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVjb2Rlck1hbmFnZXIuc3RhcnQob3B0aW9ucylcclxuICAgICAgICAgICAgcmVjb2Rlck1hbmFnZXIub25TdGFydCgoKSA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL5b2V6Z+zXCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5kUmVjb3JkKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgcmVjb2Rlck1hbmFnZXIuc3RvcCgpXHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLm9uU3RvcCgocmVzKSA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YGc5q2i5b2V6Z+zXCIscmVzKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5hdWRpb1VwbG9hZFBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcbiAgICAgICAgICAgICAgICBzZWxmLmR1cmF0aW9uID0gTWF0aC5mbG9vcihyZXMuZHVyYXRpb24vMTAwMCkgKyBcIidcIiArIHJlcy5kdXJhdGlvbiUxMDAwICsgXCJzXCJcclxuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+W9lemfs+WujOaIkCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja1BsYXlSZWNvcmQoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnNyYyA9IHNlbGYuYXVkaW9VcGxvYWRQYXRoXHJcbiAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnBsYXkoKTtcclxuICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FbmRlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zdG9wKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrVXBsb2FkTVAzKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgd3guY2hvb3NlTWVzc2FnZUZpbGUoe1xyXG4gICAgICAgICAgICAgICAgY291bnQ6IDEsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmlsZScsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiK5Lyg5paH5Lu25Li6TVAz5paH5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLnRlbXBGaWxlc1swXS5uYW1lLmluZGV4T2YoXCIubXAzXCIpIT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9VcGxvYWRQYXRoID0gcmVzLnRlbXBGaWxlc1swXS5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9OYW1lID0gcmVzLnRlbXBGaWxlc1swXS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZm9ybVN1Ym1pdChlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbmRGb3JtRGF0YSA9IGUuZGV0YWlsLnZhbHVlIC8vIGZvcm0g6KGo5Y2V5pWw5o2uXHJcblxyXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc1VwID0gMDsgLy/miJDlip9cclxuICAgICAgICAgICAgbGV0IGZhaWxVcCA9IDA7IC8v5aSx6LSlXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7IC8v56ys5Yeg5bygXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aD4wICYmIHNlbGYudHlwZVBpY2tlcltzZWxmLnN1YmplY3RQaWNrZXJbc2VsZi5zdWJqZWN0SW5kZXhdXVtzZWxmLnR5cGVJbmRleF0hPSflkKzlhpknKXsvLyDlm77niYfkuIrkvKBcclxuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBzZWxmLmltZ0xpc3QubmFtZS5sZW5ndGg7IC8v5oC75pWwXHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLHNlbGYuaW1nTGlzdC5uYW1lLCBzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgIGlmKGZhaWxVcD4wKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S4iuS8oOWbvueJh+WHuumUmScsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXNrOiB0cnVlLCAvL+aYvuekuumAj+aYjuiSmeWxgu+8jOmYsuatouinpuaRuOepv+mAjyxcclxuICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhumimOebruWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mTmFtZSA9IHNlbGYuaW1nTGlzdC5uYW1lWzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiRW5hbWVQYXRoXCJdID0gc2VsZi5pbWdMaXN0Lm5hbWUubGVuZ3RoID09IDA/IFwiXCIgOiBcImV4ZXJjaXNlL1wiICsgc2VsZi5pbWdMaXN0Lm5hbWVbMF0uc3Vic3RyaW5nKGxhc3RpbmRleE9mTmFtZSArIDEsIHNlbGYuaW1nTGlzdC5uYW1lWzBdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWJqeS9memimOebruWbvueJh1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaTxzZWxmLmltZ0xpc3QubmFtZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0aW5kZXhPZk5hbWUgPSBzZWxmLmltZ0xpc3QubmFtZVtpXS5sYXN0SW5kZXhPZihcIi9cIilcclxuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJFbmFtZVBhdGhcIl0gKz0gXCI7ZXhlcmNpc2UvXCIgKyBzZWxmLmltZ0xpc3QubmFtZVtpXS5zdWJzdHJpbmcobGFzdGluZGV4T2ZOYW1lICsgMSwgc2VsZi5pbWdMaXN0Lm5hbWVbaV0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHNlbGYuYXVkaW9VcGxvYWRQYXRoIT0nJyAmJiBzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1bc2VsZi50eXBlSW5kZXhdPT0n5ZCs5YaZJyl7Ly8g6Z+z6aKR5LiK5LygXHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkKHNlbGYsIGZhaWxVcClcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0aW5kZXhPZkF1ZGlvID0gc2VsZi5hdWRpb1VwbG9hZFBhdGgubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVuYW1lUGF0aFwiXSA9IFwiZXhlcmNpc2UvXCIgKyBzZWxmLmF1ZGlvVXBsb2FkUGF0aC5zdWJzdHJpbmcobGFzdGluZGV4T2ZBdWRpbyArIDEsIHNlbGYuYXVkaW9VcGxvYWRQYXRoLmxlbmd0aClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5pbWdMaXN0LmFuc3dlci5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gc2VsZi5pbWdMaXN0LmFuc3dlci5sZW5ndGg7IC8v5oC75pWwXHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLHNlbGYuaW1nTGlzdC5hbnN3ZXIsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgaWYoZmFpbFVwPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiK5Lyg5Zu+54mH5Ye66ZSZJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvL+W7tui/n+aXtumXtCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDlpITnkIbnrZTmoYjlm77niYfnrKzkuIDkuKpcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0aW5kZXhPZkFuc3dlciA9IHNlbGYuaW1nTGlzdC5hbnN3ZXJbMF0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJFYW5zd2VyUGF0aFwiXSA9IHNlbGYuaW1nTGlzdC5hbnN3ZXIubGVuZ3RoID09IDA/IFwiXCIgOiBcImV4ZXJjaXNlL1wiICsgc2VsZi5pbWdMaXN0LmFuc3dlclswXS5zdWJzdHJpbmcobGFzdGluZGV4T2ZBbnN3ZXIgKyAxLCBzZWxmLmltZ0xpc3QuYW5zd2VyWzBdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWJqeS9meetlOahiOWbvueJh1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaTxzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RpbmRleE9mQW5zd2VyID0gc2VsZi5pbWdMaXN0LmFuc3dlcltpXS5sYXN0SW5kZXhPZihcIi9cIilcclxuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJFYW5zd2VyUGF0aFwiXSArPSBcIjtleGVyY2lzZS9cIiArIHNlbGYuaW1nTGlzdC5hbnN3ZXJbaV0uc3Vic3RyaW5nKGxhc3RpbmRleE9mQW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0LmFuc3dlcltpXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbmRGb3JtRGF0YSlcclxuICAgICAgICAgICAgaWYoZmFpbFVwID09IDApIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvaW5zZXJ0X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yib5bu65oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmAkuW9kuaWueW8j+S4iuS8oOWkmuW8oOWbvueJh1xyXG4gICAgcmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKXtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogaW1nUGF0aHNbY291bnRdLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJpbWFnZXMvZXhlcmNpc2VcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGlmIChlLmRhdGEuQ29kZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip/nrKxcIiArIGNvdW50ICsgXCLlvKBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NVcCsrOy8v5oiQ5YqfKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChlKXtcclxuICAgICAgICAgICAgICAgIGZhaWxVcCsrOy8v5aSx6LSlKzFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGUoZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA9PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocyxzdWNjZXNzVXAsIGZhaWxVcCwgY291bnQsIGxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4iuS8oOmfs+mikVxyXG4gICAgYXVkaW9VcGxvYWQoc2VsZiwgZmFpbFVwKSB7XHJcbiAgICAgICAgd2VweS51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvdXBsb2FkX2ZpbGUnLCAvL+W8gOWPkeiAheacjeWKoeWZqCB1cmxcclxuICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgZmlsZVBhdGg6IHNlbGYuYXVkaW9VcGxvYWRQYXRoLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJhdWRpb3MvZXhlcmNpc2VcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2V6Z+z5L+d5a2Y5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZSl7XHJcbiAgICAgICAgICAgICAgICBmYWlsVXArK1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZXpn7Pkv53lrZjlpLHotKVcIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=