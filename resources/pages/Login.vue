<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'account profile', link: 'profile' },
        { name: 'messages', link: 'message' }
      ]"
      :login="{ name: 'need help ?', link: 'need-help' }"
    />
    <v-row no-gutters justify="center" class="login-row">
      <v-col cols="11" sm="10" md="7" lg="9" xl="7" class="main">
        <h1 cols="12" class="login-title">login</h1>
        <div class="mx-auto box" outlined elevation raised width="100%">
          <v-row justify="center">
            <v-col cols="12" sm="11" md="12" lg="4" xl="4" class="text">
              <h2>Welcome Back !</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="8" xl="8" class="login">
              <form action="" ref="loginForm">
                <v-row>
                  <v-col cols="12">
                    <text-field
                      type="text"
                      placeholder="Enter Email"
                      icon="mdi-email-outline"
                      label="email"
                      name="email"
                    />
                  </v-col>
                  <v-col cols="12">
                    <text-field
                      type="password"
                      placeholder="Enter Password"
                      icon="mdi-lock"
                      label="password"
                      name="password"
                    />
                  </v-col>
                </v-row>
                <v-row cols="12" justify="space-between" class="submit">
                  <v-col
                    cols="12"
                    sm="6"
                    md="5"
                    lg="5"
                    xl="5"
                    order="last"
                    order-sm="first"
                    class="login-item"
                  >
                    <a href>Forget Your Password?</a>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="7"
                    lg="7"
                    xl="6"
                    class="login-item"
                    @click.stop.prevent="login"
                  >
                    <button>login</button>
                  </v-col>
                </v-row>
              </form>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LumberHeader from '../components/Header.vue'
import TextField from '../components/Shared/TextField'
export const DASHBOARDS = {
  customer: '/customer',
  estimator: '/estimator'
}
export default {
  components: {
    TextField,
    LumberHeader
  },
  methods: {
    login() {
      const formData = new FormData(this.$refs.loginForm)
      this.$axios
        .post('/api/v1/user/login', formData, {})

        .then((data) => {
          this.$store
            .dispatch('Auth/store', {
              refreshToken: data.data.data.refreshToken,
              token: data.data.data.token
            })
            .then(() => {
              this.$router.push(DASHBOARDS[data.data.data.role])
            })
        })
        .catch((e) => {
          if (e.response) {
            this.$store.dispatch('SnackBar/show', e.response.data[0].message)
          } else {
            this.$store.dispatch('SnackBar/show', 'an error occured')
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.container .login-row {
  padding-bottom: 40px;
}
.container .login-row .main .login-title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;
  padding: 40px 0px 64px 0px;
  text-align: center;
  color: #ffffff;
  margin-top: 100px;
}
.container .login-row .main .box {
  background-color: #ffffff;
  border-top: 7px solid #f48f2e;
  border-left: 0;
  border-right: 0;
  padding: 0px 40px;
  border-radius: 7px;
}
.container .login-row .main .box .row .text {
  padding: 64px 0 12px 12px;
}
.container .login-row .main .box .row .text h2 {
  font-style: italic;
  font-weight: 400;
  padding: 0px 0px 20px 0px;
  font-size: 30px;
}
.container .login-row .main .box .row .text p {
  font-style: italic;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  line-height: 31px;
  font-size: 16px;
  color: #7b7da3;
}
.container .login-row .main .box .row .login {
  padding: 24px 0 12px 52px;
}
.container .login-row .main .box .row .login .submit {
  padding: 10px 12px 0;
}
.container .login-row .main .box .row .login .submit .login-item button {
  height: 50px;
  font-weight: 900;
  width: 100%;
  background-color: #f48f2e;
  border-radius: 8px;
  color: #ffffff;
  text-transform: uppercase;
}
.container .login-row .main .box .row .login .submit .login-item a {
  line-height: 80px;
  color: #9ea4c4;
  text-decoration: none;
}
.container .login-row .main .submit .login-item:first-child {
  font-size: 14px;
  font-weight: 500;
}
@media only screen and (max-width: 1264px) {
  .container .login-row {
    padding: 30px 0;
  }
  .container .login-row .main .box {
    padding: 0 20px;
  }
  .container .login-row .main .box .row .text {
    padding: 64px 16px 12px;
  }
  .container .login-row .main .box .row .login {
    padding: 24px 0 12px;
  }
  .container .login-row .main .box .row .login .submit {
    padding: 10px 10px;
    text-align: center;
  }
}
@media only screen and (max-width: 600px) {
  .container .login-row {
    padding: 60px 0 0;
  }
  .container .login-row .main .login-title {
    padding-bottom: 20px;
  }
  .container .row .box {
    padding: 0 10px;
    margin-bottom: 60px;
  }
  h2 {
    text-align: center;
  }
  p {
    text-align: center;
  }
  .login {
    padding-top: 0;
    padding-bottom: 0;
  }
  .container .login-row .main .submit {
    padding: 40px 10px 0;
    text-align: center;
  }
  .container .login-row .main .submit .login-item {
    padding: 0px 12px;
  }
  .login-title {
    padding: 0;
    line-height: 70px;
  }
  .text {
    padding: 10px 12px 0px 12px;
  }
  .container .login-row .main .login-title {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    padding: 0px 0px 54px 0px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
