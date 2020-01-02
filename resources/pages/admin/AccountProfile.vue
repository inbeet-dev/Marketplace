<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'account profile', link: '/' },
        { name: 'employee profiles', link: '/' },
        { name: 'messages', link: 'message' }
      ]"
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
                <th class="text-left">Data created</th>
                <th class="text-left">Costomer Rating</th>
                <th class="text-left">#bids Accepted</th>
                <th class="text-left">Respose Time</th>
                <th class="text-left">Status</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in inReviewOrActive" :key="index">
                <td class="item">{{ item.name }}</td>
                <td class="item"></td>
                <td class="item">{{ item.email }}</td>
                <td class="item">{{ item.meta.phoneNumber }}</td>
                <td class="item">
                  {{ moment(item.created_at).format('DD MMMM YYYY') }}
                </td>
                <td class="item"></td>
                <td class="item"></td>
                <td class="item"></td>
                <td class="item status">
                  <v-select
                    v-model="inReviewOrActive[index].status"
                    :items="items"
                    :background-color="
                      statuses[inReviewOrActive[index].status].color
                    "
                  ></v-select>
                </td>

                <td class="item">
                  <v-icon
                    @click.stop="
                      $store.dispatch('Dialog/show', {
                        name: 'SupplierListEditDialog',
                        data: inReviewOrActive[index]
                      })
                    "
                    >mdi-pencil-outline</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="11" style="margin-top:100px;">
        <h1>InActive Suppliers</h1>
        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">Supplier</th>
                <th class="text-left">Address</th>
                <th class="text-left">Phone Number</th>
                <th class="text-left">Email</th>
                <th class="text-left">Account Status</th>
                <th class="text-left">Last Active</th>
                <th class="text-left">#bids Completed</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in inActive" :key="index">
                <td class="item">{{ item }}</td>
                <td class="item">{{ item }}</td>
                <td class="item">{{ item }}</td>
                <td class="item">{{ item }}</td>
                <td class="item account-status">
                  <v-select
                    :items="activity"
                    solo
                    background-color="#f1f4f8"
                  ></v-select>
                </td>
                <td class="item">
                  <!-- {{ moment(employee.created_at).format('DD MMMM YYYY') }} -->
                </td>
                <td>asd</td>
                <td class="item">
                  <v-icon
                    @click.stop="
                      $store.dispatch('Dialog/show', {
                        name: 'SupplierListEditDialog',
                        data: inActive[index]
                      })
                    "
                    >mdi-pencil-outline</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
      <supplier-list-edit-dialog />
    </v-row>
  </v-container>
</template>

<script>
import * as moment from 'moment'
import LumberHeader from '../../components/Header.vue'
import SupplierListEditDialog from '../../components/Supplier/SupplierListEditDialog'
export default {
  components: {
    LumberHeader,
    SupplierListEditDialog
  },
  data() {
    return {
      inReviewOrActive: [],
      inActive: [],
      statuses: {
        active: {
          name: 'Active',
          class: 'active',
          color: '#3ce057'
        },
        inactive: {
          name: 'InActive',
          class: 'active',
          color: '#f85b5b'
        }
      },
      activity: ['Remove', 'Pause', 'Cancel'],
      items: [
        { text: 'Active', value: 'active' },
        { text: 'InActive', value: 'inactive' }
      ]
    }
  },
  async mounted() {
    await this.$store.restored
    this.$axios
      .get('/api/v1/supplier', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        console.log(data.data.data.suppliers)
        this.inActive = data.data.data.suppliers.cancelledOrPaused
        this.inReviewOrActive = data.data.data.suppliers.inReviewOrActive
      })
      .catch((data) => {
        if (data.response.data.error.status === 401) {
          this.$router.push('/login')
        }
      })
  },
  methods: {
    moment(...arg) {
      return moment(...arg)
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
.table-card .table tr td .v-input {
  margin: 0;
  padding: 0;
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
  // min-width: 80px;
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
  margin: 0px auto;
}
.table-card .table tr td.status .v-input::v-deep .v-label {
  color: #ffffff;
}
.table-card .table tr td.status .v-input::v-deep .theme--light.v-icon {
  color: #ffffff;
}

.table-card .account-status .v-input::v-deep .v-input__slot {
  border-radius: 10px;
}
.table-card .table tr td.account-status .v-input::v-deep .v-label {
  color: #9ea4c4;
}
.table-card .table tr td.account-status .v-input::v-deep .theme--light.v-icon {
  color: #9ea4c4;
}
.table-card
  .account-status
  .v-input::v-deep
  .v-select__selection.v-select__selection--comma {
  color: #9ea4c4;
}
.table-card .status .v-input::v-deep .v-select__selections input {
  display: none;
}
.table-card .status .v-input::v-deep .v-input__slot {
  min-height: 34px;
}
.table-card .status .v-input::v-deep .v-input__slot::before {
  border-style: none;
  display: none;
}
.table-card .status .v-input::v-deep .v-input__slot::after {
  border-style: none;
  display: none;
}
.table-card .status .v-input::v-deep .v-input__append-inner {
  padding: 0px 6px 0px 4px;
  margin-top: 1px;
}
</style>
