<template>
  <v-container fluid>
    <v-row style="margin:0;">
      <lumber-header
        :items="[
          { name: 'home', link: '/' },
          { name: 'Account Profile', link: 'profile' },
          { name: 'Projects', link: 'profileprojects' },
          { name: 'Messages', link: 'messages' }
        ]"
      />
    </v-row>
    <v-row style="margin: 200px 0 0;" justify="center">
      <v-col
        xl="12"
        lg="12"
        md="11"
        sm="10"
        cols="11"
        class="main"
        order="first"
      >
        <h1 class="project-title">{{ project.name }}</h1>
      </v-col>
      <v-col
        xl="2"
        lg="3"
        md="4"
        sm="6"
        cols="12"
        class="process"
        order="last"
        order-md="first"
      >
        <v-card class="status-card">
          <h3 class="status-card__title">Project Process</h3>
          <ul class="status-card__list">
            <li
              v-for="status in statuses"
              :key="status.name"
              class="status-card__list__item"
              :class="status.class"
            >
              <v-icon
                v-if="status.class == 'status-card__list__item--completed'"
                class="status-card__list__item__icon"
                >mdi-check</v-icon
              >
              {{ status.name }}
            </li>
          </ul>
        </v-card>
      </v-col>
      <v-col xl="5" lg="7" md="8" sm="11" cols="12">
        <v-card class="project-card">
          <v-row>
            <v-col xl="8" lg="8" md="10" sm="12" cols="12">
              <p class="project-card__due-date">Project is Due {{ dueDate }}</p>
            </v-col>
            <v-col xl="4" lg="4" md="2" sm="12" cols="12">
              <a class="project-card__cancellation" href=""
                >Cannot Complete Project</a
              >
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xl="4" lg="4" md="4" sm="8" cols="8" style="padding:5px;">
              <v-btn
                color="#f78f1e"
                width="100%"
                height="50px"
                style="color:#ffffff !important"
                @click.stop="dialog = !dialog"
              >
                view plans
              </v-btn>
              <plans-dialog v-model="dialog" />
            </v-col>
            <v-col xl="4" lg="4" md="4" sm="8" cols="8" style="padding:5px;">
              <v-btn
                color="#f78f1e"
                width="100%"
                height="50px"
                style="color:#ffffff !important"
                @click.stop="showLumberListDialog()"
              >
                lumber list
              </v-btn>
            </v-col>
            <v-col xl="4" lg="4" md="4" sm="8" cols="8" style="padding:5px;">
              <v-btn
                color="#f78f1e"
                width="100%"
                height="50px"
                style="color:#ffffff !important"
                @click="questionList = !questionList"
              >
                questions
              </v-btn>
              <question-list v-model="questionList" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <lumber-list-dialog />
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import LumberHeader from '@/components/Header.vue'
import PlansDialog from '@/components/PlansDialog.vue'
import QuestionList from '@/components/Estimator/Question/QuestionList.vue'
import LumberListDialog from '@/components/Estimator/LumberList/LumberListDialog.vue'

export default {
  components: {
    LumberHeader,
    PlansDialog,
    QuestionList,
    LumberListDialog
  },
  data() {
    return {
      dialog: false,
      questionList: false,
      project: {},
      status: '',
      statuses: [
        { name: 'Lumber list open', class: 'active' },
        { name: 'lumber list completed', class: 'active' },
        { name: 'Awaiting Manager Approval', class: 'active' },
        { name: 'project completed', class: 'active' }
      ]
    }
  },
  async mounted() {
    await this.$store.restored
    const project = await this.$axios.get(
      '/api/v1/project/' + this.$route.params.id,
      {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      }
    )
    this.project = project.data.data

    this.status = project.data.data.status

    let className = 'status-card__list__item--completed'
    for (let i = 0, status; (status = this.statuses[i]); i++) {
      status.class = className
      if (status.name.toLowerCase() === this.project.status.toLowerCase()) {
        className = 'status-card__list__item--todo'
      }
    }
  },
  computed: {
    dueDate() {
      return moment(this.project.due_date).format('DD MMMM YYYY')
    }
  },
  methods: {
    showLumberListDialog() {
      if (this.status !== 'Awaiting Manager Approval')
        this.$store.dispatch('Dialog/show', 'LumberListDialog')
      else
        this.$store.dispatch(
          'SnackBar/show',
          'Manager approval is still in progress'
        )
    }
  }
}
</script>

<style lang="scss" scoped>
.container--fluid {
  background-color: #fafafa;
  min-height: 100vh;
}

.project-title {
  color: #000000;
  text-align: center;
  padding: 0px 0px 30px 0px;
  font-size: 50px;
  font-weight: 800;
  font-family: 'Lato', serif;
}

.project-card {
  padding: 10px 30px 20px;
}

.project-card .project-card__due-date {
  text-align: left;
  font-size: 22px;
  font-style: italic;
  font-weight: 600;
  padding-bottom: 20px;
}

.project-card .project-card__cancellation {
  float: right;
  color: #9091b2;
}

.container--fluid .row .main .card .row button {
  margin: 0px 0px;
  border-radius: 5px;
  box-shadow: none;
}

.status-card {
  border-radius: 5px;
  margin: 0px auto;
  border-top: 5px solid #f78f1e;
  padding: 30px 30px 20px 30px;

  .status-card__title {
    padding-bottom: 25px;
    font-size: 18px;
    text-align: center;
  }

  .status-card__list {
    list-style-type: none;
    padding-left: 0;

    .status-card__list__item {
      color: #7b7da3;
      border-left: 4px solid #afafaf;
      padding-left: 18px;
      line-height: 38px;
      position: relative;

      &.status-card__list__item--todo {
        border-left: 4px solid #dcdfee;

        &::before {
          position: absolute;
          display: block;
          top: 10px;
          content: ' ';
          width: 18px;
          height: 18px;
          background-color: #dcdfee;
          border-radius: 50%;
          left: -11px;
        }

        &::after {
          position: absolute;
          display: block;
          top: 15px;
          content: ' ';
          width: 8px;
          height: 8px;
          background-color: #7b7da3;
          border-radius: 50%;
          left: -6px;
        }
      }

      &.status-card__list__item--completed {
        border-left: 4px solid #f78f1e;

        .status-card__list__item__icon {
          color: #f78f1e;
          border: 1px solid #f78f1e;
          border-radius: 50%;
          background-color: #ffffff;
          font-size: 18px;
          position: absolute;
          top: 10px;
          left: -12px;
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .container--fluid .row .card {
    padding: 30px 10px;
  }
  .container--fluid .row .main h1 {
    font-size: 30px;
  }
}
</style>
