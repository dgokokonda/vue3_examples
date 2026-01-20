<script setup lang="ts">
import type { Field } from "../person-form.types";
import { getInputType } from "~/utils/fieldGuards";

interface Props {
  field: Field;
  formValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  formValue: "",
});

const emit = defineEmits<{
  "update:formValue": [value: string | number];
  input: [event: Event];
  change: [event: Event];
}>();

//  отключить автоматическое наследование атрибутов компонентом, то это можно сделать с помощью опции inheritAttrs: false
defineOptions({
  inheritAttrs: false,
});

const formValue = computed({
  get: () =>
    props.field.type === "number"
      ? String(props.formValue || "")
      : props.formValue,
  set: (value: string) => {
    let newValue: string | number = value;

    if (props.field.type === "number") {
      newValue = +value;
    }
    emit("update:formValue", newValue);
  },
});

const inputType = computed(() => {
  // Используем type guard для безопасной проверки
  if (isPhoneField(props.field)) return "tel";
  if (isNumberField(props.field)) return "number";
  return getInputType(props.field); // Функция из fieldGuards
});

// валидация по min свойству*
</script>

<template>
  <div class="input-wrapper">
    <input
      v-if="field.type !== 'phone'"
      v-bind="$attrs"
      v-model="formValue"
      :type="inputType"
      :name="field.name"
      :id="field.name"
      :required="field.required"
    />
    <!-- ❌ v-imask может не работать на сервере -->
    <ClientOnly v-else>
      <input
        v-bind="$attrs"
        v-model="formValue"
        v-imask="field.mask"
        :type="inputType"
        :name="field.name"
        :id="field.name"
        :placeholder="field.mask"
        :required="field.required"
      />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
