var common = require('../../utils/common.js')
var util = require('../../utils/util.js')
Page({
  data: {
    // accounts: [
    //   // {category: '', desc: '', name: '', password: '', other: '', time: ''}
    //   // 类别 描述 用户名 密码 其他 创建时间
    //   { category: '游戏', desc: 'desc1', name: 'name1', password: 'pwd1', other: 'other', time: '2017-08-01' },
    //   { category: '游戏', desc: 'desc2', name: 'name2', password: 'pwd1', other: 'other', time: '2017-08-01' },
    //   { category: '网站', desc: 'desc3', name: 'name3', password: 'pwd1', other: 'other', time: '2017-08-01' },
    //   { category: '邮箱', desc: 'desc4', name: 'name4', password: 'pwd1', other: 'other', time: '2017-08-01' },
    //   { category: '其他', desc: 'desc5', name: 'name5', password: 'pwd1', other: 'other', time: '2017-08-01' },
    //   { category: '游戏', desc: 'desc6', name: 'name6', password: 'pwd1', other: 'other', time: '2017-08-01' },
    // ],
    // category: [
    //   { name: '游戏' },
    //   { name: '网站' },
    //   { name: '邮箱' },
    //   { name: '其他' }
    // ],
    todoList: [],
    descLen: 0,
    maxDescLen: 200,
    key: '',
    todoName: '',
    todoDesc: '',
    timeStamp: '',
    showLoading: false
  },
  onLoad (option) {
    let that = this
    console.log(option)
    this.setData({
      todoList: wx.getStorageSync('todoList') || [],
      key: option.key,
      todoName: option.todoName,
      todoDesc: option.todoDesc,
      timeStamp: option.timeStamp,
      descLen: !!option.todoDesc ? option.todoDesc.split('').length : 0
    })
  },
  nameChange (e) {
    this.setData({
      todoName: e.detail.value
    })
  },
  descChange (e) {
    let len = e.detail.value.split('').length
    this.setData({
      descLen: len,
      todoDesc: e.detail.value
    })
  },
  submit (e) {
    this.setData({
      showLoading: true
    })
    
    wx.showModal({
      title: '提示',
      content: '模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    })

    var that = this
    var p1 = new Promise((resolve, reject) => {
      try{
        that.setStorage();
        resolve()
      } catch (e){
        reject(e)
      }
    })
    var p2 = new Promise((resolve, reject) => {
      try {
        that.initInfo();
        resolve()
      } catch (e) {
        reject(e)
      }
    })
    Promise.all([p1, p2]).then(function(){
      console.log('保存成功，页面返回')
      setTimeout(function(){
        that.setData({
          showLoading: false
        })
        let pages = getCurrentPages()
        if(pages.length > 1){
          let prePage = pages[pages.length - 2]
          prePage.updateList()
        }
        wx.navigateBack({})
        // wx.redirectTo({
        //   url: '../index/index',
        // })
      }, 500)
    }).catch(function(e){
      console.log(e)
    })
  },
  setStorage () {
    let todo = {}, todoList = this.data.todoList
    let date = new Date()
    todo.key = util.setKey(date)
    todo.todoName = this.data.todoName
    todo.todoDesc = this.data.todoDesc
    todo.timeStamp = util.formatTime(date)
    todoList.unshift(todo)
    // this.setData({
    //   todoList: todoList
    // })
    wx.setStorageSync('todoList', todoList)
  },
  initInfo () {
    this.setData({
      descLen: 0,
      todoName: '',
      todoDesc: ''
    })
  }
});