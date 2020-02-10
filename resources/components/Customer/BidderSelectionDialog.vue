<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card class="bidder-selection-card">
      <v-card-actions class="action-card pa-0 ">
        <v-row style="margin:0;" justify="center" class="btn-row pa-0">
          <v-col class="pa-0">
            <v-simple-table class="bidder-selection-card__table">
              <thead>
                <tr>
                  <th
                    class="text-left"
                    style="color:#9ea4c4;border-bottom:0px;background-color:#fafafa"
                  >
                    Supplier Lable
                  </th>
                  <th
                    class="text-left"
                    style="color:#9ea4c4;border-bottom:0px;background-color:#fafafa"
                  >
                    Distance
                  </th>
                  <th
                    class="text-left"
                    style="color:#9ea4c4;border-bottom:0px;background-color:#fafafa"
                  >
                    Years in Business
                  </th>
                  <th
                    class="text-left"
                    style="color:#9ea4c4;border-bottom:0px;background-color:#fafafa"
                  >
                    LumberClick Rating
                  </th>
                  <th
                    class="text-left"
                    style="color:#9ea4c4;border-bottom:0px;background-color:#fafafa"
                  >
                    # Projects Completed
                  </th>
                  <th
                    class="text-left"
                    style="color:#9ea4c4;border-bottom:0px;background-color:#fafafa"
                  >
                    Select
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data"
                  :key="index"
                  class="bidder-selection-card__table__row"
                >
                  <td class="item">{{ item.lable }}</td>
                  <td class="item">{{ item.distance }}</td>
                  <td class="item">{{ item.year }}</td>
                  <td class="item">{{ item.rate }}</td>
                  <td class="item">{{ item.complete }}</td>
                  <td class="item">
                    <v-checkbox
                      v-model="data[index].select"
                      class="ma-0"
                      color="#f78f1e"
                    ></v-checkbox>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    data: [
      {
        lable: 'A',
        distance: 'B',
        year: 'C',
        rate: '4.3',
        complete: '51',
        select: false
      },
      {
        lable: 'A',
        distance: 'B',
        year: 'C',
        rate: '4.3',
        complete: '51',
        select: true
      },
      {
        lable: 'A',
        distance: 'B',
        year: 'C',
        rate: '4.3',
        complete: '51',
        select: false
      }
    ]
  }),
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'BidderSelectionDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  mounted() {
    this.dialog =
      this.$store.getters['Dialog/active'] === 'BidderSelectionDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'BidderSelectionDialog'
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.container .row {
  margin: 0;
}
.v-dialog .bidder-selection-card {
  border-top: 5px solid #f78f1e;
  & .lumber-list {
    padding: 20px 0 0px;
    font-family: Lato, 'sans';
    font-style: italic;
    color: #000000;
    text-align: center;
    font-weight: 600;
    font-size: 26px;
  }
  &__table__row {
    border-left: 5px solid #f78e1e !important;
  }
  &__table__row:hover {
    border-left: 5px solid #f78e1e !important;
    box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.16);
  }
  &__table__row::v-deep .v-messages.theme--light {
    display: none;
  }
}
</style>
