export const state = () => ({
  name: '',
  data: ''
})

export const getters = {
  active(state) {
    return state.name
  },
  getData(state) {
    return state.data
  }
}

export const mutations = {
  setName(state, value) {
    state.name = value
  },
  setData(state, value) {
    state.data = value
  }
}

export const actions = {
  show({ commit }, data) {
    if (typeof data === 'string') {
      commit('setName', data)
      commit('setData', null)
    } else {
      commit('setName', data.name)
      commit('setData', data.data)
    }
  }
}
