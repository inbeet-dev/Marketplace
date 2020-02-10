<template>
  <v-row justify="center" align-content="center" align="center" no-gutters>
    <v-col cols="12" sm="8"
      ><span class="question-text">{{ value.question.text }} </span></v-col
    ><v-col cols="12" sm="4">
      <v-radio-group v-model="selected" row>
        <v-radio
          :value="true"
          label="YES"
          color="#f78f1e"
          name="answer"
          class="radio"
          :disabled="disabled"
        ></v-radio>
        <v-radio
          label="NO"
          color="#f78f1e"
          name="answer"
          class="radio"
          :value="false"
          :disabled="disabled"
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
    },
    disabled: {
      type: Boolean,
      default: false
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
  border-radius: 10px;
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
  background-color: #fff;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  position: absolute;
  top: 8px;
  left: 8px;
}
</style>
