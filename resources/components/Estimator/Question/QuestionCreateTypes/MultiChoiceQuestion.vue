<template>
  <v-row
    justify="center"
    align-content="center"
    align="center"
    no-gutters
    class="multi-choice-question-create-row"
  >
    <v-col cols="12" sm="6">
      <textfield
        v-model="text"
        label="MultiChoice Question"
        class="multi-choice-question-create-row__text-filed"
        placeholder="Question Text"
      />
    </v-col>
    <v-col
      cols="12"
      sm="4"
      class="multi-choice-question-create-row__choice-box"
    >
      <v-row v-for="(choice, index) in choices" :key="index" dense>
        <v-col cols="9">
          <textfield v-model="choices[index]" placeholder="choice" />
        </v-col>
        <v-col cols="3">
          <v-btn icon color="grey" @click="removeChoice(index)"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="2" class="multi-choice-question-create__actions">
      <v-btn
        icon
        @click="addChoice"
        color="#3ce057

"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
      <v-btn icon color="red" @click="deleteItem()"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
      <v-btn icon color="#4998ff" @click="save()"
        ><v-icon>mdi-content-save</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import Textfield from '../../../Shared/TextField'

export const MultiChoiceQuestionCreateSchema = {
  id: null,
  question: { text: '', answers: [] },
  answer: { choice: null },
  type: 'multi-choice-create'
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
      text: '',
      choices: []
    }
  },
  watch: {
    text() {
      const value = this.value
      value.question.text = this.text
      this.$emit('input', value)
    },
    choices() {
      const value = this.value
      value.question.answers = this.choices
      this.$emit('input', value)
    }
  },
  methods: {
    addChoice() {
      this.choices.push('')
    },
    removeChoice(index) {
      this.choices.splice(index, 1)
    },
    save() {
      this.$emit('save')
    },
    deleteItem() {
      this.$emit('deleteItem')
    }
  }
}
</script>

<style lang="scss" scoped>
.multi-choice-question-create-row {
  border-bottom: 1.2px solid #f0f0f0;
  padding-bottom: 10px;
}
.multi-choice-question-create__actions {
  text-align: right;
}
.multi-choice-question-create-row__text-filed {
  margin: 0px 3px 0 0;
}
.multi-choice-question-create-row__choice-box {
  position: relative;
  top: 20px;
}
</style>
