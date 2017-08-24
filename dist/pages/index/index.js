//index.js
//获取应用实例
var app = getApp()
var common = require('../../utils/common.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    text: 'toPassword',
    objList: [
      { key: 'name1', value: 'val 1' },
      { key: 'name2', value: 'val 2' }
    ],
    todoList: [],
    touchStart: '',
    touchEnd: '',
    lock: false,
    timer: null
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toArticle: function () {
    wx.navigateTo({
      url: '../article/article'
    })
  },
  toPwdList: function () {
    wx.navigateTo({
      url: '../todolist/todolist'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        todoList: wx.getStorageSync('todoList') || []
      })
    })
  },
  updateList() {
    this.setData({
      todoList: wx.getStorageSync('todoList') || []
    })
  },
  longTap(e) {
    var that = this, key = e.currentTarget.dataset.itemkey
    wx.showModal({
      title: '提示',
      content: '是否删除待办事项？',
      success: function (res) {
        if (res.confirm) {
          that.deleteOne(key)
        }
      }
    })
  },
  deleteOne(key) {
    let list = this.data.todoList
    let that = this
    for (let i = 0; i < list.length; i++) {
      if (list[i].key == key) {
        list.splice(i, 1)
      }
    }
    wx.setStorage({
      key: 'todoList',
      data: list,
      success: function () {
        that.setData({
          todoList: list
        })
      }
    })
  },
  touchStart(e){
    var that = this, key = e.currentTarget.dataset.itemkey
    this.setData({
      touchStart: e.timeStamp
    })
    // return
    // this.setData({
    //   touchStart: e.timeStamp,
    //   lock: true,
    //   timer: setInterval(function () {
    //     if(!!that.data.timer){
    //       that.data.timer = null
    //       wx.showModal({
    //         title: '提示',
    //         content: '是否删除待办事项？',
    //         success: function (res) {
    //           if (res.confirm) {
    //             that.deleteOne(key)
    //           }
    //         }
    //       })
    //     }
    //   }, 300)
    // })
    // console.log('touchStart', this.data.touchStart)
  },
  touchEnd(e){
    this.setData({
      touchEnd: e.timeStamp
    })
    // return
    // if(!!this.data.timer){
    //   clearInterval(this.data.timer)
    // }
    // this.setData({
    //   touchEnd: e.timeStamp,
    //   lock: false,
    //   timer: null
    // })
    // console.log('touchEnd', this.data.touchEnd)
  },
  itemTap(e){
    if (this.data.touchEnd - this.data.touchStart < 350 && !this.data.timer){
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})
