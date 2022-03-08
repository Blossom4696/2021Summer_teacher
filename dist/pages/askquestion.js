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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            askQuestionList: [],
            dateList: [{
                value: "day",
                name: "近一天",
                checked: false
            }, {
                value: "week",
                name: "近七天",
                checked: false
            }, {
                value: "month",
                name: "近一月",
                checked: false
            }, {
                value: "all",
                name: "全部",
                checked: true
            }],
            isSolved: false
        }, _this.methods = {
            onClickAskQuestion: function onClickAskQuestion(e) {
                var self = this;
                var id = e.currentTarget.dataset.id;
                wx.navigateTo({
                    url: "askquestion-detail?aqid=" + self.askQuestionList[id].AQid

                });
            },
            dateRadioChange: function dateRadioChange(e) {
                var self = this;
                console.log('radio发生change事件，携带value值为：', e.detail.value);

                for (var i = 0, len = self.dateList.length; i < len; ++i) {
                    self.dateList[i].checked = self.dateList[i].value === e.detail.value;
                }
                self.getAskQuestionList();
            },
            solvedCheckboxChange: function solvedCheckboxChange(e) {
                var self = this;
                self.isSolved = self.isSolved ? false : true;
                self.getAskQuestionList();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Index, [{
        key: 'getAskQuestionList',
        value: function getAskQuestionList() {
            var self = this;

            var queryDate = "all";
            for (var i = 0; i < self.dateList.length; i++) {
                if (self.dateList[i].checked == true) {
                    queryDate = self.dateList[i].value;
                }
            }

            _wepy2.default.request({
                url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_ask_question_list',
                method: 'GET',
                header: _wepy2.default.$instance.setHeader(),
                data: {
                    unresolved: self.isSolved ? "1" : "0",
                    date: queryDate
                },
                success: function success(res) {
                    console.log(res);
                    if (res.data.Code == 1) {
                        self.askQuestionList = res.data.Data;

                        for (var _i = 0; _i < self.askQuestionList.length; _i++) {
                            self.askQuestionList[_i].AQtime = (0, _moment2.default)(self.askQuestionList[_i].AQtime).format('YYYY-MM-DD HH:mm:ss');
                        }
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
            self.getAskQuestionList();
        }
    }]);

    return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/askquestion'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFza3F1ZXN0aW9uLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiZGF0YSIsImFza1F1ZXN0aW9uTGlzdCIsImRhdGVMaXN0IiwidmFsdWUiLCJuYW1lIiwiY2hlY2tlZCIsImlzU29sdmVkIiwibWV0aG9kcyIsIm9uQ2xpY2tBc2tRdWVzdGlvbiIsImUiLCJzZWxmIiwiaWQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIkFRaWQiLCJkYXRlUmFkaW9DaGFuZ2UiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiaSIsImxlbiIsImxlbmd0aCIsImdldEFza1F1ZXN0aW9uTGlzdCIsInNvbHZlZENoZWNrYm94Q2hhbmdlIiwicXVlcnlEYXRlIiwid2VweSIsInJlcXVlc3QiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwidW5yZXNvbHZlZCIsImRhdGUiLCJzdWNjZXNzIiwicmVzIiwiQ29kZSIsIkRhdGEiLCJBUXRpbWUiLCJmb3JtYXQiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsSSxHQUFLO0FBQ0RDLDZCQUFnQixFQURmO0FBRURDLHNCQUFTLENBQUM7QUFDTkMsdUJBQU8sS0FERDtBQUVOQyxzQkFBTSxLQUZBO0FBR05DLHlCQUFTO0FBSEgsYUFBRCxFQUlQO0FBQ0VGLHVCQUFPLE1BRFQ7QUFFRUMsc0JBQU0sS0FGUjtBQUdFQyx5QkFBUztBQUhYLGFBSk8sRUFRUDtBQUNFRix1QkFBTyxPQURUO0FBRUVDLHNCQUFNLEtBRlI7QUFHRUMseUJBQVM7QUFIWCxhQVJPLEVBWVA7QUFDRUYsdUJBQU8sS0FEVDtBQUVFQyxzQkFBTSxJQUZSO0FBR0VDLHlCQUFTO0FBSFgsYUFaTyxDQUZSO0FBbUJEQyxzQkFBVTtBQW5C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cXVlc3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICBhc2tRdWVzdGlvbkxpc3Q6W10sXHJcbiAgICAgICAgZGF0ZUxpc3Q6W3tcclxuICAgICAgICAgICAgdmFsdWU6IFwiZGF5XCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwi6L+R5LiA5aSpXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJ3ZWVrXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwi6L+R5LiD5aSpXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgIH0se1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJtb250aFwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIui/keS4gOaciFwiLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwi5YWo6YOoXCIsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgaXNTb2x2ZWQ6IGZhbHNlLFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9e1xyXG4gICAgICAgIG9uQ2xpY2tBc2tRdWVzdGlvbihlKXtcclxuXHRcdFx0bGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOlwiYXNrcXVlc3Rpb24tZGV0YWlsP2FxaWQ9XCIrc2VsZi5hc2tRdWVzdGlvbkxpc3RbaWRdLkFRaWQsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuXHRcdH0sXHJcblxyXG4gICAgICAgIGRhdGVSYWRpb0NoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmFkaW/lj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGYuZGF0ZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF0ZUxpc3RbaV0uY2hlY2tlZCA9IHNlbGYuZGF0ZUxpc3RbaV0udmFsdWUgPT09IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5nZXRBc2tRdWVzdGlvbkxpc3QoKVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzb2x2ZWRDaGVja2JveENoYW5nZShlKXtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIHNlbGYuaXNTb2x2ZWQgPSBzZWxmLmlzU29sdmVkP2ZhbHNlOnRydWVcclxuICAgICAgICAgICAgc2VsZi5nZXRBc2tRdWVzdGlvbkxpc3QoKVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBc2tRdWVzdGlvbkxpc3QoKXtcclxuXHRcdGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBxdWVyeURhdGUgPSBcImFsbFwiXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxzZWxmLmRhdGVMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihzZWxmLmRhdGVMaXN0W2ldLmNoZWNrZWQgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBxdWVyeURhdGUgPSBzZWxmLmRhdGVMaXN0W2ldLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90ZWFjaGVyL2dldF9hc2tfcXVlc3Rpb25fbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHdlcHkuJGluc3RhbmNlLnNldEhlYWRlcigpLFxyXG4gICAgICAgICAgICAgICAgZGF0YTp7XHJcblx0XHRcdFx0XHR1bnJlc29sdmVkOiBzZWxmLmlzU29sdmVkP1wiMVwiOlwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHF1ZXJ5RGF0ZSxcclxuXHRcdFx0XHR9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFza1F1ZXN0aW9uTGlzdCA9IHJlcy5kYXRhLkRhdGFcclxuXHJcblx0XHRcdFx0XHRcdGZvcihsZXQgaT0wO2k8c2VsZi5hc2tRdWVzdGlvbkxpc3QubGVuZ3RoO2krKyl7XHJcblx0XHRcdFx0XHRcdFx0c2VsZi5hc2tRdWVzdGlvbkxpc3RbaV0uQVF0aW1lID0gbW9tZW50KHNlbGYuYXNrUXVlc3Rpb25MaXN0W2ldLkFRdGltZSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcclxuXHRcdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cdH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuZ2V0QXNrUXVlc3Rpb25MaXN0KClcclxuICAgIH1cclxufVxyXG5cclxuICAgIFxyXG5cclxuIl19