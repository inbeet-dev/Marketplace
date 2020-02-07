<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'projects', link: '/' },
        { name: 'bids', link: '/' },
        { name: 'messages', link: '/' }
      ]"
    />
    <v-row justify="center" style="margin:0;">
      <v-col cols="11" style="margin-top:150px;">
        <h1>Project Accepting Bids</h1>
        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">Address</th>
                <th class="text-left">Date created</th>
                <th class="text-left">Estimated $</th>
                <th class="text-left">Location</th>
                <th class="text-left">Bids Received</th>
                <th class="text-left">Date Closes</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in projectsAcceptingBids" :key="index">
                <td class="item">{{ item.address }}</td>
                <td class="item">
                  {{ moment(item.dateCreated).format('DD MMMM YYYY') }}
                </td>
                <td class="item">{{ item.estimatedPrice }}</td>
                <td class="item">
                  <v-icon @click="openMap(item.location)">mdi-map</v-icon>
                </td>
                <td class="item">{{ item.bidsReceived }}</td>
                <td class="item">{{ item.dateCloses }}</td>
                <td>
                  <v-btn text fab @click="goToProject(item.id)"
                    ><v-icon color="#9ca2c3">mdi-eye-circle</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="11" style="margin-top:150px;">
        <h1>Closed Project /Projects Won</h1>
        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">Address</th>
                <th class="text-left">Date created</th>
                <th class="text-left">Estimated $</th>
                <th class="text-left">Location</th>
                <th class="text-left">Status</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in closedOrWonProjects" :key="index">
                <td class="item">{{ item.address }}</td>
                <td class="item">
                  {{ moment(item.dateCreated).format('DD MMMM YYYY') }}
                </td>
                <td class="item">{{ item.estimatedPrice }}</td>
                <td class="item">
                  <v-icon @click="openMap(item.location)">mdi-map</v-icon>
                </td>
                <td class="item">{{ item.status }}</td>
                <td>
                  <v-btn text fab @click="goToProject(item.id)"
                    ><v-icon color="#9ca2c3">mdi-eye-circle</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <ProjectLocationDialog />
  </v-container>
</template>

<script>
import * as moment from 'moment'
import LumberHeader from '../../components/Header.vue'
import ProjectLocationDialog from '@/components/Supplier/ProjectLocationDialog'

export default {
  components: {
    LumberHeader,
    ProjectLocationDialog
  },
  data() {
    return {
      projectsAcceptingBids: [],
      closedOrWonProjects: []
    }
  },
  async mounted() {
    await this.$store.restored
    this.$axios
      .get('/api/v1/supplier/dashboard', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        this.projectsAcceptingBids = data.data.projectsAcceptingBids
        this.closedOrWonProjects = data.data.closedOrWonProjects
      })
      .catch((data) => {})
  },
  methods: {
    moment(...args) {
      return moment(...args)
    },
    openMap(location) {
      this.$store.dispatch('Dialog/show', {
        name: 'ProjectLocationDialog',
        data: [location.lat, location.long]
      })
    },
    goToProject(id) {
      this.$router.push(`/supplier/project/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #ffffff;
}
h1 {
  text-align: center;
  line-height: 70px;
  color: #f48f2e;
}
.table-card {
  margin-top: 10px;
  padding: 0 !important;
  width: 100%;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
}
.table-card .table th {
  border-bottom: none !important;
  background-color: #fafafa;
  color: #9ea4c4;
}
.table-card .table .status {
  color: #9ea4c4;
  font-weight: 600;
}
</style>
