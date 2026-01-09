<template>
  <div>
    <h1>Мои задачи ({{ activeCount }})</h1>

    <input
      ref="inputRef"
      v-model="newTodoText"
      @keyup.enter="addTodo"
      placeholder="Что нужно сделать?"
    />
    <button @click="addTodo">Добавить</button>

    <div>
      <button @click="setFilter('all')">Все ({{ todos.length }})</button>
      <button @click="setFilter('active')">Активные ({{ activeCount }})</button>
      <button @click="setFilter('completed')">
        Выполненные ({{ completedCount }})
      </button>
      <button @click="clearCompleted" v-if="completedCount > 0">
        Удалить выполненные
      </button>
    </div>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span
          @click.left="editTodoText(todo.id, todo.text)"
          :class="{ completed: todo.completed }"
        >
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo.id)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTodoManager } from "@/composables/useTodoManager";
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

const {
  todos,
  newTodoText,
  // filter,
  filteredTodos,
  activeCount,
  completedCount,
  addTodo,
  removeTodo,
  toggleTodo,
  clearCompleted,
  setFilter,
  editTodoText,
} = useTodoManager(inputRef);
</script>

<style>
.completed {
  text-decoration: line-through;
  color: #888;
}
</style>
