<template>
  <v-row
    justify="center"
    align-content="center"
    align="center"
    no-gutters
    class="multi-question-answer-row"
  >
    <v-col cols="6" class="question">
      <p class="question-text">
        {{ value.question.text }}
      </p>
    </v-col>
    <v-col cols="6">
      <v-radio-group error="error" success="success" v-model="choice">
        <v-radio
          v-for="(question, index) in value.question.answers"
          :key="index"
          :label="question"
          color="#f78f1e"
          :disabled="question.answered_at"
          name="answer"
          class="radio"
        ></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      choice: ''
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    disable: {
      type: String,
      default: null
    }
  },
  watch: {
    choice() {
      const value = this.value
      value.answer.choice = this.choice
      this.$emit('input', value)
    },
    value() {
      this.choice = this.value.answer.choice
    }
  },
  mounted() {
    this.choice = this.value.answer.choice
  }
}
</script>

<style lang="scss" scoped>
.multi-question-answer-row {
  border-radius: 5px;
  padding-left: 5px;
}
.multi-choice-question-create__actions {
  text-align: center;
}
.question {
  margin: 0;
}
.question-text {
  line-height: 40px;
  display: inline-block;
  margin: 0 !important;
  color: #7b7da3;
}
.answer-list {
  list-style-type: none;
  text-align: right;
  padding: 0;
}
.answer-list li {
  display: inline-block;
  border-radius: 5px;
  padding: 0;
  margin: 0px 3px;
  color: #f78f1e;
  cursor: pointer;
}
.answer-list li h5:last-child {
  text-align: center;
}
.radio {
  display: inline-block !important;
}
</style>
