<template>
  <div class="counter">
    <h1>Counter</h1>
    <p>Counter: {{ counter }}</p>

    <div class="btns flex gap-4 mb-20">
      <button @click="counter++">Increment</button>
      <button @click="counter--">Decrement</button>
    </div>

    <!-- <FormInputTest
    v-model="inputValue"
    name="test"
    id="test"
    label="Тестовое поле"
    input-class="text-red-700"
    long-long-prop="some text"
  />

  <p>Значение поля: {{ inputValue }}</p> -->
    <PersonForm></PersonForm>
  </div>
</template>

<script setup lang="ts">
const counter = ref(0);
// const inputValue = ref("");

// watch(inputValue, (newVal) => {
//   console.log("Значение изменилось:", newVal);
// });
</script>
