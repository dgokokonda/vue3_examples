<script setup lang="ts">
import type { BaseField, CheckboxField } from "../person-form.types";

interface Props {
  field: BaseField & CheckboxField;
  formValue: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:formValue": [value: string[]];
  change: [event: Event];
}>();

//  отключить автоматическое наследование атрибутов компонентом, то это можно сделать с помощью опции inheritAttrs: false
defineOptions({
  inheritAttrs: false,
});

const isChecked = (val: string) => {
  if (!props.formValue || !Array.isArray(props.formValue)) {
    return false;
  }
  return props.formValue.includes(val);
};
const handleChange = (e: Event, key: string) => {
  const target = e.target as HTMLInputElement;
  const newValue = [...props.formValue];

  if (target.checked) {
    newValue.push(key);
  } else {
    const keyIndex = newValue.findIndex((k) => k === key);
    newValue.splice(keyIndex, 1);
  }
  emit("update:formValue", newValue);
};
</script>

<template>
  <div class="checkbox-wrapper">
    <div
      v-for="(lbl, key) in field.options"
      :key="key"
      class="checkbox-item flex gap-5"
    >
      <label :for="field.name">{{ lbl }}</label>
      <input
        v-bind="$attrs"
        :value="formValue"
        type="checkbox"
        :name="field.name"
        :id="key"
        :required="field.required"
        :checked="isChecked(key)"
        @change="(e) => handleChange(e, key)"
      />
    </div>
  </div>
</template>

<style scoped></style>
