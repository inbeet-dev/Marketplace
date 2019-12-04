<template>
  <v-dialog v-model="dialog" width="600">
    <v-card class="card">
      <h1>NO Problem!</h1>
      <p>
        Create a Pre-paid Shipping Label To Send Us Your Plans. Our Project
        Managers Will Create the Lumber List for You!
      </p>
      <v-row justify="center">
        <v-col cols="12">
          <v-btn
            color="#f78f1e"
            width="100%"
            height="50px"
            style="color:#ffffff !important"
          >
            Create Shipping Label
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  mounted() {
    this.dialog =
      this.$store.getters['Dialog/active'] === 'CreateShippingLabelDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'CreateShippingLabelDialog'
      }
    )
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'CreateShippingLabelDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: #f78f1e;
  text-align: center;
}
p {
  text-align: center;
  text-transform: capitalize;
  padding: 30px 0px 20px;
  font-size: 22px;
  font-style: italic;
  font-weight: 600;
  font-family: 'Lato', serif;
}
button {
  margin: 0px 0px;
  color: red;
  border-radius: 5px;
  box-shadow: none;
  font-style: italic;
}
.card {
  border-top: 5px solid #f78f1e;
  padding: 30px 30px;
  border-radius: 5px;
  margin: 0px auto;
}
.main {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
</style>
