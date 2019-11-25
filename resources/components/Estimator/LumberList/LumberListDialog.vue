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
              <th class="text-left" v-for="(item, index) in items" :key="index">
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in datas" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <text-field
                  class="text-field"
                  v-model="datas[index].meta.name"
                />
              </td>
              <td>
                <text-field
                  class="text-field"
                  v-model="datas[index].meta.count"
                />
              </td>
              <td>
                <text-field
                  class="text-field"
                  v-model="datas[index].meta.price"
                />
              </td>
              <td>
                <text-field
                  class="text-field"
                  v-model="datas[index].meta.comments"
                />
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
          ><v-btn width="100%" color="#f1f4f8" class="save" @click="save()"
            >Save List</v-btn
          ></v-col
        >
        <v-col lg="5" md="12"
          ><v-btn width="100%" color="#f78f1e" class="submit"
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
  data() {
    return {
      items: ['#Item', 'Item', 'Quantity Needed', 'price', 'Comments'],
      dialog: false,
      datas: []
    }
  },
  components: {
    TextField
  },
  methods: {
    add() {
      this.datas.push({
        type: 'meta',
        meta: { name: '', count: '', price: '', comments: '' }
      })
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
        })
        .cache((data) => {
          this.$store.dispatch('SnackBar/show', 'an error occured')
        })
    }
  },
  async mounted() {
    await this.$store.restored
    this.$axios
      .get('/api/v1/lumberlist/' + this.$route.params.id, {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        this.datas = data.data.data.items
      })
    this.dialog = this.$store.getters['Dialog/active'] === 'LumberListDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'LumberListDialog'
      }
    )
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
      max-width: 200px;
      min-width: 200px;
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
</style>
