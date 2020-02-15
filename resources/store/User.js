export const state = {
  name: '',
  role: ''
}

export const getters = {
  getName(state) {
    return state.name
  },
  getRole(state) {
    return state.role
  },
  getUser(state) {
    return state
  }
}

export const mutations = {
  setName(state, value) {
    state.name = value
  },
  setRole(state, value) {
    state.role = value
  }
}

export const actions = {
  setUser({ commit }, user) {
    commit('setName', user.name)
    commit('setRole', user.role)
  }
}
