<template>
  <v-dialog v-model="emailDialog" width="600">
    <v-card class="card">
      <h1>NO Problem!</h1>
      <p>
        Email Us and We Will Be In Contact Shortly To help!
      </p>
      <v-row justify="center">
        <v-col cols="12">
          <v-btn
            color="#f78f1e"
            width="100%"
            height="50px"
            style="color:#ffffff !important"
          >
            Email Us!
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
      emailDialog: false
    }
  },
  watch: {
    value() {
      this.emailDialog = this.value
    },
    emailDialog() {
      this.$emit('input', this.emailDialog)
    }
  },
  props: {
    value: { type: Boolean, default: false }
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
