<template>
  <ul>
    <v-snackbar v-model="snackbar" top>
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false
    }
  },
  watch: {
    snackbar() {
      this.$store.commit('SnackBar/change', this.snackbar)
    }
  },
  computed: {
    text() {
      return this.$store.getters['SnackBar/text']
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters['SnackBar/status'],
      (newValue) => {
        this.snackbar = newValue
      }
    )
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
