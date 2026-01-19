<script setup lang="ts">
import type { Field } from "../person-form.types";
// import { computed } from "vue";

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
// Объект $attrs включает все атрибуты, которые не объявлены в props или emits (например, class, style, v-on слушатели и т.д.).
// с inheritAttrs: false и v-bind="$attrs" компонент наследует атрибуты, но вы сами решаете, куда именно их применить
defineOptions({
  inheritAttrs: false,
});

const formValue = computed({
  get: () => props.formValue,
  set: (value: string) => {
    emit("update:formValue", value);
  },
});

const inputType = computed(() =>
  props.field.type !== "number" ? "text" : props.field.type,
);

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emit("update:formValue", props.field.type === "number" ? +value : value);
}

// валидация по min свойству*
</script>

<template>
  <div class="input-wrapper">
    <input
      v-if="field.type !== 'phone'"
      v-bind="$attrs"
      :value="formValue"
      :type="inputType"
      :name="field.name"
      :id="field.name"
      @input="handleInput"
    />
    <ClientOnly v-else>
      <input
        v-bind="$attrs"
        :value="formValue"
        v-imask="field.mask"
        :type="inputType"
        :name="field.name"
        :id="field.name"
        :placeholder="field.mask"
        @input="handleInput"
      />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
