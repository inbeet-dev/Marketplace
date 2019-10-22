<template>
  <v-app class="home-page">
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
.home-page {
  background-image: url(/lumber-background.png);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px;
}
.v-content {
  background-color: #00000051;
}
.container {
  padding: 0;
}
</style>
