<template>
  <v-row justify="center" align-content="center" align="center" no-gutters>
    <v-col cols="12"
      ><span class="question-text">{{ value.question.text }} </span>
      <v-radio-group v-model="selected">
        <v-radio
          label="NO"
          color="#f78f1e"
          name="answer"
          class="radio"
          :value="false"
          :disabled="value.question.answered_at"
        ></v-radio>
        <v-radio
          :value="true"
          label="YES"
          color="#f78f1e"
          name="answer"
          class="radio"
          :disabled="value.question.answered_at"
        ></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    value: { type: Object, default: null },
    index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      text: '',
      selected: ''
    }
  },
  watch: {
    selected() {
      const value = this.value
      value.answer.boolean = this.selected
      this.$emit('input', value)
    },
    value() {
      this.selected = this.value.answer.boolean
    }
  },
  mounted() {
    this.selected = this.value.answer.boolean
  }
}
</script>

<style lang="scss" scoped>
.question-text {
  line-height: 40px;
  display: inline-block;
  margin: 0 !important;
  color: #7b7da3;
}
</style>
