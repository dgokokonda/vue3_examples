<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name?: string;
  label?: string;
  modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  change: [event: Event];
}>();

const checked = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

function handleChange(event: Event) {
  emit("change", event);
}
</script>
<template>
  <label v-if="label" :for="name">{{ label }}</label>
  <input
    :name="name"
    :id="name"
    type="checkbox"
    v-bind="$attrs"
    v-model="checked"
    @change="handleChange"
    class="checkbox"
  />
  <p class="checkbox-value">Checked: {{ checked ? "Yes" : "No" }}</p>
</template>
<style scoped>
.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
