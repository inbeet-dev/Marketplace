<template>
  <v-dialog v-model="projectRegistrationDialog" width="900" persistent="">
    <v-card class="mx-auto box" outlined elevation raised width="100%">
      <v-icon class="close-icon" @click="projectRegistrationDialog = false">
        mdi-close
      </v-icon>
      <form action="" ref="registerForm" class="registerForm">
        <v-row style="margin:0">
          <v-col xl="3" lg="3" md="6" sm="6" cols="6">
            <h5>Project Name</h5>
            <text-field
              type="text"
              placeholder="Enter Project Name"
              name="name"
              message="Name is required"
              v-model.trim="$v.name.$model"
              :error="$v.name.$error"
            />
          </v-col>
          <v-col
            xl="6"
            lg="6"
            md="12"
            sm="12"
            cols="12"
            order-lg="0"
            order="last"
          >
            <h5>Address</h5>
            <text-field
              type="text"
              placeholder="Enter Address"
              name="address"
              message="Address is required"
              v-model.trim="$v.address.$model"
              :error="$v.address.$error"
            />
          </v-col>
          <v-col xl="3" lg="3" md="6" sm="6" cols="6">
            <h5>Postal code</h5>
            <text-field
              type="text"
              placeholder="Postal code"
              name="zipCode"
              message="Postal code must be valid"
              v-model.trim="$v.zipCode.$model"
              :error="$v.zipCode.$error"
            />
          </v-col>
        </v-row>
        <v-row style="margin:0">
          <v-col xl="12" lg="12 " md="12" sm="12" cols="12">
            <my-awesome-map style="height:400px;100%" v-model="position" />
          </v-col>
        </v-row>
        <v-row style="padding:0px 10px;margin:0" justify="center">
          <v-col cols="3"></v-col>
          <v-col cols="12" xl="6" lg="6" md="12" sm="12">
            <button @click.stop.prevent="register()">
              submit
            </button>
            <upload-file-dialog v-model="uploadFileDialog" />
          </v-col>
          <v-col
            cols="12"
            xl="3"
            lg="3"
            md="12"
            sm="12"
            style="text-align:center;"
          >
          </v-col>
        </v-row>
      </form>
    </v-card>
  </v-dialog>
</template>
<script>
import { required, numeric } from 'vuelidate/lib/validators'
import TextField from '../Shared/TextField'
import MyAwesomeMap from './ProjectLocation'
import UploadFileDialog from './UploadFileDialog.vue'
export default {
  name: 'projectRegistrationDialog',
  props: {
    value: { type: Boolean, default: false }
  },
  validations: {
    name: {
      required
    },
    address: {
      required
    },
    zipCode: {
      required,
      numeric
    }
  },
  data() {
    return {
      position: null,
      projectRegistrationDialog: false,
      uploadFileDialog: false,
      name: '',
      address: '',
      zipCode: ''
    }
  },
  components: {
    TextField,
    MyAwesomeMap,
    UploadFileDialog
  },
  watch: {
    value() {
      this.projectRegistrationDialog = this.value
    },
    projectRegistrationDialog() {
      this.$emit('input', this.projectRegistrationDialog)
    }
  },
  methods: {
    register() {
      if (!this.position) {
        this.$store.dispatch(
          'SnackBar/show',
          'Please set project location on map'
        )
        return
      }
      const formData = new FormData(this.$refs.registerForm)
      formData.append('lat', this.position.lat)
      formData.append('long', this.position.lng)
      this.$axios
        .post('/api/v1/project/register', formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        })
        .then((data) => {
          this.$store
            .dispatch('Project/store', {
              id: data.data.data.projectId
            })
            .then(() => {
              this.projectRegistrationDialog = false
              this.uploadFileDialog = !this.uploadFileDialog
            })

          console.log(data.data.data)
        })
        .catch(function(e) {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  border-top: 7px solid #f48f2e;
  border-left: 0;
  border-right: 0;
  padding: 0px 10px;
}
.register {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
h5 {
  margin: 5px 7px;
  color: #0b3265;
  font-style: italic;
}
button {
  height: 56px;
  width: 100%;
  background-color: #f48f2e;
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
}
a {
  line-height: 56px;
  color: #8c8dae;
}
.registerForm {
  padding-top: 30px;
}
.close-icon {
  position: absolute;
  right: 20px;
  top: 10px;
}
.close-icon:hover {
  color: #f48f2e;
}
</style>
