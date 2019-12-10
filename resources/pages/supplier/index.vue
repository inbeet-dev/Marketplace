<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'account profile', link: '/' },
        { name: 'employee profiles', link: '/' },
        { name: 'messages', link: 'message' }
      ]"
      :user="$store.getters['User/getUser']"
    />
    <v-row justify="center" style="margin:0;">
      <v-col cols="11" style="margin-top:150px;">
        <h1>Project Accepting Bids</h1>
        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">Address</th>
                <th class="text-left">Data created</th>
                <th class="text-left">Estimated $</th>
                <th class="text-left">Location</th>
                <th class="text-left">Bids Received</th>
                <th class="text-left">Date Closes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in bidedProjects" :key="index">
                <td class="item">{{ item.supplier }}</td>
                <td class="item">{{ item.address }}</td>
                <td class="item">{{ item.email }}</td>
                <td class="item">{{ item.phone }}</td>
                <td class="item">{{ item.contact }}</td>
                <td class="item">
                  <!-- {{ moment(item.dataCreated).format('DD MMMM YYYY') }} -->
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
                <th class="text-left">Data created</th>
                <th class="text-left">Estimated $</th>
                <th class="text-left">Location</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in notBiddedProjects" :key="index">
                <td class="item">{{ item.supplier }}</td>
                <td class="item">{{ item.address }}</td>
                <td class="item">{{ item.email }}</td>
                <td class="item">{{ item.contact }}</td>
                <td class="item status">asdasd</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import * as moment from 'moment'
import LumberHeader from '../../components/Header.vue'
export default {
  components: {
    LumberHeader
  },
  data() {
    return {
      bidedProjects: [],
      notBiddedProjects: []
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
        console.log(data.data.data)
        this.notBiddedProjects = data.data.data.notBiddedProjects
        this.bidedProjects = data.data.data.bidedProjects
      })
      .catch((data) => {})
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
