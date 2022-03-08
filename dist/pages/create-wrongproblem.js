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
            Sid: -1,
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
                sendFormData["Sid"] = Number(self.Sid);

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
                        url: _wepy2.default.$instance.globalData.serverUrl + '/app/wrong_problem/insert_wrong_problem',
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
        key: 'onLoad',
        value: function onLoad(options) {
            var self = this;

            self.Sid = options.sid;
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/create-wrongproblem'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS13cm9uZ3Byb2JsZW0uanMiXSwibmFtZXMiOlsicmVjb2Rlck1hbmFnZXIiLCJ3eCIsImdldFJlY29yZGVyTWFuYWdlciIsImlubmVyQXVkaW9Db250ZXh0IiwiY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQiLCJJbmRleCIsImRhdGEiLCJTaWQiLCJyYWRpb0dyb3VwSXRlbXMiLCJ2YWx1ZSIsIm5hbWUiLCJjaGVja2VkIiwiaW1nTGlzdCIsImFuc3dlciIsIm15QW5zd2VyIiwiZ3JhZGVQaWNrZXIiLCJzdWJqZWN0UGlja2VyIiwidHlwZVBpY2tlciIsImRpZmZpY3VsdHlQaWNrZXIiLCJncmFkZUluZGV4Iiwic3ViamVjdEluZGV4IiwidHlwZUluZGV4IiwiZGlmZmljdWx0eUluZGV4IiwibmFtZVVwbG9hZFBhdGgiLCJhbnN3ZXJVcGxvYWRQYXRoIiwiYXVkaW9VcGxvYWRQYXRoIiwicmVjb3JkaW5nVGltZXF3ZSIsInNldEludGVyIiwiZHVyYXRpb24iLCJhdWRpb1NlbGVjdExpc3QiLCJhdWRpb05hbWUiLCJtZXRob2RzIiwicmFkaW9DaGFuZ2UiLCJlIiwic2VsZiIsIml0ZW1zIiwiaSIsImxlbiIsImxlbmd0aCIsImRldGFpbCIsInBpY2tlckRpZmZpY3VsdHlDaGFuZ2UiLCJwaWNrZXJHcmFkZUNoYW5nZSIsInBpY2tlclN1YmplY3RDaGFuZ2UiLCJwaWNrZXJUeXBlQ2hhbmdlIiwiYXVkaW9TZWxlY3RSYWRpb0NoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJDaG9vc2VJbWFnZSIsImZpbGUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwiY29uY2F0IiwidGVtcEZpbGVQYXRocyIsIiRhcHBseSIsIlZpZXdJbWFnZSIsInByZXZpZXdJbWFnZSIsInVybHMiLCJjdXJyZW50IiwidXJsIiwiRGVsSW1nIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwiY2FuY2VsVGV4dCIsImNvbmZpcm1UZXh0IiwiY29uZmlybSIsInNwbGljZSIsImluZGV4Iiwic3RhcnRSZWNvcmQiLCJvcHRpb25zIiwic2FtcGxlUmF0ZSIsIm51bWJlck9mQ2hhbm5lbHMiLCJlbmNvZGVCaXRSYXRlIiwiZm9ybWF0IiwiZnJhbWVTaXplIiwic3RhcnQiLCJvblN0YXJ0IiwiZW5kUmVjb3JkIiwic3RvcCIsIm9uU3RvcCIsInRlbXBGaWxlUGF0aCIsIk1hdGgiLCJmbG9vciIsInNob3dUb2FzdCIsIm9uQ2xpY2tQbGF5UmVjb3JkIiwic3JjIiwicGxheSIsIm9uRW5kZWQiLCJvbkNsaWNrVXBsb2FkTVAzIiwiY2hvb3NlTWVzc2FnZUZpbGUiLCJ0eXBlIiwidGVtcEZpbGVzIiwiaW5kZXhPZiIsInBhdGgiLCJmb3JtU3VibWl0Iiwic2VuZEZvcm1EYXRhIiwiTnVtYmVyIiwic3VjY2Vzc1VwIiwiZmFpbFVwIiwicmVjdXJzaW9uSW1nVXBsb2FkIiwid2VweSIsImljb24iLCJtYXNrIiwibGFzdGluZGV4T2ZOYW1lIiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJhdWRpb1VwbG9hZCIsImxhc3RpbmRleE9mQXVkaW8iLCJsYXN0aW5kZXhPZkFuc3dlciIsImxhc3RpbmRleE9mTXlBbnN3ZXIiLCJyZXF1ZXN0IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIkNvZGUiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJpbWdQYXRocyIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsImZvcm1EYXRhIiwiZGlyTmFtZSIsInNpZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7OztBQUZBLElBQU1BLGlCQUFpQkMsR0FBR0Msa0JBQUgsRUFBdkI7QUFDQSxJQUFNQyxvQkFBb0JGLEdBQUdHLHVCQUFILEVBQTFCOztJQUVxQkMs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SXpDLE9BQU8sSUFBWDs7QUFFQUEsaUJBQUszQixHQUFMLEdBQVdvRSxRQUFReUQsR0FBbkI7QUFDSDs7OztFQS9XOEIxQixlQUFLMkIsSTs7a0JBQW5CaEksSyIsImZpbGUiOiJjcmVhdGUtd3Jvbmdwcm9ibGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHJlY29kZXJNYW5hZ2VyID0gd3guZ2V0UmVjb3JkZXJNYW5hZ2VyKClcclxuY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgZGF0YT17XHJcbiAgICAgICAgU2lkOiAtMSxcclxuICAgICAgICByYWRpb0dyb3VwSXRlbXM6IFtcclxuICAgICAgICAgICAge3ZhbHVlOidmcm9tLWRiJywgbmFtZTon5LuO5Lmg6aKY5bqT5Lit6YCJ5Y+WJywgY2hlY2tlZDogdHJ1ZX0sXHJcbiAgICAgICAgICAgIHt2YWx1ZTonZnJvbS1zZWxmJywgbmFtZTon6Ieq6KGM5re75YqgJywgY2hlY2tlZDogZmFsc2V9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpbWdMaXN0OiB7XHJcbiAgICAgICAgICAgIG5hbWU6W10sXHJcbiAgICAgICAgICAgIGFuc3dlcjpbXSxcclxuICAgICAgICAgICAgbXlBbnN3ZXI6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+S4g+W5tOe6p+S4iicsJ+S4g+W5tOe6p+S4iycsJ+WFq+W5tOe6p+S4iicsJ+WFq+W5tOe6p+S4iycsJ+S5neW5tOe6p+S4iicsJ+S5neW5tOe6p+S4iyddLFxyXG4gICAgICAgIHN1YmplY3RQaWNrZXI6Wyfor63mlocnLCfmlbDlraYnLCfoi7Hor60nLCfniannkIYnXSxcclxuICAgICAgICB0eXBlUGlja2VyOntcclxuICAgICAgICAgICAgJ+ivreaWhyc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+aVsOWtpic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICAgICAgJ+iLseivrSc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+eJqeeQhic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZpY3VsdHlQaWNrZXI6IFtcclxuICAgICAgICAgICAgJ+eugOWNlScsXHJcbiAgICAgICAgICAgICfkuK3nrYknLFxyXG4gICAgICAgICAgICAn5Zuw6Zq+JyxcclxuICAgICAgICAgICAgJ+ernui1mycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBncmFkZUluZGV4Om51bGwsXHJcbiAgICAgICAgc3ViamVjdEluZGV4Om51bGwsXHJcbiAgICAgICAgdHlwZUluZGV4Om51bGwsXHJcbiAgICAgICAgZGlmZmljdWx0eUluZGV4OjAsXHJcbiAgICAgICAgbmFtZVVwbG9hZFBhdGg6XCJcIixcclxuICAgICAgICBhbnN3ZXJVcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgYXVkaW9VcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgcmVjb3JkaW5nVGltZXF3ZTowLC8v5b2V6Z+z6K6h5pe2XHJcbiAgICAgICAgc2V0SW50ZXI6XCJcIiwvL+W9lemfs+WQjeensFxyXG4gICAgICAgIGR1cmF0aW9uOlwiXCIsXHJcbiAgICAgICAgYXVkaW9TZWxlY3RMaXN0Olt7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIjBcIixcclxuICAgICAgICAgICAgbmFtZTogXCLmlofku7bkuIrkvKBcIixcclxuICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIuiHquihjOW9lemfs1wiLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICB9XSxcclxuICAgICAgICBhdWRpb05hbWU6IG51bGwsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz17XHJcbiAgICAgICAgcmFkaW9DaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBzZWxmLnJhZGlvR3JvdXBJdGVtc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zW2ldLmNoZWNrZWQgPSBpdGVtc1tpXS52YWx1ZSA9PT0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnJhZGlvR3JvdXBJdGVtcyA9IGl0ZW1zXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyRGlmZmljdWx0eUNoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmRpZmZpY3VsdHlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGlja2VyR3JhZGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLmdyYWRlSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpY2tlclN1YmplY3RDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpZihzZWxmLnN1YmplY3RJbmRleCAhPSBlLmRldGFpbC52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnR5cGVJbmRleCA9IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnN1YmplY3RJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpY2tlclR5cGVDaGFuZ2UoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBzZWxmLnR5cGVJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXVkaW9TZWxlY3RSYWRpb0NoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmFkaW/lj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGYuYXVkaW9TZWxlY3RMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvU2VsZWN0TGlzdFtpXS5jaGVja2VkID0gc2VsZi5hdWRpb1NlbGVjdExpc3RbaV0udmFsdWUgPT09IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQ2hvb3NlSW1hZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiA5LCAvL+m7mOiupDlcclxuICAgICAgICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy/lj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuaW1nTGlzdFtmaWxlXS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3RbZmlsZV09c2VsZi5pbWdMaXN0W2ZpbGVdLmNvbmNhdChyZXMudGVtcEZpbGVQYXRocylcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3RbZmlsZV09IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdXJsczogc2VsZi5pbWdMaXN0W2ZpbGVdLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIERlbEltZyhlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk6aKY55uu5Zu+54mHJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHliKDpmaTov5nlvKDlm77niYflkJfvvJ8nLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltZ0xpc3RbZmlsZV0uc3BsaWNlKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydFJlY29yZChlKXtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcclxuICAgICAgICAgICAgICAgIHNhbXBsZVJhdGU6IDE2MDAwLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFubmVsczogMSxcclxuICAgICAgICAgICAgICAgIGVuY29kZUJpdFJhdGU6IDQ4MDAwLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OidtcDMnLFxyXG4gICAgICAgICAgICAgICAgZnJhbWVTaXplOiA1MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLnN0YXJ0KG9wdGlvbnMpXHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLm9uU3RhcnQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+W9lemfs1wiKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVuZFJlY29yZChlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHJlY29kZXJNYW5hZ2VyLnN0b3AoKVxyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5vblN0b3AoKHJlcykgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWBnOatouW9lemfs1wiLHJlcylcclxuICAgICAgICAgICAgICAgIHNlbGYuYXVkaW9VcGxvYWRQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxyXG4gICAgICAgICAgICAgICAgc2VsZi5kdXJhdGlvbiA9IE1hdGguZmxvb3IocmVzLmR1cmF0aW9uLzEwMDApICsgXCInXCIgKyByZXMuZHVyYXRpb24lMTAwMCArIFwic1wiXHJcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiflvZXpn7PlrozmiJAnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uQ2xpY2tQbGF5UmVjb3JkKCl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSBzZWxmLmF1ZGlvVXBsb2FkUGF0aFxyXG4gICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5wbGF5KCk7XHJcbiAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3RvcCgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DbGlja1VwbG9hZE1QMyhlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHd4LmNob29zZU1lc3NhZ2VGaWxlKHtcclxuICAgICAgICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzcyhyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS4iuS8oOaWh+S7tuS4uk1QM+aWh+S7tlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy50ZW1wRmlsZXNbMF0ubmFtZS5pbmRleE9mKFwiLm1wM1wiKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkUGF0aCA9IHJlcy50ZW1wRmlsZXNbMF0ucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvTmFtZSA9IHJlcy50ZW1wRmlsZXNbMF0ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgICAgIGxldCBzZW5kRm9ybURhdGEgPSBlLmRldGFpbC52YWx1ZSAvLyBmb3JtIOihqOWNleaVsOaNrlxyXG4gICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJTaWRcIl0gPSBOdW1iZXIoc2VsZi5TaWQpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3VjY2Vzc1VwID0gMDsgLy/miJDlip9cclxuICAgICAgICAgICAgbGV0IGZhaWxVcCA9IDA7IC8v5aSx6LSlXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7IC8v56ys5Yeg5bygXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QubmFtZS5sZW5ndGg+MCAmJiBzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1bc2VsZi50eXBlSW5kZXhdIT0n5ZCs5YaZJyl7Ly8g5Zu+54mH5LiK5LygXHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gc2VsZi5pbWdMaXN0Lm5hbWUubGVuZ3RoOyAvL+aAu+aVsFxyXG4gICAgICAgICAgICAgICAgc2VsZi5yZWN1cnNpb25JbWdVcGxvYWQoc2VsZixzZWxmLmltZ0xpc3QubmFtZSwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhumimOebruWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mTmFtZSA9IHNlbGYuaW1nTGlzdC5uYW1lWzBdLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiV3Byb2JsZW1QYXRoXCJdID0gc2VsZi5pbWdMaXN0Lm5hbWUubGVuZ3RoID09IDA/IFwiXCIgOiBcIndyb25nX3Byb2JsZW0vXCIgKyBzZWxmLmltZ0xpc3QubmFtZVswXS5zdWJzdHJpbmcobGFzdGluZGV4T2ZOYW1lICsgMSwgc2VsZi5pbWdMaXN0Lm5hbWVbMF0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgLy8g5aSE55CG5Ymp5L2Z6aKY55uu5Zu+54mHXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RpbmRleE9mTmFtZSA9IHNlbGYuaW1nTGlzdC5uYW1lW2ldLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldwcm9ibGVtUGF0aFwiXSArPSBcIjt3cm9uZ19wcm9ibGVtL1wiICsgc2VsZi5pbWdMaXN0Lm5hbWVbaV0uc3Vic3RyaW5nKGxhc3RpbmRleE9mTmFtZSArIDEsIHNlbGYuaW1nTGlzdC5uYW1lW2ldLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHNlbGYuYXVkaW9VcGxvYWRQYXRoIT0nJyAmJiBzZWxmLnR5cGVQaWNrZXJbc2VsZi5zdWJqZWN0UGlja2VyW3NlbGYuc3ViamVjdEluZGV4XV1bc2VsZi50eXBlSW5kZXhdPT0n5ZCs5YaZJyl7Ly8g6Z+z6aKR5LiK5LygXHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkKHNlbGYsIGZhaWxVcClcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0aW5kZXhPZkF1ZGlvID0gc2VsZi5hdWRpb1VwbG9hZFBhdGgubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldwcm9ibGVtUGF0aFwiXSA9IFwid3JvbmdfcHJvYmxlbS9cIiArIHNlbGYuYXVkaW9VcGxvYWRQYXRoLnN1YnN0cmluZyhsYXN0aW5kZXhPZkF1ZGlvICsgMSwgc2VsZi5hdWRpb1VwbG9hZFBhdGgubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aDsgLy/mgLvmlbBcclxuICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsc2VsZi5pbWdMaXN0LmFuc3dlciwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuetlOahiOWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mQW5zd2VyID0gc2VsZi5pbWdMaXN0LmFuc3dlclswXS5sYXN0SW5kZXhPZihcIi9cIilcclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldhbnN3ZXJQYXRoXCJdID0gc2VsZi5pbWdMaXN0LmFuc3dlci5sZW5ndGggPT0gMD8gXCJcIiA6IFwid3JvbmdfcHJvYmxlbS9cIiArIHNlbGYuaW1nTGlzdC5hbnN3ZXJbMF0uc3Vic3RyaW5nKGxhc3RpbmRleE9mQW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0LmFuc3dlclswXS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxOyBpPHNlbGYuaW1nTGlzdC5hbnN3ZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdGluZGV4T2ZBbnN3ZXIgPSBzZWxmLmltZ0xpc3QuYW5zd2VyW2ldLmxhc3RJbmRleE9mKFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIldhbnN3ZXJQYXRoXCJdICs9IFwiO3dyb25nX3Byb2JsZW0vXCIgKyBzZWxmLmltZ0xpc3QuYW5zd2VyW2ldLnN1YnN0cmluZyhsYXN0aW5kZXhPZkFuc3dlciArIDEsIHNlbGYuaW1nTGlzdC5hbnN3ZXJbaV0ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLmltZ0xpc3QubXlBbnN3ZXIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IHNlbGYuaW1nTGlzdC5teUFuc3dlci5sZW5ndGg7IC8v5oC75pWwXHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLHNlbGYuaW1nTGlzdC5teUFuc3dlciwgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpZihmYWlsVXA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlm77niYflh7rplJknLCAvL+aPkOekuueahOWGheWuuSxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsIC8v5Zu+5qCHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSwgLy/mmL7npLrpgI/mmI7okpnlsYLvvIzpmLLmraLop6bmkbjnqb/pgI8sXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOWkhOeQhuWtpueUn+S9nOetlOWbvueJh+esrOS4gOS4qlxyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RpbmRleE9mTXlBbnN3ZXIgPSBzZWxmLmltZ0xpc3QubXlBbnN3ZXJbMF0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJXbXlBbnN3ZXJQYXRoXCJdID0gc2VsZi5pbWdMaXN0Lm15QW5zd2VyLmxlbmd0aCA9PSAwPyBcIlwiIDogXCJ3cm9uZ19wcm9ibGVtL1wiICsgc2VsZi5pbWdMaXN0Lm15QW5zd2VyWzBdLnN1YnN0cmluZyhsYXN0aW5kZXhPZk15QW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0Lm15QW5zd2VyWzBdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGk8c2VsZi5pbWdMaXN0Lm15QW5zd2VyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RpbmRleE9mTXlBbnN3ZXIgPSBzZWxmLmltZ0xpc3QubXlBbnN3ZXJbaV0ubGFzdEluZGV4T2YoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiV215QW5zd2VyUGF0aFwiXSArPSBcIjt3cm9uZ19wcm9ibGVtL1wiICsgc2VsZi5pbWdMaXN0Lm15QW5zd2VyW2ldLnN1YnN0cmluZyhsYXN0aW5kZXhPZk15QW5zd2VyICsgMSwgc2VsZi5pbWdMaXN0Lm15QW5zd2VyW2ldLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VuZEZvcm1EYXRhKVxyXG5cclxuICAgICAgICAgICAgaWYoZmFpbFVwID09IDApIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvd3JvbmdfcHJvYmxlbS9pbnNlcnRfd3JvbmdfcHJvYmxlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZW5kRm9ybURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB3ZXB5LiRpbnN0YW5jZS5zZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuQ29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WIm+W7uuaIkOWKnycsIC8v5o+Q56S655qE5YaF5a65LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy/lm77moIcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsIC8v5bu26L+f5pe26Ze0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsIC8v5pi+56S66YCP5piO6JKZ5bGC77yM6Ziy5q2i6Kem5pG456m/6YCPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOmAkuW9kuaWueW8j+S4iuS8oOWkmuW8oOWbvueJh1xyXG4gICAgcmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKXtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogaW1nUGF0aHNbY291bnRdLCAvL+imgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxyXG4gICAgICAgICAgICBuYW1lOiAndXBsb2FkRmlsZScsIC8v5paH5Lu25a+55bqU55qEIGtleSAsIOW8gOWPkeiAheWcqOacjeWKoeWZqOerr+mAmui/h+i/meS4qiBrZXkg5Y+v5Lul6I635Y+W5Yiw5paH5Lu25LqM6L+b5Yi25YaF5a65XHJcbiAgICAgICAgICAgIGZvcm1EYXRhOntcclxuICAgICAgICAgICAgICAgIGRpck5hbWU6XCJpbWFnZXMvd3JvbmdfcHJvYmxlbVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5Db2RlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn+esrFwiICsgY291bnQgKyBcIuW8oFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc1VwKys7Ly/miJDlip8rMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGUpe1xyXG4gICAgICAgICAgICAgICAgZmFpbFVwKys7Ly/lpLHotKUrMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZShlKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50ID09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLGltZ1BhdGhzLHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiK5Lyg6Z+z6aKRXHJcbiAgICBhdWRpb1VwbG9hZChzZWxmLCBmYWlsVXApIHtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogc2VsZi5hdWRpb1VwbG9hZFBhdGgsIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImF1ZGlvcy93cm9uZ19wcm9ibGVtXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MoZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9lemfs+S/neWtmOaIkOWKn1wiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGUpe1xyXG4gICAgICAgICAgICAgICAgZmFpbFVwKytcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2V6Z+z5L+d5a2Y5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgc2VsZi5TaWQgPSBvcHRpb25zLnNpZFxyXG4gICAgfVxyXG59XHJcbiJdfQ==