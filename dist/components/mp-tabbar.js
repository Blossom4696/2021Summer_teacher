"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
                "mp-tabbar": "/miniprogram_npm/weui-miniprogram/tabbar/tabbar"
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Index;
}(_wepy2.default.page);

exports.default = Index;


data = {
    tabBarList: [{
        "text": "主页",
        "iconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/homepage.png",
        "selectedIconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/homepagefill.png"
    }, {
        "text": "习题",
        "iconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/exercise.png",
        "selectedIconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/exercisefill.png"
    }, {
        "text": "我的",
        "iconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/my.png",
        "selectedIconPath": "http://159.138.3.194:8080/app/file/get_image?name=icon/myfill.png"
    }]
};

methods = {
    tabChange: function tabChange(e) {
        var self = this;
        console.log(e);
        switch (e.detail.index) {
            case 0:
                wx.switchTab({ url: 'index' });
                break;
            case 1:
                wx.switchTab({ url: 'exercise' });
                break;
            case 2:
                wx.switchTab({ url: 'example' });
                break;
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1wLXRhYmJhci5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsInVzaW5nQ29tcG9uZW50cyIsIndlcHkiLCJwYWdlIiwiZGF0YSIsInRhYkJhckxpc3QiLCJtZXRob2RzIiwidGFiQ2hhbmdlIiwiZSIsInNlbGYiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiaW5kZXgiLCJ3eCIsInN3aXRjaFRhYiIsInVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDZCQUFnQjtBQUNaLDZCQUFhO0FBREQ7QUFEVCxTOzs7O0VBRHdCQyxlQUFLQyxJOztrQkFBbkJKLEs7OztBQVFuQkssT0FBTztBQUNIQyxnQkFBWSxDQUFDO0FBQ1QsZ0JBQVEsSUFEQztBQUVULG9CQUFZLHFFQUZIO0FBR1QsNEJBQW9CO0FBSFgsS0FBRCxFQUtaO0FBQ0ksZ0JBQVEsSUFEWjtBQUVJLG9CQUFZLHFFQUZoQjtBQUdJLDRCQUFvQjtBQUh4QixLQUxZLEVBVVo7QUFDSSxnQkFBUSxJQURaO0FBRUksb0JBQVksK0RBRmhCO0FBR0ksNEJBQW9CO0FBSHhCLEtBVlk7QUFEVCxDQUFQOztBQWtCQUMsVUFBVTtBQUNOQyxhQURNLHFCQUNJQyxDQURKLEVBQ087QUFDVCxZQUFJQyxPQUFPLElBQVg7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWUgsQ0FBWjtBQUNBLGdCQUFPQSxFQUFFSSxNQUFGLENBQVNDLEtBQWhCO0FBQ0EsaUJBQUssQ0FBTDtBQUNJQyxtQkFBR0MsU0FBSCxDQUFhLEVBQUVDLEtBQUssT0FBUCxFQUFiO0FBQ0E7QUFDSixpQkFBSyxDQUFMO0FBQ0lGLG1CQUFHQyxTQUFILENBQWEsRUFBRUMsS0FBSyxVQUFQLEVBQWI7QUFDQTtBQUNKLGlCQUFLLENBQUw7QUFDSUYsbUJBQUdDLFNBQUgsQ0FBYSxFQUFFQyxLQUFLLFNBQVAsRUFBYjtBQUNBO0FBVEo7QUFXSDtBQWZLLENBQVYiLCJmaWxlIjoibXAtdGFiYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICB1c2luZ0NvbXBvbmVudHM6e1xyXG4gICAgICAgICAgXCJtcC10YWJiYXJcIjogXCIvbWluaXByb2dyYW1fbnBtL3dldWktbWluaXByb2dyYW0vdGFiYmFyL3RhYmJhclwiLFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgdGFiQmFyTGlzdDogW3tcclxuICAgICAgICAgICAgXCJ0ZXh0XCI6IFwi5Li76aG1XCIsXHJcbiAgICAgICAgICAgIFwiaWNvblBhdGhcIjogXCJodHRwOi8vMTU5LjEzOC4zLjE5NDo4MDgwL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vaG9tZXBhZ2UucG5nXCIsXHJcbiAgICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOiBcImh0dHA6Ly8xNTkuMTM4LjMuMTk0OjgwODAvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9ob21lcGFnZWZpbGwucG5nXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwidGV4dFwiOiBcIuS5oOmimFwiLFxyXG4gICAgICAgICAgICBcImljb25QYXRoXCI6IFwiaHR0cDovLzE1OS4xMzguMy4xOTQ6ODA4MC9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL2V4ZXJjaXNlLnBuZ1wiLFxyXG4gICAgICAgICAgICBcInNlbGVjdGVkSWNvblBhdGhcIjogXCJodHRwOi8vMTU5LjEzOC4zLjE5NDo4MDgwL2FwcC9maWxlL2dldF9pbWFnZT9uYW1lPWljb24vZXhlcmNpc2VmaWxsLnBuZ1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInRleHRcIjogXCLmiJHnmoRcIixcclxuICAgICAgICAgICAgXCJpY29uUGF0aFwiOiBcImh0dHA6Ly8xNTkuMTM4LjMuMTk0OjgwODAvYXBwL2ZpbGUvZ2V0X2ltYWdlP25hbWU9aWNvbi9teS5wbmdcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RlZEljb25QYXRoXCI6IFwiaHR0cDovLzE1OS4xMzguMy4xOTQ6ODA4MC9hcHAvZmlsZS9nZXRfaW1hZ2U/bmFtZT1pY29uL215ZmlsbC5wbmdcIixcclxuICAgICAgICB9XVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdGFiQ2hhbmdlKGUpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgICAgICAgIHN3aXRjaChlLmRldGFpbC5pbmRleCl7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7IHVybDogJ2luZGV4JyB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICdleGVyY2lzZScgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnZXhhbXBsZScgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbiAgXHJcblxyXG5cclxuIl19