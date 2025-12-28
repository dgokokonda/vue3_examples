import {
  ref,
  computed,
  useTemplateRef,
  watchEffect,
  onMounted,
  type Ref,
  nextTick,
} from "vue";
import { type Todo } from "./types/todo";
import { useLocalStorage } from "./useLocalStorage";

export const useTodoManager = (inputRef?: Ref<HTMLInputElement | null>) => {
  const todos = useLocalStorage<Todo[]>("todos", [
    { id: 1, text: "Изучить Vue 3", completed: false, createdAt: new Date() },
    {
      id: 2,
      text: "Написать композабль",
      completed: true,
      createdAt: new Date(),
    },
  ]);
  const newTodoText = ref("");
  const filter = useLocalStorage<"all" | "active" | "completed">(
    "filter",
    ref<"all" | "active" | "completed">("all")
  );
  const editedTodoId = ref<string | number>("");

  const addTodo = () => {
    const text = newTodoText.value.trim();
    if (!text) return;
    if (!editedTodoId.value) {
      const newTodo: Todo = {
        text,
        completed: false,
        createdAt: new Date(),
        id: Date.now(),
      };
      todos.value.unshift(newTodo);
    } else {
      updateTodoText(editedTodoId.value, text);
    }
    newTodoText.value = "";
    editedTodoId.value = "";
  };

  const removeTodo = (id: number | string) => {
    const todoIndex = todos.value.findIndex((t) => t.id === id);
    todos.value.splice(todoIndex, 1);
    newTodoText.value = "";
    editedTodoId.value = "";
  };

  const toggleTodo = (id: number | string) => {
    const index = todos.value.findIndex((t) => t.id === id);
    // реактивное ли это изменение?
    todos.value[index] = {
      ...todos.value[index],
      completed: !todos.value[index].completed,
    };
  };

  const editTodoText = (id: number | string, text: string) => {
    newTodoText.value = text;
    editedTodoId.value = id;

    // Фокус на поле ввода в следующем тике DOM
    nextTick(() => {
      if (inputRef?.value) {
        inputRef.value.focus();
      }
    });
  };

  const updateTodoText = (id: number | string, newText: string) => {
    const index = todos.value.findIndex((t) => t.id === id);
    todos.value[index] = { ...todos.value[index], text: newText };
    // todos.value.splice(index, 1, {
    //   ...todos.value[index],
    //   text: newText
    // })
  };

  const setFilter = (filterType: "all" | "active" | "completed") => {
    filter.value = filterType;
  };

  const clearCompleted = () => {
    todos.value = todos.value.filter(({ completed }) => !completed);
  };

  const activeCount = computed(() => {
    return todos.value.filter(({ completed }) => !completed).length;
  });

  const completedCount = computed(() => {
    return todos.value.filter(({ completed }) => !!completed).length;
  });

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "active":
        return todos.value.filter((todo) => !todo.completed);
      case "completed":
        return todos.value.filter((todo) => todo.completed);
      default:
        return todos.value;
    }
  });

  const clearStorage = () => {
    localStorage.removeItem("todos");
    localStorage.removeItem("filter");
  };

  const exportTodos = () => {
    return JSON.stringify(todos.value, null, 2);
  };

  return {
    todos,
    newTodoText,
    filter,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodoText,
    updateTodoText,
    setFilter,
    clearCompleted,
    activeCount,
    completedCount,
    filteredTodos,
    clearStorage,
    exportTodos,
  };
};
