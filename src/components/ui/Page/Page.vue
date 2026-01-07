<template>
  <div class="card">
    <h1 class="card-title">
      {{ props.title }}
      <slot name="header"></slot>
    </h1>
    <slot />
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: { type: String; required: true };
}
const props = defineProps<Props>();
document.title = props.title + " | Клон банка";
</script>
