import _ from 'lodash'
export const status = {
  通过: '1',
  不通过: '0',
}
//0 失败  1通过 2待审核
//隐藏审核按钮
export const hiddenBtn = ['fail']

export const peopleList = {
  examStatus1: '内勤审核',
  examStatus2: '主管审核',
  examStatus3: '总经理审核',
  examStatus4: '财务审核',
}

export const department = ['系统管理员', '内勤', '主管', '总经理', '财务','售后']
