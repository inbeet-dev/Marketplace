<template>
  <v-dialog v-model="dialog" width="900">
    <v-card class="mx-auto box" outlined elevation raised width="100%">
      <v-icon class="close-icon" @click="dialog = false">
        mdi-close
      </v-icon>
      <v-row style="margin:0; height: 500px">
        <v-col xl="12" lg="12 " md="12" sm="12" cols="12">
          <client-only>
            <l-map :zoom="8" :center="location">
              <l-tile-layer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              ></l-tile-layer>
              <l-marker :lat-lng="location"></l-marker>
            </l-map>
          </client-only>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      location: [0, 0]
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'ProjectLocationDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  mounted() {
    this.dialog =
      this.$store.getters['Dialog/active'] === 'ProjectLocationDialog'
    if (this.dialog) this.location = this.$store.getters['Dialog/getData']

    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'ProjectLocationDialog'
        if (this.dialog) this.location = this.$store.getters['Dialog/getData']
      }
    )
  },
  errorCaptured() {
    return false
  }
}
</script>
<style lang="scss" scoped>
.box {
  border-top: 7px solid #f48f2e;
  border-left: 0;
  border-right: 0;
  padding: 0px 10px;
}
.close-icon {
  position: absolute;
  right: 20px;
  top: 10px;
}
.close-icon:hover {
  color: #f48f2e;
}
</style>
