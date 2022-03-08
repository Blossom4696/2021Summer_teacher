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
            wrongproblem: {},
            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            Wid: -1,
            radioGroupItems: [{ value: 'from-db', name: '从习题库中选取', checked: true }, { value: 'from-self', name: '自行添加', checked: false }],
            imgList: {
                name: [],
                answer: [],
                myAnswer: []
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
            radioChange: function radioChange(e) {
                var self = this;
                var items = self.radioGroupItems;
                for (var i = 0, len = items.length; i < len; ++i) {
                    items[i].checked = items[i].value === e.detail.value;
                }
                self.radioGroupItems = items;
            },
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
                sendFormData["Wid"] = Number(self.Wid);

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
                    sendFormData["WproblemPath"] = self.imgList.name.length == 0 ? "" : "wrong_problem/" + self.imgList.name[0].substring(lastindexOfName + 1, self.imgList.name[0].length);
                    // 处理剩余题目图片
                    for (var i = 1; i < self.imgList.name.length; i++) {
                        lastindexOfName = self.imgList.name[i].lastIndexOf("/");
                        sendFormData["WproblemPath"] += ";wrong_problem/" + self.imgList.name[i].substring(lastindexOfName + 1, self.imgList.name[i].length);
                    }
                } else if (self.audioUploadPath != '' && self.typePicker[self.subjectPicker[self.subjectIndex]][self.typeIndex] == '听写') {
                    // 音频上传
                    self.audioUpload(self, failUp);
                    var lastindexOfAudio = self.audioUploadPath.lastIndexOf("/");

                    sendFormData["WproblemPath"] = "wrong_problem/" + self.audioUploadPath.substring(lastindexOfAudio + 1, self.audioUploadPath.length);
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
                    sendFormData["WanswerPath"] = self.imgList.answer.length == 0 ? "" : "wrong_problem/" + self.imgList.answer[0].substring(lastindexOfAnswer + 1, self.imgList.answer[0].length);
                    for (var _i = 1; _i < self.imgList.answer.length; _i++) {
                        lastindexOfAnswer = self.imgList.answer[_i].lastIndexOf("/");
                        sendFormData["WanswerPath"] += ";wrong_problem/" + self.imgList.answer[_i].substring(lastindexOfAnswer + 1, self.imgList.answer[_i].length);
                    }
                }

                if (self.imgList.myAnswer.length > 0) {
                    var _length2 = self.imgList.myAnswer.length; //总数
                    self.recursionImgUpload(self, self.imgList.myAnswer, successUp, failUp, count, _length2);
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
                    // 处理学生作答图片第一个
                    var lastindexOfMyAnswer = self.imgList.myAnswer[0].lastIndexOf("/");
                    sendFormData["WmyAnswerPath"] = self.imgList.myAnswer.length == 0 ? "" : "wrong_problem/" + self.imgList.myAnswer[0].substring(lastindexOfMyAnswer + 1, self.imgList.myAnswer[0].length);
                    for (var _i2 = 1; _i2 < self.imgList.myAnswer.length; _i2++) {
                        lastindexOfMyAnswer = self.imgList.myAnswer[_i2].lastIndexOf("/");
                        sendFormData["WmyAnswerPath"] += ";wrong_problem/" + self.imgList.myAnswer[_i2].substring(lastindexOfMyAnswer + 1, self.imgList.myAnswer[_i2].length);
                    }
                }

                console.log(sendFormData);

                if (failUp == 0) {
                    _wepy2.default.request({
                        url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/update_wrong_problem',
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
                    dirName: "images/wrong_problem"
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
                    dirName: "audios/wrong_problem"
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
                if (self.gradePicker[i] == self.wrongproblem.Wgrade) {
                    self.gradeIndex = i;
                }
            }
            for (var _i3 = 0; _i3 < self.subjectPicker.length; _i3++) {
                if (self.subjectPicker[_i3] == self.wrongproblem.Wsubject) {
                    self.subjectIndex = _i3;
                }
            }
            for (var _i4 = 0; _i4 < self.typePicker[self.subjectPicker[self.subjectIndex]].length; _i4++) {
                if (self.typePicker[self.subjectPicker[self.subjectIndex]][_i4] == self.wrongproblem.Wtype) {
                    self.typeIndex = _i4;
                }
            }
            for (var _i5 = 0; _i5 < self.difficultyPicker.length; _i5++) {
                if (self.difficultyPicker[_i5] == self.wrongproblem.Wdifficulty) {
                    self.difficultyIndex = _i5;
                }
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Wid = options.wid;

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/get_wrong_problem',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    Wid: self.Wid
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.wrongproblem = res.data.Data;
                        if (self.wrongproblem.Wtype != "听写") {
                            if (res.data.Data.WproblemPath != "") {
                                var tmpList = res.data.Data.WproblemPath.split(";");
                                self.imgList.name = tmpList.map(function (x) {
                                    return self.imageUrl + x;
                                });
                            }
                        } else {
                            self.audioUploadPath = self.audioUrl + self.wrongproblem.WproblemPath;
                            self.audioName = self.wrongproblem.WproblemPath.length > 15 ? '未知音频.mp3' : self.wrongproblem.WproblemPath;
                        }

                        if (res.data.Data.WanswerPath != "") {
                            var _tmpList = res.data.Data.WanswerPath.split(";");
                            self.imgList.answer = _tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.WmyAnswerPath != "") {
                            var _tmpList2 = res.data.Data.WmyAnswerPath.split(";");
                            self.imgList.myAnswer = _tmpList2.map(function (x) {
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/edit-wrongproblem'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtd3Jvbmdwcm9ibGVtLmpzIl0sIm5hbWVzIjpbInJlY29kZXJNYW5hZ2VyIiwid3giLCJnZXRSZWNvcmRlck1hbmFnZXIiLCJpbm5lckF1ZGlvQ29udGV4dCIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiSW5kZXgiLCJkYXRhIiwid3Jvbmdwcm9ibGVtIiwiaW1hZ2VVcmwiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsImF1ZGlvVXJsIiwiV2lkIiwicmFkaW9Hcm91cEl0ZW1zIiwidmFsdWUiLCJuYW1lIiwiY2hlY2tlZCIsImltZ0xpc3QiLCJhbnN3ZXIiLCJteUFuc3dlciIsImdyYWRlUGlja2VyIiwic3ViamVjdFBpY2tlciIsInR5cGVQaWNrZXIiLCJkaWZmaWN1bHR5UGlja2VyIiwiZ3JhZGVJbmRleCIsInN1YmplY3RJbmRleCIsInR5cGVJbmRleCIsImRpZmZpY3VsdHlJbmRleCIsIm5hbWVVcGxvYWRQYXRoIiwiYW5zd2VyVXBsb2FkUGF0aCIsImF1ZGlvVXBsb2FkUGF0aCIsInJlY29yZGluZ1RpbWVxd2UiLCJzZXRJbnRlciIsImR1cmF0aW9uIiwiYXVkaW9TZWxlY3RMaXN0IiwiYXVkaW9OYW1lIiwibWV0aG9kcyIsInJhZGlvQ2hhbmdlIiwiZSIsInNlbGYiLCJpdGVtcyIsImkiLCJsZW4iLCJsZW5ndGgiLCJkZXRhaWwiLCJwaWNrZXJEaWZmaWN1bHR5Q2hhbmdlIiwicGlja2VyR3JhZGVDaGFuZ2UiLCJwaWNrZXJTdWJqZWN0Q2hhbmdlIiwicGlja2VyVHlwZUNoYW5nZSIsImF1ZGlvU2VsZWN0UmFkaW9DaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiQ2hvb3NlSW1hZ2UiLCJmaWxlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsImNvbmNhdCIsInRlbXBGaWxlUGF0aHMiLCIkYXBwbHkiLCJWaWV3SW1hZ2UiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiY3VycmVudCIsInVybCIsIkRlbEltZyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbFRleHQiLCJjb25maXJtVGV4dCIsImNvbmZpcm0iLCJzcGxpY2UiLCJpbmRleCIsInN0YXJ0UmVjb3JkIiwib3B0aW9ucyIsInNhbXBsZVJhdGUiLCJudW1iZXJPZkNoYW5uZWxzIiwiZW5jb2RlQml0UmF0ZSIsImZvcm1hdCIsImZyYW1lU2l6ZSIsInN0YXJ0Iiwib25TdGFydCIsImVuZFJlY29yZCIsInN0b3AiLCJvblN0b3AiLCJ0ZW1wRmlsZVBhdGgiLCJNYXRoIiwiZmxvb3IiLCJzaG93VG9hc3QiLCJvbkNsaWNrUGxheVJlY29yZCIsInNyYyIsInBsYXkiLCJvbkVuZGVkIiwib25DbGlja1VwbG9hZE1QMyIsImNob29zZU1lc3NhZ2VGaWxlIiwidHlwZSIsInRlbXBGaWxlcyIsImluZGV4T2YiLCJwYXRoIiwiZm9ybVN1Ym1pdCIsInNlbmRGb3JtRGF0YSIsIk51bWJlciIsInN1Y2Nlc3NVcCIsImZhaWxVcCIsInJlY3Vyc2lvbkltZ1VwbG9hZCIsImljb24iLCJtYXNrIiwibGFzdGluZGV4T2ZOYW1lIiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJhdWRpb1VwbG9hZCIsImxhc3RpbmRleE9mQXVkaW8iLCJsYXN0aW5kZXhPZkFuc3dlciIsImxhc3RpbmRleE9mTXlBbnN3ZXIiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwiQ29kZSIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImltZ1BhdGhzIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJkaXJOYW1lIiwiV2dyYWRlIiwiV3N1YmplY3QiLCJXdHlwZSIsIldkaWZmaWN1bHR5Iiwid2lkIiwiRGF0YSIsIldwcm9ibGVtUGF0aCIsInRtcExpc3QiLCJzcGxpdCIsIm1hcCIsIngiLCJXYW5zd2VyUGF0aCIsIldteUFuc3dlclBhdGgiLCJmaW5kSW5kZXgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFGQSxJQUFNQSxpQkFBaUJDLEdBQUdDLGtCQUFILEVBQXZCO0FBQ0EsSUFBTUMsb0JBQW9CRixHQUFHRyx1QkFBSCxFQUExQjs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFLO0FBQ0RDLDBCQUFhLEVBRFo7QUFFREMsc0JBQVNDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMkJBRjlDO0FBR0RDLHNCQUFTSixlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLDJCQUg5QztBQUlERSxpQkFBSyxDQUFDLENBSkw7QUFLREMsNkJBQWlCLENBQ2IsRUFBQ0MsT0FBTSxTQUFQLEVBQWtCQyxNQUFLLFNBQXZCLEVBQWtDQyxTQUFTLElBQTNDLEVBRGEsRUFFYixFQUFDRixPQUFNLFdBQVAsRUFBb0JDLE1BQUssTUFBekIsRUFBaUNDLFNBQVMsS0FBMUMsRUFGYSxDQUxoQjtBQVNEQyxxQkFBUztBQUNMRixzQkFBSyxFQURBO0FBRUxHLHdCQUFPLEVBRkY7QUFHTEMsMEJBQVM7QUFISixhQVRSO0FBY0RDLHlCQUFZLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxNQUFmLEVBQXNCLE1BQXRCLEVBQTZCLE1BQTdCLEVBQW9DLE1BQXBDLENBZFg7QUFlREMsMkJBQWMsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0IsSUFBaEIsQ0FmYjtBQWdCREMsd0JBQVc7QUFDUCxzQkFBSyxDQUFDLElBQUQsRUFBTSxJQUFOLENBREU7QUFFUCxzQkFBSyxDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsS0FBYixDQUZFO0FBR1Asc0JBQUssQ0FBQyxJQUFELEVBQU0sSUFBTixDQUhFO0FBSVAsc0JBQUssQ0FBQyxLQUFELEVBQU8sS0FBUCxFQUFhLEtBQWI7QUFKRSxhQWhCVjtBQXNCREMsOEJBQWtCLENBQ2QsSUFEYyxFQUVkLElBRmMsRUFHZCxJQUhjLEVBSWQsSUFKYyxDQXRCakI7QUE0QkRDLHdCQUFXLElBNUJWO0FBNkJEQywwQkFBYSxJQTdCWjtBQThCREMsdUJBQVUsSUE5QlQ7QUErQkRDLDZCQUFnQixDQS9CZjtBQWdDREMsNEJBQWUsRUFoQ2Q7QUFpQ0RDLDhCQUFpQixFQWpDaEI7QUFrQ0RDLDZCQUFnQixFQWxDZjtBQW1DREMsOEJBQWlCLENBbkNoQixFQW1Da0I7QUFDbkJDLHNCQUFTLEVBcENSLEVBb0NXO0FBQ1pDLHNCQUFTLEVBckNSO0FBc0NEQyw2QkFBZ0IsQ0FBQztBQUNicEIsdUJBQU8sR0FETTtBQUViQyxzQkFBTSxNQUZPO0FBR2JDLHlCQUFTO0FBSEksYUFBRCxFQUlkO0FBQ0VGLHVCQUFPLEdBRFQ7QUFFRUMsc0JBQU0sTUFGUjtBQUdFQyx5QkFBUztBQUhYLGFBSmMsQ0F0Q2Y7QUErQ0RtQix1QkFBVztBQS9DVixTLFFBa0RMQyxPLEdBQVE7QUFDSkMsdUJBREksdUJBQ1FDLENBRFIsRUFDVTtBQUNWLG9CQUFJQyxPQUFPLElBQVg7QUFDQSxvQkFBSUMsUUFBUUQsS0FBSzFCLGVBQWpCO0FBQ0EscUJBQUssSUFBSTRCLElBQUksQ0FBUixFQUFXQyxNQUFNRixNQUFNRyxNQUE1QixFQUFvQ0YsSUFBSUMsR0FBeEMsRUFBNkMsRUFBRUQsQ0FBL0MsRUFBa0Q7QUFDOUNELDBCQUFNQyxDQUFOLEVBQVN6QixPQUFULEdBQW1Cd0IsTUFBTUMsQ0FBTixFQUFTM0IsS0FBVCxLQUFtQndCLEVBQUVNLE1BQUYsQ0FBUzlCLEtBQS9DO0FBQ0g7QUFDRHlCLHFCQUFLMUIsZUFBTCxHQUF1QjJCLEtBQXZCO0FBQ0gsYUFSRztBQVVKSyxrQ0FWSSxrQ0FVbUJQLENBVm5CLEVBVXNCO0FBQ3RCLG9CQUFJQyxPQUFPLElBQVg7QUFDQUEscUJBQUtaLGVBQUwsR0FBdUJXLEVBQUVNLE1BQUYsQ0FBUzlCLEtBQWhDO0FBQ0gsYUFiRztBQWVKZ0MsNkJBZkksNkJBZWNSLENBZmQsRUFlZ0I7QUFDaEIsb0JBQUlDLE9BQU8sSUFBWDtBQUNBQSxxQkFBS2YsVUFBTCxHQUFrQmMsRUFBRU0sTUFBRixDQUFTOUIsS0FBM0I7QUFDSCxhQWxCRztBQW9CSmlDLCtCQXBCSSwrQkFvQmdCVCxDQXBCaEIsRUFvQmtCO0FBQ2xCLG9CQUFJQyxPQUFPLElBQVg7QUFDQSxvQkFBR0EsS0FBS2QsWUFBTCxJQUFxQmEsRUFBRU0sTUFBRixDQUFTOUIsS0FBakMsRUFBdUM7QUFDbkN5Qix5QkFBS2IsU0FBTCxHQUFpQixJQUFqQjtBQUNIO0FBQ0RhLHFCQUFLZCxZQUFMLEdBQW9CYSxFQUFFTSxNQUFGLENBQVM5QixLQUE3QjtBQUVILGFBM0JHO0FBNkJKa0MsNEJBN0JJLDRCQTZCYVYsQ0E3QmIsRUE2QmU7QUFDZixvQkFBSUMsT0FBTyxJQUFYO0FBQ0FBLHFCQUFLYixTQUFMLEdBQWlCWSxFQUFFTSxNQUFGLENBQVM5QixLQUExQjtBQUNILGFBaENHO0FBa0NKbUMsa0NBbENJLGtDQWtDbUJYLENBbENuQixFQWtDc0I7QUFDdEIsb0JBQUlDLE9BQU8sSUFBWDtBQUNBVyx3QkFBUUMsR0FBUixDQUFZLDRCQUFaLEVBQTBDYixFQUFFTSxNQUFGLENBQVM5QixLQUFuRDs7QUFFQSxxQkFBSyxJQUFJMkIsSUFBSSxDQUFSLEVBQVdDLE1BQU1ILEtBQUtMLGVBQUwsQ0FBcUJTLE1BQTNDLEVBQW1ERixJQUFJQyxHQUF2RCxFQUE0RCxFQUFFRCxDQUE5RCxFQUFpRTtBQUM3REYseUJBQUtMLGVBQUwsQ0FBcUJPLENBQXJCLEVBQXdCekIsT0FBeEIsR0FBa0N1QixLQUFLTCxlQUFMLENBQXFCTyxDQUFyQixFQUF3QjNCLEtBQXhCLEtBQWtDd0IsRUFBRU0sTUFBRixDQUFTOUIsS0FBN0U7QUFDSDtBQUVKLGFBMUNHO0FBNENKc0MsdUJBNUNJLHVCQTRDUWQsQ0E1Q1IsRUE0Q1c7QUFDWCxvQkFBSUMsT0FBTyxJQUFYO0FBQ0Esb0JBQUljLE9BQU9mLEVBQUVnQixhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsSUFBbkM7QUFDQXRELG1CQUFHeUQsV0FBSCxDQUFlO0FBQ1hDLDJCQUFPLENBREksRUFDRDtBQUNWQyw4QkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBRkMsRUFFMkI7QUFDdENDLGdDQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIRDtBQUlYQyw2QkFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2QsNEJBQUl0QixLQUFLdEIsT0FBTCxDQUFhb0MsSUFBYixFQUFtQlYsTUFBbkIsSUFBNkIsQ0FBakMsRUFBb0M7QUFDaENKLGlDQUFLdEIsT0FBTCxDQUFhb0MsSUFBYixJQUFtQmQsS0FBS3RCLE9BQUwsQ0FBYW9DLElBQWIsRUFBbUJTLE1BQW5CLENBQTBCRCxJQUFJRSxhQUE5QixDQUFuQjtBQUNILHlCQUZELE1BRU87QUFDSHhCLGlDQUFLdEIsT0FBTCxDQUFhb0MsSUFBYixJQUFvQlEsSUFBSUUsYUFBeEI7QUFDSDtBQUNEeEIsNkJBQUt5QixNQUFMO0FBQ0g7QUFYVSxpQkFBZjtBQWFILGFBNURHO0FBOERKQyxxQkE5REkscUJBOERNM0IsQ0E5RE4sRUE4RFM7QUFDVCxvQkFBSUMsT0FBTyxJQUFYO0FBQ0Esb0JBQUljLE9BQU9mLEVBQUVnQixhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsSUFBbkM7QUFDQXRELG1CQUFHbUUsWUFBSCxDQUFnQjtBQUNaQywwQkFBTTVCLEtBQUt0QixPQUFMLENBQWFvQyxJQUFiLENBRE07QUFFWmUsNkJBQVM5QixFQUFFZ0IsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JjO0FBRnJCLGlCQUFoQjtBQUlILGFBckVHO0FBdUVKQyxrQkF2RUksa0JBdUVHaEMsQ0F2RUgsRUF1RU07QUFDTixvQkFBSUMsT0FBTyxJQUFYO0FBQ0Esb0JBQUljLE9BQU9mLEVBQUVnQixhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsSUFBbkM7QUFDQXRELG1CQUFHd0UsU0FBSCxDQUFhO0FBQ1RDLDJCQUFPLFFBREU7QUFFVEMsNkJBQVMsYUFGQTtBQUdUQyxnQ0FBWSxJQUhIO0FBSVRDLGlDQUFhLElBSko7QUFLVGYsNkJBQVMsc0JBQU87QUFDWiw0QkFBSUMsSUFBSWUsT0FBUixFQUFpQjtBQUNickMsaUNBQUt0QixPQUFMLENBQWFvQyxJQUFiLEVBQW1Cd0IsTUFBbkIsQ0FBMEJ2QyxFQUFFZ0IsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0J1QixLQUFsRCxFQUF5RCxDQUF6RDtBQUNBdkMsaUNBQUt5QixNQUFMO0FBQ0g7QUFDSjtBQVZRLGlCQUFiO0FBWUgsYUF0Rkc7QUF3RkplLHVCQXhGSSx1QkF3RlF6QyxDQXhGUixFQXdGVTtBQUNWLG9CQUFNMEMsVUFBVTtBQUNaL0MsOEJBQVUsS0FERTtBQUVaZ0QsZ0NBQVksS0FGQTtBQUdaQyxzQ0FBa0IsQ0FITjtBQUlaQyxtQ0FBZSxLQUpIO0FBS1pDLDRCQUFPLEtBTEs7QUFNWkMsK0JBQVc7QUFOQyxpQkFBaEI7QUFRQXZGLCtCQUFld0YsS0FBZixDQUFxQk4sT0FBckI7QUFDQWxGLCtCQUFleUYsT0FBZixDQUF1QixZQUFLO0FBQ3hCckMsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0gsaUJBRkQ7QUFHSCxhQXJHRztBQXVHSnFDLHFCQXZHSSxxQkF1R01sRCxDQXZHTixFQXVHUTtBQUNSLG9CQUFJQyxPQUFPLElBQVg7QUFDQXpDLCtCQUFlMkYsSUFBZjtBQUNBM0YsK0JBQWU0RixNQUFmLENBQXNCLFVBQUM3QixHQUFELEVBQVE7QUFDMUJYLDRCQUFRQyxHQUFSLENBQVksTUFBWixFQUFtQlUsR0FBbkI7QUFDQXRCLHlCQUFLVCxlQUFMLEdBQXVCK0IsSUFBSThCLFlBQTNCO0FBQ0FwRCx5QkFBS04sUUFBTCxHQUFnQjJELEtBQUtDLEtBQUwsQ0FBV2hDLElBQUk1QixRQUFKLEdBQWEsSUFBeEIsSUFBZ0MsR0FBaEMsR0FBc0M0QixJQUFJNUIsUUFBSixHQUFhLElBQW5ELEdBQTBELEdBQTFFO0FBQ0FNLHlCQUFLeUIsTUFBTDtBQUNBakUsdUJBQUcrRixTQUFILENBQWE7QUFDVHRCLCtCQUFNO0FBREcscUJBQWI7QUFHSCxpQkFSRDtBQVNILGFBbkhHO0FBcUhKdUIsNkJBckhJLCtCQXFIZTtBQUNmLG9CQUFJeEQsT0FBTyxJQUFYO0FBQ0F0QyxrQ0FBa0IrRixHQUFsQixHQUF3QnpELEtBQUtULGVBQTdCO0FBQ0E3QixrQ0FBa0JnRyxJQUFsQjtBQUNBaEcsa0NBQWtCaUcsT0FBbEIsQ0FBMEIsWUFBTTtBQUM1QmpHLHNDQUFrQndGLElBQWxCO0FBQ0gsaUJBRkQ7QUFHSCxhQTVIRztBQThISlUsNEJBOUhJLDRCQThIYTdELENBOUhiLEVBOEhlO0FBQ2Ysb0JBQUlDLE9BQU8sSUFBWDtBQUNBeEMsbUJBQUdxRyxpQkFBSCxDQUFxQjtBQUNqQjNDLDJCQUFPLENBRFU7QUFFakI0QywwQkFBTSxNQUZXO0FBR2pCekMsMkJBSGlCLG1CQUdUQyxHQUhTLEVBR0w7QUFDUjtBQUNBLDRCQUFHQSxJQUFJeUMsU0FBSixDQUFjLENBQWQsRUFBaUJ2RixJQUFqQixDQUFzQndGLE9BQXRCLENBQThCLE1BQTlCLEtBQXVDLENBQUMsQ0FBM0MsRUFBNkM7QUFDekNoRSxpQ0FBS1QsZUFBTCxHQUF1QitCLElBQUl5QyxTQUFKLENBQWMsQ0FBZCxFQUFpQkUsSUFBeEM7QUFDQWpFLGlDQUFLSixTQUFMLEdBQWlCMEIsSUFBSXlDLFNBQUosQ0FBYyxDQUFkLEVBQWlCdkYsSUFBbEM7QUFDQXdCLGlDQUFLeUIsTUFBTDtBQUNIO0FBRUo7QUFYZ0IsaUJBQXJCO0FBYUgsYUE3SUc7QUErSUp5QyxzQkEvSUksc0JBK0lPbkUsQ0EvSVAsRUErSVU7QUFDVixvQkFBSUMsT0FBTyxJQUFYOztBQUVBLG9CQUFJbUUsZUFBZXBFLEVBQUVNLE1BQUYsQ0FBUzlCLEtBQTVCLENBSFUsQ0FHd0I7QUFDbEM0Riw2QkFBYSxLQUFiLElBQXNCQyxPQUFPcEUsS0FBSzNCLEdBQVosQ0FBdEI7O0FBRUEsb0JBQUlnRyxZQUFZLENBQWhCLENBTlUsQ0FNUztBQUNuQixvQkFBSUMsU0FBUyxDQUFiLENBUFUsQ0FPTTtBQUNoQixvQkFBSXBELFFBQVEsQ0FBWixDQVJVLENBUUs7O0FBRWYsb0JBQUdsQixLQUFLdEIsT0FBTCxDQUFhRixJQUFiLENBQWtCNEIsTUFBbEIsR0FBeUIsQ0FBekIsSUFBOEJKLEtBQUtqQixVQUFMLENBQWdCaUIsS0FBS2xCLGFBQUwsQ0FBbUJrQixLQUFLZCxZQUF4QixDQUFoQixFQUF1RGMsS0FBS2IsU0FBNUQsS0FBd0UsSUFBekcsRUFBOEc7QUFBQztBQUMzRyx3QkFBSWlCLFNBQVNKLEtBQUt0QixPQUFMLENBQWFGLElBQWIsQ0FBa0I0QixNQUEvQixDQUQwRyxDQUNuRTtBQUN2Q0oseUJBQUt1RSxrQkFBTCxDQUF3QnZFLElBQXhCLEVBQTZCQSxLQUFLdEIsT0FBTCxDQUFhRixJQUExQyxFQUFnRDZGLFNBQWhELEVBQTJEQyxNQUEzRCxFQUFtRXBELEtBQW5FLEVBQTBFZCxNQUExRTtBQUNBLHdCQUFHa0UsU0FBTyxDQUFWLEVBQVk7QUFDUnRHLHVDQUFLdUYsU0FBTCxDQUFlO0FBQ2J0QixtQ0FBTyxRQURNLEVBQ0k7QUFDakJ1QyxrQ0FBTSxPQUZPLEVBRUU7QUFDZjlFLHNDQUFVLElBSEcsRUFHRztBQUNoQitFLGtDQUFNLElBSk8sRUFJRDtBQUNacEQscUNBQVMsc0JBQU8sQ0FBRTtBQUxMLHlCQUFmO0FBT0E7QUFDSDtBQUNEO0FBQ0Esd0JBQUlxRCxrQkFBa0IxRSxLQUFLdEIsT0FBTCxDQUFhRixJQUFiLENBQWtCLENBQWxCLEVBQXFCbUcsV0FBckIsQ0FBaUMsR0FBakMsQ0FBdEI7QUFDQVIsaUNBQWEsY0FBYixJQUErQm5FLEtBQUt0QixPQUFMLENBQWFGLElBQWIsQ0FBa0I0QixNQUFsQixJQUE0QixDQUE1QixHQUErQixFQUEvQixHQUFvQyxtQkFBbUJKLEtBQUt0QixPQUFMLENBQWFGLElBQWIsQ0FBa0IsQ0FBbEIsRUFBcUJvRyxTQUFyQixDQUErQkYsa0JBQWtCLENBQWpELEVBQW9EMUUsS0FBS3RCLE9BQUwsQ0FBYUYsSUFBYixDQUFrQixDQUFsQixFQUFxQjRCLE1BQXpFLENBQXRGO0FBQ0E7QUFDQSx5QkFBSSxJQUFJRixJQUFJLENBQVosRUFBZUEsSUFBRUYsS0FBS3RCLE9BQUwsQ0FBYUYsSUFBYixDQUFrQjRCLE1BQW5DLEVBQTBDRixHQUExQyxFQUE4QztBQUMxQ3dFLDBDQUFrQjFFLEtBQUt0QixPQUFMLENBQWFGLElBQWIsQ0FBa0IwQixDQUFsQixFQUFxQnlFLFdBQXJCLENBQWlDLEdBQWpDLENBQWxCO0FBQ0FSLHFDQUFhLGNBQWIsS0FBZ0Msb0JBQW9CbkUsS0FBS3RCLE9BQUwsQ0FBYUYsSUFBYixDQUFrQjBCLENBQWxCLEVBQXFCMEUsU0FBckIsQ0FBK0JGLGtCQUFrQixDQUFqRCxFQUFvRDFFLEtBQUt0QixPQUFMLENBQWFGLElBQWIsQ0FBa0IwQixDQUFsQixFQUFxQkUsTUFBekUsQ0FBcEQ7QUFDSDtBQUNKLGlCQXJCRCxNQXFCTyxJQUFHSixLQUFLVCxlQUFMLElBQXNCLEVBQXRCLElBQTRCUyxLQUFLakIsVUFBTCxDQUFnQmlCLEtBQUtsQixhQUFMLENBQW1Ca0IsS0FBS2QsWUFBeEIsQ0FBaEIsRUFBdURjLEtBQUtiLFNBQTVELEtBQXdFLElBQXZHLEVBQTRHO0FBQUM7QUFDaEhhLHlCQUFLNkUsV0FBTCxDQUFpQjdFLElBQWpCLEVBQXVCc0UsTUFBdkI7QUFDQSx3QkFBSVEsbUJBQW1COUUsS0FBS1QsZUFBTCxDQUFxQm9GLFdBQXJCLENBQWlDLEdBQWpDLENBQXZCOztBQUVBUixpQ0FBYSxjQUFiLElBQStCLG1CQUFtQm5FLEtBQUtULGVBQUwsQ0FBcUJxRixTQUFyQixDQUErQkUsbUJBQW1CLENBQWxELEVBQXFEOUUsS0FBS1QsZUFBTCxDQUFxQmEsTUFBMUUsQ0FBbEQ7QUFDSDs7QUFFRCxvQkFBR0osS0FBS3RCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQnlCLE1BQXBCLEdBQTJCLENBQTlCLEVBQWdDO0FBQzVCLHdCQUFJQSxVQUFTSixLQUFLdEIsT0FBTCxDQUFhQyxNQUFiLENBQW9CeUIsTUFBakMsQ0FENEIsQ0FDYTtBQUN6Q0oseUJBQUt1RSxrQkFBTCxDQUF3QnZFLElBQXhCLEVBQTZCQSxLQUFLdEIsT0FBTCxDQUFhQyxNQUExQyxFQUFrRDBGLFNBQWxELEVBQTZEQyxNQUE3RCxFQUFxRXBELEtBQXJFLEVBQTRFZCxPQUE1RTtBQUNBLHdCQUFHa0UsU0FBTyxDQUFWLEVBQVk7QUFDUnRHLHVDQUFLdUYsU0FBTCxDQUFlO0FBQ2J0QixtQ0FBTyxRQURNLEVBQ0k7QUFDakJ1QyxrQ0FBTSxPQUZPLEVBRUU7QUFDZjlFLHNDQUFVLElBSEcsRUFHRztBQUNoQitFLGtDQUFNLElBSk8sRUFJRDtBQUNacEQscUNBQVMsc0JBQU8sQ0FBRTtBQUxMLHlCQUFmO0FBT0E7QUFDSDtBQUNEO0FBQ0Esd0JBQUkwRCxvQkFBb0IvRSxLQUFLdEIsT0FBTCxDQUFhQyxNQUFiLENBQW9CLENBQXBCLEVBQXVCZ0csV0FBdkIsQ0FBbUMsR0FBbkMsQ0FBeEI7QUFDQVIsaUNBQWEsYUFBYixJQUE4Qm5FLEtBQUt0QixPQUFMLENBQWFDLE1BQWIsQ0FBb0J5QixNQUFwQixJQUE4QixDQUE5QixHQUFpQyxFQUFqQyxHQUFzQyxtQkFBbUJKLEtBQUt0QixPQUFMLENBQWFDLE1BQWIsQ0FBb0IsQ0FBcEIsRUFBdUJpRyxTQUF2QixDQUFpQ0csb0JBQW9CLENBQXJELEVBQXdEL0UsS0FBS3RCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQixDQUFwQixFQUF1QnlCLE1BQS9FLENBQXZGO0FBQ0EseUJBQUksSUFBSUYsS0FBSSxDQUFaLEVBQWVBLEtBQUVGLEtBQUt0QixPQUFMLENBQWFDLE1BQWIsQ0FBb0J5QixNQUFyQyxFQUE0Q0YsSUFBNUMsRUFBZ0Q7QUFDNUM2RSw0Q0FBb0IvRSxLQUFLdEIsT0FBTCxDQUFhQyxNQUFiLENBQW9CdUIsRUFBcEIsRUFBdUJ5RSxXQUF2QixDQUFtQyxHQUFuQyxDQUFwQjtBQUNBUixxQ0FBYSxhQUFiLEtBQStCLG9CQUFvQm5FLEtBQUt0QixPQUFMLENBQWFDLE1BQWIsQ0FBb0J1QixFQUFwQixFQUF1QjBFLFNBQXZCLENBQWlDRyxvQkFBb0IsQ0FBckQsRUFBd0QvRSxLQUFLdEIsT0FBTCxDQUFhQyxNQUFiLENBQW9CdUIsRUFBcEIsRUFBdUJFLE1BQS9FLENBQW5EO0FBQ0g7QUFDSjs7QUFFRCxvQkFBR0osS0FBS3RCLE9BQUwsQ0FBYUUsUUFBYixDQUFzQndCLE1BQXRCLEdBQTZCLENBQWhDLEVBQWtDO0FBQzlCLHdCQUFJQSxXQUFTSixLQUFLdEIsT0FBTCxDQUFhRSxRQUFiLENBQXNCd0IsTUFBbkMsQ0FEOEIsQ0FDYTtBQUMzQ0oseUJBQUt1RSxrQkFBTCxDQUF3QnZFLElBQXhCLEVBQTZCQSxLQUFLdEIsT0FBTCxDQUFhRSxRQUExQyxFQUFvRHlGLFNBQXBELEVBQStEQyxNQUEvRCxFQUF1RXBELEtBQXZFLEVBQThFZCxRQUE5RTtBQUNBLHdCQUFHa0UsU0FBTyxDQUFWLEVBQVk7QUFDUnRHLHVDQUFLdUYsU0FBTCxDQUFlO0FBQ2J0QixtQ0FBTyxRQURNLEVBQ0k7QUFDakJ1QyxrQ0FBTSxPQUZPLEVBRUU7QUFDZjlFLHNDQUFVLElBSEcsRUFHRztBQUNoQitFLGtDQUFNLElBSk8sRUFJRDtBQUNacEQscUNBQVMsc0JBQU8sQ0FBRTtBQUxMLHlCQUFmO0FBT0E7QUFDSDtBQUNEO0FBQ0Esd0JBQUkyRCxzQkFBc0JoRixLQUFLdEIsT0FBTCxDQUFhRSxRQUFiLENBQXNCLENBQXRCLEVBQXlCK0YsV0FBekIsQ0FBcUMsR0FBckMsQ0FBMUI7QUFDQVIsaUNBQWEsZUFBYixJQUFnQ25FLEtBQUt0QixPQUFMLENBQWFFLFFBQWIsQ0FBc0J3QixNQUF0QixJQUFnQyxDQUFoQyxHQUFtQyxFQUFuQyxHQUF3QyxtQkFBbUJKLEtBQUt0QixPQUFMLENBQWFFLFFBQWIsQ0FBc0IsQ0FBdEIsRUFBeUJnRyxTQUF6QixDQUFtQ0ksc0JBQXNCLENBQXpELEVBQTREaEYsS0FBS3RCLE9BQUwsQ0FBYUUsUUFBYixDQUFzQixDQUF0QixFQUF5QndCLE1BQXJGLENBQTNGO0FBQ0EseUJBQUksSUFBSUYsTUFBSSxDQUFaLEVBQWVBLE1BQUVGLEtBQUt0QixPQUFMLENBQWFFLFFBQWIsQ0FBc0J3QixNQUF2QyxFQUE4Q0YsS0FBOUMsRUFBa0Q7QUFDOUM4RSw4Q0FBc0JoRixLQUFLdEIsT0FBTCxDQUFhRSxRQUFiLENBQXNCc0IsR0FBdEIsRUFBeUJ5RSxXQUF6QixDQUFxQyxHQUFyQyxDQUF0QjtBQUNBUixxQ0FBYSxlQUFiLEtBQWlDLG9CQUFvQm5FLEtBQUt0QixPQUFMLENBQWFFLFFBQWIsQ0FBc0JzQixHQUF0QixFQUF5QjBFLFNBQXpCLENBQW1DSSxzQkFBc0IsQ0FBekQsRUFBNERoRixLQUFLdEIsT0FBTCxDQUFhRSxRQUFiLENBQXNCc0IsR0FBdEIsRUFBeUJFLE1BQXJGLENBQXJEO0FBQ0g7QUFDSjs7QUFFRE8sd0JBQVFDLEdBQVIsQ0FBWXVELFlBQVo7O0FBRUEsb0JBQUdHLFVBQVUsQ0FBYixFQUFnQjtBQUNadEcsbUNBQUtpSCxPQUFMLENBQWE7QUFDVG5ELDZCQUFJOUQsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyx5Q0FEakM7QUFFVCtHLGdDQUFPLEtBRkU7QUFHVHJILDhCQUFNc0csWUFIRztBQUlUZ0IsZ0NBQVFuSCxlQUFLQyxTQUFMLENBQWVtSCxTQUFmLEVBSkM7QUFLVC9ELGlDQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJYLG9DQUFRQyxHQUFSLENBQVlVLEdBQVo7QUFDQSxnQ0FBSUEsSUFBSXpELElBQUosQ0FBU3dILElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkJySCwrQ0FBS3VGLFNBQUwsQ0FBZTtBQUNYdEIsMkNBQU8sTUFESSxFQUNJO0FBQ2Z1QywwQ0FBTSxTQUZLLEVBRU07QUFDakI5RSw4Q0FBVSxJQUhDLEVBR0s7QUFDaEIrRSwwQ0FBTSxJQUpLLEVBSUM7QUFDWnBELDZDQUFTLG1CQUFVO0FBQ2ZpRSxtREFBVyxZQUFVO0FBQ2pCdEgsMkRBQUt1SCxZQUFMLENBQWtCO0FBQ2RDLHVEQUFPO0FBRE8sNkNBQWxCO0FBR0gseUNBSkQsRUFJRyxJQUpIO0FBTUg7QUFaVSxpQ0FBZjtBQWNIO0FBQ0o7QUF2QlEscUJBQWI7QUF5Qkg7QUFDSjtBQTlQRyxTOzs7Ozs7O0FBaVFSOzJDQUNtQnhGLEksRUFBS3lGLFEsRUFBVXBCLFMsRUFBV0MsTSxFQUFRcEQsSyxFQUFPZCxNLEVBQU87QUFBQTs7QUFDL0RwQywyQkFBSzBILFVBQUw7QUFDSTVELHFCQUFLOUQsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyx1QkFEL0MsRUFDd0U7QUFDcEVnSCx3QkFBUW5ILGVBQUtDLFNBQUwsQ0FBZW1ILFNBQWYsRUFGWjtBQUdJTywwQkFBVUYsU0FBU3ZFLEtBQVQsQ0FIZCxFQUcrQjtBQUMzQjFDLHNCQUFNLFlBSlYsRUFJd0I7QUFDcEJvSCwwQkFBUztBQUNMQyw2QkFBUTtBQURIO0FBTGIsMkRBUVk7QUFDSixnQ0FBZ0I7QUFEWixhQVJaLGlFQVdZOUYsQ0FYWixFQVdjO0FBQ04sb0JBQUlBLEVBQUVsQyxJQUFGLENBQU93SCxJQUFQLElBQWEsQ0FBakIsRUFBbUI7QUFDZjFFLDRCQUFRQyxHQUFSLENBQVksVUFBVU0sS0FBVixHQUFrQixHQUE5QjtBQUNIO0FBQ0RtRCw0QkFKTSxDQUlNO0FBQ2YsYUFoQkwsMkRBaUJTdEUsQ0FqQlQsRUFpQlc7QUFDSHVFLHlCQURHLENBQ007QUFDWixhQW5CTCxtRUFvQmF2RSxDQXBCYixFQW9CZTs7QUFFUG1CO0FBQ0Esb0JBQUdBLFNBQVNkLE1BQVosRUFBb0I7QUFDaEJPLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNILGlCQUZELE1BRUs7QUFDRFoseUJBQUt1RSxrQkFBTCxDQUF3QnZFLElBQXhCLEVBQTZCeUYsUUFBN0IsRUFBc0NwQixTQUF0QyxFQUFpREMsTUFBakQsRUFBeURwRCxLQUF6RCxFQUFnRWQsTUFBaEU7QUFDSDtBQUNKLGFBNUJMO0FBK0JIOztBQUVEOzs7O29DQUNZSixJLEVBQU1zRSxNLEVBQVE7QUFBQTs7QUFDdEJ0RywyQkFBSzBILFVBQUw7QUFDSTVELHFCQUFLOUQsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyx1QkFEL0MsRUFDd0U7QUFDcEVnSCx3QkFBUW5ILGVBQUtDLFNBQUwsQ0FBZW1ILFNBQWYsRUFGWjtBQUdJTywwQkFBVTNGLEtBQUtULGVBSG5CLEVBR29DO0FBQ2hDZixzQkFBTSxZQUpWLEVBSXdCO0FBQ3BCb0gsMEJBQVM7QUFDTEMsNkJBQVE7QUFESDtBQUxiLDREQVFZO0FBQ0osZ0NBQWdCO0FBRFosYUFSWixrRUFXWTlGLENBWFosRUFXYztBQUNOWSx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSCxhQWJMLDREQWNTYixDQWRULEVBY1c7QUFDSHVFO0FBQ0EzRCx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDSCxhQWpCTDtBQW1CSDs7O29DQUVVO0FBQ1AsZ0JBQUlaLE9BQU8sSUFBWDtBQUNBLGlCQUFJLElBQUlFLElBQUUsQ0FBVixFQUFZQSxJQUFFRixLQUFLbkIsV0FBTCxDQUFpQnVCLE1BQS9CLEVBQXNDRixHQUF0QyxFQUEwQztBQUN0QyxvQkFBR0YsS0FBS25CLFdBQUwsQ0FBaUJxQixDQUFqQixLQUF1QkYsS0FBS2xDLFlBQUwsQ0FBa0JnSSxNQUE1QyxFQUFtRDtBQUMvQzlGLHlCQUFLZixVQUFMLEdBQWtCaUIsQ0FBbEI7QUFDSDtBQUNKO0FBQ0QsaUJBQUksSUFBSUEsTUFBRSxDQUFWLEVBQVlBLE1BQUVGLEtBQUtsQixhQUFMLENBQW1Cc0IsTUFBakMsRUFBd0NGLEtBQXhDLEVBQTRDO0FBQ3hDLG9CQUFHRixLQUFLbEIsYUFBTCxDQUFtQm9CLEdBQW5CLEtBQXlCRixLQUFLbEMsWUFBTCxDQUFrQmlJLFFBQTlDLEVBQXVEO0FBQ25EL0YseUJBQUtkLFlBQUwsR0FBb0JnQixHQUFwQjtBQUNIO0FBQ0o7QUFDRCxpQkFBSSxJQUFJQSxNQUFFLENBQVYsRUFBWUEsTUFBRUYsS0FBS2pCLFVBQUwsQ0FBZ0JpQixLQUFLbEIsYUFBTCxDQUFtQmtCLEtBQUtkLFlBQXhCLENBQWhCLEVBQXVEa0IsTUFBckUsRUFBNEVGLEtBQTVFLEVBQWdGO0FBQzVFLG9CQUFHRixLQUFLakIsVUFBTCxDQUFnQmlCLEtBQUtsQixhQUFMLENBQW1Ca0IsS0FBS2QsWUFBeEIsQ0FBaEIsRUFBdURnQixHQUF2RCxLQUE2REYsS0FBS2xDLFlBQUwsQ0FBa0JrSSxLQUFsRixFQUF3RjtBQUNwRmhHLHlCQUFLYixTQUFMLEdBQWlCZSxHQUFqQjtBQUNIO0FBQ0o7QUFDRCxpQkFBSSxJQUFJQSxNQUFFLENBQVYsRUFBWUEsTUFBRUYsS0FBS2hCLGdCQUFMLENBQXNCb0IsTUFBcEMsRUFBMkNGLEtBQTNDLEVBQStDO0FBQzNDLG9CQUFHRixLQUFLaEIsZ0JBQUwsQ0FBc0JrQixHQUF0QixLQUE0QkYsS0FBS2xDLFlBQUwsQ0FBa0JtSSxXQUFqRCxFQUE2RDtBQUN6RGpHLHlCQUFLWixlQUFMLEdBQXVCYyxHQUF2QjtBQUNIO0FBQ0o7QUFDSjs7OytCQUVNdUMsTyxFQUFTO0FBQ1osZ0JBQUl6QyxPQUFPLElBQVg7O0FBRUFBLGlCQUFLM0IsR0FBTCxHQUFXb0UsUUFBUXlELEdBQW5COztBQUVBbEksMkJBQUtpSCxPQUFMLENBQWE7QUFDTG5ELHFCQUFJOUQsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxTQUExQixHQUFzQyxzQ0FEckM7QUFFTCtHLHdCQUFPLEtBRkY7QUFHTEMsd0JBQVFuSCxlQUFLQyxTQUFMLENBQWVtSCxTQUFmLEVBSEg7QUFJTHZILHNCQUFLO0FBQ0RRLHlCQUFJMkIsS0FBSzNCO0FBRFIsaUJBSkE7QUFPTGdELHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJYLDRCQUFRQyxHQUFSLENBQVlVLEdBQVo7QUFDQSx3QkFBSUEsSUFBSXpELElBQUosQ0FBU3dILElBQVQsSUFBaUIsQ0FBckIsRUFBdUI7QUFDbkJyRiw2QkFBS2xDLFlBQUwsR0FBb0J3RCxJQUFJekQsSUFBSixDQUFTc0ksSUFBN0I7QUFDQSw0QkFBR25HLEtBQUtsQyxZQUFMLENBQWtCa0ksS0FBbEIsSUFBeUIsSUFBNUIsRUFBaUM7QUFDN0IsZ0NBQUcxRSxJQUFJekQsSUFBSixDQUFTc0ksSUFBVCxDQUFjQyxZQUFkLElBQTRCLEVBQS9CLEVBQWtDO0FBQzlCLG9DQUFJQyxVQUFVL0UsSUFBSXpELElBQUosQ0FBU3NJLElBQVQsQ0FBY0MsWUFBZCxDQUEyQkUsS0FBM0IsQ0FBaUMsR0FBakMsQ0FBZDtBQUNBdEcscUNBQUt0QixPQUFMLENBQWFGLElBQWIsR0FBb0I2SCxRQUFRRSxHQUFSLENBQVk7QUFBQSwyQ0FBS3ZHLEtBQUtqQyxRQUFMLEdBQWdCeUksQ0FBckI7QUFBQSxpQ0FBWixDQUFwQjtBQUNIO0FBQ0oseUJBTEQsTUFLTTtBQUNGeEcsaUNBQUtULGVBQUwsR0FBdUJTLEtBQUs1QixRQUFMLEdBQWdCNEIsS0FBS2xDLFlBQUwsQ0FBa0JzSSxZQUF6RDtBQUNBcEcsaUNBQUtKLFNBQUwsR0FBaUJJLEtBQUtsQyxZQUFMLENBQWtCc0ksWUFBbEIsQ0FBK0JoRyxNQUEvQixHQUFzQyxFQUF0QyxHQUF5QyxVQUF6QyxHQUFvREosS0FBS2xDLFlBQUwsQ0FBa0JzSSxZQUF2RjtBQUNIOztBQUVELDRCQUFHOUUsSUFBSXpELElBQUosQ0FBU3NJLElBQVQsQ0FBY00sV0FBZCxJQUEyQixFQUE5QixFQUFpQztBQUM3QixnQ0FBSUosV0FBVS9FLElBQUl6RCxJQUFKLENBQVNzSSxJQUFULENBQWNNLFdBQWQsQ0FBMEJILEtBQTFCLENBQWdDLEdBQWhDLENBQWQ7QUFDQXRHLGlDQUFLdEIsT0FBTCxDQUFhQyxNQUFiLEdBQXNCMEgsU0FBUUUsR0FBUixDQUFZO0FBQUEsdUNBQUt2RyxLQUFLakMsUUFBTCxHQUFnQnlJLENBQXJCO0FBQUEsNkJBQVosQ0FBdEI7QUFDSDtBQUNELDRCQUFHbEYsSUFBSXpELElBQUosQ0FBU3NJLElBQVQsQ0FBY08sYUFBZCxJQUE2QixFQUFoQyxFQUFtQztBQUMvQixnQ0FBSUwsWUFBVS9FLElBQUl6RCxJQUFKLENBQVNzSSxJQUFULENBQWNPLGFBQWQsQ0FBNEJKLEtBQTVCLENBQWtDLEdBQWxDLENBQWQ7QUFDQXRHLGlDQUFLdEIsT0FBTCxDQUFhRSxRQUFiLEdBQXdCeUgsVUFBUUUsR0FBUixDQUFZO0FBQUEsdUNBQUt2RyxLQUFLakMsUUFBTCxHQUFnQnlJLENBQXJCO0FBQUEsNkJBQVosQ0FBeEI7QUFDSDtBQUNEeEcsNkJBQUsyRyxTQUFMO0FBQ0EzRyw2QkFBS3lCLE1BQUw7QUFDSDtBQUNKO0FBaENJLGFBQWI7QUFtQ0g7Ozs7RUE5YThCekQsZUFBSzRJLEk7O2tCQUFuQmhKLEsiLCJmaWxlIjoiZWRpdC13cm9uZ3Byb2JsZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgcmVjb2Rlck1hbmFnZXIgPSB3eC5nZXRSZWNvcmRlck1hbmFnZXIoKVxyXG5jb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHd4LmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0KClcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2V7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICB3cm9uZ3Byb2JsZW06e30sXHJcbiAgICAgICAgaW1hZ2VVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXHJcbiAgICAgICAgYXVkaW9Vcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9hdWRpbz9uYW1lPScsXHJcbiAgICAgICAgV2lkOiAtMSxcclxuICAgICAgICByYWRpb0dyb3VwSXRlbXM6IFtcclxuICAgICAgICAgICAge3ZhbHVlOidmcm9tLWRiJywgbmFtZTon5LuO5Lmg6aKY5bqT5Lit6YCJ5Y+WJywgY2hlY2tlZDogdHJ1ZX0sXHJcbiAgICAgICAgICAgIHt2YWx1ZTonZnJvbS1zZWxmJywgbmFtZTon6Ieq6KGM5re75YqgJywgY2hlY2tlZDogZmFsc2V9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpbWdMaXN0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6W10sXHJcbiAgICAgICAgICAgIGFuc3dlcjpbXSxcclxuICAgICAgICAgICAgbXlBbnN3ZXI6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+S4g+W5tOe6p+S4iicsJ+S4g+W5tOe6p+S4iycsJ+WFq+W5tOe6p+S4iicsJ+WFq+W5tOe6p+S4iycsJ+S5neW5tOe6p+S4iicsJ+S5neW5tOe6p+S4iyddLFxyXG4gICAgICAgIHN1YmplY3RQaWNrZXI6Wyfor63mlocnLCfmlbDlraYnLCfoi7Hor60nLCfniannkIYnXSxcclxuICAgICAgICB0eXBlUGlja2VyOntcclxuICAgICAgICAgICAgJ+ivreaWhyc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+aVsOWtpic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICAgICAgJ+iLseivrSc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+eJqeeQhic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZpY3VsdHlQaWNrZXI6IFtcclxuICAgICAgICAgICAgJ+eugOWNlScsXHJcbiAgICAgICAgICAgICfkuK3nrYknLFxyXG4gICAgICAgICAgICAn5Zuw6Zq+JyxcclxuICAgICAgICAgICAgJ+ernui1mycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBncmFkZUluZGV4Om51bGwsXHJcbiAgICAgICAgc3ViamVjdEluZGV4Om51bGwsXHJcbiAgICAgICAgdHlwZUluZGV4Om51bGwsXHJcbiAgICAgICAgZGlmZmljdWx0eUluZGV4OjAsXHJcbiAgICAgICAgbmFtZVVwbG9hZFBhdGg6XCJcIixcclxuICAgICAgICBhbnN3ZXJVcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgYXVkaW9VcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgcmVjb3JkaW5nVGltZXF3ZTowLC8v5b2V6Z+z6K6h5pe2XHJcbiAgICAgICAgc2V0SW50ZXI6XCJcIiwvL+W9lemfs+WQjeensFxyXG4gICAgICAgIGR1cmF0aW9uOlwiXCIsXHJcbiAgICAgICAgYXVkaW9TZWxlY3RMaXN0Olt7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjBcIixcclxuICAgICAgICAgICAgbmFtZTogXCLmlofku7bkuIrkvKBcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIuiHquihjOW9lemfs1wiLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICB9XSxcclxuICAgICAgICBhdWRpb05hbWU6IG51bGwsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICAgcmFkaW9DaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBzZWxmLnJhZGlvR3JvdXBJdGVtc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zW2ldLmNoZWNrZWQgPSBpdGVtc1tpXS52YWx1ZSA9PT0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnJhZGlvR3JvdXBJdGVtcyA9IGl0ZW1zXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyRGlmZmljdWx0eUNoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRpZmZpY3VsdHlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyR3JhZGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmdyYWRlSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpY2tlclN1YmplY3RDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpZihzZWxmLnN1YmplY3RJbmRleCAhPSBlLmRldGFpbC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnR5cGVJbmRleCA9IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnN1YmplY3RJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpY2tlclR5cGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLnR5cGVJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9TZWxlY3RSYWRpb0NoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmFkaW/lj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGYuYXVkaW9TZWxlY3RMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvU2VsZWN0TGlzdFtpXS5jaGVja2VkID0gc2VsZi5hdWRpb1NlbGVjdExpc3RbaV0udmFsdWUgPT09IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQ2hvb3NlSW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiA5LCAvL+m7mOiupDlcclxuICAgICAgICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy/lj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuaW1nTGlzdFtmaWxlXS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3RbZmlsZV09c2VsZi5pbWdMaXN0W2ZpbGVdLmNvbmNhdChyZXMudGVtcEZpbGVQYXRocylcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3RbZmlsZV09IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWdMaXN0W2ZpbGVdLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIERlbEltZyhlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk6aKY55uu5Zu+54mHJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHliKDpmaTov5nlvKDlm77niYflkJfvvJ8nLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3RbZmlsZV0uc3BsaWNlKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydFJlY29yZChlKXtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcclxuICAgICAgICAgICAgICAgIHNhbXBsZVJhdGU6IDE2MDAwLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFubmVsczogMSxcclxuICAgICAgICAgICAgICAgIGVuY29kZUJpdFJhdGU6IDQ4MDAwLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OidtcDMnLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVTaXplOiA1MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLnN0YXJ0KG9wdGlvbnMpXHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLm9uU3RhcnQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+W9lemfs1wiKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVuZFJlY29yZChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLnN0b3AoKVxyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5vblN0b3AoKHJlcykgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWBnOatouW9lemfs1wiLHJlcylcclxuICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9VcGxvYWRQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxyXG4gICAgICAgICAgICAgICAgc2VsZi5kdXJhdGlvbiA9IE1hdGguZmxvb3IocmVzLmR1cmF0aW9uLzEwMDApICsgXCInXCIgKyByZXMuZHVyYXRpb24lMTAwMCArIFwic1wiXHJcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiflvZXpn7PlrozmiJAnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tQbGF5UmVjb3JkKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSBzZWxmLmF1ZGlvVXBsb2FkUGF0aFxyXG4gICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5wbGF5KCk7XHJcbiAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3RvcCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja1VwbG9hZE1QMyhlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4iuS8oOaWh+S7tuS4uk1QM+aWh+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy50ZW1wRmlsZXNbMF0ubmFtZS5pbmRleE9mKFwiLm1wM1wiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkUGF0aCA9IHJlcy50ZW1wRmlsZXNbMF0ucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvTmFtZSA9IHJlcy50ZW1wRmlsZXNbMF0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzZW5kRm9ybURhdGEgPSBlLmRldGFpbC52YWx1ZSAvLyBmb3JtIOihqOWNleaVsOaNrlxyXG4gICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJXaWRcIl0gPSBOdW1iZXIoc2VsZi5XaWQpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc1VwID0gMDsgLy/miJDlip9cclxuICAgICAgICAgICAgbGV0IGZhaWxVcCA9IDA7IC8v5aSx6LSlXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7IC8v56ys5Yeg5bygXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QubmFtZS5sZW5ndGg+MCAmJiBzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1bc2VsZi50eXBlSW5kZXhdIT0n5ZCs5YaZJyl7Ly8g5Zu+54mH5LiK5LygXHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gc2VsZi5pbWdMaXN0Lm5hbWUubGVuZ3RoOyAvL+aAu+aVsFxyXG4gICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixzZWxmLmltZ0xpc3QubmFtZSwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhumimOebruWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mTmFtZSA9IHNlbGYuaW1nTGlzdC5uYW1lWzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiV3Byb2JsZW1QYXRoXCJdID0gc2VsZi5pbWdMaXN0Lm5hbWUubGVuZ3RoID09IDA/IFwiXCIgOiBcIndyb25nX3Byb2JsZW0vXCIgKyBzZWxmLmltZ0xpc3QubmFtZVswXS5zdWJzdHJpbmcobGFzdGluZGV4T2ZOYW1lICsgMSwgc2VsZi5pbWdMaXN0Lm5hbWVbMF0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG5Ymp5L2Z6aKY55uu5Zu+54mHXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RpbmRleE9mTmFtZSA9IHNlbGYuaW1nTGlzdC5uYW1lW2ldLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldwcm9ibGVtUGF0aFwiXSArPSBcIjt3cm9uZ19wcm9ibGVtL1wiICsgc2VsZi5pbWdMaXN0Lm5hbWVbaV0uc3Vic3RyaW5nKGxhc3RpbmRleE9mTmFtZSArIDEsIHNlbGYuaW1nTGlzdC5uYW1lW2ldLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHNlbGYuYXVkaW9VcGxvYWRQYXRoIT0nJyAmJiBzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1bc2VsZi50eXBlSW5kZXhdPT0n5ZCs5YaZJyl7Ly8g6Z+z6aKR5LiK5LygXHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkKHNlbGYsIGZhaWxVcClcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0aW5kZXhPZkF1ZGlvID0gc2VsZi5hdWRpb1VwbG9hZFBhdGgubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldwcm9ibGVtUGF0aFwiXSA9IFwid3JvbmdfcHJvYmxlbS9cIiArIHNlbGYuYXVkaW9VcGxvYWRQYXRoLnN1YnN0cmluZyhsYXN0aW5kZXhPZkF1ZGlvICsgMSwgc2VsZi5hdWRpb1VwbG9hZFBhdGgubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aDsgLy/mgLvmlbBcclxuICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsc2VsZi5pbWdMaXN0LmFuc3dlciwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuetlOahiOWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mQW5zd2VyID0gc2VsZi5pbWdMaXN0LmFuc3dlclswXS5sYXN0SW5kZXhPZihcIi9cIilcclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldhbnN3ZXJQYXRoXCJdID0gc2VsZi5pbWdMaXN0LmFuc3dlci5sZW5ndGggPT0gMD8gXCJcIiA6IFwid3JvbmdfcHJvYmxlbS9cIiArIHNlbGYuaW1nTGlzdC5hbnN3ZXJbMF0uc3Vic3RyaW5nKGxhc3RpbmRleE9mQW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0LmFuc3dlclswXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPHNlbGYuaW1nTGlzdC5hbnN3ZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdGluZGV4T2ZBbnN3ZXIgPSBzZWxmLmltZ0xpc3QuYW5zd2VyW2ldLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldhbnN3ZXJQYXRoXCJdICs9IFwiO3dyb25nX3Byb2JsZW0vXCIgKyBzZWxmLmltZ0xpc3QuYW5zd2VyW2ldLnN1YnN0cmluZyhsYXN0aW5kZXhPZkFuc3dlciArIDEsIHNlbGYuaW1nTGlzdC5hbnN3ZXJbaV0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QubXlBbnN3ZXIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5teUFuc3dlci5sZW5ndGg7IC8v5oC75pWwXHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLHNlbGYuaW1nTGlzdC5teUFuc3dlciwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWtpueUn+S9nOetlOWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mTXlBbnN3ZXIgPSBzZWxmLmltZ0xpc3QubXlBbnN3ZXJbMF0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJXbXlBbnN3ZXJQYXRoXCJdID0gc2VsZi5pbWdMaXN0Lm15QW5zd2VyLmxlbmd0aCA9PSAwPyBcIlwiIDogXCJ3cm9uZ19wcm9ibGVtL1wiICsgc2VsZi5pbWdMaXN0Lm15QW5zd2VyWzBdLnN1YnN0cmluZyhsYXN0aW5kZXhPZk15QW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0Lm15QW5zd2VyWzBdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGk8c2VsZi5pbWdMaXN0Lm15QW5zd2VyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RpbmRleE9mTXlBbnN3ZXIgPSBzZWxmLmltZ0xpc3QubXlBbnN3ZXJbaV0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiV215QW5zd2VyUGF0aFwiXSArPSBcIjt3cm9uZ19wcm9ibGVtL1wiICsgc2VsZi5pbWdMaXN0Lm15QW5zd2VyW2ldLnN1YnN0cmluZyhsYXN0aW5kZXhPZk15QW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0Lm15QW5zd2VyW2ldLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG5cclxuICAgICAgICAgICAgaWYoZmFpbFVwID09IDApIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvd3JvbmdfcHJvYmxlbS91cGRhdGVfd3JvbmdfcHJvYmxlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQVVQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJywgLy/mj5DnpLrnmoTlhoXlrrksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLCAvL+WbvuaghyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMCwgLy/lu7bov5/ml7bpl7QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCS5b2S5pa55byP5LiK5Lyg5aSa5byg5Zu+54mHXHJcbiAgICByZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocywgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpe1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL3VwbG9hZF9maWxlJywgLy/lvIDlj5HogIXmnI3liqHlmaggdXJsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBpbWdQYXRoc1tjb3VudF0sIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImltYWdlcy93cm9uZ19wcm9ibGVtXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5kYXRhLkNvZGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5Yqf56ysXCIgKyBjb3VudCArIFwi5bygXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzVXArKzsvL+aIkOWKnysxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZSl7XHJcbiAgICAgICAgICAgICAgICBmYWlsVXArKzsvL+Wksei0pSsxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlKGUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrkvKDmiJDlip9cIilcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIrkvKDpn7PpopFcclxuICAgIGF1ZGlvVXBsb2FkKHNlbGYsIGZhaWxVcCkge1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL3VwbG9hZF9maWxlJywgLy/lvIDlj5HogIXmnI3liqHlmaggdXJsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBzZWxmLmF1ZGlvVXBsb2FkUGF0aCwgLy/opoHkuIrkvKDmlofku7botYTmupDnmoTot6/lvoRcclxuICAgICAgICAgICAgbmFtZTogJ3VwbG9hZEZpbGUnLCAvL+aWh+S7tuWvueW6lOeahCBrZXkgLCDlvIDlj5HogIXlnKjmnI3liqHlmajnq6/pgJrov4fov5nkuKoga2V5IOWPr+S7peiOt+WPluWIsOaWh+S7tuS6jOi/m+WItuWGheWuuVxyXG4gICAgICAgICAgICBmb3JtRGF0YTp7XHJcbiAgICAgICAgICAgICAgICBkaXJOYW1lOlwiYXVkaW9zL3dyb25nX3Byb2JsZW1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhlKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2V6Z+z5L+d5a2Y5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZSl7XHJcbiAgICAgICAgICAgICAgICBmYWlsVXArK1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZXpn7Pkv53lrZjlpLHotKVcIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kSW5kZXgoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBmb3IobGV0IGk9MDtpPHNlbGYuZ3JhZGVQaWNrZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHNlbGYuZ3JhZGVQaWNrZXJbaV0gPT0gc2VsZi53cm9uZ3Byb2JsZW0uV2dyYWRlKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ3JhZGVJbmRleCA9IGlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MDtpPHNlbGYuc3ViamVjdFBpY2tlci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoc2VsZi5zdWJqZWN0UGlja2VyW2ldID09IHNlbGYud3Jvbmdwcm9ibGVtLldzdWJqZWN0KXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3ViamVjdEluZGV4ID0gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi50eXBlUGlja2VyW3NlbGYuc3ViamVjdFBpY2tlcltzZWxmLnN1YmplY3RJbmRleF1dLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1baV0gPT0gc2VsZi53cm9uZ3Byb2JsZW0uV3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi50eXBlSW5kZXggPSBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmRpZmZpY3VsdHlQaWNrZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHNlbGYuZGlmZmljdWx0eVBpY2tlcltpXSA9PSBzZWxmLndyb25ncHJvYmxlbS5XZGlmZmljdWx0eSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRpZmZpY3VsdHlJbmRleCA9IGlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBzZWxmLldpZCA9IG9wdGlvbnMud2lkXHJcblxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC93cm9uZ19wcm9ibGVtL2dldF93cm9uZ19wcm9ibGVtJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBXaWQ6c2VsZi5XaWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLndyb25ncHJvYmxlbSA9IHJlcy5kYXRhLkRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi53cm9uZ3Byb2JsZW0uV3R5cGUhPVwi5ZCs5YaZXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5XcHJvYmxlbVBhdGghPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5XcHJvYmxlbVBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0Lm5hbWUgPSB0bXBMaXN0Lm1hcCh4ID0+IHNlbGYuaW1hZ2VVcmwgKyB4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkUGF0aCA9IHNlbGYuYXVkaW9VcmwgKyBzZWxmLndyb25ncHJvYmxlbS5XcHJvYmxlbVBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9OYW1lID0gc2VsZi53cm9uZ3Byb2JsZW0uV3Byb2JsZW1QYXRoLmxlbmd0aD4xNT8n5pyq55+l6Z+z6aKRLm1wMyc6c2VsZi53cm9uZ3Byb2JsZW0uV3Byb2JsZW1QYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGEuV2Fuc3dlclBhdGghPVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcExpc3QgPSByZXMuZGF0YS5EYXRhLldhbnN3ZXJQYXRoLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0LmFuc3dlciA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5XbXlBbnN3ZXJQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5XbXlBbnN3ZXJQYXRoLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0Lm15QW5zd2VyID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZpbmRJbmRleCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==