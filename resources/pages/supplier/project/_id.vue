<template>
  <v-container fluid>
    <v-row style="margin:0;">
      <lumber-header
        :items="[
          { name: 'home', link: '/' },
          { name: 'projects', link: '/' },
          { name: 'bids', link: '/' },
          { name: 'messages', link: '/' }
        ]"
        :user="$store.getters['User/getUser']"
      />
    </v-row>
    <v-row style="margin: 200px 0 0;" justify="center">
      <v-col
        xl="12"
        lg="12"
        md="11"
        sm="10"
        cols="11"
        class="main"
        order="first"
      >
        <h1 class="title">Lumber Supplier Bid</h1>
      </v-col>
      <v-col
        xl="10"
        lg="10"
        md="12"
        sm="12"
        cols="12"
        class="main"
        order="first"
      >
        <v-simple-table class="supplier-bid-table">
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
              <tr
                v-for="(data, index) in project.lumberLists.items"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  {{ data.type }}
                </td>
                <td>
                  {{ data.meta.description }}
                </td>
                <td>
                  {{ data.meta.unit }}
                </td>
                <td>
                  {{ data.meta.quantity }}
                </td>
                <td style="width: 150px;">
                  <text-field
                    v-model="data.itemRate"
                    dense
                    @input="itemRateCalc(index)"
                  />
                </td>
                <td style="width: 200px;">
                  <text-field v-model="data.itemTotal" disabled dense />
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
        <v-row justify="end">
          <v-col cols="12" sm="6" md="4" lg="4" xl="3">
            <div class="price-table">
              <v-row>
                <v-col cols="6">
                  Sub Total
                </v-col>
                <v-col cols="6" style="text-align: right">
                  {{ subtotal }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  Discount
                </v-col>
                <v-col cols="6" style="padding: 0; text-align: right;">
                  <text-field
                    v-model="discount"
                    dense
                    style="display: inline-block; width: 50px;"
                  />%
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  Total
                </v-col>
                <v-col cols="6" style="text-align: right">
                  {{ total }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" style="text-align: right">
                  <v-btn color="#f78f1e" dark @click="submitBid"
                    >Submit Bid</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LumberHeader from '@/components/Header.vue'
import TextField from '@/components/Shared/TextField.vue'

export default {
  components: {
    LumberHeader,
    TextField
  },
  data() {
    return {
      headers: [
        '# Item',
        'Category',
        'Description',
        'Unit',
        'Quantity',
        'Item Rate',
        'Item Total',
        'LF',
        'BF',
        'SF'
      ],
      project: { lumberLists: { items: [] } },
      discount: '0'
    }
  },
  computed: {
    subtotal() {
      let total = 0
      this.project.lumberLists.items.forEach(
        (item) => (total += item.itemTotal || 0)
      )
      return total
    },
    total() {
      let total = 0
      this.project.lumberLists.items.forEach(
        (item) => (total += item.itemTotal || 0)
      )
      return total * (1 - this.discount / 100)
    }
  },
  async mounted() {
    await this.$store.restored

    this.project = (
      await this.$axios.get(
        '/api/v1/supplier/project/' + this.$route.params.id,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        }
      )
    ).data
  },
  methods: {
    itemRateCalc(index) {
      this.project.lumberLists.items[index].itemTotal =
        this.project.lumberLists.items[index].itemRate *
        this.project.lumberLists.items[index].meta.quantity
    },
    async submitBid() {
      await this.$axios.post(
        '/api/v1/supplier/bid',
        {
          items: this.project.lumberLists.items,
          lumberListId: this.project.lumberLists.id,
          discount: this.discount
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        }
      )

      this.$store.dispatch('SnackBar/show', 'Bid successfully submitted')
      this.$router.push('/supplier')
    }
  },
  errorCaptured() {
    return false
  }
}
</script>

<style lang="scss" scoped>
.container--fluid {
  background-color: #fafafa;
  min-height: 100vh;
}

h1.title {
  color: #000000;
  text-align: center;
  padding: 0px 0px 30px 0px;
  font-size: 50px !important;
  font-weight: 400;
  font-family: 'Lato', serif;
}
.supplier-bid-table {
  border-radius: 10px;
  box-shadow: 0 4px 8px #00000022;

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

.price-table {
  margin-top: 30px;
  box-shadow: 0 4px 8px #00000022;
  border-radius: 5px;
  border-top: solid 4px #f78f1e;
  background-color: #ffffff;
  padding: 0 20px;
  color: #8183a7;
}
</style>
