<template>
  <v-dialog v-model="dialog" width="900" persistent>
    <v-card class="mx-auto box" outlined elevation raised width="100%">
      <h1>Upload your {{ type }}</h1>
      <v-icon class="close-icon" @click="dialog = false">
        mdi-close
      </v-icon>
      <v-row justify="center" class="zone">
        <v-col cols="12" style="text-align:center">
          <v-row class="upload-row">
            <form
              ref="drag"
              action=""
              style="width:100%;height:100%"
              @drag.stop.prevent=""
              @dragstart.stop.prevent=""
              @dragend.stop.prevent=""
              @dragover.stop.prevent=""
              @dragenter.stop.prevent=""
              @dragleave.stop.prevent=""
              @drop.stop.prevent="upload"
            >
              <v-col
                cols="12"
                class="upload-zone"
                style="text-align:center;margin:0px;padding:0;"
              >
                <p v-if="!files.length">Drag & Drop Files Here</p>
                <p v-if="!files.length">Or</p>
                <ul v-else>
                  <li v-for="(file, index) in files" :key="index">
                    {{ file.name }}
                    <v-icon @click="remove(index)">mdi-delete</v-icon>
                  </li>
                </ul>
                <input
                  id="file"
                  ref="file"
                  type="file"
                  class="input-file"
                  multiple
                  @change="handleFileUpload()"
                />
                <button class="add-file" @click.prevent="$refs.file.click()">
                  Select File To Upload
                </button>
              </v-col>
            </form>
          </v-row>
          <button class="submit" @click.stop.prevent="submitFile()">
            Upload Lumber List <v-icon>mdi-chevron-right</v-icon>
          </button>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      dialog: false,
      type: 'files'
    }
  },
  watch: {
    dialog() {
      if (
        this.dialog === false &&
        this.$store.getters['Dialog/active'] === 'UploadFileDialog'
      ) {
        this.$store.dispatch('Dialog/show', '')
      }
    }
  },
  mounted() {
    this.dialog = this.$store.getters['Dialog/active'] === 'UploadFileDialog'
    this.$store.watch(
      (state, getters) => getters['Dialog/active'],
      (newValue) => {
        this.dialog = newValue === 'UploadFileDialog'
      }
    )
  },
  methods: {
    submitFile() {
      const formData = new FormData()
      formData.append(
        'type',
        this.$store.getters['UploadType/getUplaodType'] || 'files'
      )
      formData.append(
        'projectId',
        this.$store.getters['Project/getId'] || this.$route.params.id
      )
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files[]', this.files[i])
      }
      this.$axios
        .post('/api/v1/project/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
          }
        })
        .then(() => {
          this.dialog = false
          this.$store.dispatch('Dialog/show', 'UploadMessage')
        })
        .catch(function() {})
    },
    handleFileUpload() {
      this.files = [...this.files, ...this.$refs.file.files]
    },
    upload(e) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        this.files.push(e.dataTransfer.files[i])
      }
    },
    remove(index) {
      this.files.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.box {
  border-top: 7px solid #f48f2e;
  border-left: 0;
  border-right: 0;
  border-radius: 7px;
  border-bottom: 0;
  padding: 50px 50px 10px;
}
.login-title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 40px;
  line-height: 100px;
}
.upload {
  padding: 0px 8px 15px;
  display: block;
  color: #2c3e50;
}
.box .zone .upload-row {
  margin: 0;
}
.box .zone .upload-row .upload-zone {
  height: 350px;
  background-color: #e7edfa;
  border: dashed 2px #9ea4c4;
  padding: 60px 0px 0px !important;
  border-radius: 10px;
}
.box .zone .upload-row .upload-zone .input-file {
  text-align: center;
  margin: 0px auto;
  display: none;
}
.box .zone .upload-row .upload-zone p {
  text-align: center;
  font-size: 30px;
  font-family: 'Lato';
  color: #7b7da3;
}
.box .zone .upload-row .upload-zone p:nth-child(2) {
  padding-bottom: 20px;
}
.box .zone .upload-row .upload-zone ul {
  list-style-type: none;
  margin-bottom: 20px;
  height: 100px;
  overflow-y: auto;
  margin: 0px 30px 40px;
  padding: 0;
}
.box .zone .upload-row .upload-zone ul li {
  text-align: left;
  border-bottom: 1px solid #0000001a;
  color: #7b7da3;
  padding: 0 16px;
  line-height: 30px;
}
.box .zone .upload-row .upload-zone ul li i {
  color: #7b7da2;
  float: right;
  font-size: 20px;
  margin: 5px 0;
}
.box .zone .upload-row .upload-zone .add-file {
  color: #ffffff;
  background-color: #7b7da3;
  padding: 10px 70px;
  font-size: 17px;
  font-weight: 400;
  border-radius: 8px;
}
.box .zone .upload-row .upload-zone .add-file:focus {
  outline: 0;
}
.box .zone .submit {
  display: block;
  color: #ffffff;
  background-color: #f78f1e;
  padding: 15px 100px;
  font-size: 17px;
  font-weight: 600;
  font-style: italic;
  border-radius: 8px;
  margin: 40px 0 20px auto;
  text-transform: uppercase;
}
.box .zone .submit i {
  color: #ffffff;
  margin-top: -4px;
}
.box .zone .submit:focus {
  outline: 0;
}
.close-icon {
  position: absolute;
  right: 20px;
  top: 10px;
}
.close-icon:hover {
  color: #f48f2e;
}
@media only screen and (max-width: 500px) {
  h1 {
    font-size: 20px;
  }
  .box .zone .submit {
    padding: 15px 51px;
  }
  .box .zone .upload-row .upload-zone .add-file {
    padding: 10px 10px;
  }
  .box {
    padding: 50px 20px 10px;
  }
  .box .zone .submit {
    margin: 40px auto 20px auto;
  }
}
</style>
