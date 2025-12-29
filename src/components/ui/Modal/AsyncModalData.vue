<template>
  <div>
    <div class="modal-field" v-for="(field, key) in fields" :key="field.id">
      <strong>User {{ key }}:</strong>
      <div>
        Полное имя: {{ field.fields.firstname }}
        {{ field.fields.lastname }}
      </div>
      <div>Возраст: {{ field.fields.age }} Город: {{ field.fields.city }}</div>
      <div>Должность: {{ field.fields.post }}</div>
      <br />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const fields = ref<any[]>([]);

// Асинхронная инициализация
const loadData = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  fields.value = [
    {
      id: 1,
      fields: {
        firstname: "1",
        lastname: "1",
        age: 12,
        city: "1",
        post: "11",
      },
    },
    {
      id: 2,
      fields: {
        firstname: "2",
        lastname: "2",
        age: 22,
        city: "2",
        post: "22",
      },
    },
    {
      id: 3,
      fields: {
        firstname: "3",
        lastname: "3",
        age: 33,
        city: "3",
        post: "33",
      },
    },
  ];
};

// Вызываем асинхронную функцию - Suspense отследит это
await loadData();
</script>
