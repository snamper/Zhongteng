const decodeURIStr = function(str) {
  return window.decodeURI(str)
}
let user_id = localStorage.getItem('user_id')
let user_name = localStorage.getItem('user_name')
let token = localStorage.getItem('token')
let department = localStorage.getItem('department')
const state = {
  menuFlag: false,
  user_info: {
    user_id: user_id ? decodeURIStr(user_id) : '',
    user_name: user_name ? decodeURIStr(user_name) : '',
    user_token: token ?? '',
    department: department ? decodeURIStr(department) : '',
  },
}

const getters = {
  user_info(state) {
    return state.user_info
  },
  user_id(state) {
    return state.user_id
  },
  menuFlag(state) {
    return state.menuFlag
  },
}

const mutations = {
  SET_USER(state, userData) {
    state.user_info = userData
  },
  SET_MENU(state, menuFlag) {
    state.menuFlag = menuFlag
  },
}

export default {
  state,
  getters,
  mutations,
}
