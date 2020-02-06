<template>
  <div class="header">
    <v-row class="header__row">
      <div class="header__icon">
        <v-icon class="header__icon__mdi-menu" @click="active = !active"
          >mdi-menu</v-icon
        >
      </div>
      <div class="header__logo">
        <a href="/">
          <img src="/logo.png" alt="header__logo" class="logo-png" />
        </a>
      </div>
      <ul class="header__items-list">
        <li
          v-for="item in items"
          :key="item.index"
          class="header__items-list__item"
        >
          <a
            :href="item.link"
            class="header__items-list__item__link"
            :class="{ 'header__items-list__item__link--active': item.active }"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
      <div v-if="login && !userData.name" class="header__right-side">
        <a class="header__right-side__call" href="tel:+1818595904">
          <v-icon class="header__right-side__call__icon"
            >mdi-phone-in-talk</v-icon
          >
          <span class="header__right-side__call__number"
            >+1 - (818) 59 59 04</span
          >
        </a>
        <a :href="login.link" class="header__right-side__login">
          <span class="header__right-side__login__login-text">{{
            login.name
          }}</span>
          <v-icon class="header__right-side__login__icon">mdi-login</v-icon>
        </a>
      </div>
      <div v-if="userData.name" class="header__right-side-profile">
        <div class="header__right-side-profile__profile-detail">
          <img
            src="/profile.jpeg"
            alt=""
            class="header__right-side-profile__profile-detail__picture"
          />
          <div class="header__right-side-profile__profile-detail__detail">
            <p
              class="header__right-side-profile__profile-detail___detail__name"
            >
              {{ userData.name }}
            </p>
            <p
              class="header__right-side-profile__profile-detail___detail__role"
            >
              {{ userData.role }}
            </p>
          </div>
          <div class="header__right-side-profile__profile-detail__drop-down">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="transparent" depressed v-on="on">
                  <v-icon color="#807c9c">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <button @click="logout">
                  <v-list-item>
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </button>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
    </v-row>
    <!-- start responsive menu -->
    <v-list
      class="header__resposive-items-list"
      :class="{ 'header__resposive-items-list--response-active': active }"
    >
      <v-list-item-group>
        <v-list-item
          v-for="item in items"
          :key="item.index"
          class="header__items-list__item"
        >
          <v-list-item-content>
            <a :href="item.link" class="header__items-list__item__link">
              {{ item.name }}</a
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- end responsive menu -->
    <div
      class="background"
      :class="{ 'background-active': active }"
      @click="active = false"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'LumberHeader',
  props: {
    items: { type: Array, default: null },
    login: { type: Object, default: null }
  },
  data() {
    return {
      active: false,
      userData: ''
    }
  },
  mounted() {
    this.userData = this.$store.getters['User/getUser']
    this.$store.watch(
      (state, getters) => getters['User/getUser'],
      (newValue) => {
        this.userData = newValue
      }
    )
  },
  methods: {
    logout() {
      this.$store.dispatch('User/setUser', {
        name: '',
        role: ''
      })
      this.$store.dispatch('Auth/store', {
        refreshToken: '',
        token: ''
      })
      this.$router.push(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  height: 0;
  width: 0;
  top: 0;
  z-index: 10;
  position: fixed;
}
.header {
  position: fixed;
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  margin: 5px 0px 0px 0px;
  display: inline-block;
  box-shadow: 2px 4px 8px 0px #00000033;
  font-family: 'Lato', serif;
  z-index: 100;
}
.header .header__row {
  margin: 0px auto;
  align-content: center;
  max-width: 1200px;
}

.header .header__row .header__logo {
  background-color: #ffffff;
  display: inline-block;
  top: 0px;
  height: 140px;
  width: 126px;
  border-top: 5px solid #ff9100;
  transform: translateY(-5px);
  border-radius: 0% 0% 63px 63px;
  box-shadow: 0 4px 20px 5px #00000033;
  margin: 0px auto;
}
.header .header__row .header__logo .logo-png {
  margin: 30px auto 0px;
  transform: translate(22px, -5px);
}
.header .header__row .header__items-list {
  width: 600px;
  margin: 0px auto;
  padding: 0;
  max-height: 90px;
}
.header .header__row .header__items-list .header__items-list__item {
  display: inline-block;
  list-style-type: none;
  margin: 0;
  height: 90px;
  text-align: center;
  padding: 0px 20px;
  border-right: 1px solid #acacac2d;
}
.header .header__row .header__items-list .header__items-list__item:last-child {
  border-right: none;
}
.header
  .header__row
  .header__items-list
  .header__items-list__item
  .header__items-list__item__link {
  font-size: 15px;
  line-height: 90px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  transition: 0.3s;
}
.header
  .header__row
  .header__items-list
  .header__items-list__item
  .header__items-list__item__link:hover {
  color: #f78f1e;
}
.header
  .header__row
  .header__items-list
  .header__items-list__item
  .header__items-list__item__link--active {
  color: #f78f1e;
}
.header .header__row .header__items-list .header__icon__mdi-menu {
  margin-left: 40px;
  border: 2px solid #000;
  padding: 3px;
  border-radius: 50%;
}
.header .header__row .header__right-side {
  display: inline-block;
  margin-left: auto;
  height: 90px;
  padding-right: 10px;
}
.header .header__row .header__right-side .header__right-side__call {
  height: 36px;
  background-color: #fff4e8;
  width: auto;
  border-radius: 28px;
  margin: 27px 0px;
  padding: 0px 10px;
  display: inline-block;
  text-decoration: none;
}
.header
  .header__row
  .header__right-side
  .header__right-side__call
  .header__right-side__call__icon {
  color: #f78f1e;
  height: 36px;
}
.header
  .header__row
  .header__right-side
  .header__right-side__call
  .header__right-side__call__number {
  font-size: 16px;
  color: #f78f1e;
  height: 36px;
}
.header .header__row .header__right-side .header__right-side__login {
  // height: 36px;
  background-color: #f78f1e;
  text-transform: uppercase;
  border-radius: 5px;
  margin: 27px 0px 27px 10px;
  padding: 0px 30px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  color: #ffffff;
  line-height: 36px;
  display: inline-block;
  font-weight: 600;
}
.header
  .header__row
  .header__right-side
  .header__right-side__login
  .header__right-side__login__icon {
  display: none;
}
.header .header__resposive-items-list {
  position: fixed;
  bottom: 0;
  width: 100%;
  transition: all 0.4s;
  list-style-type: none;
  background-color: #ffffff;
  color: #000;
  width: 100%;
  text-align: left;
  transform: translateY(100%);
  border-radius: 8px 8px 0 0;
  z-index: 20;
}
.header .header__resposive-items-list .header__items-list__item__link {
  color: #000;
  font-size: 15px;
  line-height: 30px;
  text-decoration: none;
  text-transform: uppercase;
}
.header .header__row .header__icon {
  height: 90px;
  vertical-align: middle;
  display: none;
}
.header .header__row .header__icon .header__icon__mdi-menu {
  height: 90px;
  font-size: 40px;
  position: absolute;
  color: #ff9100;
}
.header .header__right-side-profile {
  margin: 0px auto;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail {
  max-height: 45px;
  margin: 22.5px auto;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail
  .header__right-side-profile__profile-detail__picture {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail
  .header__right-side-profile__profile-detail__detail {
  display: inline-block;
  vertical-align: middle;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail
  .header__right-side-profile__profile-detail__detail
  p {
  margin: 0 0 0 10px;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail
  .header__right-side-profile__profile-detail__drop-down {
  display: inline-block;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail
  .header__right-side-profile__profile-detail__detail
  .header__right-side-profile__profile-detail___detail__name {
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: bold;
  line-height: 22.5px;
  text-align: left;
  text-transform: capitalize;
  color: #261f56;
}
.header
  .header__right-side-profile
  .header__right-side-profile__profile-detail
  .header__right-side-profile__profile-detail__detail
  .header__right-side-profile__profile-detail___detail__role {
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  font-style: italic;
  line-height: 22.5px;
  text-transform: capitalize;
  color: #948ebb;
}
@media only screen and (max-width: 1100px) {
  .header .header__right-side-profile {
    right: 20px;
    position: absolute;
    right: 10px;
  }
  .header
    .header__right-side-profile
    .header__right-side-profile__profile-detail {
    max-height: 45px;
    margin: 9.5px auto;
  }
  .header {
    height: 64px;
  }
  .header .header__row .header__icon {
    height: 64px;
  }
  .header .header__row .header__icon .header__icon__mdi-menu {
    height: 64px;
    font-size: 28px;
    position: absolute;
    left: 10px;
  }
  .header .header__row .header__items-list {
    display: none;
  }
  .header .header__row .header__right-side {
    position: absolute;
    right: 10px;
    display: flex;
    height: 64px;
  }
  .header .header__row .header__right-side .header__right-side__login {
    margin: 14px 0;
    padding: 0px 5px;
  }
  .header .header__row .header__right-side .header__right-side__call {
    margin: 14px 10px 14px 0;
    border-radius: 5px;
    padding: 0 5px;
  }
  .header .header__row .header__icon {
    display: block;
    cursor: pointer;
  }
  .header
    .header__resposive-items-list.header__resposive-items-list--response-active {
    transform: translateY(0%);
  }
  .background-active {
    height: 100%;
    width: 100%;
    background-color: #21212175;
  }
  .header
    .header__row
    .header__right-side
    .header__right-side__login
    .header__right-side__login__login-text {
    display: none;
  }
  .header
    .header__row
    .header__right-side
    .header__right-side__login
    .header__right-side__login__icon {
    display: inline-block;
    margin-bottom: 6px;
    color: #ffffff;
  }
  .header
    .header__row
    .header__right-side
    .header__right-side__call
    .header__right-side__call__number {
    display: none;
  }
  .header .header__row .header__logo {
    height: 100px;
    width: 90px;
    border-top: 5px solid rgb(255, 145, 0);
    transform: translateY(-5px);
    border-radius: 0% 0% 63px 63px;
    margin: 0px auto;
  }
  .header .header__row .header__logo .logo-png {
    margin: 0px auto 0px;
    transform: translate(6px, -5px) scale(0.8);
  }
}
</style>
