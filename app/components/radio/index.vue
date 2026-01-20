<script setup lang="ts">
import type { BaseField, RadioField } from "../person-form.types";

interface Props {
  field: BaseField & RadioField;
  formValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:formValue": [value: string];
  change: [event: Event];
}>();

//  отключить автоматическое наследование атрибутов компонентом, то это можно сделать с помощью опции inheritAttrs: false
defineOptions({
  inheritAttrs: false,
});

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:formValue", target.id);
};
</script>

<template>
  <div class="radio-wrapper">
    <div
      v-for="item in field.options"
      :key="item"
      class="radio-item flex gap-5"
    >
      <label :for="field.name">{{ item }}</label>
      <input
        v-bind="$attrs"
        :value="formValue"
        type="radio"
        :name="field.name"
        :id="item"
        :required="field.required"
        :checked="item === formValue"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
