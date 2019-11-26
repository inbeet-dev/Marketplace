<template>
  <div :class="{ 'form-group--error': error }">
    <label v-if="label" class="label"
      >{{ label }}
      <div v-if="important" class="important-star">*</div>
    </label>
    <div class="main">
      <textarea
        v-if="textarea"
        :placeholder="placeholder"
        :name="name"
        class="input"
        :disabled="disabled"
      ></textarea>
      <input
        v-else
        v-model="data"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        class="input"
        :style="{ 'padding-left': icon ? '43px' : '12px' }"
        :disabled="disabled"
      />
      <v-icon v-if="icon">{{ icon }}</v-icon>
      <span class="main__error" v-if="message">{{ message }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextField',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'placeholder'
    },
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    important: {
      type: Boolean,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: ''
    }
  },
  watch: {
    data() {
      this.$emit('input', this.data)
    },
    value() {
      this.data = this.value
    }
  },
  beforeCreated() {
    this.data = this.value
  },
  mounted() {
    if (this.data !== this.value) {
      this.data = this.value
    }
  }
}
</script>
<style lang="scss" scoped>
.label {
  position: relative;
  margin: 5px 7px;
  color: #0b3265;
  font-style: italic;
  font-size: 15px;
  line-height: 40px;
  text-transform: capitalize;
}
.label .important-star {
  position: absolute;
  top: -13px;
  right: -8px;
  color: #f55;
  width: 5px;
  height: 5px;
}
.main {
  margin-bottom: 10px;
  height: 50px;
}
.main .input {
  height: 48px;
  font-size: 16px;
  width: 100%;
  background-color: #f1f4f8;
  border-radius: 7px;
  padding: 0 12px;
  border: 2px solid #f78f1e00;
}
.main i {
  height: 48px;
  left: 14px;
  width: 20px;
  top: -48px;
  z-index: 4;
  position: relative;
}
.main .main__error {
  display: none;
}
.form-group--error::v-deep .main .main__error {
  position: relative;
  color: red;
  font-size: 14px;
  display: inline-block;
  left: 5px;
  top: 0;
  font-style: italic;
}
.input + i {
  color: #8c8c8d;
}
.input:focus + i {
  color: #f78f1e;
}
.input:focus {
  outline: none;
  border: 2px solid #f78f1e;
}
.form-group--error::v-deep .main .input {
  border: 2px solid #f42e2e;
}
</style>
