<template>
  <span :class="['status', className]">{{ text }}</span>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

type StatusType = "active" | "done" | "cancelled" | "pending";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(value: string): boolean {
      return ["active", "done", "cancelled", "pending"].includes(value);
    },
  },
}) as { type: StatusType };

const classesMap: Record<StatusType, string> = {
  active: "primary",
  cancelled: "danger",
  pending: "warning",
  done: "primary",
};

const textMap: Record<StatusType, string> = {
  active: "Активен",
  cancelled: "Отменен",
  done: "Завершен",
  pending: "Выполняется",
};

const className = ref(classesMap[props.type] || classesMap.pending);
const text = ref(textMap[props.type] || textMap.pending);

watch(
  () => props.type,
  (newVal) => {
    className.value = classesMap[newVal];
    text.value = textMap[newVal];
  }
);
</script>
<style>
.status.primary {
  color: blue;
}

.status.danger {
  color: red;
}

.status.warning {
  color: orange;
}
</style>
