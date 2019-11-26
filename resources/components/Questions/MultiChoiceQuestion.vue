<template>
  <v-row justify="center" align-content="center" align="center" no-gutters>
    <v-col cols="12" sm="8" class="question">
      <p class="question-text">
        {{ value.question.text }}
      </p>
    </v-col>
    <v-col cols="12" sm="4">
      <v-radio-group error="error" success="success" v-model="choice" row>
        <v-radio
          v-for="(question, index) in value.question.answers"
          :key="index"
          :label="question"
          color="#f78f1e"
          :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false
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
.question-text {
  line-height: 40px;
  display: inline-block;
  margin: 0 !important;
  color: #7b7da3;
}

.radio {
  position: relative;
}

.radio::v-deep i {
  display: none;
}

.radio::before {
  content: ' ';
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: solid 1px #eee;
  position: absolute;
  top: 2px;
  left: 2px;
}

.radio.v-item--active::before {
  border: none;
  background-color: #f78f1e;
}

.radio.v-item--active::after {
  content: ' ';
  border: solid 2px #fff;
  border-top: none;
  border-left: none;
  transform: rotate(40deg);
  width: 6px;
  height: 12px;
  position: absolute;
  top: 5px;
  left: 9px;
}
</style>
