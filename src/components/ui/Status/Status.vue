<template>
  <span :class="['status', className]">{{ text }}</span>
</template>
<script setup lang="ts">
import { computed } from "vue";

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

const className = computed(() => classesMap[props.type] || classesMap.pending);
const text = computed(() => textMap[props.type] || textMap.pending);
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
