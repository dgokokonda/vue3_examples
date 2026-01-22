<script setup lang="ts">
import type { BaseField, DateField } from "../person-form.types";

interface Props {
  field: BaseField & DateField;
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

const formValue = computed({
  get: () => props.formValue, //String(props.formValue || ""),
  set: (value: string) => {
    emit("update:formValue", value);
  },
});

const dateObject = computed(() =>
  props.formValue ? new Date(props.formValue) : null,
);

const formattedDate = computed(
  () => dateObject.value?.toLocaleDateString("ru-RU") || "",
);
</script>

<template>
  <div class="datepicker-wrapper">
    <input
      v-bind="$attrs"
      v-model="formValue"
      type="date"
      :name="field.name"
      :id="field.name"
      :required="field.required"
      :min="field.min"
      :max="field.max"
    />
  </div>
</template>

<style scoped></style>
