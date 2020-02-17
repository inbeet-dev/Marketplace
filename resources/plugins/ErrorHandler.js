import Vue from 'vue'

Vue.config.errorHandler = (err, vm, info) => {
  vm.$store.commit('User/setLastLocation', vm.$route.path)
  if (err.response && [401, 403].includes(err.response.status)) {
    vm.$router.push('/login')
  } else if (err.response && err.response.status === 400) {
    vm.$store.dispatch('SnackBar/show', err.response.data[0].message)
  } else if (err.response && err.response.status === 500) {
    vm.$store.dispatch('SnackBar/show', 'Server Error')
  }
}
