<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <nuxt />
        <snake-bar />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SnakeBar from '../components/Shared/SnackBar.vue'
export default {
  components: {
    SnakeBar
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0;
}
</style>
