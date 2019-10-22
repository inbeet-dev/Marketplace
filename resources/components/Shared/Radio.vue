<template>
  <div class="radio">
    <input
      type="radio"
      class="custom-control-input"
      id="defaultChecked2"
      :name="question.name"
    />
    <label class="custom-control-label" :for="question.name">{{
      question.text
    }}</label>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    question: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  display: none;
}
.radio {
  position: relative;
  line-height: 27px;
  display: inline-block;
}
label {
  padding-left: 25px;
  text-transform: uppercase;
}
label:before {
  content: '';
  position: absolute;
  display: inline-block;
  max-height: 18px;
  max-width: 18px;
  min-height: 18px;
  min-width: 18px;
  background-color: #ffffff;
  border-radius: 50%;
  border: 1px solid #9ea4c4;
  top: 3px;
  left: 0;
}
label:after {
  content: '';
  position: absolute;
  display: inline-block;
  max-height: 8px;
  max-width: 8px;
  min-height: 8px;
  min-width: 8px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  left: 5px;
  top: 8px;
}
input:checked + label:before {
  background-color: #f78f1e;
  border: 1px solid #f78f1e;
}
</style>
