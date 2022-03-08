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
			usingComponents: {
				"mp-dialog": "/miniprogram_npm/weui-miniprogram/dialog/dialog"

			}
		}, _this.data = {
			teacherIconNoLogin: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=none_userinfo.png',
			userInfo: null,
			dialogShow: false,
			dialogShowOneButton: false,
			buttons: [{ text: '稍后登录' }, { text: '确定' }],
			oneButton: [{ text: '确定' }],
			imgUrl: _wepy2.default.$instance.globalData.serverUrl + '/app/file/get_image?name=',
			askQuestionList: []
		}, _this.methods = {
			onClick: function onClick(e) {
				var self = this;
				wx.navigateTo({
					url: e.currentTarget.dataset.url
				});
			},
			onClickLogin: function onClickLogin() {
				var self = this;
				if (self.userInfo == null) {
					this.$navigate({ url: "login" });
				}
			},
			tapDialogOneButton: function tapDialogOneButton(e) {
				var self = this;
				this.$navigate({ url: "login" });
				self.dialogShowOneButton = false;
			},
			tapDialogButton: function tapDialogButton(e) {
				var self = this;
				if (e.detail.index == 1) {
					this.$navigate({ url: "login" });
				}
				self.dialogShow = false;
			},
			onClickAskQuestion: function onClickAskQuestion(e) {
				var self = this;
				var id = e.currentTarget.dataset.id;
				wx.navigateTo({
					url: "askquestion-detail?aqid=" + self.askQuestionList[id].AQid

				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Index, [{
		key: 'getAskQuestionList',
		value: function getAskQuestionList() {
			var self = this;

			_wepy2.default.request({
				url: _wepy2.default.$instance.globalData.serverUrl + '/app/teacher/get_ask_question_list',
				method: 'GET',
				header: _wepy2.default.$instance.setHeader(),
				data: {
					unresolved: "0",
					date: "all"
				},
				success: function success(res) {
					console.log(res);
					if (res.data.Code == 1) {
						self.askQuestionList = res.data.Data;

						for (var i = 0; i < self.askQuestionList.length; i++) {
							self.askQuestionList[i].AQtime = (0, _moment2.default)(self.askQuestionList[i].AQtime).format('YYYY-MM-DD HH:mm:ss');
						}
						self.$apply();
					}
				}
			});
		}
	}, {
		key: 'onLoad',
		value: function onLoad() {
			var self = this;
		}
	}, {
		key: 'onShow',
		value: function onShow() {

			var self = this;
			if (_wepy2.default.$instance.globalData.userInfo != null) {
				self.userInfo = _wepy2.default.$instance.globalData.userInfo;
				self.getAskQuestionList();
			} else {
				self.userInfo = null;
			}
			if (self.userInfo == null && !self.dialogShowOneButton) {
				self.dialogShow = true;
			}
		}
	}]);

	return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsInRlYWNoZXJJY29uTm9Mb2dpbiIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2VydmVyVXJsIiwidXNlckluZm8iLCJkaWFsb2dTaG93IiwiZGlhbG9nU2hvd09uZUJ1dHRvbiIsImJ1dHRvbnMiLCJ0ZXh0Iiwib25lQnV0dG9uIiwiaW1nVXJsIiwiYXNrUXVlc3Rpb25MaXN0IiwibWV0aG9kcyIsIm9uQ2xpY2siLCJlIiwic2VsZiIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwib25DbGlja0xvZ2luIiwiJG5hdmlnYXRlIiwidGFwRGlhbG9nT25lQnV0dG9uIiwidGFwRGlhbG9nQnV0dG9uIiwiZGV0YWlsIiwiaW5kZXgiLCJvbkNsaWNrQXNrUXVlc3Rpb24iLCJpZCIsIkFRaWQiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic2V0SGVhZGVyIiwidW5yZXNvbHZlZCIsImRhdGUiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsIkNvZGUiLCJEYXRhIiwiaSIsImxlbmd0aCIsIkFRdGltZSIsImZvcm1hdCIsIiRhcHBseSIsImdldEFza1F1ZXN0aW9uTGlzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNDOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7a0xBQ2xCQyxNLEdBQVM7QUFDWEMsb0JBQWdCO0FBQ2YsaUJBQWE7O0FBREU7QUFETCxHLFFBUVRDLEksR0FBSztBQUNQQyx1QkFBbUJDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsNENBRGxEO0FBRVBDLGFBQVUsSUFGSDtBQUdQQyxlQUFZLEtBSEw7QUFJUEMsd0JBQXFCLEtBSmQ7QUFLUEMsWUFBUyxDQUFDLEVBQUNDLE1BQU0sTUFBUCxFQUFELEVBQWlCLEVBQUNBLE1BQU0sSUFBUCxFQUFqQixDQUxGO0FBTVBDLGNBQVcsQ0FBQyxFQUFDRCxNQUFNLElBQVAsRUFBRCxDQU5KO0FBT1BFLFdBQU9WLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsU0FBMUIsR0FBc0MsMkJBUHRDO0FBUVBRLG9CQUFnQjtBQVJULEcsUUFXTEMsTyxHQUFTO0FBQ1hDLFVBRFcsbUJBQ0hDLENBREcsRUFDQTtBQUNELFFBQUlDLE9BQU8sSUFBWDtBQUNBQyxPQUFHQyxVQUFILENBQWM7QUFDVkMsVUFBSUosRUFBRUssYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JGO0FBRGxCLEtBQWQ7QUFHSCxJQU5JO0FBUVhHLGVBUlcsMEJBUUk7QUFDZCxRQUFJTixPQUFPLElBQVg7QUFDQSxRQUFHQSxLQUFLWCxRQUFMLElBQWUsSUFBbEIsRUFBdUI7QUFDdEIsVUFBS2tCLFNBQUwsQ0FBZSxFQUFDSixLQUFJLE9BQUwsRUFBZjtBQUNBO0FBQ0QsSUFiVTtBQWlCWEsscUJBakJXLDhCQWlCUVQsQ0FqQlIsRUFpQlc7QUFDckIsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsU0FBS08sU0FBTCxDQUFlLEVBQUNKLEtBQUksT0FBTCxFQUFmO0FBQ0FILFNBQUtULG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0EsSUFyQlU7QUF1QlhrQixrQkF2QlcsMkJBdUJLVixDQXZCTCxFQXVCUTtBQUNsQixRQUFJQyxPQUFPLElBQVg7QUFDQSxRQUFJRCxFQUFFVyxNQUFGLENBQVNDLEtBQVQsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDekIsVUFBS0osU0FBTCxDQUFlLEVBQUNKLEtBQUksT0FBTCxFQUFmO0FBQ0M7QUFDREgsU0FBS1YsVUFBTCxHQUFrQixLQUFsQjtBQUNBLElBN0JVO0FBK0JYc0IscUJBL0JXLDhCQStCUWIsQ0EvQlIsRUErQlU7QUFDcEIsUUFBSUMsT0FBTyxJQUFYO0FBQ1MsUUFBSWEsS0FBS2QsRUFBRUssYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JRLEVBQWpDO0FBQ0FaLE9BQUdDLFVBQUgsQ0FBYztBQUNWQyxVQUFJLDZCQUEyQkgsS0FBS0osZUFBTCxDQUFxQmlCLEVBQXJCLEVBQXlCQzs7QUFEOUMsS0FBZDtBQUlUO0FBdENVLEc7Ozs7O3VDQTBDUTtBQUNuQixPQUFJZCxPQUFPLElBQVg7O0FBRU1mLGtCQUFLOEIsT0FBTCxDQUFhO0FBQ0xaLFNBQUlsQixlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBQTFCLEdBQXNDLG9DQURyQztBQUVMNEIsWUFBTyxLQUZGO0FBR0xDLFlBQVFoQyxlQUFLQyxTQUFMLENBQWVnQyxTQUFmLEVBSEg7QUFJTG5DLFVBQUs7QUFDaEJvQyxpQkFBWSxHQURJO0FBRWhCQyxXQUFLO0FBRlcsS0FKQTtBQVFMQyxhQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJDLGFBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLFNBQUlBLElBQUl2QyxJQUFKLENBQVMwQyxJQUFULElBQWlCLENBQXJCLEVBQXVCO0FBQ25CekIsV0FBS0osZUFBTCxHQUF1QjBCLElBQUl2QyxJQUFKLENBQVMyQyxJQUFoQzs7QUFFbEIsV0FBSSxJQUFJQyxJQUFFLENBQVYsRUFBWUEsSUFBRTNCLEtBQUtKLGVBQUwsQ0FBcUJnQyxNQUFuQyxFQUEwQ0QsR0FBMUMsRUFBOEM7QUFDN0MzQixZQUFLSixlQUFMLENBQXFCK0IsQ0FBckIsRUFBd0JFLE1BQXhCLEdBQWlDLHNCQUFPN0IsS0FBS0osZUFBTCxDQUFxQitCLENBQXJCLEVBQXdCRSxNQUEvQixFQUF1Q0MsTUFBdkMsQ0FBOEMscUJBQTlDLENBQWpDO0FBQ0E7QUFDaUI5QixXQUFLK0IsTUFBTDtBQUNIO0FBQ0o7QUFsQkksSUFBYjtBQW9CTjs7OzJCQUlXO0FBQ04sT0FBSS9CLE9BQU8sSUFBWDtBQUVGOzs7MkJBRVE7O0FBRVAsT0FBSUEsT0FBTyxJQUFYO0FBQ0EsT0FBR2YsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCRSxRQUExQixJQUFvQyxJQUF2QyxFQUE0QztBQUMxQ1csU0FBS1gsUUFBTCxHQUFnQkosZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCRSxRQUExQztBQUNOVyxTQUFLZ0Msa0JBQUw7QUFDSyxJQUhELE1BR0s7QUFDUGhDLFNBQUtYLFFBQUwsR0FBYyxJQUFkO0FBQ0E7QUFDRSxPQUFHVyxLQUFLWCxRQUFMLElBQWUsSUFBZixJQUF1QixDQUFDVyxLQUFLVCxtQkFBaEMsRUFBb0Q7QUFDdkRTLFNBQUtWLFVBQUwsR0FBa0IsSUFBbEI7QUFDQTtBQUNFOzs7O0VBMUcrQkwsZUFBS2dELEk7O2tCQUFuQnJELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblx0aW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5cblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcblx0XHR1c2luZ0NvbXBvbmVudHM6e1xuXHRcdFx0XCJtcC1kaWFsb2dcIjogXCIvbWluaXByb2dyYW1fbnBtL3dldWktbWluaXByb2dyYW0vZGlhbG9nL2RpYWxvZ1wiLFxuXHRcdFx0XG5cdFx0XG5cdFx0fVxuICAgIH1cblxuICAgIGRhdGE9e1xuXHRcdHRlYWNoZXJJY29uTm9Mb2dpbjp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNlcnZlclVybCArICcvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9bm9uZV91c2VyaW5mby5wbmcnLFxuXHRcdHVzZXJJbmZvOiBudWxsLFxuXHRcdGRpYWxvZ1Nob3c6IGZhbHNlLFxuXHRcdGRpYWxvZ1Nob3dPbmVCdXR0b246IGZhbHNlLFxuXHRcdGJ1dHRvbnM6IFt7dGV4dDogJ+eojeWQjueZu+W9lSd9LCB7dGV4dDogJ+ehruWumid9XSxcblx0XHRvbmVCdXR0b246IFt7dGV4dDogJ+ehruWumid9XSxcblx0XHRpbWdVcmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPScsXG5cdFx0YXNrUXVlc3Rpb25MaXN0OltdLFxuICAgIH1cblxuICAgIG1ldGhvZHM9IHtcblx0XHRvbkNsaWNrKGUpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOmUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuXHRcdG9uQ2xpY2tMb2dpbigpIHtcblx0XHRcdGxldCBzZWxmID0gdGhpc1xuXHRcdFx0aWYoc2VsZi51c2VySW5mbz09bnVsbCl7XG5cdFx0XHRcdHRoaXMuJG5hdmlnYXRlKHt1cmw6XCJsb2dpblwifSlcblx0XHRcdH1cblx0XHR9LFxuXG5cblxuXHRcdHRhcERpYWxvZ09uZUJ1dHRvbihlKSB7XG5cdFx0XHRsZXQgc2VsZiA9IHRoaXNcblx0XHRcdHRoaXMuJG5hdmlnYXRlKHt1cmw6XCJsb2dpblwifSlcblx0XHRcdHNlbGYuZGlhbG9nU2hvd09uZUJ1dHRvbiA9IGZhbHNlXG5cdFx0fSxcblxuXHRcdHRhcERpYWxvZ0J1dHRvbihlKSB7XG5cdFx0XHRsZXQgc2VsZiA9IHRoaXNcblx0XHRcdGlmIChlLmRldGFpbC5pbmRleCA9PSAxKSB7XG5cdFx0XHR0aGlzLiRuYXZpZ2F0ZSh7dXJsOlwibG9naW5cIn0pXG5cdFx0XHR9XG5cdFx0XHRzZWxmLmRpYWxvZ1Nob3cgPSBmYWxzZVxuXHRcdH0sXG5cblx0XHRvbkNsaWNrQXNrUXVlc3Rpb24oZSl7XG5cdFx0XHRsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGxldCBpZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6XCJhc2txdWVzdGlvbi1kZXRhaWw/YXFpZD1cIitzZWxmLmFza1F1ZXN0aW9uTGlzdFtpZF0uQVFpZCxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG5cdFx0fVxuXG4gICAgfVxuXG5cdGdldEFza1F1ZXN0aW9uTGlzdCgpe1xuXHRcdGxldCBzZWxmID0gdGhpc1xuICAgICAgICBcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zZXJ2ZXJVcmwgKyAnL2FwcC90ZWFjaGVyL2dldF9hc2tfcXVlc3Rpb25fbGlzdCcsXG4gICAgICAgICAgICAgICAgbWV0aG9kOidHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogd2VweS4kaW5zdGFuY2Uuc2V0SGVhZGVyKCksXG4gICAgICAgICAgICAgICAgZGF0YTp7XG5cdFx0XHRcdFx0dW5yZXNvbHZlZDogXCIwXCIsXG5cdFx0XHRcdFx0ZGF0ZTpcImFsbFwiLFxuXHRcdFx0XHR9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5Db2RlID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hc2tRdWVzdGlvbkxpc3QgPSByZXMuZGF0YS5EYXRhXG5cblx0XHRcdFx0XHRcdGZvcihsZXQgaT0wO2k8c2VsZi5hc2tRdWVzdGlvbkxpc3QubGVuZ3RoO2krKyl7XG5cdFx0XHRcdFx0XHRcdHNlbGYuYXNrUXVlc3Rpb25MaXN0W2ldLkFRdGltZSA9IG1vbWVudChzZWxmLmFza1F1ZXN0aW9uTGlzdFtpXS5BUXRpbWUpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXHR9XG5cblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgXHRsZXQgc2VsZiA9IHRoaXNcblx0XHRcbiAgICB9XG5cbiAgICBvblNob3coKSB7XG4gICAgICBcbiAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgaWYod2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS51c2VySW5mbyE9bnVsbCl7XG4gICAgICAgIHNlbGYudXNlckluZm8gPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnVzZXJJbmZvXG5cdFx0c2VsZi5nZXRBc2tRdWVzdGlvbkxpc3QoKVxuICAgICAgfWVsc2V7XG5cdFx0ICBzZWxmLnVzZXJJbmZvPW51bGxcblx0ICB9XG4gICAgICBpZihzZWxmLnVzZXJJbmZvPT1udWxsICYmICFzZWxmLmRpYWxvZ1Nob3dPbmVCdXR0b24pe1xuXHRcdFx0c2VsZi5kaWFsb2dTaG93ID0gdHJ1ZVxuXHRcdH1cbiAgICB9XG4gIH1cblxuIl19