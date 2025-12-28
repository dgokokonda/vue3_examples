<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [event: Event];
  change: [event: Event];
}>();

//  отключить автоматическое наследование атрибутов компонентом, то это можно сделать с помощью опции inheritAttrs: false
// Объект $attrs включает все атрибуты, которые не объявлены в props или emits (например, class, style, v-on слушатели и т.д.).
// с inheritAttrs: false и v-bind="$attrs" компонент наследует атрибуты, но вы сами решаете, куда именно их применить
defineOptions({
  inheritAttrs: false,
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit("update:modelValue", value);
  },
});

function handleInput(event: Event) {
  emit("input", event);
}

function handleChange(event: Event) {
  emit("change", event);
}
</script>

<template>
  <div class="input-wrapper">
    <input
      v-bind="$attrs"
      type="text"
      :name="name"
      :id="name"
      v-model="inputValue"
      @input="handleInput"
      @change="handleChange"
    />
    <p v-html="modelValue"></p>
  </div>
</template>

<style scoped></style>
