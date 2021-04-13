import _ from 'lodash'
export const status = {
  通过: '1',
  不通过: '0',
}
//0 失败  1通过 2待审核
//隐藏审核按钮
export const hiddenBtn = ['fail', 'success']

export const peopleList = {
  examStatus1: '内勤审核',
  examStatus2: '主管审核',
  examStatus3: '总经理审核',
  examStatus4: '财务审核',
}

export const sendFiled = {
  neiqin: (status, text = null) => {
    return {
      examStatus1: status,
      examStatus2: '2',
      examDate1: new Date().getTime(),
      examDevice1: text,
    }
  },
  director: (status, text = null) => {
    return {
      examStatus2: status,
      examStatus3: '2',
      examDate2: new Date().getTime(),
      examDevice2: text,
    }
  },
  manager: (status, text = null) => {
    return {
      examStatus3: status,
      examStatus4: '2',
      examDate3: new Date().getTime(),
      examDevice3: text,
    }
  },
  finance: (status, text = null) => {
    return {
      examStatus4: status,
      examDate4: new Date().getTime(),
      examDevice4: text,
    }
  },
}

export const department = [
  '系统管理员',
  '内勤',
  '主管',
  '总经理',
  '财务',
  '售后',
]
