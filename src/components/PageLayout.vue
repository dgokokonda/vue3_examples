<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue'

  defineProps<{
    title: string;
    isBackButton?: boolean;
  }>();
</script>

<template>
  <div class="page">
    <div class="page-header">
      <BaseButton v-if="isBackButton" size="small" @click="$router.go(-1)">Back</BaseButton>

      <h2>{{ title }}</h2>
    </div>

    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;

  h2 {
    font-weight: bold;
  }

  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    button {
      margin-right: 10px;
    }
  }

  .page-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
