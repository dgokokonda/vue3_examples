<template>
  <div class="field" :key="`field_${field.id}`">
    <component
      :is="getComponent()"
      :id="field.name"
      :field="field"
      :form-value="formattedValue"
      @update:formValue="handleUpdate"
    />
  </div>
</template>
<script setup lang="ts">
import type { Field } from "../person-form.types";
import {
  hasType,
  isSelectType,
  isCheckboxField,
  isRadioField,
  isTextareaField,
} from "~/utils/fieldGuards";
import Input from "../input/index.vue";
import Select from "../select/index.vue";
import Textarea from "../textarea/index.vue";
import CheckboxGroup from "../checkbox/index.vue";
import RadioGroup from "../radio/index.vue";

interface Props {
  field: Field;
  formValue: any;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  "update:value": [value: any];
}>();

const form = reactive({});
// Проверки с type guards
const hasTypeField = computed(() => hasType(props.field));

// Определяем компонент
const getComponent = () => {
  if (!hasTypeField.value) return Input;

  if (isSelectType(props.field)) return Select;
  if (isCheckboxField(props.field)) return CheckboxGroup;
  if (isRadioField(props.field)) return RadioGroup;
  if (isTextareaField(props.field)) return Textarea;
  return Input;
};

const handleUpdate = (value: any) => {
  emit("update:value", { value, field: props.field });
};

const formattedValue = computed(() =>
  getComponent() === Input ? String(props.formValue) : props.formValue,
);

// const selectType = computed(() => {
//   const field = props.field as any; // Временное решение
//   return field?.type && field?.options;
// });
</script>
