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
            <tr v-for="(data, index) in items" :key="index">
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
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
      dialog: false,
      items: []
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'LumberListViewer'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  async mounted() {
    await this.$store.restored
    this.dialog = this.$store.getters['Dialog/active'] === 'LumberListViewer'
    if (this.dialog) this.items = this.$store.getters['Dialog/getData']

    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'LumberListViewer'
        if (this.dialog) this.items = this.$store.getters['Dialog/getData']
      }
    )
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
</style>
