<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import MainLayout from "./components/layout/MainLayout.vue";
import AuthLayout from "./components/layout/AuthLayout.vue";

const route = useRoute();
const layoutComponents = {
  main: MainLayout,
  auth: AuthLayout,
} as const;

const layout = computed(() => {
  const layoutName = route.meta.layout as keyof typeof layoutComponents;
  return layoutComponents[layoutName] || null;
});
// import Button from "./components/ui/Button/Button.vue";
// import Input from "./components/ui/Input";
// import Checkbox from "./components/ui/Checkbox";

// const inputValue = ref("Ann");
// const checkboxValue = ref(false);
// function onButtonClick() {
//   console.log("click2");
// }
</script>

<template>
  <!-- <h1>Главная страница</h1> -->
  <!-- <Button @click="onButtonClick">Click me</Button>
  <Input name="name" v-model="inputValue"></Input>
  <Checkbox name="checkbox" label="Checkbox" v-model="checkboxValue"></Checkbox> -->
  <component v-if="layout" :is="layout"></component>
</template>

<style scoped></style>
