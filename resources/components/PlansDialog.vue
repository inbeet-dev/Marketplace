<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="main">
        <v-card-title class="headline">plan</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">type</th>
                    <th class="text-left">name</th>
                    <th class="text-left" center>download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>item.name</td>
                    <td>item.calories</td>
                    <td>
                      <v-btn><v-icon>mdi-download</v-icon></v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: 'PlansDialog',
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      dialog: false
    }
  },
  watch: {
    value() {
      this.dialog = this.value
    },
    dialog() {
      this.$emit('input', this.dialog)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  border-top: 5px solid #f78f1e;
  text-transform: capitalize;
}
.row thead tr th:nth-child(3) {
  text-align: center !important;
}
.row tbody tr td:nth-child(3) {
  text-align: center;
}
</style>
