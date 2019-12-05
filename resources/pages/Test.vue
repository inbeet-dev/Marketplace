<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'project', link: 'project' },
        { name: 'bids', link: 'bids' },
        { name: 'messages', link: 'messages' }
      ]"
      :user="$store.getters['User/getUser']"
    />
    <v-row justify="center">
      <v-col xl="6" lg="8" md="11" sm="12" cols="12" class="content">
        <h1>Estimator Manager Approval</h1>
        <v-card>
          <v-simple-table class="table">
            <template>
              <thead>
                <tr>
                  <th
                    class="text-left"
                    v-for="(item, index) in items"
                    :key="index"
                    style="width:100px"
                  >
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>item.name</td>
                  <td>item.name</td>
                  <td>
                    <v-btn color="#9ea4c4" class="view" depressed>View</v-btn>
                  </td>
                  <td style="width: 100px">
                    <v-btn color="#d8f9dd" class="approve" depressed
                      >Approve</v-btn
                    ><v-btn color="#fbd6d6" class="reject" depressed
                      >Reject</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LumberHeader from '../components/Header.vue'
export default {
  data() {
    return {
      items: ['User', 'Projet', 'Lumber List', 'Action']
    }
  },
  components: {
    LumberHeader
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #ffffff;
  min-height: 100vh;
  .row {
    margin: 0;
    .content {
      margin-top: 150px;
      .v-btn {
        border-radius: 8px;
        min-width: 120px;
        max-width: 120px;
      }
      .approve {
        color: #47e260;
      }
      .reject {
        color: #ec3434;
      }
      .view {
        color: #ffffff;
      }
      h1 {
        text-align: center;
        line-height: 120px;
      }
      .table {
        min-width: 100%;
        .table::v-deep .v-data-table__wrapper {
          border-radius: 4px !important;
          tr th {
            background-color: #fafafa;
            color: #9ea4c4;
            border-bottom: none;
            max-width: 200px;
          }
          tr td {
            max-width: 300px;
          }
        }
      }
    }
  }
}
</style>
