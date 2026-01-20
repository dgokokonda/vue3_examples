<template>
  <form @submit="submit">
    <p>{{ formName }}</p>
    <div class="fields">
      <div v-for="field in fields" :key="field.id" class="field-item mb-4">
        <label :for="field.name">{{ field.label }}</label>
        <field
          :field="field"
          :form-value="form[field.name]"
          @update:value="(event) => setValue(event.value, event.field)"
        ></field>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { Field, FieldItem } from "../person-form.types";
import {
  isMultiSelect,
  isNumberField,
  isCheckboxField,
  hasValue,
} from "~/utils/fieldGuards";
interface Props {
  fields: FieldItem[];
  formName: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  // 'submit':
}>();
const form = reactive<any>({});
const fieldDefaults = computed(() => {
  const defaults: Record<string, any> = {};

  props.fields.forEach((field) => {
    const fieldName = (field as Field).name;

    if (isMultiSelect(field) || isCheckboxField(field)) {
      defaults[fieldName] = [];
    } else if (isNumberField(field)) {
      defaults[fieldName] = 0;
    } else {
      defaults[fieldName] = "";
    }
  });

  return defaults;
});
const submit = () => {};
const setValue = (val: any, field: Field) => {
  const fieldName = field.name;
  if (fieldName) {
    form[fieldName] = hasValue(field) ? val : fieldDefaults.value[fieldName];
  }
};

// pre-render
props.fields.forEach((field: Field) => {
  setValue(field.value, field);
});

// with async fetch data
// onMounted(() => {
//   props.fields.forEach((field: Field) => {
//     setValue(field.value, field);
//   });
// });
</script>
