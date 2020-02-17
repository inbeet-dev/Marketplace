<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="main">
        <v-card-title class="headline">Plans</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Type</th>
                    <th class="text-left">Name</th>
                    <th class="text-left" center>Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of plans" :key="item.path">
                    <td>{{ item.type }}</td>
                    <td>{{ getName(item.path) }}</td>
                    <td>
                      <a :href="item.path" target="_blank"
                        ><v-btn><v-icon>mdi-download</v-icon></v-btn>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row v-if="canUpload" justify="center">
            <v-btn
              color="#f78f1e"
              dark
              @click="
                $store.dispatch('Dialog/show', {
                  name: 'UploadFileDialog',
                  data: { action: loadPlans }
                })
              "
            >
              Upload New Files
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <UploadFileDialog />
  </v-row>
</template>
<script>
import UploadFileDialog from '@/components/GetStarted/UploadFileDialog'

export default {
  components: {
    UploadFileDialog
  },
  props: {
    value: { type: Boolean, default: false },
    canUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      plans: []
    }
  },
  watch: {
    value() {
      this.dialog = this.value
    },
    dialog() {
      this.$emit('input', this.dialog)
    }
  },
  async mounted() {
    await this.$store.restored
    await this.loadPlans()
  },
  methods: {
    getName(path) {
      return path
        .split('/')
        .pop()
        .split('-')
        .pop()
    },
    async loadPlans() {
      this.plans = (
        await this.$axios.get(
          `/api/v1/project/${this.$route.params.id}/plans`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
            }
          }
        )
      ).data.data
    }
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
