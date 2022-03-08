'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// alias example

var Exercise = function (_wepy$page) {
    _inherits(Exercise, _wepy$page);

    function Exercise() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Exercise);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Exercise.__proto__ || Object.getPrototypeOf(Exercise)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            usingComponents: {
                "mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog",
                "mp-gallery": "weui-miniprogram/gallery/gallery"
            }

        }, _this.data = {
            Sid: null,
            exerciseList: [],
            index: 0,
            imageUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
            audioUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_audio?name=',
            imageListOfName: [],
            imageListOfAnswer: []
        }, _this.methods = {
            ViewImageOfName: function ViewImageOfName(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfName,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            ViewImageOfAnswer: function ViewImageOfAnswer(e) {
                var self = this;
                console.log(self.imageUrl + e.currentTarget.dataset.url);
                wx.previewImage({
                    urls: self.imageListOfAnswer,
                    current: self.imageUrl + e.currentTarget.dataset.url
                });
            },
            clickLast: function clickLast() {
                var self = this;
                if (self.index != 0) {
                    self.index--;
                }
            },
            clickNext: function clickNext() {
                var self = this;
                if (self.index != self.exerciseList.length - 1) {
                    self.index++;
                }
            },
            tapDialogButton: function tapDialogButton(e) {
                var self = this;
                self.showOneButtonDialog = false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Exercise, [{
        key: 'getTodayExercise',
        value: function getTodayExercise() {
            var self = this;
            var today = new Date();
            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/today/get_today_exercise',
                data: {
                    Sid: self.Sid,
                    Date: today.toLocaleDateString()
                },
                method: 'GET',
                success: function success(res) {
                    console.log(res);

                    if (res.data.Code != 2 && res.data.Msg != "No exercise!") {
                        self.exerciseList = res.data.Data;
                        self.inputDisabled = new Array(self.exerciseList.length);

                        for (var i = 0; i < self.exerciseList.length; i++) {
                            if (self.exerciseList[i]['Exercise'].EnamePath != "") {
                                var tmpList = self.exerciseList[i]['Exercise'].EnamePath.split(";");
                                self.imageListOfName = tmpList.map(function (x) {
                                    return self.imageUrl + x;
                                });
                            }
                            if (self.exerciseList[i]['Exercise'].EanswerPath != "") {
                                var _tmpList = self.exerciseList[i]['Exercise'].EanswerPath.split(";");
                                self.imageListOfAnswer = _tmpList.map(function (x) {
                                    return self.imageUrl + x;
                                });
                            }
                            if (self.exerciseList[i]["Answer"] != "") {
                                self.inputDisabled[i] = true;
                            } else {
                                self.inputDisabled[i] = false;
                            }
                        }
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

            self.getTodayExercise();
        }
    }]);

    return Exercise;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Exercise , 'pages/todaygrade'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZGF5Z3JhZGUuanMiXSwibmFtZXMiOlsiRXhlcmNpc2UiLCJjb25maWciLCJ1c2luZ0NvbXBvbmVudHMiLCJkYXRhIiwiU2lkIiwiZXhlcmNpc2VMaXN0IiwiaW5kZXgiLCJpbWFnZVVybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwiYXVkaW9VcmwiLCJpbWFnZUxpc3RPZk5hbWUiLCJpbWFnZUxpc3RPZkFuc3dlciIsIm1ldGhvZHMiLCJWaWV3SW1hZ2VPZk5hbWUiLCJlIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInVybCIsInd4IiwicHJldmlld0ltYWdlIiwidXJscyIsImN1cnJlbnQiLCJWaWV3SW1hZ2VPZkFuc3dlciIsImNsaWNrTGFzdCIsImNsaWNrTmV4dCIsImxlbmd0aCIsInRhcERpYWxvZ0J1dHRvbiIsInNob3dPbmVCdXR0b25EaWFsb2ciLCJ0b2RheSIsIkRhdGUiLCJyZXF1ZXN0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsIkNvZGUiLCJNc2ciLCJEYXRhIiwiaW5wdXREaXNhYmxlZCIsIkFycmF5IiwiaSIsIkVuYW1lUGF0aCIsInRtcExpc3QiLCJzcGxpdCIsIm1hcCIsIngiLCJFYW5zd2VyUGF0aCIsIiRhcHBseSIsIm9wdGlvbnMiLCJzaWQiLCJnZXRUb2RheUV4ZXJjaXNlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQXVDOztJQUVsQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsNkJBQWlCO0FBQ2IsNkJBQWEsaURBREE7QUFFYiw4QkFBYztBQUZEOztBQURaLFMsUUFRVEMsSSxHQUFLO0FBQ0RDLGlCQUFLLElBREo7QUFFREMsMEJBQWMsRUFGYjtBQUdEQyxtQkFBTyxDQUhOO0FBSURDLHNCQUFTQyxlQUFLQyxTQUFM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ckIsRUFBaUNDLFNBQWpDLENBQTJDRSxLQUEzQyxDQUFpRCxHQUFqRCxDQUFkO0FBQ0EvQixxQ0FBS0wsZUFBTCxHQUF1Qm1DLFFBQVFFLEdBQVIsQ0FBWTtBQUFBLDJDQUFLaEMsS0FBS1gsUUFBTCxHQUFnQjRDLENBQXJCO0FBQUEsaUNBQVosQ0FBdkI7QUFDSDtBQUNELGdDQUFHakMsS0FBS2IsWUFBTCxDQUFrQnlDLENBQWxCLEVBQXFCLFVBQXJCLEVBQWlDTSxXQUFqQyxJQUE4QyxFQUFqRCxFQUFvRDtBQUNoRCxvQ0FBSUosV0FBVTlCLEtBQUtiLFlBQUwsQ0FBa0J5QyxDQUFsQixFQUFxQixVQUFyQixFQUFpQ00sV0FBakMsQ0FBNkNILEtBQTdDLENBQW1ELEdBQW5ELENBQWQ7QUFDQS9CLHFDQUFLSixpQkFBTCxHQUF5QmtDLFNBQVFFLEdBQVIsQ0FBWTtBQUFBLDJDQUFLaEMsS0FBS1gsUUFBTCxHQUFnQjRDLENBQXJCO0FBQUEsaUNBQVosQ0FBekI7QUFDSDtBQUNELGdDQUFHakMsS0FBS2IsWUFBTCxDQUFrQnlDLENBQWxCLEVBQXFCLFFBQXJCLEtBQWtDLEVBQXJDLEVBQXdDO0FBQ3BDNUIscUNBQUswQixhQUFMLENBQW1CRSxDQUFuQixJQUF3QixJQUF4QjtBQUNILDZCQUZELE1BRU07QUFDRjVCLHFDQUFLMEIsYUFBTCxDQUFtQkUsQ0FBbkIsSUFBd0IsS0FBeEI7QUFDSDtBQUNKO0FBQ0Q1Qiw2QkFBS21DLE1BQUw7QUFDSDtBQUVKO0FBaENRLGFBQWI7QUFrQ0g7OzsrQkFFTUMsTyxFQUFTO0FBQ1osZ0JBQUlwQyxPQUFPLElBQVg7O0FBRUFBLGlCQUFLZCxHQUFMLEdBQVdrRCxRQUFRQyxHQUFuQjs7QUFFQXJDLGlCQUFLc0MsZ0JBQUw7QUFDSDs7OztFQXhHaUNoRCxlQUFLaUQsSTs7a0JBQXRCekQsUSIsImZpbGUiOiJ0b2RheWdyYWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBQYW5lbCBmcm9tICdAL2NvbXBvbmVudHMvcGFuZWwnIC8vIGFsaWFzIGV4YW1wbGVcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4ZXJjaXNlIGV4dGVuZHMgd2VweS5wYWdle1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgICAgICBcIm1wLWRpYWxvZ1wiOiBcIi9taW5pcHJvZ3JhbV9ucG0vd2V1aS1taW5pcHJvZ3JhbS9kaWFsb2cvZGlhbG9nXCIsXHJcbiAgICAgICAgICAgIFwibXAtZ2FsbGVyeVwiOiBcIndldWktbWluaXByb2dyYW0vZ2FsbGVyeS9nYWxsZXJ5XCIsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGE9e1xyXG4gICAgICAgIFNpZDogbnVsbCxcclxuICAgICAgICBleGVyY2lzZUxpc3Q6IFtdLFxyXG4gICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgIGltYWdlVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT0nLFxyXG4gICAgICAgIGF1ZGlvVXJsOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2VydmVyVXJsICsgJy9hcHAvZmlsZS9nZXRfYXVkaW8/bmFtZT0nLFxyXG4gICAgICAgIGltYWdlTGlzdE9mTmFtZTogW10sXHJcbiAgICAgICAgaW1hZ2VMaXN0T2ZBbnN3ZXI6IFtdLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgVmlld0ltYWdlT2ZOYW1lKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmwpXHJcbiAgICAgICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICB1cmxzOiBzZWxmLmltYWdlTGlzdE9mTmFtZSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IHNlbGYuaW1hZ2VVcmwgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVmlld0ltYWdlT2ZBbnN3ZXIoZSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc2VsZi5pbWFnZVVybCArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybClcclxuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgICAgIHVybHM6IHNlbGYuaW1hZ2VMaXN0T2ZBbnN3ZXIsXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50OiBzZWxmLmltYWdlVXJsICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNsaWNrTGFzdCgpe1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgaWYoc2VsZi5pbmRleCE9MCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmluZGV4LS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjbGlja05leHQoKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmKHNlbGYuaW5kZXghPXNlbGYuZXhlcmNpc2VMaXN0Lmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuaW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRhcERpYWxvZ0J1dHRvbihlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc2VsZi5zaG93T25lQnV0dG9uRGlhbG9nID0gZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRUb2RheUV4ZXJjaXNlKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKVxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL3RvZGF5L2dldF90b2RheV9leGVyY2lzZScsXHJcbiAgICAgICAgICAgIGRhdGE6e1xyXG4gICAgICAgICAgICAgICAgU2lkOnNlbGYuU2lkLFxyXG4gICAgICAgICAgICAgICAgRGF0ZTp0b2RheS50b0xvY2FsZURhdGVTdHJpbmcoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5Db2RlICE9IDIgJiYgcmVzLmRhdGEuTXNnICE9IFwiTm8gZXhlcmNpc2UhXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXhlcmNpc2VMaXN0ID0gcmVzLmRhdGEuRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXREaXNhYmxlZCA9IG5ldyBBcnJheShzZWxmLmV4ZXJjaXNlTGlzdC5sZW5ndGgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8c2VsZi5leGVyY2lzZUxpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuZXhlcmNpc2VMaXN0W2ldWydFeGVyY2lzZSddLkVuYW1lUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHNlbGYuZXhlcmNpc2VMaXN0W2ldWydFeGVyY2lzZSddLkVuYW1lUGF0aC5zcGxpdChcIjtcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW1hZ2VMaXN0T2ZOYW1lID0gdG1wTGlzdC5tYXAoeCA9PiBzZWxmLmltYWdlVXJsICsgeClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmV4ZXJjaXNlTGlzdFtpXVsnRXhlcmNpc2UnXS5FYW5zd2VyUGF0aCE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTGlzdCA9IHNlbGYuZXhlcmNpc2VMaXN0W2ldWydFeGVyY2lzZSddLkVhbnN3ZXJQYXRoLnNwbGl0KFwiO1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbWFnZUxpc3RPZkFuc3dlciA9IHRtcExpc3QubWFwKHggPT4gc2VsZi5pbWFnZVVybCArIHgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5leGVyY2lzZUxpc3RbaV1bXCJBbnN3ZXJcIl0gIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0RGlzYWJsZWRbaV0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXREaXNhYmxlZFtpXSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuU2lkID0gb3B0aW9ucy5zaWRcclxuICAgICAgICBcclxuICAgICAgICBzZWxmLmdldFRvZGF5RXhlcmNpc2UoKVxyXG4gICAgfSBcclxufVxyXG4iXX0=