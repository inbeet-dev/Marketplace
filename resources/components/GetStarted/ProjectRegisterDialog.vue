<template>
  <v-dialog v-model="dialog" width="900" persistent="">
    <v-card class="mx-auto box" outlined elevation raised width="100%">
      <v-icon class="close-icon" @click="dialog = false">
        mdi-close
      </v-icon>
      <form ref="registerForm" class="registerForm">
        <v-row style="margin:0">
          <v-col xl="3" lg="3" md="6" sm="6" cols="12">
            <h5>Project Name</h5>
            <text-field
              v-model.trim="$v.name.$model"
              type="text"
              placeholder="Enter Project Name"
              name="name"
              message="Name is required"
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
              v-model.trim="$v.address.$model"
              type="text"
              placeholder="Enter Address"
              name="address"
              message="Address is required"
              :error="$v.address.$error"
            />
          </v-col>
          <v-col xl="3" lg="3" md="6" sm="6" cols="12">
            <h5>Postal code</h5>
            <text-field
              v-model.trim="$v.zipCode.$model"
              type="text"
              placeholder="Postal code"
              name="zipCode"
              message="Postal code must be valid"
              :error="$v.zipCode.$error"
            />
          </v-col>
        </v-row>
        <v-row style="margin:0">
          <v-col xl="12" lg="12 " md="12" sm="12" cols="12">
            <ProjectLocation v-model="position" style="height:400px;100%" />
          </v-col>
        </v-row>
        <v-row style="padding:0px 10px;margin:0" justify="center">
          <v-col cols="3"></v-col>
          <v-col cols="12" xl="6" lg="6" md="12" sm="12">
            <v-btn
              depressed
              height="56px"
              width="100%"
              color="#f48f2e"
              :disabled="disable"
              class="submit"
              @click.stop.prevent="register()"
            >
              submit
            </v-btn>
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
import ProjectLocation from './ProjectLocation'
export default {
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
  components: {
    TextField,
    ProjectLocation
  },
  data() {
    return {
      position: null,
      dialog: false,
      name: '',
      address: '',
      zipCode: '',
      disable: false
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'ProjectRegisterDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  mounted() {
    this.dialog =
      this.$store.getters['Dialog/active'] === 'ProjectRegisterDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'ProjectRegisterDialog'
      }
    )
  },
  methods: {
    register() {
      this.disable = true
      if (!this.position) {
        this.$store.dispatch(
          'SnackBar/show',
          'Please set project location on map'
        )
        this.disable = false
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
              this.dialog = false
              this.$store.dispatch('Dialog/show', 'UploadFileDialog')
            })
        })
        .catch(function(e) {
          this.disable = false
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
.submit {
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
