<template>
  <v-row justify="center" align-content="center" align="center" no-gutters>
    <v-col cols="12">
      <text-field
        v-model="text"
        :label="value.question.text"
        placeholder="Respond here"
        :disabled="disabled"
      />
    </v-col>
  </v-row>
</template>

<script>
import TextField from '../Shared/TextField.vue'
export default {
  components: {
    TextField
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
  data() {
    return {
      text: ''
    }
  },
  watch: {
    text() {
      const value = this.value
      value.answer.text = this.text
      this.$emit('input', value)
    },
    value() {
      this.text = this.value.answer.text
    }
  },
  mounted() {
    this.text = this.value.answer.text
  }
}
</script>

<style lang="scss" scoped>
.general-question-create__actions {
  text-align: center;
}
</style>
