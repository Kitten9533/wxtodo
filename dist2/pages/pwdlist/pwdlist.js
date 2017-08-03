var common = require('../../utils/common.js')
Page({
  data: {
    accounts: [
      // {category: '', desc: '', name: '', password: '', other: '', time: ''}
      // 类别 描述 用户名 密码 其他 创建时间
      { category: '游戏', desc: 'desc1', name: 'name1', password: 'pwd1', other: 'other', time: '2017-08-01' },
      { category: '游戏', desc: 'desc2', name: 'name2', password: 'pwd1', other: 'other', time: '2017-08-01' },
      { category: '网站', desc: 'desc3', name: 'name3', password: 'pwd1', other: 'other', time: '2017-08-01' },
      { category: '邮箱', desc: 'desc4', name: 'name4', password: 'pwd1', other: 'other', time: '2017-08-01' },
      { category: '其他', desc: 'desc5', name: 'name5', password: 'pwd1', other: 'other', time: '2017-08-01' },
      { category: '游戏', desc: 'desc6', name: 'name6', password: 'pwd1', other: 'other', time: '2017-08-01' },
    ],
    category: [
      { name: '游戏' },
      { name: '网站' },
      { name: '邮箱' },
      { name: '其他' }
    ]
  },
  onLoad: function () {
    console.log('pwdlist load')
  }
});