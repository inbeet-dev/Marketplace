export const state = () => ({
  id: null
})

export const getters = {
  getId(state) {
    return state.id
  }
}

export const mutations = {
  setId(state, value) {
    state.id = value
  }
}

export const actions = {
  store({ commit }, store) {
    commit('setId', store.id)
  }
}
