export const state = {
  name: '',
  role: '',
  lastLocation: ''
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
  },
  getLastLocation(state) {
    return state.lastLocation
  }
}

export const mutations = {
  setName(state, value) {
    state.name = value
  },
  setRole(state, value) {
    state.role = value
  },
  setLastLocation(state, value) {
    state.lastLocation = value
  }
}

export const actions = {
  setUser({ commit }, user) {
    commit('setName', user.name)
    commit('setRole', user.role)
  }
}
