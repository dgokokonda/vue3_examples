<template>
  <div class="avatar">
    <img v-bind="$attrs" :src="avatar" alt="Avatar">
  </div>
</template>
<script setup lang="ts">
interface Props {
  avatar: string
}
const { avatar } = defineProps<Props>()
</script>
<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  display: contents;
  position: relative;
}

.avatar img {
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #4CAF50;
}
</style>