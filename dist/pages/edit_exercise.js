'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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
            gradePicker: ['七年级', '八年级', '九年级', '高一', '高二', '高三'],
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
            duration: ""
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
            ChooseImage: function ChooseImage(e) {
                var self = this;
                var file = e.currentTarget.dataset.file;
                wx.chooseImage({
                    count: 2, //默认9
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
            formSubmit: function formSubmit(e) {
                console.log(e.detail.value);
                var self = this;

                var imgPaths = [];
                for (var i = 0; i < self.imgList.name.length; i++) {
                    imgPaths.push(self.imgList.name[i]);
                }
                for (var _i = 0; _i < self.imgList.answer.length; _i++) {
                    imgPaths.push(self.imgList.answer[_i]);
                }

                var successUp = 0; //成功
                var failUp = 0; //失败
                var count = 0; //第几张
                var length = imgPaths.length; //总数

                var sendFormData = e.detail.value; // form 表单数据


                if (imgPaths.length > 0 && self.typePicker[self.subjectPicker[self.subjectIndex]][self.typeIndex] != '听写') {
                    // 图片上传
                    self.recursionImgUpload(self, imgPaths, successUp, failUp, count, length);

                    sendFormData["EnamePath"] = self.imgList.name.length == 0 ? "" : "exercise/" + self.imgList.name[0].replace("http://tmp/", "");
                    sendFormData["EanswerPath"] = self.imgList.answer.length == 0 ? "" : "exercise/" + self.imgList.answer[0].replace("http://tmp/", "");
                    for (var _i2 = 1; _i2 < self.imgList.name.length; _i2++) {
                        sendFormData["EnamePath"] += ";exercise/" + self.imgList.name[_i2].replace("http://tmp/", "");
                    }
                    for (var _i3 = 1; _i3 < self.imgList.answer.length; _i3++) {
                        sendFormData["EanswerPath"] += ";exercise/" + self.imgList.answer[_i3].replace("http://tmp/", "");
                    }
                } else if (imgPaths.length > 0) {
                    // 音频上传
                    self.audioUpload(self, failUp);

                    sendFormData["EnamePath"] = self.audioUploadPath.replace("http://tmp/", "");
                }

                if (failUp == 0) {
                    _wepy2.default.request({
                        url: _wepy2.default.$instance.globalData.serverUrl + '/app/exercise/insert_exercise',
                        method: 'POST',
                        data: sendFormData,
                        header: _wepy2.default.$instance.setHeader(),
                        success: function success(res) {
                            console.log(res);
                            if (res.data.Code == 1) {}
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
                    dirName: "audios"
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
                        if (res.data.Data.EnamePath != "") {
                            var tmpList = res.data.Data.EnamePath.split(";");
                            self.imageListOfName = tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        if (res.data.Data.EanswerPath != "") {
                            var _tmpList = res.data.Data.EanswerPath.split(";");
                            self.imageListOfAnswer = _tmpList.map(function (x) {
                                return self.imageUrl + x;
                            });
                        }
                        self.$apply();
                    }
                }
            });
        }
    }]);

    return Index;
}(_wepy2.default.page);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRfZXhlcmNpc2UuanMiXSwibmFtZXMiOlsicmVjb2Rlck1hbmFnZXIiLCJ3eCIsImdldFJlY29yZGVyTWFuYWdlciIsImlubmVyQXVkaW9Db250ZXh0IiwiY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQiLCJJbmRleCIsImRhdGEiLCJpbWdMaXN0IiwibmFtZSIsImFuc3dlciIsImdyYWRlUGlja2VyIiwic3ViamVjdFBpY2tlciIsInR5cGVQaWNrZXIiLCJkaWZmaWN1bHR5UGlja2VyIiwiZ3JhZGVJbmRleCIsInN1YmplY3RJbmRleCIsInR5cGVJbmRleCIsImRpZmZpY3VsdHlJbmRleCIsIm5hbWVVcGxvYWRQYXRoIiwiYW5zd2VyVXBsb2FkUGF0aCIsImF1ZGlvVXBsb2FkUGF0aCIsInJlY29yZGluZ1RpbWVxd2UiLCJzZXRJbnRlciIsImR1cmF0aW9uIiwibWV0aG9kcyIsInBpY2tlckRpZmZpY3VsdHlDaGFuZ2UiLCJlIiwic2VsZiIsImRldGFpbCIsInZhbHVlIiwicGlja2VyR3JhZGVDaGFuZ2UiLCJwaWNrZXJTdWJqZWN0Q2hhbmdlIiwicGlja2VyVHlwZUNoYW5nZSIsIkNob29zZUltYWdlIiwiZmlsZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJsZW5ndGgiLCJjb25jYXQiLCJ0ZW1wRmlsZVBhdGhzIiwiJGFwcGx5IiwiVmlld0ltYWdlIiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJ1cmwiLCJEZWxJbWciLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjYW5jZWxUZXh0IiwiY29uZmlybVRleHQiLCJjb25maXJtIiwic3BsaWNlIiwiaW5kZXgiLCJzdGFydFJlY29yZCIsIm9wdGlvbnMiLCJzYW1wbGVSYXRlIiwibnVtYmVyT2ZDaGFubmVscyIsImVuY29kZUJpdFJhdGUiLCJmb3JtYXQiLCJmcmFtZVNpemUiLCJzdGFydCIsIm9uU3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZW5kUmVjb3JkIiwic3RvcCIsIm9uU3RvcCIsInRlbXBGaWxlUGF0aCIsIk1hdGgiLCJmbG9vciIsInNob3dUb2FzdCIsIm9uQ2xpY2tQbGF5UmVjb3JkIiwic3JjIiwicGxheSIsIm9uRW5kZWQiLCJmb3JtU3VibWl0IiwiaW1nUGF0aHMiLCJpIiwicHVzaCIsInN1Y2Nlc3NVcCIsImZhaWxVcCIsInNlbmRGb3JtRGF0YSIsInJlY3Vyc2lvbkltZ1VwbG9hZCIsInJlcGxhY2UiLCJhdWRpb1VwbG9hZCIsIndlcHkiLCJyZXF1ZXN0IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNlcnZlclVybCIsIm1ldGhvZCIsImhlYWRlciIsInNldEhlYWRlciIsIkNvZGUiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJmb3JtRGF0YSIsImRpck5hbWUiLCJFaWQiLCJlaWQiLCJleGVyY2lzZSIsIkRhdGEiLCJFbmFtZVBhdGgiLCJ0bXBMaXN0Iiwic3BsaXQiLCJpbWFnZUxpc3RPZk5hbWUiLCJtYXAiLCJpbWFnZVVybCIsIngiLCJFYW5zd2VyUGF0aCIsImltYWdlTGlzdE9mQW5zd2VyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7O0FBRkEsSUFBTUEsaUJBQWlCQyxHQUFHQyxrQkFBSCxFQUF2QjtBQUNBLElBQU1DLG9CQUFvQkYsR0FBR0csdUJBQUgsRUFBMUI7O0lBRXFCQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBSztBQUNEQyxxQkFBUztBQUNMQyxzQkFBSyxFQURBO0FBRUxDLHdCQUFPO0FBRkYsYUFEUjtBQUtEQyx5QkFBWSxDQUFDLEtBQUQsRUFBTyxLQUFQLEVBQWEsS0FBYixFQUFtQixJQUFuQixFQUF3QixJQUF4QixFQUE2QixJQUE3QixDQUxYO0FBTURDLDJCQUFjLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWdCLElBQWhCLENBTmI7QUFPREMs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LDZCQUFaLENBQXZCO0FBQ0g7QUFDRCw0QkFBRzFFLElBQUlwQyxJQUFKLENBQVN1RyxJQUFULENBQWNRLFdBQWQsSUFBMkIsRUFBOUIsRUFBaUM7QUFDN0IsZ0NBQUlOLFdBQVVyRSxJQUFJcEMsSUFBSixDQUFTdUcsSUFBVCxDQUFjUSxXQUFkLENBQTBCTCxLQUExQixDQUFnQyxHQUFoQyxDQUFkO0FBQ0FyRixpQ0FBSzJGLGlCQUFMLEdBQXlCUCxTQUFRRyxHQUFSLENBQVk7QUFBQSx1Q0FBS3ZGLEtBQUt3RixRQUFMLEdBQWdCQyxDQUFyQjtBQUFBLDZCQUFaLENBQXpCO0FBQ0g7QUFDRHpGLDZCQUFLbUIsTUFBTDtBQUNIO0FBQ0o7QUFyQkksYUFBYjtBQXVCSDs7OztFQTFSOEIrQyxlQUFLMEIsSTs7a0JBQW5CbEgsSyIsImZpbGUiOiJlZGl0X2V4ZXJjaXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHJlY29kZXJNYW5hZ2VyID0gd3guZ2V0UmVjb3JkZXJNYW5hZ2VyKClcclxuY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgZGF0YT17XHJcbiAgICAgICAgaW1nTGlzdDoge1xyXG4gICAgICAgICAgICBuYW1lOltdLFxyXG4gICAgICAgICAgICBhbnN3ZXI6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmFkZVBpY2tlcjpbJ+S4g+W5tOe6pycsJ+WFq+W5tOe6pycsJ+S5neW5tOe6pycsJ+mrmOS4gCcsJ+mrmOS6jCcsJ+mrmOS4iSddLFxyXG4gICAgICAgIHN1YmplY3RQaWNrZXI6Wyfor63mlocnLCfmlbDlraYnLCfoi7Hor60nLCfniannkIYnXSxcclxuICAgICAgICB0eXBlUGlja2VyOntcclxuICAgICAgICAgICAgJ+ivreaWhyc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+aVsOWtpic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICAgICAgJ+iLseivrSc6Wyfpu5jlhpknLCflkKzlhpknXSxcclxuICAgICAgICAgICAgJ+eJqeeQhic6WyfpgInmi6npopgnLCfloavnqbrpopgnLCfop6PnrZTpopgnXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpZmZpY3VsdHlQaWNrZXI6IFtcclxuICAgICAgICAgICAgJ+eugOWNlScsXHJcbiAgICAgICAgICAgICfkuK3nrYknLFxyXG4gICAgICAgICAgICAn5Zuw6Zq+JyxcclxuICAgICAgICAgICAgJ+ernui1mycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBncmFkZUluZGV4Om51bGwsXHJcbiAgICAgICAgc3ViamVjdEluZGV4Om51bGwsXHJcbiAgICAgICAgdHlwZUluZGV4Om51bGwsXHJcbiAgICAgICAgZGlmZmljdWx0eUluZGV4OjAsXHJcbiAgICAgICAgbmFtZVVwbG9hZFBhdGg6XCJcIixcclxuICAgICAgICBhbnN3ZXJVcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgYXVkaW9VcGxvYWRQYXRoOlwiXCIsXHJcbiAgICAgICAgcmVjb3JkaW5nVGltZXF3ZTowLC8v5b2V6Z+z6K6h5pe2XHJcbiAgICAgICAgc2V0SW50ZXI6XCJcIiwvL+W9lemfs+WQjeensFxyXG4gICAgICAgIGR1cmF0aW9uOlwiXCIsXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcz0ge1xyXG4gICAgICAgIHBpY2tlckRpZmZpY3VsdHlDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5kaWZmaWN1bHR5SW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBpY2tlckdyYWRlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi5ncmFkZUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJTdWJqZWN0Q2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYoc2VsZi5zdWJqZWN0SW5kZXggIT0gZS5kZXRhaWwudmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi50eXBlSW5kZXggPSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5zdWJqZWN0SW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwaWNrZXJUeXBlQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgc2VsZi50eXBlSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENob29zZUltYWdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZmlsZVxyXG4gICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICBjb3VudDogMiwgLy/pu5jorqQ5XHJcbiAgICAgICAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sIC8v5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmltZ0xpc3RbZmlsZV0ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0W2ZpbGVdPXNlbGYuaW1nTGlzdFtmaWxlXS5jb25jYXQocmVzLnRlbXBGaWxlUGF0aHMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0W2ZpbGVdPSByZXMudGVtcEZpbGVQYXRoc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFZpZXdJbWFnZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmZpbGVcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1nTGlzdFtmaWxlXSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBEZWxJbWcoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5maWxlXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOmimOebruWbvueJhycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a6KaB5Yig6Zmk6L+Z5byg5Zu+54mH5ZCX77yfJyxcclxuICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWdMaXN0W2ZpbGVdLnNwbGljZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRSZWNvcmQoZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVSYXRlOiAxNjAwMCxcclxuICAgICAgICAgICAgICAgIG51bWJlck9mQ2hhbm5lbHM6IDEsXHJcbiAgICAgICAgICAgICAgICBlbmNvZGVCaXRSYXRlOiA0ODAwMCxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDonbXAzJyxcclxuICAgICAgICAgICAgICAgIGZyYW1lU2l6ZTogNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5zdGFydChvcHRpb25zKVxyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5vblN0YXJ0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vlvZXpn7NcIilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmRSZWNvcmQoZSl7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICByZWNvZGVyTWFuYWdlci5zdG9wKClcclxuICAgICAgICAgICAgcmVjb2Rlck1hbmFnZXIub25TdG9wKChyZXMpID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlgZzmraLlvZXpn7NcIixyZXMpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvVXBsb2FkUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcclxuICAgICAgICAgICAgICAgIHNlbGYuZHVyYXRpb24gPSBNYXRoLmZsb29yKHJlcy5kdXJhdGlvbi8xMDAwKSArIFwiJ1wiICsgcmVzLmR1cmF0aW9uJTEwMDAgKyBcInNcIlxyXG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTon5b2V6Z+z5a6M5oiQJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBvbkNsaWNrUGxheVJlY29yZCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gc2VsZi5hdWRpb1VwbG9hZFBhdGhcclxuICAgICAgICAgICAgaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xyXG4gICAgICAgICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlubmVyQXVkaW9Db250ZXh0LnN0b3AoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvcm1TdWJtaXQoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgICAgICBsZXQgaW1nUGF0aHMgPSBbXVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaW1nUGF0aHMucHVzaChzZWxmLmltZ0xpc3QubmFtZVtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHNlbGYuaW1nTGlzdC5hbnN3ZXIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpbWdQYXRocy5wdXNoKHNlbGYuaW1nTGlzdC5hbnN3ZXJbaV0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzdWNjZXNzVXAgPSAwOyAvL+aIkOWKn1xyXG4gICAgICAgICAgICBsZXQgZmFpbFVwID0gMDsgLy/lpLHotKVcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDsgLy/nrKzlh6DlvKBcclxuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IGltZ1BhdGhzLmxlbmd0aDsgLy/mgLvmlbBcclxuXHJcbiAgICAgICAgICAgIGxldCBzZW5kRm9ybURhdGEgPSBlLmRldGFpbC52YWx1ZSAvLyBmb3JtIOihqOWNleaVsOaNrlxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGltZ1BhdGhzLmxlbmd0aD4wICYmIHNlbGYudHlwZVBpY2tlcltzZWxmLnN1YmplY3RQaWNrZXJbc2VsZi5zdWJqZWN0SW5kZXhdXVtzZWxmLnR5cGVJbmRleF0hPSflkKzlhpknKXsvLyDlm77niYfkuIrkvKBcclxuICAgICAgICAgICAgICAgIHNlbGYucmVjdXJzaW9uSW1nVXBsb2FkKHNlbGYsaW1nUGF0aHMsIHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVuYW1lUGF0aFwiXSA9IHNlbGYuaW1nTGlzdC5uYW1lLmxlbmd0aCA9PSAwPyBcIlwiIDogXCJleGVyY2lzZS9cIiArIHNlbGYuaW1nTGlzdC5uYW1lWzBdLnJlcGxhY2UoXCJodHRwOi8vdG1wL1wiLFwiXCIpXHJcbiAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJFYW5zd2VyUGF0aFwiXSA9IHNlbGYuaW1nTGlzdC5hbnN3ZXIubGVuZ3RoID09IDA/IFwiXCIgOiBcImV4ZXJjaXNlL1wiICsgc2VsZi5pbWdMaXN0LmFuc3dlclswXS5yZXBsYWNlKFwiaHR0cDovL3RtcC9cIixcIlwiKVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaTxzZWxmLmltZ0xpc3QubmFtZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kRm9ybURhdGFbXCJFbmFtZVBhdGhcIl0gKz0gXCI7ZXhlcmNpc2UvXCIgKyBzZWxmLmltZ0xpc3QubmFtZVtpXS5yZXBsYWNlKFwiaHR0cDovL3RtcC9cIixcIlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTsgaTxzZWxmLmltZ0xpc3QuYW5zd2VyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRGb3JtRGF0YVtcIkVhbnN3ZXJQYXRoXCJdICs9IFwiO2V4ZXJjaXNlL1wiICsgc2VsZi5pbWdMaXN0LmFuc3dlcltpXS5yZXBsYWNlKFwiaHR0cDovL3RtcC9cIixcIlwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoaW1nUGF0aHMubGVuZ3RoPjApey8vIOmfs+mikeS4iuS8oFxyXG4gICAgICAgICAgICAgICAgc2VsZi5hdWRpb1VwbG9hZChzZWxmLCBmYWlsVXApXHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZEZvcm1EYXRhW1wiRW5hbWVQYXRoXCJdID0gc2VsZi5hdWRpb1VwbG9hZFBhdGgucmVwbGFjZShcImh0dHA6Ly90bXAvXCIsXCJcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmFpbFVwID09IDApIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvaW5zZXJ0X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHNlbmRGb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCS5b2S5pa55byP5LiK5Lyg5aSa5byg5Zu+54mHXHJcbiAgICByZWN1cnNpb25JbWdVcGxvYWQoc2VsZixpbWdQYXRocywgc3VjY2Vzc1VwLCBmYWlsVXAsIGNvdW50LCBsZW5ndGgpe1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL3VwbG9hZF9maWxlJywgLy/lvIDlj5HogIXmnI3liqHlmaggdXJsXHJcbiAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgIGZpbGVQYXRoOiBpbWdQYXRoc1tjb3VudF0sIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImltYWdlcy9leGVyY2lzZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKGUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YS5Db2RlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuS8oOaIkOWKn+esrFwiICsgY291bnQgKyBcIuW8oFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzc1VwKys7Ly/miJDlip8rMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsKGUpe1xyXG4gICAgICAgICAgICAgICAgZmFpbFVwKys7Ly/lpLHotKUrMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZShlKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50ID09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiK5Lyg5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY3Vyc2lvbkltZ1VwbG9hZChzZWxmLGltZ1BhdGhzLHN1Y2Nlc3NVcCwgZmFpbFVwLCBjb3VudCwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LiK5Lyg6Z+z6aKRXHJcbiAgICBhdWRpb1VwbG9hZChzZWxmLCBmYWlsVXApIHtcclxuICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS91cGxvYWRfZmlsZScsIC8v5byA5Y+R6ICF5pyN5Yqh5ZmoIHVybFxyXG4gICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICBmaWxlUGF0aDogc2VsZi5hdWRpb1VwbG9hZFBhdGgsIC8v6KaB5LiK5Lyg5paH5Lu26LWE5rqQ55qE6Lev5b6EXHJcbiAgICAgICAgICAgIG5hbWU6ICd1cGxvYWRGaWxlJywgLy/mlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcclxuICAgICAgICAgICAgZm9ybURhdGE6e1xyXG4gICAgICAgICAgICAgICAgZGlyTmFtZTpcImF1ZGlvc1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzKGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZXpn7Pkv53lrZjmiJDlip9cIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChlKXtcclxuICAgICAgICAgICAgICAgIGZhaWxVcCsrXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW9lemfs+S/neWtmOWksei0pVwiKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgc2VsZi5FaWQgPSBvcHRpb25zLmVpZFxyXG5cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZXhlcmNpc2UvZ2V0X2V4ZXJjaXNlJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDonR0VUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICBFaWQ6c2VsZi5FaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLkNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2UgPSByZXMuZGF0YS5EYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLkRhdGEuRW5hbWVQYXRoIT1cIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0bXBMaXN0ID0gcmVzLmRhdGEuRGF0YS5FbmFtZVBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mTmFtZSA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuRGF0YS5FYW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHJlcy5kYXRhLkRhdGEuRWFuc3dlclBhdGguc3BsaXQoXCI7XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmltYWdlTGlzdE9mQW5zd2VyID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==