export const state = () => ({
  snackbar: false,
  text: ''
})

export const getters = {
  status(state) {
    return state.snackbar
  },
  text(state) {
    return state.text
  }
}

export const mutations = {
  change(state, value) {
    state.snackbar = value
  },
  setText(state, value) {
    state.text = value
  }
}

export const actions = {
  show({ commit }, text) {
    commit('change', true)
    commit('setText', text)
  }
}
