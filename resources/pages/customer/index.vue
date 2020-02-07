<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'messages', link: 'message' }
      ]"
    />
    <v-row justify="center" style="margin:0">
      <v-col md="8" sm="10" cols="12">
        <v-card class="profile">
          <v-row>
            <v-col sm="6" cols="12">
              <h1 class="profile__user-name">
                {{ name }}
              </h1>
            </v-col>
            <v-col sm="6" cols="12" class="profile__create-time">
              <span class="profile__create-time__text"
                >Joined {{ createdAt }}</span
              >
            </v-col>
          </v-row>
          <hr style="margin:0 -40px;border:1px solid #fafafa" />
          <v-row>
            <v-col cols="12" class="specification">
              <span class="header-text">Address:</span>
              <span class="text"> {{ address }}</span>
              <br />
              <span class="header-text">Phone:</span>
              <span class="text"> {{ phoneNumber }}</span>
            </v-col>
          </v-row>
          <hr style="margin:0 -40px;border:1px solid #fafafa" />
          <v-row>
            <v-col sm="8" cols="12" class="jobs-completed">
              <b>
                <v-icon color="#3ce057" size="20px">mdi-check</v-icon> Projects
                Completed</b
              >: 46
            </v-col>
            <v-col class="edit" sm="4" cols="12">
              <a href="/customer/edit-profile">
                <v-btn
                  depressed
                  width="100%"
                  color="#f1f4f8"
                  class="edit__button"
                >
                  Edit Profile
                </v-btn>
              </a>
            </v-col>
          </v-row>
        </v-card>
        <v-row style="margin:0" class="current-projects">
          <v-col>
            <h1>Current Projects</h1>
          </v-col>
          <v-col cols="12" class="bidder-table">
            <v-card>
              <v-simple-table class="table">
                <thead>
                  <tr>
                    <th class="text-left">Project Name</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Date Assigned</th>
                    <th class="text-left">Date Due</th>
                    <th class="text-left">Time Remaining</th>
                  </tr>
                </thead>
                <tbody v-for="(project, index) in projects" :key="index">
                  <tr @click="projectProcess(project.id)">
                    <td>{{ project.name }}</td>
                    <td :style="{ color: STATUS[project.status].color }">
                      <v-icon
                        :style="{ color: STATUS[project.status].color }"
                        class="status-icon"
                        >{{ STATUS[project.status].icon }}</v-icon
                      >
                      {{ STATUS[project.status].text }}
                    </td>
                    <td>{{ dateConvert(project.created_at) }}</td>
                    <td>{{ dateConvert(project.due_date) }}</td>
                    <td>6 Days</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as moment from 'moment'
import LumberHeader from '@/components/Header.vue'
export default {
  components: {
    LumberHeader
  },
  data() {
    return {
      STATUS: {
        'Lumber List open': {
          text: 'Not Started',
          icon: 'mdi-circle-outline',
          color: '#000000'
        },
        'Lumber List Complete': {
          text: 'Awaiting Manager Approval',
          icon: 'mdi-clock',
          color: '#f78f1e'
        },
        'Awaiting Manager Approval': {
          text: 'Awaiting Manager Approval',
          icon: 'mdi-clock',
          color: '#f78f1e'
        },
        'Open For Bids': {
          text: 'Open For Bids',
          icon: 'mdi-clock',
          color: '#7e7e7e'
        },
        'Project Complete': {
          text: 'Project Complete',
          icon: 'mdi-check',
          color: '#3ce057'
        },
        'Project Canceled': {
          text: 'Project Canceled',
          icon: 'mdi-close-circle',
          color: 'red'
        },
        'Project On Hold': {
          text: 'Project On Hold',
          icon: 'mdi-pause',
          color: '#7e7e7e'
        }
      },
      name: '',
      address: '',
      phoneNumber: '',
      createdAt: '',
      time: '',
      projects: null
    }
  },
  async mounted() {
    await this.$store.restored
    this.$axios
      .get('/api/v1/user/dashboard', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        this.name = data.data.data.user.name
        this.phoneNumber = data.data.data.user.meta.phoneNumber
        // this.address = data.data.data.user.projects[0].address
        this.createdAt = this.time = moment(
          data.data.data.user.created_at
        ).format('DD MMMM YYYY')

        this.projects = data.data.data.user.projects

        this.$store.dispatch('User/setUser', {
          name: data.data.data.user.name,
          role: data.data.data.user.role
        })
      })
      .catch((data) => {
        if (data.response.data.error.status === 401) {
          this.$router.push('/login')
        }
      })
  },
  methods: {
    dateConvert(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    projectProcess(id) {
      this.$router.push('/customer/project/' + id)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fafafa;
  min-height: 100vh;
}
.profile {
  margin-top: 170px;
  width: 100%;
  box-shadow: 0 3px 12px 0 #00000029;
  background-color: #ffffff;
  padding: 20px 40px 10px;
}
.profile .profile__user-name {
  font-family: 'Lato', sans-serif;
  font-size: 25px;
  font-weight: 800;
  font-style: italic;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #f78f1e;
  display: inline-block;
  vertical-align: middle;
  margin: 15px 0;
}
.profile .profile__create-time {
  text-align: right;
}
.profile .profile__create-time .profile__create-time__text {
  line-height: 67px;
  color: #9ea4c4;

  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: italic;
}
.specification {
  padding: 20px 30px 10px;
}
.header-text {
  font-family: 'Lato';
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  color: #7b7da3;
}
.text {
  font-family: 'Lato';
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: #7b7da3;
}
.jobs-completed {
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  padding: 15px 30px;
  color: #3ce057;
}
.edit {
  text-align: right;
}
.edit__button {
  color: #7b7da3;
  border-radius: 8px;
  font-style: italic;
}
.bidder-table {
  margin-top: 10px;
  padding: 0 !important;
  width: 100%;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
}
.bidder-table .table {
  border-radius: 10px;
  z-index: -20;
  box-shadow: none;
}
.bidder-table .table:hover {
  border-radius: 10px;
  z-index: -20;
  box-shadow: none;
}
.bidder-table .table th {
  border-bottom: none;
  background-color: #fafafa;
  color: #9ea4c4;
  border: none !important;
  box-shadow: none !important;
}
.bidder-table .table tr td:first-child {
  border-left: 4px solid #ffffff;
  transition: 0.3s;
}
.bidder-table .table tr:hover td:first-child {
  // background-color: red;
  border-left: 4px solid #f78f1e;
}
.bidder-table .table tbody tr:hover {
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.16);
  z-index: 10;
  background-color: #ffffff;
  cursor: pointer;
}
.current-projects h1 {
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: #f78f1e;
  margin-top: 30px;
}
.status-icon {
  font-size: 17px;
}
</style>
