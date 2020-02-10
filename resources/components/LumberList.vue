<template>
  <v-dialog v-model="dialog" max-width="900px">
    <v-card class="lumber-list-dialog">
      <h3 class="header">
        Lumber List
      </h3>
      <v-simple-table class="lumber-list-table">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="(header, index) in headers"
                :key="index"
                class="text-left"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in lumberList.items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                {{ data.type }}
              </td>
              <td>
                {{ data.meta.quantity }}
              </td>
              <td>
                {{ data.meta.unit }}
              </td>
              <td>
                {{ data.meta.description }}
              </td>
              <td>
                {{ data.meta.lf }}
              </td>
              <td>
                {{ data.meta.bf }}
              </td>
              <td>
                {{ data.meta.sf }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row class="ma-0 py-4" justify="center">
        <v-col cols="2"
          ><button class="button button--green" @click="approve(lumberList.id)">
            Approve
          </button></v-col
        >
        <v-col cols="2">
          <button
            class="button button--red"
            style="margin-left: 20px"
            @click="reject(lumberList.id)"
          >
            Reject
          </button>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    lumberList: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      headers: [
        '#Item',
        'CATEGORY',
        'QTY',
        'UNIT',
        'DESCRIPTION',
        'LF',
        'BF',
        'SF'
      ],
      dialog: false
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'LumberList'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  async mounted() {
    await this.$store.restored
    this.dialog = this.$store.getters['Dialog/active'] === 'LumberList'
    if (this.dialog) this.items = this.$store.getters['Dialog/getData']

    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'LumberList'
      }
    )
  },
  methods: {
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
.lumber-list-dialog {
  background-color: #ffffff;

  .header {
    color: #f78f1e;
    padding: 15px 0px 20px 20px;
  }

  .lumber-list-table {
    width: 100%;

    .text-left {
      border-bottom: 1px solid #f2f2f2;
      color: #9ea4c4;
      background-color: #fafafa;
    }
    td {
      border-bottom: 1px solid #f2f2f2;
    }
    td:first-child {
      max-width: 20px;
      min-width: 20px;
    }
  }
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
