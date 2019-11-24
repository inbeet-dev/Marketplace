<template>
  <v-container fluid>
    <lumber-header
      :items="[
        { name: 'home', link: '/' },
        { name: 'accound profile', link: 'accound-profile' },
        { name: 'employee profiles', link: 'employee-profiles' },
        { name: 'message', link: 'message' }
      ]"
      :user="$store.getters['User/getUser']"
    />
    <v-row justify="center">
      <v-col cols="11" md="8" xl="6" class="edit-profile">
        <h1 class="edit-profile__header">Profiles</h1>
        <v-card class="edit-profile__panel">
          <v-row justify="center" class="edit-form">
            <v-col cols="12" md="3" class="profile-image">
              <img src="/profile.jpeg" alt="" class="image" />
              <v-btn
                width="110px"
                color="#f78f1e"
                height="30px"
                class="change-image-btn"
              >
                change photo</v-btn
              >
            </v-col>
            <v-col cols="12" md="8">
              <v-row justify="center">
                <v-col cols="12" md="11">
                  <text-field
                    type="text"
                    placeholder="Enter Name"
                    label="Name"
                    name="name"
                  />
                </v-col>
                <v-col cols="12" md="11">
                  <text-field
                    type="email"
                    placeholder="Enter Email"
                    label="Email"
                    name="email"
                  />
                </v-col>
                <v-col cols="12" md="11">
                  <text-field
                    type="tel"
                    placeholder="Enter Contact Number"
                    label="Contact Number"
                    name="phoneNumber"
                  />
                </v-col>
                <v-col cols="12" md="11">
                  <text-field
                    type="text"
                    placeholder="Enter Address"
                    label="Address"
                    name="address"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="11">
              <v-btn width="100%" color="#f78f1e" height="45px" class="edit-btn"
                >edit</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LumberHeader from '../../components/Header.vue'
import TextField from '../../components/Shared/TextField.vue'
export default {
  components: {
    LumberHeader,
    TextField
  }
}
</script>
<style lang="scss" scoped>
.row {
  margin: 0;
}
.container {
  min-height: 100vh;
  background-color: #ffffff;
}
.edit-profile {
  margin-top: 100px;
  margin-bottom: 100px;
}
.edit-form {
  padding-top: 40px;
}
.edit-profile__header {
  line-height: 150px;
  text-align: center;
}
.edit-profile__panel {
  border-top: 5px solid #f78f1e;
  box-shadow: 0 3px 12px 0 #00000029;
  border-radius: 5px;
}
.profile-image {
  text-align: center;
  position: relative;
}
.image {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-top: 12px;
}
.edit-btn {
  color: #ffffff;
  font-style: italic;
  margin-bottom: 15px;
  box-shadow: none;
}
.change-image-btn {
  color: #ffffff;
  font-style: italic;
  font-size: 10px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 135px;
}
</style>
