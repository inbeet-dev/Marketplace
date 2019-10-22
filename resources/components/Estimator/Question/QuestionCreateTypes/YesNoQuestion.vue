<template>
  <v-row justify="center" align-content="center" align="center" no-gutters>
    <v-col cols="12" sm="8">
      <textfield v-model="text" label="YesNoQuestion" />
    </v-col>
    <v-col cols="12" sm="4" class="yes-no-question-create__actions">
      <v-btn icon color="red"><v-icon>mdi-delete</v-icon></v-btn>
      <v-btn icon color="#4998ff" @click="save()"
        ><v-icon>mdi-content-save</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import Textfield from '../../../Shared/TextField'

export const YesNoQuestionCreateSchema = {
  id: null,
  question: { text: '' },
  answer: { boolean: null },
  type: 'yes-no-create'
}

export default {
  components: {
    Textfield
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
      value.question.text = this.text
      this.$emit('input', value)
    }
  },
  methods: {
    save() {
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss" scoped>
.yes-no-question-create__actions {
  text-align: right;
}
</style>
