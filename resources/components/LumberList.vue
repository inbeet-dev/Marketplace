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
            <!-- <tr v-for="(item, index) in lumberList.items" :key="index">
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
                <v-btn text fab><v-icon color="red">mdi-delete</v-icon></v-btn>
              </td>
            </tr> -->
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
import TextField from './Shared/TextField.vue'
export default {
  components: {
    TextField
  },
  data() {
    return {
      dialog: false,
      headers: [
        '#Item',
        'CATEGORY',
        'QTY',
        'UNIT',
        'DESCRIPTION',
        'LF',
        'BF',
        'SF'
      ]
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
  mounted() {
    this.dialog = this.$store.getters['Dialog/active'] === 'LumberList'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'LumberList'
      }
    )
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
