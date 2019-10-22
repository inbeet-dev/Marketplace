export const state = () => ({
  uploadType: null
})

export const getters = {
  getUploadType(state) {
    return state.token
  }
}

export const mutations = {
  setUploadType(state, value) {
    state.uploadType = value
  }
}

export const actions = {
  store({ commit }, store) {
    commit('setUploadType', store)
  }
}
