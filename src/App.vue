<script setup>
import { ref } from "vue";
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
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <RouterLink to="/todolist">Go to TodoList</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
