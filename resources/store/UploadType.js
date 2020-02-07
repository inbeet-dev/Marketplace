export const state = () => ({
  uploadType: ''
})

export const getters = {
  getUploadType(state) {
    return state.uploadType
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
