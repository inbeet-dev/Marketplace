<template>
  <div>
    <v-text-field @input="location" v-model="address"></v-text-field>
    <v-card>
      <project-location v-model="position" style="height:400px;100%" />
    </v-card>
    {{ address }}
  </div>
</template>

<script>
import ProjectLocation from '../components/GetStarted/ProjectLocation'
export default {
  components: {
    ProjectLocation
  },
  data() {
    return {
      address: '',
      // latlng: {},
      position: null
    }
  },
  methods: {
    async location() {
      this.position = (await this.$axios.post('/api/v1/location', {
        address: this.address
      })).data
    }
  }
}
</script>

<style></style>
