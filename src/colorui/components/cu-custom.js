const app = getApp();
import wepy from 'wepy'
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
    },
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: wepy.$instance.globalData.StatusBar,
    CustomBar: wepy.$instance.globalData.CustomBar,
    Custom: wepy.$instance.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})