<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'Projects', link: '/estimator-admin' }
      ]"
      :user="$store.getters['User/getUser']"
    />
    <v-row justify="center">
      <v-col md="8" sm="10" cols="12" style="margin-top:150px;">
        <h1>Estimator Manager Approval</h1>

        <v-card class="table-card">
          <v-simple-table class="table">
            <thead>
              <tr>
                <th class="text-left">User</th>
                <th class="text-left">Project</th>
                <th class="text-left">Lumber List</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in projects" :key="index">
                <td class="item">{{ item.userName }}</td>
                <td class="item">{{ item.projectName }}</td>
                <td class="item">
                  <button class="button button--grey" @click="show(index)">
                    View
                  </button>
                </td>
                <td class="item">
                  <button
                    class="button button--green"
                    @click="approve(item.id)"
                  >
                    Approve</button
                  ><button
                    class="button button--red"
                    style="margin-left: 20px"
                    @click="reject(item.id)"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <lumber-list-viewer />
  </v-container>
</template>

<script>
import LumberHeader from '@/components/Header.vue'
import LumberListViewer from '@/components/Shared/LumberListViewer'

export default {
  components: {
    LumberHeader,
    LumberListViewer
  },
  data() {
    return {
      projects: null
    }
  },
  async mounted() {
    await this.$store.restored
    this.loadProjects()
  },
  methods: {
    async loadProjects() {
      this.projects = (await this.$axios.get(
        '/api/v1/estimator-admin/lumber-lists',
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        }
      )).data
    },
    show(index) {
      this.$store.dispatch('Dialog/show', {
        name: 'LumberListViewer',
        data: this.projects[index].items
      })
    },
    async approve(id) {
      await this.$axios.post(
        '/api/v1/estimator-admin/lumber-list-approve',
        { lumberListId: id },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        }
      )
      this.$store.dispatch('SnackBar/show', 'Lumber List approved')
    },
    async reject(id) {
      await this.$axios.post(
        '/api/v1/estimator-admin/lumber-list-reject',
        { lumberListId: id },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        }
      )
      this.$store.dispatch('SnackBar/show', 'Lumber List rejected')
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  line-height: 70px;
  margin-bottom: 50px;
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

.button {
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 15px;
  min-width: 100px;

  &--grey {
    background-color: #9ea3c4;
    color: #ffffff;
  }

  &--green {
    background-color: #d8f9dd;
    color: #3ce057;
  }

  &--red {
    background-color: #fbd6d6;
    color: #ec3434;
  }
}
</style>
