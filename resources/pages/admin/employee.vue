<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'account profile', link: 'account-profile', active: true },
        { name: 'employee profililes', link: 'employee-profile' },
        { name: 'messages', link: 'message' }
      ]"
      :user="$store.getters['User/getUser']"
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
              <tr v-for="(item, index) in items" :key="index">
                <td class="item">{{ item.name }}</td>
                <td class="item">{{ item.address }}</td>
                <td class="item">{{ item.password }}</td>
                <td class="item">{{ item.phone }}</td>
                <td class="item">{{ item.email }}</td>
                <td class="item">{{ item.dataJoined }}</td>
                <td class="item position">
                  <v-select
                    background-color="#f1f4f8"
                    label="Admin"
                    solo
                  ></v-select>
                </td>
                <td class="item status" :class="item.status">
                  <v-select
                    :background-color="statuses[item.status].color"
                    :label="item.status"
                    :items="status"
                    v-model="items[index].status"
                    solo
                  ></v-select>
                </td>
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
                      type="text"
                      placeholder="Enter Address"
                      label="Address"
                      important
                      name="Address"
                      message="address required "
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
                      type="tel"
                      placeholder="Enter Phone"
                      label="Phone"
                      name="Phone"
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
                      type="email"
                      placeholder="Enter Email"
                      label="email"
                      important
                      name="email"
                      message="Email is required and must be valid"
                    />
                  </v-col>
                </v-row>
                <v-row style="margin:0;">
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
                      background-color="#f1f4f8"
                      label="Admin"
                      solo
                      style="min-width:100%"
                    ></v-select>
                  </v-col>
                  <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    cols="12"
                    class="form-field"
                  >
                    <label class="label">Access Level</label>
                    <v-select
                      background-color="#f1f4f8"
                      label="Admin"
                      solo
                      style="min-width:100%"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row
                  style="padding:0;margin:0 0 30px;"
                  justify="center"
                  class="submit-"
                >
                  <v-col xl="12" lg="12" md="12" sm="12" cols="12">
                    <button class="signup">
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
import LumberHeader from '../../components/Header.vue'
import TextField from '../../components/Shared/TextField.vue'
export default {
  components: {
    LumberHeader,
    TextField
  },
  data() {
    return {
      items: [
        {
          name: 'Zachary Levi',
          address: 'Usa,New York',
          password: 'DWSKAS!sdm123',
          phone: '+1 - (818) 59 59 04',
          email: 'Levi@lumberclick.com',
          dataJoined: '25 JUN 2019',
          position: '',
          accessLevel: '',
          status: 'terminate'
        }
      ],
      status: ['active', 'terminate', 'inActive'],
      position: ['estimator', 'customer support'],
      statuses: {
        active: { name: 'Active', class: 'active', color: '#3ce057' },
        terminate: { name: 'Terminate', class: 'active', color: '#f85b5b' },
        inActive: { name: 'InActive', class: 'active', color: '#7b7da3' }
      }
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
  max-width: 120px;
}
.table-card .access-level .v-input::v-deep .v-select__selections {
  min-width: 130px;
}
.table-card .status .v-input::v-deep .v-input__slot {
  border-radius: 60px;
}
.table-card .status .v-input::v-deep .v-select__selections {
  max-width: 80px;
  min-width: 80px;
}
.table-card .item {
  min-width: 170px;
}
.table-card .status .v-input::v-deep .v-input__append-inner {
  border-left: 2px solid rgba(0, 0, 0, 0.16);
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
