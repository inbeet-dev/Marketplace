<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'about us', link: 'about' },
        { name: 'service', link: 'service' },
        { name: 'blog', link: 'blog' },
        { name: 'contact us', link: 'contact' }
      ]"
      :login="{ name: 'login', link: 'login' }"
    />
    <v-row justify="center">
      <v-col class="text" xl="8" lg="10" md="12" sm="12" cols="12">
        <h1>
          Not sure what lumber to buy where to get it?
        </h1>
        <h1>We'll make this easy!</h1>
        <h3>
          You send us drawings, we quantify your lumber, you select bidders, we
          forward quotations, you choose your supplier, we help you purchase you
          lumber
        </h3>
        <h2>ITS ALL FREE!!!</h2>
        <br />
        <a href="#" class="link" @click.stop="videoDialog = true"
          >watch video <v-icon>mdi-chevron-right</v-icon></a
        >
        <a href="#" class="link" @click.stop="projectLumberQuestion = true"
          >get started<v-icon>mdi-chevron-right</v-icon></a
        >
        <v-row justify="center">
          <v-dialog v-model="videoDialog" width="100%" max-width="600px">
            <v-card width="100%">
              <v-card-title style="width:100%" class="video-card">
                <video width="100%" controls>
                  <source src="/uploads/lumber-click.mov" type="video/mp4" />
                </video>
              </v-card-title>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="projectLumberQuestion" max-width="600">
            <v-card class="login-card">
              <h1 class="get-start">Let's Get Started</h1>
              <v-card-text
                ><h1 class="lumber-list">
                  Do you Have a Lumber List?
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
                        registerDialog = !registerDialog
                        projectLumberQuestion = false
                        setUploadType('LUMBER_LIST')
                      "
                      >yes</v-btn
                    ><register-dialog v-model="registerDialog"
                  /></v-col>
                  <v-col cols="6">
                    <v-btn
                      width="100%"
                      color="green darken-1"
                      text
                      @click.stop="
                        architecturalDrawingDialog = !architecturalDrawingDialog
                        projectLumberQuestion = false
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
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LumberHeader from '../components/Header.vue'
import RegisterDialog from '../components/GetStarted/UserRegisterDialog'
import ArchitecturalDrawingDialog from '../components/GetStarted/ArchitecturalDrawingDialog'
export default {
  components: {
    LumberHeader,
    RegisterDialog,
    ArchitecturalDrawingDialog
  },
  data: () => ({
    registerDialog: false,
    videoDialog: false,
    projectLumberQuestion: false,
    architecturalDrawingDialog: false
  }),
  methods: {
    setUploadType(type) {
      this.$store.dispatch('UploadType/store', type)
    }
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
.container .row .text {
  margin-top: 200px;
  color: white;
  text-align: center;
  padding: 20px 0 100px;
}
.container .row .text h1:nth-child(1) {
  font-weight: 900 !important;
  font-size: 55px;
  padding: 20px 20px 5px;
}
.container .row .text h1:nth-child(2) {
  font-weight: 900 !important;
  font-size: 45px;
  padding: 10px 20px 60px;
}
.container .row .text h2 {
  padding: 40px 20px 50px;
  display: block;
  font-size: 40px;
  font-weight: 900 !important;
}
.container .row .text h3 {
  max-width: 1140px;
  text-align: center;
  font-weight: 300;
  font-size: 28px;
  margin: 0 auto;
}
.container .text .link {
  color: #ffffff;
  margin: 0 8px;
  padding: 20px 70px;
  background-color: #f78f1e;
  border-radius: 5px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 500;
}
.container .text .link .v-icon {
  color: #ffffff;
  margin-top: -4px;
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
  color: #ffffff !important;
  background-color: #f78f1e;
  box-shadow: none;
  height: 50px;
  font-style: italic;
  font-size: 15px;
  text-align: center;
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
}
.v-dialog .login-card .btn-row {
  padding: 20px 25px 30px;
}
@media only screen and (max-width: 700px) {
  .container .text .link {
    padding: 15px 35px;
  }
  .v-dialog .login-card .lumber-list {
    font-size: 20px;
  }
}
@media only screen and (max-width: 660px) {
  .container .row .text {
    margin-top: 80px;
  }
  .container .row .text h3 {
    font-size: 18px;
    font-weight: 400;
  }
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
@media only screen and (max-width: 360px) {
  .container .text .link {
    margin: 0;
    padding: 15px 20px;
  }
}
</style>
