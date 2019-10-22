<template>
  <v-dialog v-model="drawTypeDialog" width="600">
    <v-card class="card">
      <p>
        What Type Of Drawings Do You Have?
      </p>
      <v-row justify="center">
        <v-col cols="6">
          <v-btn
            color="#f78f1e"
            width="100%"
            height="50px"
            style="color:#ffffff !important"
            @click.stop="
              drawTypeDialog = false
              createShippingLabelDialog = !createShippingLabelDialog
            "
          >
            HARD COPY
          </v-btn>
          <create-shipping-label-dialog v-model="createShippingLabelDialog" />
        </v-col>
        <v-col cols="6">
          <v-btn
            color="#f78f1e"
            width="100%"
            height="50px"
            style="color:#ffffff !important"
            @click.stop="
              drawTypeDialog = false
              userRegisterDialog = !userRegisterDialog
            "
          >
            E-FILE
          </v-btn>
          <user-register-dialog v-model="userRegisterDialog" />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import UserRegisterDialog from './UserRegisterDialog'
import CreateShippingLabelDialog from './CreateShippingLabelDialog'
export default {
  data() {
    return {
      drawTypeDialog: false,
      userRegisterDialog: false,
      createShippingLabelDialog: false
    }
  },
  components: {
    UserRegisterDialog,
    CreateShippingLabelDialog
  },
  watch: {
    value() {
      this.drawTypeDialog = this.value
    },
    drawTypeDialog() {
      this.$emit('input', this.drawTypeDialog)
    }
  },
  props: {
    value: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
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
