<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'Account Profile', link: 'AccountProfile' },
        { name: 'Employee profiles', link: 'Employeeprofiles' },
        { name: 'messages', link: 'message' }
      ]"
      :user="$store.getters['User/getUser']"
    />
    <v-row style="padding-top:200px" justify="center">
      <v-col xl="3" lg="4" md="5" sm="8" cols="12" class="pa-8"
        ><v-card class="card-income">
          <h2>This Week</h2>
          <p>{{ total.newCustomers }} New Customers</p>
          <p>{{ total.newBidsSubmitted }} New Bids Submitted</p>
          <p>{{ total.bidAccepted }} Bids Accepted</p>
          <v-col cols="8" class="income-show">
            <span>${{ total.acceptedProjectsPrice }}</span>
            <p>In Projects Accepted</p></v-col
          >
        </v-card></v-col
      >
      <v-col xl="3" lg="4" md="5" sm="8" cols="12" class="pa-8"
        ><v-card class="card-income">
          <h2>Total</h2>
          <p>{{ week.newCustomers }} New Customers</p>
          <p>{{ week.newBidsSubmitted }} New Bids Submitted</p>
          <p>{{ week.bidAccepted }} Bids Accepted</p>
          <v-col cols="8" class="income-show">
            <span>${{ week.acceptedProjectsPrice }}</span>
            <p>In Projects Accepted</p></v-col
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="table-part">
      <v-col xl="7" lg="9" md="12" sm="12" cols="12">
        <h2>
          Lumber Lists
        </h2>
        <v-card class="card-table"
          ><v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#In Review</th>
                  <th class="text-left">#Received</th>
                  <th class="text-left">#Completed</th>
                  <th class="text-left">#Awaiting Customer Approval</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ lumberList.inReview }}</td>
                  <td>{{ lumberList.received }}</td>
                  <td>{{ lumberList.complete }}</td>
                  <td>{{ lumberList.awaitingManagerApproval }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table></v-card
        >
      </v-col>
      <v-col xl="7" lg="9" md="12" sm="12" cols="12">
        <h2>
          Bids
        </h2>
        <v-card class="card-table"
          ><v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#Open Bids</th>
                  <th class="text-left">#Paused Bids</th>
                  <th class="text-left">#Completed Bids</th>
                  <th class="text-left">#Cancelled Bids</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ bids.openBids }}</td>
                  <td>{{ bids.pausedBids }}</td>
                  <td>{{ bids.completedBids }}</td>
                  <td>{{ bids.cancelledBids }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table></v-card
        >
      </v-col>
    </v-row>
    <v-row justify="center" class="table-part" style="padding-bottom:200px;">
      <v-col xl="3" lg="4" md="12" sm="12" cols="12">
        <h2>
          Suppliers
        </h2>
        <v-card class="card-table"
          ><v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#Active</th>
                  <th class="text-left">#Inactive</th>
                  <th class="text-left">#In Review</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ suppliers.active }}</td>
                  <td>{{ suppliers.inActive }}</td>
                  <td>{{ suppliers.inReview }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table></v-card
        >
      </v-col>
      <v-col
        xl="3"
        lg="4"
        md="12"
        sm="12"
        cols="12"
        offset-lg="1"
        offset-xl="1"
      >
        <h2>
          Customers
        </h2>
        <v-card class="card-table"
          ><v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">#Projects</th>
                  <th class="text-left">#Projects</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ customers.count }}</td>
                  <td>{{ customers.projects }}</td>
                  <td>{{ customers.questions }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table></v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LumberHeader from '../../components/Header.vue'
export default {
  components: {
    LumberHeader
  },
  data() {
    return {
      lumberList: {},
      bids: {},
      suppliers: {},
      customers: {},
      total: {},
      week: {}
    }
  },
  async mounted() {
    await this.$store.restored
    this.$axios
      .get('/api/v1/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        this.bids = data.data.data.bids
        this.suppliers = data.data.data.suppliers
        this.customers = data.data.data.customers
        this.lumberList = data.data.data.lumberLists
        this.total = data.data.data.statistics.total
        this.week = data.data.data.statistics.week
        this.$store.dispatch('User/setUser', {
          name: data.data.data.user.name,
          role: data.data.data.user.role
        })
      })
      .catch((data) => {
        // console.log(data)
      })
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #ffffff;
  min-height: 100vh;
}
.row {
  margin: 0;
}
.card-income {
  border-top: 5px solid #f78f1e;
  padding-bottom: 80px;
  background-color: #ffffff;
  box-shadow: 0 3px 12px 0 #00000029;
  span {
    display: block;
    text-align: center;
    min-width: 100%;
    font-size: 35px;
    font-weight: 700;
    line-height: 50px;
    font-family: 'Lato', sans-serif;
  }
  h2 {
    color: #f78f1e;
    line-height: 120px;
    text-align: center;
  }
  p {
    color: #9ea4c4;
    text-align: center;
  }
  .income-show {
    position: absolute;
    background: #ffffff;
    border-radius: 12px !important;
    left: 50%;
    top: 250px;
    transform: translate(-50%);
    box-shadow: 0 3px 12px 0 #00000029;
  }
}
.table-part {
  padding-top: 40px;
  h2 {
    text-align: center;
    line-height: 80px;
  }
  .card-table {
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 10px;
    tr th {
      text-align: center !important;
      border-bottom: none !important;
      color: #9ea4c4;
      background-color: #fafafa;
    }
    tr td {
      text-align: center;
      font-family: 'Lato', sans-serif;
      font-size: 20px;
      font-weight: 900;
    }
  }
}
</style>
