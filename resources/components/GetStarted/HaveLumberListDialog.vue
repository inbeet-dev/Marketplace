<template>
  <v-dialog v-model="haveLumberListDialog" max-width="600">
    <v-card class="login-card">
      <h1 class="get-start">Let's Get Started</h1>
      <v-card-text
        ><h1 class="lumber-list">
          Do you have a list of the lumber you need?
        </h1></v-card-text
      >
      <v-card-actions class="action-card">
        <v-row style="margin:0;" justify="center" class="btn-row">
          <v-col cols="6">
            <v-btn
              width="100%"
              color="green darken-1"
              text
              @click.stop="
                accountTypeDialog = !accountTypeDialog
                haveLumberListDialog = false
                setUploadType('LUMBER_LIST')
              "
              >yes</v-btn
            ><register-dialog v-model="accountTypeDialog"
          /></v-col>
          <v-col cols="6">
            <v-btn
              width="100%"
              color="green darken-1"
              text
              @click.stop="
                architecturalDrawingDialog = !architecturalDrawingDialog
                haveLumberListDialog = false
                setUploadType('EFILE')
              "
              >no</v-btn
            >
            <architectural-drawing-dialog
              v-model="architecturalDrawingDialog"
            />
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import RegisterDialog from './UserRegisterDialog'
import ArchitecturalDrawingDialog from './ArchitecturalDrawingDialog'
export default {
  components: {
    RegisterDialog,
    ArchitecturalDrawingDialog
  },
  data: () => ({
    accountTypeDialog: false,
    haveLumberListDialog: false,
    architecturalDrawingDialog: false
  }),
  methods: {
    setUploadType(type) {
      this.$store.dispatch('UploadType/store', type)
    }
  },
  watch: {
    value() {
      this.haveLumberListDialog = this.value
    },
    haveLumberListDialog() {
      this.$emit('input', this.haveLumberListDialog)
    }
  },
  props: {
    value: { type: Boolean, default: false }
  }
}
</script>
<style lang="scss" scoped>
.get-start {
  text-align: center;
  line-height: 70px;
  font-size: 40px;
}
.container .row {
  margin: 0;
}
.video-card {
  padding: 0 !important;
}
.v-dialog .login-card {
  border-top: 5px solid #f78f1e;
}
.v-dialog .login-card .lumber-list {
  padding: 20px 0 0px;
  font-family: Lato, 'sans';
  font-style: italic;
  color: #000000;
  text-align: center;
  font-weight: 600;
  font-size: 26px;
}
.v-dialog .login-card .col:first-child .v-btn {
  margin: 0px 0px;
  background-color: #f1f4f8;
  color: #9ea4c4 !important;
  box-shadow: none;
  height: 50px;
  font-style: italic;
  font-size: 15px;
  text-align: center;
  transition: 0.5s;
}
.v-dialog .login-card .col:last-child .v-btn {
  margin: 0px 0px;
  background-color: #f1f4f8;
  color: #9ea4c4 !important;
  box-shadow: none;
  height: 50px;
  font-style: italic;
  font-size: 15px;
  text-align: center;
  transition: 0.5s;
}
.v-dialog .login-card .col .v-btn:hover {
  background-color: #f78f1e;
  color: #ffffff !important;
}
.v-dialog .login-card .btn-row {
  padding: 20px 25px 30px;
}
@media only screen and (max-width: 700px) {
  .v-dialog .login-card .lumber-list {
    font-size: 20px;
  }
}
@media only screen and (max-width: 660px) {
  .v-dialog .login-card .btn-row {
    padding: 20px 0px 30px;
  }
  .v-dialog .login-card h1 {
    padding: 30px 0 20px;
    font-family: Lato, 'sans';
    font-style: italic;
    color: #000000;
    text-align: center;
    font-weight: 600;
    font-size: 26px;
    line-height: 35px;
  }
  .container .row .text h1 {
    font-weight: 900 !important;
    font-size: 29px !important;
  }
  .container .text .link {
    margin: 0;
    padding: 15px 10px;
  }
}

@media only screen and (max-width: 450px) {
  .container .text .link {
    margin: 0 5px;
    padding: 15px 25px;
  }
  .container .text .link {
    color: #ffffff;
    margin: 0 10px;
    padding: 15px 15px;
    background-color: #f78f1e;
    border-radius: 5px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 15px;
  }
  .v-dialog .login-card h1 {
    font-size: 22px;
  }
}
</style>
