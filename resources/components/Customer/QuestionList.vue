<template>
  <v-dialog v-model="questionList" width="800">
    <v-card class="question-dialog-card">
      <h2 class="question-title">
        Questions
      </h2>
      <v-row class="question-list">
        <v-col cols="12">
          <component
            :is="typeToComponent(question.type)"
            v-for="(question, index) in questions"
            :key="index"
            :index="index"
            v-model="questions[index]"
            class="component"
          />
        </v-col>
      </v-row>
      <v-row style="margin:0;" justify="end">
        <v-col cols="12" md="4" style="text-align:center">
          <v-btn class="submit" @click="submit()">SUBMIT Answers</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import MultiChoiceQuestion from '../Questions/MultiChoiceQuestion.vue'
import YesNoQuestion from '../Questions/YesNoQuestion.vue'
import GeneralQuestion from '../Questions/GeneralQuestion.vue'
export default {
  data() {
    return {
      questionList: false,
      questions: [],
      components: {
        'yes-no': YesNoQuestion,
        'multi-choice': MultiChoiceQuestion,
        general: GeneralQuestion
      }
    }
  },
  watch: {
    value() {
      this.questionList = this.value
    },
    questionList() {
      this.$emit('input', this.questionList)
    }
  },
  props: {
    value: { type: Boolean, default: false }
  },
  mounted() {
    this.$axios
      .get('api/v1/project/question/1', {
        headers: {
          Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
        }
      })
      .then((data) => {
        this.questions = data.data.question
      })
  },
  methods: {
    typeToComponent(type) {
      return this.components[type]
    },
    submit() {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].answered_at) continue
        this.$axios.put(
          '/api/v1/project/question/answer',
          {
            questionId: this.questions[i].id,
            answer: this.questions[i].answer
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
            }
          }
        )
      }
      this.$store.dispatch('SnackBar/show', 'Your answers successfully saved')
    }
  }
}
</script>

<style lang="scss" scoped>
.question-list {
  width: 100%;
  max-width: 100%;
  margin: auto;
  background-color: #fff;
}
.question-title {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  color: #2c3e50;
}
.question-dialog-card {
  border-top: 5px solid #f78f1e;
  padding: 20px 20px;
}
.component {
  border-bottom: 1px solid #ececec;
}
.submit {
  height: 50px !important;
  font-weight: 900;
  width: 100%;
  background-color: #f48f2e !important;
  border-radius: 8px;
  color: #ffffff !important;
}
</style>
