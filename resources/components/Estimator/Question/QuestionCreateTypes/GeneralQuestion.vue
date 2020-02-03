<template>
  <v-row
    justify="center"
    align-content="center"
    align="center"
    no-gutters
    class="general-question-create-row"
  >
    <v-col cols="12" sm="8">
      <textfield
        v-model="text"
        label="GeneralQuestion"
        placeholder="Question Text"
      />
    </v-col>
    <v-col cols="12" sm="4" class="general-question-create__actions">
      <v-btn icon color="red"><v-icon>mdi-delete</v-icon></v-btn>
      <v-btn icon color="#4998ff" @click="save()" class="">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Textfield from '../../../Shared/TextField'

export const GeneralQuestionCreateSchema = {
  id: null,
  question: { text: '' },
  answer: { text: null },
  type: 'general-create'
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
.general-question-create-row {
  border-bottom: 1.2px solid #f0f0f0;
}
.general-question-create-row .general-question-create__actions {
  text-align: right;
  position: relative;
  top: 14px;
}
</style>
