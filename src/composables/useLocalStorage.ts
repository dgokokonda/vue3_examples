import { ref, watch, type Ref } from "vue";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | Ref<T>
): Ref<T> {
  // Получаем начальное значение
  const initialValue = (() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  })();

  const data = ref(initialValue) as Ref<T>;

  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Ошибка записи в localStorage "${key}":`, error);
      }
    },
    { deep: true }
  );

  return data;
}

// Использование:
// const todos = useLocalStorage<Todo[]>("todos", [
//   { id: 1, text: "Изучить Vue 3", completed: false, createdAt: new Date() },
//   {
//     id: 2,
//     text: "Написать композабль",
//     completed: true,
//     createdAt: new Date(),
//   },
// ]);
