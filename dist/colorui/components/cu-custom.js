'use strict';

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();

Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: _wepy2.default.$instance.globalData.StatusBar,
    CustomBar: _wepy2.default.$instance.globalData.CustomBar,
    Custom: _wepy2.default.$instance.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage: function BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome: function toHome() {
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1LWN1c3RvbS5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJDb21wb25lbnQiLCJvcHRpb25zIiwiYWRkR2xvYmFsQ2xhc3MiLCJtdWx0aXBsZVNsb3RzIiwicHJvcGVydGllcyIsImJnQ29sb3IiLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsImlzQ3VzdG9tIiwiQm9vbGVhbiIsImlzQmFjayIsImJnSW1hZ2UiLCJkYXRhIiwiU3RhdHVzQmFyIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJDdXN0b21CYXIiLCJDdXN0b20iLCJtZXRob2RzIiwiQmFja1BhZ2UiLCJ3eCIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwidG9Ib21lIiwicmVMYXVuY2giLCJ1cmwiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQURBLElBQU1BLE1BQU1DLFFBQVo7O0FBRUFDLFVBQVU7QUFDUjs7O0FBR0FDLFdBQVM7QUFDUEMsb0JBQWdCLElBRFQ7QUFFUEMsbUJBQWU7QUFGUixHQUpEO0FBUVI7OztBQUdBQyxjQUFZO0FBQ1ZDLGFBQVM7QUFDUEMsWUFBTUMsTUFEQztBQUVQQyxlQUFTO0FBRkYsS0FEQztBQUtWQyxjQUFVO0FBQ1JILFlBQU0sQ0FBQ0ksT0FBRCxFQUFVSCxNQUFWLENBREU7QUFFUkMsZUFBUztBQUZELEtBTEE7QUFTVkcsWUFBUTtBQUNOTCxZQUFNLENBQUNJLE9BQUQsRUFBVUgsTUFBVixDQURBO0FBRU5DLGVBQVM7QUFGSCxLQVRFO0FBYVZJLGFBQVM7QUFDUE4sWUFBTUMsTUFEQztBQUVQQyxlQUFTO0FBRkY7QUFiQyxHQVhKOztBQThCUjs7O0FBR0FLLFFBQU07QUFDSkMsZUFBV0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCSCxTQURqQztBQUVKSSxlQUFXSCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLFNBRmpDO0FBR0pDLFlBQVFKLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkU7QUFIOUIsR0FqQ0U7QUFzQ1I7OztBQUdBQyxXQUFTO0FBQ1BDLFlBRE8sc0JBQ0k7QUFDVEMsU0FBR0MsWUFBSCxDQUFnQjtBQUNkQyxlQUFPO0FBRE8sT0FBaEI7QUFHRCxLQUxNO0FBTVBDLFVBTk8sb0JBTUM7QUFDTkgsU0FBR0ksUUFBSCxDQUFZO0FBQ1ZDLGFBQUs7QUFESyxPQUFaO0FBR0Q7QUFWTTtBQXpDRCxDQUFWIiwiZmlsZSI6ImN1LWN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcCgpO1xuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTkuIDkupvpgInpoblcbiAgICovXG4gIG9wdGlvbnM6IHtcbiAgICBhZGRHbG9iYWxDbGFzczogdHJ1ZSxcbiAgICBtdWx0aXBsZVNsb3RzOiB0cnVlXG4gIH0sXG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlr7nlpJblsZ7mgKdcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcbiAgICBiZ0NvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sIFxuICAgIGlzQ3VzdG9tOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBpc0JhY2s6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGJnSW1hZ2U6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcnXG4gICAgfSxcbiAgfSxcbiAgXG4gIC8qKlxuICAgKiDnu4Tku7bnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBTdGF0dXNCYXI6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuU3RhdHVzQmFyLFxuICAgIEN1c3RvbUJhcjogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5DdXN0b21CYXIsXG4gICAgQ3VzdG9tOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLkN1c3RvbVxuICB9LFxuICAvKipcbiAgICog57uE5Lu255qE5pa55rOV5YiX6KGoXG4gICAqL1xuICBtZXRob2RzOiB7XG4gICAgQmFja1BhZ2UoKSB7XG4gICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICBkZWx0YTogMVxuICAgICAgfSk7XG4gICAgfSxcbiAgICB0b0hvbWUoKXtcbiAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KSJdfQ==