<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'messages', link: 'messages' }
      ]"
      :login="{ name: 'login', link: 'login' }"
    />
    <v-row justify="center" class="ma-0">
      <v-col md="12" sm="12" cols="12" style="margin-top:150px;">
        <h1 class="title">EstimatorManagerAssignments</h1>
      </v-col>
      <v-col xl="2" lg="3" md="3" sm="3" cols="12">
        <v-card class="filter-card px-5">
          <span class="filter-card__title">Filter</span>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, index) in filter" :key="index">
                <v-list-item-content>
                  <v-list-item-title :style="{ color: item.color }"
                    >{{ item.text }}
                    <span style="float:right" :style="{ color: item.color }">{{
                      item.num
                    }}</span></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col xl="9" lg="9" md="8" sm="8" cols="12">
        <v-card class="card">
          <v-simple-table class="card__table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left card__table__header">User</th>
                  <th class="text-left card__table__header">Address</th>
                  <th class="text-left card__table__header">View Plan</th>
                  <th class="text-left card__table__header">Lumber List</th>
                  <th class="text-left card__table__header">Due Date</th>
                  <th class="text-left card__table__header">Estimator</th>
                  <th class="text-left card__table__header">status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data"
                  :key="index"
                  class="card__table__row"
                >
                  <td class="card__table__row__item">{{ item.user.name }}</td>
                  <td class="card__table__row__item">
                    {{ item.project.address }}
                  </td>
                  <td class="card__table__row__item">
                    <v-btn
                      depressed
                      dark
                      color="#9ea4c4"
                      class="card__table__row__item__btn"
                      @click.stop="
                        $store.dispatch('Dialog/show', {
                          name: 'ViewPlanDialog'
                        })
                      "
                      >View Plan</v-btn
                    >
                  </td>
                  <td class="card__table__row__item">
                    <v-btn
                      depressed
                      dark
                      color="#9ea4c4"
                      class="card__table__row__item__btn"
                      @click.stop="
                        $store.dispatch('Dialog/show', {
                          name: 'LumberList'
                        })
                      "
                      >Lumber List</v-btn
                    >
                  </td>

                  <td class="card__table__row__item">
                    <date-picker
                      :due-date="item.project.dueDate"
                      @click="save($event, index)"
                    />
                  </td>

                  <td class="card__table__row__item">
                    <v-select
                      v-model="item.estimatorId"
                      background-color="#f1f4f8"
                      color="#9ea4c4"
                      :items="estimators"
                      solo
                    ></v-select>
                  </td>
                  <td class="card__table__row__item">
                    {{ item.project.status }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <view-plan-dialog :data="plans" />
      <lumber-list />
    </v-row>
  </v-container>
</template>

<script>
import * as moment from 'moment'
import LumberHeader from '../../components/Header'
import DatePicker from '../../components/Shared/DatePicker'
import ViewPlanDialog from '../../components/ViewPlanDialog'
import LumberList from '../../components/LumberList'
export default {
  components: {
    LumberHeader,
    DatePicker,
    ViewPlanDialog,
    LumberList
  },
  data: () => ({
    status: {
      notAssigned: { text: 'Not Assigned', color: '#f78f1e' },
      assigned: { text: 'Assigned', color: '#3ce057' }
    },
    filter: [
      { text: 'All', color: '#000000', num: '10' },
      { text: 'Not Assigned', color: '#f78f1e', num: '4' },
      { text: 'Assigned', color: '#3ce057', num: '6' }
      // { text: 'Completed', color: '' },
      // { text: 'Closed', color: '' },
      // { text: 'Waiting', color: '' }
    ],
    data: [],
    items: ['Name Estimator'],
    estimators: [],
    plans: []
  }),
  async mounted() {
    await this.$store.restored
    this.data = (
      await this.$axios.get('/api/v1/estimator-admin/projects', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
    ).data
    const estimators = (
      await this.$axios.get('/api/v1/estimator-admin/estimators', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
    ).data
    estimators.forEach((element) => {
      this.estimators.push({ text: element.name, value: element.id })
    })
    this.plans = (
      await this.$axios.get('/api/v1/estimator-admin/files?projectsId[]=1', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
    ).data
  },
  methods: {
    save($event, index) {
      this.data[index].date = $event
      this.$axios.put(
        '/api/v1/estimator-admin/due-date',
        {
          projectId: this.data[index].project.id,
          dueDate: this.data[index].date
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        }
      )
    },
    moment(...arg) {
      return moment(...arg)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  .title {
    text-align: center;
    font-weight: 600;
  }
  .filter-card {
    border-top: 5px solid #f78f1e;
    border-radius: 5px;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
    &__title {
      color: #000000;
      display: block;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      line-height: 50px;
    }
  }
  .card {
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    overflow: hidden;
    &__table {
      &__header {
        border-bottom: none !important;
        color: #9ea4c4;
        background-color: #fafafa;
      }
      &__row {
        &__item {
          border-bottom: none !important;

          &__btn {
            border-radius: 8px;
            text-transform: capitalize;
            transition: 0.3s;
            &:hover {
              background-color: #f78f1e !important;
            }
          }
          &::v-deep .v-text-field__details {
            display: none;
          }
          &::v-deep .v-input__control {
            border-radius: 8px;
          }
          &::v-deep .v-input {
            max-width: 200px;
          }
          &::v-deep .v-input__slot {
            margin: 10px 0;
            box-shadow: none !important;
          }
        }

        &__item:first-child {
          border-left: 5px solid #f78e1e00;
        }
      }
      &__row:hover {
        box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
        .card__table__row__item:first-child {
          border-left: 5px solid #f78e1e;
        }
        .card__table__row__item {
          background-color: #ffffff;
        }
      }
    }
  }
}
</style>
