2<template>
  <v-container>
    <v-row>
      <div class="text-center">
        <v-dialog v-model="uploadFileDialog" width="500">
          <v-card>
            <v-card-text class="content">
              <h1>
                Upload Complete!
              </h1>
              <p>
                Make sure to check your email or track your project in our
                mobile app for updates.
              </p>
            </v-card-text>
            <br />
            <v-row class="row" justify="center">
              <v-col sm="8" cols="12">
                <button @click="uploadFileDialog = false" class="submit">
                  OK
                </button>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      uploadFileDialog: false
    }
  },
  props: {
    value: { type: Boolean, default: false }
  },
  watch: {
    value() {
      this.uploadFileDialog = this.value
    },
    uploadFileDialog() {
      this.$emit('input', this.uploadFileDialog)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 20px 0 !important;
  border-top: 5px solid #f48f2e;
}
h1 {
  color: #464646;
  text-align: center;
  line-height: 60px;
}
p {
  color: #464646;
  text-align: center;
  font-size: 16px;
}
.row {
  margin: 0px;
}
button.submit {
  color: #ffffff;
  background: #f48f2e;
  width: 100%;
  border-radius: 10px;
  height: 50px;
}
</style>
