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
const props = defineProps({
  title: { type: String, required: true },
});
document.title = props.title + " | Клон банка";
</script>
