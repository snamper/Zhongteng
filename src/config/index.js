import _ from 'lodash'
export const status = {
  通过: '1',
  不通过: '0',
}

export const filterObj = {
  //内勤
  neiqin: function(arr) {
    var data = _.filter(arr, function(item) {
      return item.examStatus1 == null || item.examStatus1 == 2
    })
    return data
  },
  //主管
  director: function(arr) {
    var data = _.filter(arr, function(item) {
      return item.examStatus1 == null || item.examStatus1 == 2
    })
    return data
  },
  //总经理
  manager: function(arr) {
    var data = _.filter(arr, function(item) {
      return item.examStatus1 == null || item.examStatus1 == 2
    })
    return data
  },
  //财务审核通过
  finance: function(arr) {
    var data = _.filter(arr, function(item) {
      return item.examStatus1 == null || item.examStatus1 == 2
    })
    return data
  },
  //失败
  fail: function(arr) {
    var data = _.filter(arr, function(item) {
      return (
        item.examStatus1 == 0 ||
        item.examStatus2 == 0 ||
        item.examStatus3 == 0 ||
        item.examStatus4 == 0
      )
    })
    return data
  },
}
//隐藏审核按钮
export const hiddenBtn = ['fail']

export const peopleList = {
  examStatus1: '内勤审核',
  examStatus2: '主管审核',
  examStatus3: '总经理审核',
  examStatus4: '财务审核',
}
