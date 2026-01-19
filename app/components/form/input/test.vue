<template>
  <div>
    <label v-if="id" :for="id">{{ label || id.toUpperCase() }}</label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      :class="inputClass"
    />
    <p>test: {{ longLongProp }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  inputClass?: string;
  longLongProp?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  inputClass: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};
</script>
