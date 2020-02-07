<template>
  <v-dialog
    ref="dialog"
    v-model="dialog"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="showDate"
        label="Picker in dialog"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable color="#f78f1e">
      <v-spacer></v-spacer>
      <v-btn text color="#f78f1e" @click="dialog = false">Cancel</v-btn>
      <v-btn text color="#f78f1e" @click="$refs.dialog.save(date)">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import * as moment from 'moment'
export default {
  props: {
    dueDate: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dialog: false,
    date: '',
    showDate: ''
  }),
  watch: {
    date() {
      this.showDate = this.moment(this.date).format('DD MMMM YYYY')
      this.$emit('click', this.date)
    }
  },
  mounted() {
    this.showDate = this.moment(this.dueDate).format('DD MMMM YYYY')
  },
  methods: {
    moment(...arg) {
      return moment(...arg)
    }
  }
}
</script>

<style></style>
