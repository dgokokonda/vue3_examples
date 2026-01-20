<template>
  <div class="select-wrapper">
    <select
      v-bind="$attrs"
      :name="field.name"
      :id="field.name"
      v-model="formValue"
      :multiple="isMultiple"
      :required="field.required"
      @change="handleChange"
    >
      <option v-for="opt in fieldOptions" :key="opt.id" :value="opt.id">
        {{ opt.name }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import type { Field } from "../person-form.types";
import { isMultiEnumField, hasOptions } from "~/utils/fieldGuards";

interface Props {
  field: Field;
  formValue: string | Array<{ id: string; name: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  formValue: "",
});

const emit = defineEmits<{
  "update:formValue": [value: string | Array<{ id: string; name: string }>];
  change: [event: Event];
}>();

//  отключить автоматическое наследование атрибутов компонентом, то это можно сделать с помощью опции inheritAttrs: false
defineOptions({
  inheritAttrs: false,
});

const getOption = (key: string) => {
  const options = fieldOptions.value;
  if (!options) return;
  return options.find(({ id }) => id === key);
};

const formValue = computed({
  get: () => {
    if (props.field.type === "multienum" && Array.isArray(props.formValue)) {
      const value: Array<{ id: string; name: string }> = props.formValue;
      return value.length
        ? value.map((item: { id: string; name: string }) => item.id)
        : [];
    }

    return props.formValue as string;
  },
  set: (value: string | Array<string>) => {
    if (props.field.type === "multienum" && Array.isArray(value)) {
      const newValue = value.map((val: string) => getOption(val));
      emit("update:formValue", newValue);
    } else {
      emit("update:formValue", value as string);
    }
  },
});

const fieldOptions = computed(() => {
  const options = hasOptions(props.field) && props.field.options;
  if (!options) return;

  if (Array.isArray(options)) {
    return options.length ? options : [];
  } else {
    return Object.keys(options).map((key) => ({
      id: key,
      name: options[key],
    }));
  }
});

const isMultiple = computed(() => isMultiEnumField(props.field));

function handleChange(event: Event) {
  // console.log(event, formValue.value);
}
</script>
