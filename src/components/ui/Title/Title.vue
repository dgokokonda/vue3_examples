<script lang="ts" setup>
const title = defineModel("title", {
  type: String,
  required: true,
  default: "",
});
</script>
<template>
  <div class="title">
    <h1>{{ title }}</h1>
    <input v-uppercase type="text" v-model="title" />
  </div>
</template>
