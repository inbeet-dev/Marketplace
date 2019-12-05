<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="login-card">
      <v-card-text
        ><h1 class="lumber-list">
          Are you a Company or Individual?
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
                $store.dispatch('Dialog/show', {
                  name: role + 'RegisterDialog',
                  data: 'Company'
                })
                dialog = false
              "
              >Company</v-btn
            ></v-col
          >
          <v-col cols="6">
            <v-btn
              width="100%"
              color="green darken-1"
              text
              @click.stop="
                $store.dispatch('Dialog/show', {
                  name: role + 'RegisterDialog',
                  data: 'Individual'
                })
                dialog = false
              "
              >Individual</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      role: ''
    }
  },
  mounted() {
    this.dialog = this.$store.getters['Dialog/active'] === 'AccountTypeDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'AccountTypeDialog'
        this.role = this.$store.getters['Dialog/getData']
        console.log(this.role)
      }
    )
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'AccountTypeDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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

.v-dialog .login-card {
  border-top: 5px solid #f78f1e;
}

@media only screen and (max-width: 700px) {
  .v-dialog .login-card .lumber-list {
    font-size: 20px;
  }
}
</style>
