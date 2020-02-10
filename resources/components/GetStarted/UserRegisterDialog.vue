<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000" persistent>
      <v-card class="content-card">
        <h1>
          Sign Up To Upload
        </h1>
        <v-icon class="close-icon" @click="dialog = false">
          mdi-close
        </v-icon>
        <form ref="regsiterForm">
          <v-row
            style="margin-left:0;
                margin-right:0;"
            class="register-form"
          >
            <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="form-field">
              <text-field
                v-model.trim="$v.name.$model"
                type="text"
                placeholder="Enter Name"
                :label="(type === 'Company' ? 'Company' : '') + ' name'"
                important
                name="name"
                message="Name is required"
                :error="$v.name.$error"
              />
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="form-field">
              <text-field
                v-model.trim="$v.email.$model"
                type="email"
                placeholder="Enter Email"
                label="email"
                important
                name="email"
                message="Email is required and must be valid"
                :error="$v.email.$error"
                @input="toLowerCase"
              />
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="form-field">
              <text-field
                v-model.trim="$v.password.$model"
                type="password"
                placeholder="Enter Password"
                label="password"
                important
                name="password"
                message="Password is required"
                :error="$v.password.$error"
              />
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="form-field">
              <text-field
                v-model.trim="$v.reTypePassword.$model"
                type="password"
                placeholder="Enter Re-type password"
                label="Re-type password"
                important
                name="re-try password"
                message="Password not match"
                :error="$v.reTypePassword.$error"
              />
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="form-field">
              <text-field
                v-model.trim="$v.phoneNumber.$model"
                type="tel"
                placeholder="Enter Contact Number"
                label="Contact Number"
                name="phoneNumber"
                message="Contact number is required"
                :error="$v.phoneNumber.$error"
              />
            </v-col>
            <v-col cols="12">
              <v-row justify="center">
                <v-col cols="12" style="text-align:center;padding:0;">
                  <v-checkbox
                    v-model.trim="$v.checkBox.$model"
                    style="border-radius:4px;vertical-align:middle;"
                    color="#f48f2e"
                    class="check-box"
                    name="checkBox"
                    :class="{ 'form-group--error': $v.checkBox.$error }"
                  ></v-checkbox>
                  <p style="vertical-align:middle;">
                    I agree the
                    <a href="" style="color:#f48f2e;text-decoration:none;">
                      Terms of use</a
                    >
                    and
                    <a href="" style="color:#f48f2e;text-decoration:none;">
                      Privacy Policy.</a
                    >
                  </p>
                </v-col>
              </v-row>
            </v-col>
            <v-row
              style="padding:0;margin:0 0 30px;"
              justify="center"
              class="submit-"
            >
              <v-col
                xl="3"
                lg="3"
                md="0"
                sm="0"
                cols="3"
                class="free-div"
              ></v-col>
              <v-col xl="6" lg="6" md="12" sm="12" cols="12">
                <button
                  :disabled="!checkBox"
                  class="signup"
                  @click.stop.prevent="submit()"
                >
                  SIGN UP
                </button>
              </v-col>
              <v-col
                cols="12"
                xl="3"
                lg="3"
                md="12"
                sm="12"
                style="text-align:center;"
              >
                <a href="" style="font-size:16px;">Learn More</a>
              </v-col>
            </v-row>
          </v-row>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required, sameAs, email, numeric } from 'vuelidate/lib/validators'
import TextField from '../Shared/TextField'

export default {
  data() {
    return {
      dialog: false,
      name: '',
      email: '',
      password: '',
      reTypePassword: '',
      phoneNumber: '',
      checkBox: '',
      type: ''
    }
  },
  /* eslint-disable */
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      required,
      numeric
    },
    password: {
      required
    },
    reTypePassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    checkBox: {
      required,
      sameAzCheckBox: (value) => value == true
    }
  },

  components: {
    TextField
  },

  name: 'RegisterDialog',
  methods: {
    toLowerCase(value) {
      this.email = value.toLowerCase()
    },
    submit() {
      if (this.$v.$invalid) {
        this.$store.dispatch('SnackBar/show', 'Please input correct values')
        return
      }
      const formData = new FormData(this.$refs.regsiterForm)
      this.$axios
        .post('/api/v1/user/register', formData, {})
        .then((data) => {
          this.$store
            .dispatch('Auth/store', {
              refreshToken: data.data.refreshToken,
              token: data.data.token
            })
            .then(() => {
              this.$store.dispatch('Dialog/show', 'ProjectRegisterDialog')
              this.dialog = false
              this.$store.dispatch('User/setUser', {
                name: this.name,
                role: 'Customer'
              })
            })
        })
        .catch((e) => {
          this.$store.dispatch('SnackBar/show', e.response.data.error)
        })
    }
  },
  mounted() {
    this.dialog = this.$store.getters['Dialog/active'] === 'UserRegisterDialog'
    this.$store.watch(
      function(state, getters) {
        return getters['Dialog/active']
      },
      (newValue) => {
        this.dialog = newValue === 'UserRegisterDialog'
        this.type = this.$store.getters['Dialog/getData']
      }
    )
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'UserRegisterDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content-card {
  border-top: 6px solid #f48f2e;
  padding: 10px 10px 10px;
  overflow: visible;
}
.content-card .register-form .form-field {
  padding: 5px 12px;
}
button.signup {
  height: 56px;
  width: 100%;
  background-color: #f48f2e;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-style: italic;
  font-size: 17px;
}
button.signup:disabled {
  background-color: #bbbbbb;
}
.signup:focus {
  border: 1px solid #f1f4f8;
  outline: none;
}
a {
  line-height: 56px;
  color: #8c8dae;
}
.v-input {
  display: inline-block;
  margin: 0;
}
.v-input__control {
  margin: 0;
  height: 24px;
}
.check-box::v-deep .v-input__slot {
  margin: 0;
}
p {
  font-size: 15px;
  line-height: 18px;
  display: inline;
}
.check-box::v-deep .v-messages.theme--light {
  display: none;
}
.close-icon {
  position: absolute;
  right: 20px;
  top: 10px;
}
.close-icon:hover {
  color: #f48f2e;
}
h1 {
  text-align: center;
}
@media only screen and (max-width: 1264px) {
  .free-div {
    display: none;
  }
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
@media only screen and (max-width: 960px) {
  .form-field {
    padding: 5px 5px;
  }
  p {
    font-size: 10px;
  }
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
