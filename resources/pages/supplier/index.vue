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
        <h1>Active Suppliers</h1>
        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">Supplier</th>
                <th class="text-left">Address</th>
                <th class="text-left">Email</th>
                <th class="text-left">Phone</th>
                <th class="text-left">Contact</th>
                <th class="text-left">Data created</th>
                <th class="text-left">Costomer Rating</th>
                <th class="text-left">#bids Accepted</th>
                <th class="text-left">Respose Time</th>
                <th class="text-left">Status</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in suppliers" :key="index">
                <td class="item">{{ item.supplier }}</td>
                <td class="item">{{ item.address }}</td>
                <td class="item">{{ item.email }}</td>
                <td class="item">{{ item.phone }}</td>
                <td class="item">{{ item.contact }}</td>
                <td class="item">
                  <!-- {{ moment(employee.created_at).format('DD MMMM YYYY') }} -->
                </td>
                <td class="item">{{ item.rate }}</td>
                <td class="item">{{ item.accepted }}</td>
                <td class="item">{{ item.resTime }}</td>
                <td class="item status">
                  <v-select
                    v-model="suppliers[index].status"
                    :items="items"
                    solo
                    :background-color="statuses[suppliers[index].status].color"
                  ></v-select>
                </td>

                <td class="item"><v-icon>mdi-pencil-outline</v-icon></td>
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
      suppliers: [
        {
          supplier: 'name',
          address: 'address',
          email: 'email',
          phone: 'phone',
          contact: '09216615806',
          dataCreated: '22/10/77',
          status: 'Active',
          rate: 'rate',
          accepted: '28',
          resTime: '22/123/2'
        }
      ],
      statuses: {
        Active: {
          name: 'Active',
          class: 'active',
          color: '#3ce057'
        },
        InActive: {
          name: 'InActive',
          class: 'active',
          color: '#f85b5b'
        }
      },
      items: ['Active', 'InActive']
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
        console.log(data)
        // this.name = data.data.data.user.name
        // this.phoneNumber = data.data.data.user.meta.phoneNumber
        // // this.address = data.data.data.user.projects[0].address
        // this.createdAt = this.time = moment(
        //   data.data.data.user.created_at
        // ).format('DD MMMM YYYY')

        // this.projects = data.data.data.user.projects

        // this.$store.dispatch('User/setUser', {
        //   name: data.data.data.user.name,
        //   role: data.data.data.user.role
        // })
      })
      .catch((data) => {
        // if (data.response.data.error.status === 401) {
        //   this.$router.push('/login')
        // }
      })
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
  line-height: 150px;
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
.table-card .table tbody tr:hover {
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.16);
  z-index: 10;
  background-color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}
.table-card .table tr td:first-child {
  border-left: 4px solid #f78e1e00;
}
.table-card .table tr:hover td:first-child {
  border-left: 4px solid #f78f1e;
  transition: 0.3s;
}
.table-card .table tr td .v-input::v-deep .v-input__slot {
  margin: 8px 0;
  box-shadow: none;
}
.table-card .table tr td .v-input::v-deep .v-text-field__details {
  display: none;
}
.table-card .table tr td .v-input::v-deep .v-label {
  color: #9ea4c4;
}
.table-card .table tr td .v-input::v-deep .theme--light.v-icon {
  color: #9ea4c4;
}
.table-card .access-level .v-input::v-deep .v-select__selections {
  min-width: 130px;
}
.table-card .status .v-input::v-deep .v-input__slot {
  border-radius: 60px;
}
.table-card .status .v-input::v-deep .v-select__selections {
  min-width: 80px;
  border-right: 2px solid rgba(0, 0, 0, 0.16);
}
.table-card .item {
  min-width: 170px;
}
.table-card .item:last-child {
  min-width: 40px;
}
.table-card
  .status
  .v-input::v-deep
  .v-select__selection.v-select__selection--comma {
  color: #ffffff;
}
.table-card .table tr td.status .v-input::v-deep .v-label {
  color: #ffffff;
}
.table-card .table tr td.status .v-input::v-deep .theme--light.v-icon {
  color: #ffffff;
}
</style>
