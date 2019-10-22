export const state = () => ({
  token: null,
  refreshToken: null
})

export const getters = {
  getToken(state) {
    return state.token
  },
  getRefreshToken(state) {
    return state.refreshToken
  }
}

export const mutations = {
  setToken(state, value) {
    state.token = value
  },
  setRefreshToken(state, value) {
    state.refreshToken = value
  }
}

export const actions = {
  store({ commit }, store) {
    commit('setToken', store.token)
    commit('setRefreshToken', store.refreshToken)
  }
}
