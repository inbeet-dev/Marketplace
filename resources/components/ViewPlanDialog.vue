<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="main">
        <v-card-title class="headline">Plans</v-card-title>

        <v-row justify="center" class="ma-0">
          <v-col class="pa-0">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Type</th>
                  <th class="text-left">Name</th>
                  <th class="text-left" center>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data" :key="index">
                  <td>{{ item.type }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <a :href="item.path" target="_blank"
                      ><v-btn icon><v-icon>mdi-download</v-icon></v-btn>
                    </a>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row v-if="canUpload" justify="center">
          <v-btn color="#f78f1e" dark>
            Upload New Files
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    canUpload: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      plans: []
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'ViewPlanDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  mounted() {
    this.dialog = this.$store.getters['Dialog/active'] === 'ViewPlanDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'ViewPlanDialog'
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.main {
  border-top: 5px solid #f78f1e;
}
.row thead tr th:nth-child(3) {
  text-align: center !important;
}
.row tbody tr td:nth-child(3) {
  text-align: center;
}

.row tbody tr td:nth-child(3) a {
  text-decoration: none;
}
</style>
