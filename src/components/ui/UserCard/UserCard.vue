<template>
  <div>
    <button @click="loadUserData" :disabled="isLoading">
      {{ isLoading ? "Загрузка..." : "Загрузить данные профиля" }}
    </button>
    <AsyncUserProfile v-if="showComponent" />
  </div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  ref,
  h,
  defineComponent,
  type Component,
} from "vue";
import UserAvatar from "./UserAvatar.vue";

const showComponent = ref(false);
const isLoading = ref(false);

const loadUserData = () => {
  isLoading.value = true;
  showComponent.value = true;

  // Сбросим компонент через 3 секунды для демонстрации (увеличил время, чтобы увидеть компонент)
  // setTimeout(() => {
  //   showComponent.value = false
  //   isLoading.value = false
  // }, 3000)
};

// const LoadingSpinner: Component = {
//   template: `
//     <div class="loader-container">
//       <div class="spinner"></div>
//       <p>Загружаем профиль пользователя...</p>
//     </div>
//   `
// }

// const ErrorDisplay: Component = {
//   props: {
//     error: {
//       type: Error,
//       default: null
//     }
//   },
//   emits: ['retry'],
//   template: `
//     <div class="error-container">
//       <div class="error-icon">⚠️</div>
//       <h3>Ошибка загрузки</h3>
//       <p>{{ error?.message || 'Неизвестная ошибка' }}</p>
//       <button @click="$emit('retry')">Повторить попытку</button>
//     </div>
//   `
// }

// Типизация для данных пользователя
interface UserData {
  name: string;
  email: string;
  role: string;
  avatar: string;
  isActive: boolean;
  joinDate: string;
}

// имитация запроса с правильной типизацией
const mockFetchUserData = (): Promise<UserData> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.7) {
        reject(new Error("Сервер не отвечает, Код ошибки - 500"));
        return;
      }

      resolve({
        name: "Александр Петров",
        email: "alex.petrov@example.com",
        role: "Разработчик",
        avatar: "https://i.pravatar.cc/150?img=1",
        isActive: true,
        joinDate: "2022-01-15",
      });
    }, 2000);
  });

const AsyncUserProfile = defineAsyncComponent({
  // функция загрузчика с моковым запросом
  loader: async (): Promise<Component> => {
    // Явно указываем тип возвращаемого значения
    try {
      const data = await mockFetchUserData();

      // Создаем компонент с замыканием на данные
      const userProfileComponent = defineComponent({
        name: "UserProfile",
        setup() {
          console.log("UserProfile setup called");
          return () =>
            h("div", { class: "profile-card" }, [
              h(UserAvatar, {
                avatar: data.avatar,
                onLoad: () => console.log("Изображение загружено"),
              }),
              h("h2", data.name),
              h("p", [h("strong", "Email: "), data.email]),
              h("p", [h("strong", "Роль: "), data.role]),
              h("p", [
                h("strong", "Статус: "),
                data.isActive ? "Активен" : "Неактивен",
              ]),
              h("p", [h("strong", "Дата регистрации: "), data.joinDate]),
            ]);
        },
      });
      console.log("Данные загружены:", data, userProfileComponent);

      return userProfileComponent;
    } catch (error) {
      console.error("Ошибка в loader:", error);
      throw error; // Пробрасываем ошибку для обработки в errorComponent
    } finally {
      isLoading.value = false;
    }
  },

  loadingComponent: defineComponent({
    name: "LoadingSpinner",
    setup() {
      return () =>
        h("div", { class: "loader-container" }, [
          h("div", { class: "spinner" }),
          h("p", "Загружаем профиль пользователя..."),
        ]);
    },
  }),
  delay: 300,
  errorComponent: defineComponent({
    name: "ErrorDisplay",
    props: {
      error: {
        type: Error,
        default: null,
      },
    },
    emits: ["retry"],
    setup({ error }, { emit }) {
      const handleRetry = () => {
        emit("retry");
      };

      return () =>
        h("div", { class: "error-container" }, [
          h("div", { class: "error-icon" }, "⚠️"),
          h("h3", "Ошибка загрузки"),
          h("p", error?.message || "Неизвестная ошибка"),
          h(
            "button",
            {
              onClick: handleRetry,
              type: "button",
            },
            "Повторить попытку"
          ),
        ]);
    },
  }),

  timeout: 5000, // после 5 секунд покажет ошибку
  suspensible: false, // Отключаем Suspense, если используем его где-то еще

  onError: (
    error: Error,
    retry: () => void,
    fail: () => void,
    attempts: number
  ) => {
    console.error("Ошибка загрузки компонента:", error);
    console.log(`Попытка: ${attempts}`);

    // Автоматический retry при ошибке (можно настроить логику)
    if (attempts < 3) {
      console.log("Повторная попытка...");
      setTimeout(retry, 1000);
    } else {
      fail();
    }
  },
});
</script>

<style>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loader-container {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error-container {
  margin-top: 20px;
  padding: 20px;
  text-align: center;
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  background-color: #fff5f5;
}

.error-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.profile-card {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-card h2 {
  margin-top: 0;
  color: #333;
}

.profile-card p {
  margin: 8px 0;
  color: #555;
}
</style>
