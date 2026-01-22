<script setup lang="ts">
import type { BaseField, DateField } from "../person-form.types";
import { format, parseISO, isValid, formatISO, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";

interface Props {
  field: BaseField & DateField;
  formValue: string; // Ожидается ISO строка "YYYY-MM-DD" или "YYYY-MM-DDTHH:mm:ssZ"
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:formValue": [value: string];
  change: [event: Event];
}>();

defineOptions({
  inheritAttrs: false,
});

const inputValue = computed({
  get: () => {
    if (!props.formValue) return "";

    const date = parseISO(props.formValue);
    if (!isValid(date)) return "";
    return format(date, "yyyy-MM-dd");
  },
  set: (value: string) => {
    if (!value) {
      emit("update:formValue", "");
      return;
    }
    const date = startOfDay(new Date(value + "T00:00:00"));
    emit("update:formValue", formatISO(date, { representation: "date" }));
  },
});

const minDate = computed(() => {
  if (!props.field.min) return undefined;

  const date = parseISO(props.field.min + "T00:00:00Z");
  return isValid(date) ? format(date, "yyyy-MM-dd") : undefined;
});

const maxDate = computed(() => {
  if (!props.field.max) return undefined;

  const date = parseISO(props.field.max + "T23:59:59.999Z");
  return isValid(date) ? format(date, "yyyy-MM-dd") : undefined;
});

const displayDate = computed(() => {
  if (!props.formValue) return "";

  const date = parseISO(props.formValue);
  if (!isValid(date)) return "";

  return format(date, "dd.MM.yyyy", { locale: ru });
});

const dateObject = computed(() => {
  if (!props.formValue) return null;

  const date = parseISO(props.formValue);
  return isValid(date) ? date : null;
});
</script>

<template>
  <div class="datepicker-wrapper">
    <input
      v-bind="$attrs"
      v-model="inputValue"
      type="date"
      :name="field.name"
      :id="field.name"
      :required="field.required"
      :min="minDate"
      :max="maxDate"
    />

    <!-- Для отображения форматированной даты -->
    <div v-if="displayDate && inputValue" class="date-display">
      {{ displayDate }}
    </div>
  </div>
</template>
