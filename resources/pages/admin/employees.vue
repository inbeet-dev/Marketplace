<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'account profile', link: 'account-profile' },
        { name: 'employee profililes', link: 'employee-profile', active: true },
        { name: 'messages', link: 'message' }
      ]"
    />
    <v-row justify="center" style="margin:0">
      <v-col md="11" sm="10" cols="12" style="margin:100px 0;">
        <h1 class="employee-profile-header">
          Employee profiles
        </h1>
        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Password</th>
                <th class="text-left">Phone</th>
                <th class="text-left">Email</th>
                <th class="text-left">Data Joined</th>
                <th class="text-left">Position</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td class="item">{{ employee.name }}</td>
                <td class="item">{{ employee.meta.address }}</td>
                <td class="item">**********</td>
                <td class="item">{{ employee.meta.phoneNumber }}</td>
                <td class="item">{{ employee.email }}</td>
                <td class="item">
                  {{ moment(employee.created_at).format('DD MMMM YYYY') }}
                </td>
                <td class="item position">
                  {{ employee.role }}
                </td>
                <td class="item status"></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
        <v-row justify="center" style="margin:0">
          <v-col xl="8" lg="10" md="10" sm="10" cols="12">
            <v-card class="add-employee-from">
              <form ref="regsiterForm">
                <v-row style="margin:0;">
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <text-field
                      v-model="newEmployee.name"
                      type="text"
                      placeholder="Enter Name"
                      label="name"
                      important
                      name="name"
                      message="Name is required"
                    />
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <text-field
                      v-model="newEmployee.address"
                      type="text"
                      placeholder="Enter Address"
                      label="Address"
                      important
                      name="Address"
                    />
                  </v-col>

                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <text-field
                      v-model="newEmployee.password"
                      type="password"
                      placeholder="Enter Password"
                      label="password"
                      important
                      name="password"
                      message="Password is required"
                    />
                  </v-col>

                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <text-field
                      v-model="newEmployee.phone"
                      type="tel"
                      placeholder="Enter Phone"
                      label="Phone"
                      name="Phone"
                      message="Phone number is required"
                    />
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <text-field
                      v-model="newEmployee.email"
                      type="email"
                      placeholder="Enter Email"
                      label="email"
                      important
                      name="email"
                      message="Email is required and must be valid"
                      @input="toLowerCase"
                    />
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <label class="label">Postion</label>
                    <v-select
                      v-model="newEmployee.role"
                      background-color="#f1f4f8"
                      solo
                      style="min-width:100%"
                      :items="positions"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row
                  style="padding:0;margin:0 0 30px;"
                  justify="center"
                  class="submit-"
                >
                  <v-col xl="12" lg="12" md="12" sm="12" cols="12">
                    <button class="signup" @click.prevent="submit()">
                      SIGN UP
                    </button>
                  </v-col>
                </v-row>
              </form>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import LumberHeader from '../../components/Header.vue'
import TextField from '../../components/Shared/TextField.vue'

export default {
  components: {
    LumberHeader,
    TextField
  },
  data() {
    return {
      employees: [],
      statuses: [
        { name: 'Active', class: 'active' },
        { name: 'Terminate', class: 'active' },
        { name: 'InActive', class: 'active' }
      ],
      positions: [
        { text: 'Admin', value: 'admin' },
        { text: 'Customer Support', value: 'customer-support' },
        { text: 'Estimator', value: 'estimator' },
        { text: 'Estimator Admin', value: 'estimator-admin' }
      ],
      newEmployee: {
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: ''
      }
    }
  },
  async mounted() {
    await this.$store.restored
    this.$axios
      .get('/api/v1/admin/employee', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        this.employees = data.data.data.employees
      })
      .catch((e) => {
        if (e.response) {
          this.$store.dispatch(
            'SnackBar/show',
            e.response.data.error[0].message
          )
        } else {
          this.$store.dispatch('SnackBar/show', 'an error occured')
        }
      })
  },
  methods: {
    toLowerCase(value) {
      this.newEmployee.email = value.toLowerCase()
    },
    async submit() {
      await this.$store.restored
      this.$axios
        .post('/api/v1/admin/employee', this.newEmployee, {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        })
        .then((data) => {
          this.$store.dispatch('SnackBar/show', 'Employee Successfuly Added')
        })
        .catch((e) => {
          if (e.response) {
            this.$store.dispatch(
              'SnackBar/show',
              e.response.data.error[0].message
            )
          } else {
            this.$store.dispatch('SnackBar/show', 'an error occured')
          }
        })
    },
    moment(...args) {
      return moment(...args)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fafafa;
  min-height: 100vh;
}
.employee-profile-header {
  font-family: 'Lato', sans-serif;
  font-size: 25px;
  line-height: 150px;
  text-align: center;
}
.profile {
  width: 100%;
  box-shadow: 0 3px 12px 0 #00000029;
  background-color: #ffffff;
  padding: 20px 40px 10px;
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
.table-card .position .v-input::v-deep .v-select__selections {
  min-width: 60px;
}
.table-card .access-level .v-input::v-deep .v-select__selections {
  min-width: 130px;
}
.table-card .status .v-input::v-deep .v-input__slot {
  border-radius: 60px;
}
.table-card .status .v-input::v-deep .v-select__selections {
  min-width: 80px;
  border-right: 2px solid red;
}
.table-card .item {
  min-width: 170px;
}
.table-card .table tr td.status .v-input::v-deep .v-label {
  color: #ffffff;
}
.table-card .table tr td.status .v-input::v-deep .theme--light.v-icon {
  color: #ffffff;
}
.add-employee-from {
  border-top: 5px solid #f78f1e;
  margin-top: 100px;
}
button.signup {
  height: 56px;
  width: 100%;
  background-color: #f48f2e;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-style: italic;
  font-size: 17px;
}
button.signup:disabled {
  background-color: #bbbbbb;
}
.signup:focus {
  border: 1px solid #f1f4f8;
  outline: none;
}
a {
  line-height: 56px;
  color: #8c8dae;
}
.v-input {
  display: inline-block;
  margin: 0;
}
.v-input__control {
  margin: 0;
  height: 24px;
}
.check-box::v-deep .v-input__slot {
  margin: 0;
}
p {
  font-size: 15px;
  line-height: 18px;
  display: inline;
}
.check-box::v-deep .v-messages.theme--light {
  display: none;
}
.add-employee-from::v-deap .v-input__slot {
  box-shadow: none;
}

.label {
  position: relative;
  margin: 5px 7px;
  color: #0b3265;
  font-style: italic;
  font-size: 15px;
  line-height: 40px;
  text-transform: capitalize;
}
</style>
