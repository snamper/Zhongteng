const state = {
  menuFlag: false,
  user_info: {
    user_id: '',
    user_name: localStorage.getItem('user_name') ?? '',
    user_token: localStorage.getItem('token') ?? '',
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
