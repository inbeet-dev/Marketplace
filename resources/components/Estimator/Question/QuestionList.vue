<template>
  <v-dialog v-model="questionList" width="800">
    <v-card class="question-dialog-card">
      <h2 class="question-title">
        Questions
      </h2>
      <v-row class="question-list">
        <v-col>
          <component
            :is="typeToComponent(question.type)"
            v-for="(question, index) in questions"
            :key="index"
            v-model="questions[index]"
            @save="save(index)"
            class="component"
          />
        </v-col>
      </v-row>
      <v-row style="margin:0;" justify="center">
        <v-col cols="12" md="4" style="text-align:center">
          <v-btn
            @click="addQuestion('yes-no-create')"
            style="width:100%;
          background:#f78f1e;
          color:#ffffff;
          height:45px;
          "
            >Yes/No Question</v-btn
          >
        </v-col>
        <v-col cols="12" md="4" style="text-align:center">
          <v-btn
            @click="addQuestion('multi-choice-create')"
            style="width:100%;
            background:#f78f1e;
            color:#ffffff;
            height:45px;
            "
          >
            Multi Choice Question
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" style="text-align:center">
          <v-btn
            @click="addQuestion('general-create')"
            style="width:100%;
          background:#f78f1e;
          color:#ffffff;
          height:45px;
          "
            >General Question</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
// import MultiChoiceQuestion from '../../Questions/MultiChoiceQuestion.vue'
// import YesNoQuestion from '../../Questions/YesNoQuestion.vue'
// import GeneralQuestion from '../../Questions/GeneralQuestion.vue'
import YesNoQuestionCreate, {
  YesNoQuestionCreateSchema
} from './QuestionCreateTypes/YesNoQuestion'
import MultiChoiceQuestionCreate, {
  MultiChoiceQuestionCreateSchema
} from './QuestionCreateTypes/MultiChoiceQuestion'
import GeneralQuestionCreate, {
  GeneralQuestionCreateSchema
} from './QuestionCreateTypes/GeneralQuestion'
export default {
  data() {
    return {
      questionList: false,
      questions: [],
      components: {
        'yes-no-create': YesNoQuestionCreate,
        'multi-choice-create': MultiChoiceQuestionCreate,
        'general-create': GeneralQuestionCreate
        // 'yes-no': YesNoQuestion,
        // 'multi-choice': MultiChoiceQuestion,
        // general: GeneralQuestion
      },
      schemas: {
        'yes-no-create': YesNoQuestionCreateSchema,
        'multi-choice-create': MultiChoiceQuestionCreateSchema,
        'general-create': GeneralQuestionCreateSchema
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
        console.log(data.data.question)
      })
  },
  methods: {
    addQuestion(type) {
      this.questions.push(this.schemas[type])
    },
    typeToComponent(type) {
      return this.components[type]
    },
    save(index) {
      this.$axios
        .post(
          '/api/v1/project/question/create',
          {
            projectId: 1,
            type: this.questions[index].type.replace('-create', ''),
            question: this.questions[index].question
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters['Auth/getToken']}`
            }
          }
        )
        .then(() => {
          this.$store.dispatch(
            'SnackBar/show',
            'Your question successfully saved'
          )
        })
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
</style>
