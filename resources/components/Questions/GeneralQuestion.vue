<template>
  <v-row justify="center" align-content="center" align="center" no-gutters>
    <v-col cols="12">
      <text-field
        :label="value.question.text"
        placeholder="Respond here"
        v-model="text"
        :disabled="value.question.answerd_at"
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
