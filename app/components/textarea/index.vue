<script setup lang="ts">
import type { BaseField, TextareaField } from "../person-form.types";

interface Props {
  field: BaseField & TextareaField;
  formValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  formValue: "",
});

const emit = defineEmits<{
  "update:formValue": [value: string];
  input: [event: Event];
  change: [event: Event];
}>();

//  отключить автоматическое наследование атрибутов компонентом, то это можно сделать с помощью опции inheritAttrs: false
defineOptions({
  inheritAttrs: false,
});

const formValue = computed({
  get: () => props.formValue,
  set: (value: string) => {
    emit("update:formValue", value);
  },
});
</script>

<template>
  <div class="textarea-wrapper">
    <textarea
      v-bind="$attrs"
      v-model="formValue"
      :name="field.name"
      :id="field.name"
      :required="field.required"
      rows="5"
      cols="22"
      :maxlength="field.maxlength"
    />
  </div>
</template>

<style scoped>
.textarea-wrapper textarea {
  resize: both;
}
</style>
