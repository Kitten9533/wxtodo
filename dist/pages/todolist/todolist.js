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
  onLoad(option) {
    let that = this
    this.setData({
      todoList: wx.getStorageSync('todoList') || [],
      key: option.key,
      todoName: option.todoName,
      todoDesc: option.todoDesc,
      timeStamp: option.timeStamp,
      descLen: !!option.todoDesc ? option.todoDesc.split('').length : 0
    })
  },
  nameChange(e) {
    this.setData({
      todoName: e.detail.value
    })
  },
  descChange(e) {
    let len = e.detail.value.split('').length
    this.setData({
      descLen: len,
      todoDesc: e.detail.value
    })
  },
  submit(e) {
    var that = this
    this.setData({
      showLoading: true
    })
    if (!this.data.todoName) {
      wx.showModal({
        content: '填写事项名称以保存',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            setTimeout(function () {
              that.setData({
                showLoading: false
              })
            }, 500);
          }
        }
      });
    }
    else {
      var p1 = new Promise((resolve, reject) => {
        try {
          that.setStorage();
          resolve()
        } catch (e) {
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
      Promise.all([p1, p2]).then(function () {
        setTimeout(function () {
          that.setData({
            showLoading: false
          })
          let pages = getCurrentPages()
          if (pages.length > 1) {
            let prePage = pages[pages.length - 2]
            prePage.updateList()
          }
          wx.navigateBack({})
        }, 500)
      }).catch(function (e) {
        console.log(e)
      })
    }
  },
  setStorage() {
    let tmpKey = this.data.key
    let todo = {}, todoList = this.data.todoList
    let date = new Date()
    if (!!tmpKey) {
      //编辑
      todo.key = tmpKey
      for (let i = 0, len = todoList.length; i < len; i++) {
        if (todoList[i].key === tmpKey) {
          todoList.splice(i, 1)
        }
      }
    } else {
      //新建
      todo.key = util.setKey(date)
    }
    todo.todoName = this.data.todoName
    todo.todoDesc = this.data.todoDesc
    todo.timeStamp = util.formatTime(date)
    todoList.unshift(todo)
    wx.setStorageSync('todoList', todoList)
  },
  initInfo() {
    this.setData({
      descLen: 0,
      todoName: '',
      todoDesc: ''
    })
  }
});