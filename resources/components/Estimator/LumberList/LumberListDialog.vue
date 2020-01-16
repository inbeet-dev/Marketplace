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
              <th class="text-left" style="width: 50px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in lumberList.items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <v-select
                  v-model="lumberList.items[index].type"
                  :items="categories"
                  class="select"
                  dense
                  outlined
                ></v-select>
              </td>
              <td>
                <text-field
                  v-model="lumberList.items[index].meta.quantity"
                  dense
                  class="text-field"
                />
              </td>
              <td>
                <v-select
                  v-model="lumberList.items[index].meta.unit"
                  :items="units"
                  class="select"
                  dense
                  outlined
                ></v-select>
              </td>
              <td>
                <text-field
                  v-model="lumberList.items[index].meta.description"
                  dense
                  class="text-field"
                />
              </td>
              <td>
                <text-field
                  v-model="lumberList.items[index].meta.lf"
                  dense
                  class="text-field"
                />
              </td>
              <td>
                <text-field
                  v-model="lumberList.items[index].meta.bf"
                  dense
                  class="text-field"
                />
              </td>
              <td>
                <text-field
                  v-model="lumberList.items[index].meta.sf"
                  dense
                  class="text-field"
                />
              </td>
              <td>
                <v-btn text fab @click="remove(index)"
                  ><v-icon color="red">mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row style="margin:0" justify="center"
        ><v-col lg="6" cols="12">
          <v-btn width="100%" color="#f1f4f8" class="add" @click="add"
            >Add</v-btn
          >
        </v-col></v-row
      >
      <v-row justify="end" style="margin:0">
        <v-col lg="2" md="12"
          ><v-btn
            width="100%"
            color="#f1f4f8"
            class="save"
            :disabled="lumberList.status !== 'open'"
            @click="save()"
            >Save List</v-btn
          ></v-col
        >
        <v-col lg="5" md="12"
          ><v-btn
            width="100%"
            color="#f78f1e"
            class="submit"
            :disabled="lumberList.status !== 'open'"
            @click="submitForApproval()"
            >Sumbit For Manager Approval</v-btn
          ></v-col
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from '../../Shared/TextField.vue'
export default {
  components: {
    TextField
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
      units: ['EA', 'BF', 'SF', 'LF'],
      dialog: false,
      lumberList: { items: [] },
      categories: ['HRDW/FRAME', 'LUMBER', 'LUMBER/ENG', 'SHEATHING']
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'LumberListDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  async mounted() {
    await this.$store.restored

    this.loadLumberList()

    this.dialog = this.$store.getters['Dialog/active'] === 'LumberListDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'LumberListDialog'
      }
    )
  },
  methods: {
    add() {
      this.lumberList.items.push({
        type: 'HRDW/FRAME',
        meta: { unit: 'EA' }
      })
    },
    remove(index) {
      this.datas.splice(index, 1)
    },
    async save() {
      await this.$store.restored
      const list = {
        projectId: this.$route.params.id,
        items: this.datas
      }
      this.$axios
        .put('/api/v1/lumberlist/items', list, {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        })
        .then((data) => {
          this.$store.dispatch(
            'SnackBar/show',
            'Lumber List successfully saved'
          )
          this.loadLumberList()
        })
        .catch((data) => {
          this.$store.dispatch('SnackBar/show', 'an error occured')
        })
    },
    submitForApproval() {
      this.$axios
        .post(
          '/api/v1/estimator/lumber-list-admin-approval',
          {
            lumberListId: this.$route.params.id
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
            }
          }
        )
        .then((data) => {
          this.$store.dispatch(
            'SnackBar/show',
            'Lumber List sended for approval'
          )
          this.$store.dispatch('Dialog/show', '')
          this.loadLumberList()
        })
        .catch((data) => {
          this.$store.dispatch('SnackBar/show', 'an error occured')
        })
    },
    async loadLumberList() {
      this.lumberList = (
        await this.$axios.get(
          '/api/v1/estimator/lumber-list/' + this.$route.params.id,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
            }
          }
        )
      ).data
    }
  }
}
</script>

<style lang="scss" scoped>
.lumber-list-dialog {
  background-color: #ffffff;
  .submit {
    color: #ffffff;
    height: 45px;
    font-style: italic;
    box-shadow: none;
  }
  .save {
    color: #7b7da3;
    height: 45px;
    font-style: italic;
    box-shadow: none;
  }
  .header {
    color: #f78f1e;
    padding: 15px 0px 20px 20px;
  }
  .add {
    color: #6c8eff;
    height: 45px;
    font-style: italic;
    box-shadow: none;
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
      border-bottom: 1px solid #f2f2f2;
    }
  }
  .v-input {
    max-width: 150px;
  }

  .v-input::v-deep .v-text-field__details {
    display: none;
  }
  .v-input::v-deep .v-label {
    color: #9ea4c4;
  }
  .v-input::v-deep .theme--light.v-icon {
    color: #9ea4c4;
  }
}
tr td .v-input::v-deep .v-input__slot {
  margin: 8px 0;
  box-shadow: none !important;
}
.text-field {
  margin: 9px 0px;
}

.select::v-deep {
  .v-input__slot {
    margin: 0 !important;
  }

  fieldset {
    border: none;
    background-color: #f1f4f8;
  }
}
</style>
