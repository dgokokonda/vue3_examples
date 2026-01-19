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
const submit = () => {};
const setValue = (val: any, field: Field) => {
  const defaultValue =
    isMultiSelect(field) || isCheckboxField(field)
      ? []
      : isNumberField(field)
        ? 0
        : "";
  if (field.name) form[field.name] = val || defaultValue;
};

onMounted(() => {
  props.fields.forEach((field: Field) => {
    form[field.name] = field.value;
  });
  console.log(form);
});
</script>
