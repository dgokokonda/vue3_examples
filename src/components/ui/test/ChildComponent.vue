<template>
  <div>
    <p>{{ props.message }}</p>
    <p>Count: {{ count }}</p>
    <button @click="incrementValue">Increment</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{ message: string }>();
const emit = defineEmits<{
  (e: "increment", value: number): void;
}>();

const count = ref<number>(0);

const incrementValue = () => {
  count.value++;
  emit("increment", count.value);
};

// return {
//   count,
//   increment,
// };
</script>
