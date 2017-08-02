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
    todoList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toArticle: function(){
    wx.navigateTo({
      url: '../article/article'
    })
  },
  toPwdList: function(){
    wx.navigateTo({
      url: '../todolist/todolist'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        todoList: wx.getStorageSync('todoList') || []
      })
    })
  },
  updateList () {
    this.setData({
      todoList: wx.getStorageSync('todoList') || []
    })
  }
})
