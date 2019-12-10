<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="edit">
      <v-icon class="close" @click="dialog = false">mdi-close</v-icon>
      <v-row style="margin:20px 0 0" justify="center">
        <v-col cols="12" class="item">
          <text-field v-model="supplier.supplier" label="Name" />
        </v-col>
        <v-col cols="12" class="item"
          ><text-field v-model="supplier.address" label="Address"
        /></v-col>
        <v-col class="item">
          <text-field v-model="supplier.phone" label="Phone" />
        </v-col>
        <v-col cols="12" class="item">
          <text-field v-model="supplier.email" label="Email" />
        </v-col>
        <v-col cols="12">
          <v-btn
            @click="save"
            depressed
            color="#f78f1e"
            style="color:#ffffff;width:100%;font-size:15px"
            >save</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import TextField from '../Shared/TextField'
export default {
  components: {
    TextField
  },
  data() {
    return {
      dialog: false,
      supplier: ''
    }
  },
  mounted() {
    this.dialog =
      this.$store.getters['Dialog/active'] === 'SupplierListEditDialog'
    this.$store.watch(
      function(state, getters) {
        return getters['Dialog/active']
      },
      (newValue) => {
        this.dialog = newValue === 'SupplierListEditDialog'
        if (this.dialog) {
          this.supplier = JSON.parse(
            JSON.stringify(this.$store.getters['Dialog/getData'])
          )
        }
      }
    )
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'SupplierListEditDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  methods: {
    save() {
      this.$axios
        .put('/api/v1/supplier/edit', this.supplier, {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        })
        .then((data) => {
          this.$store.dispatch(
            'SnackBar/show',
            'Supplier Profile Successfuly Updated'
          )
        })
        .catch((e) => {
          if (e.response) {
            this.$store.dispatch(
              'SnackBar/show',
              e.response.data.error[0].message
            )
          } else {
            this.$store.dispatch('SnackBar/show', 'an error occured')
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit {
  border-top: 5px solid #f78f1e;
  .item {
    padding: 0 12px;
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
