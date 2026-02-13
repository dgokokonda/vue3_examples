<script setup lang="ts">
import { type RouteLocationRaw, useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const { to } = defineProps<{
  to: RouteLocationRaw
}>()

const router = useRouter()
const onClick = () => {
  router.push(to)
}
</script>

<template>
  <BaseButton size="small" @click="onClick">
    <slot />
  </BaseButton>
</template>
