import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "error";
  read: boolean;
  timestamp: Date;
}

export const useAppStore = defineStore("app", () => {
  // State
  const theme = ref<"light" | "dark">("light");
  const isLoading = ref(false);
  const notifications = ref<Notification[]>([]);

  // Getters
  const hasNotifications = computed(() => notifications.value.length > 0);
  const unreadCount = computed(
    () => notifications.value.filter((n: Notification) => !n.read).length,
  );

  // Actions
  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme.value);
  }

  function addNotification(
    message: string,
    type: "info" | "success" | "error",
  ) {
    notifications.value.push({
      id: Date.now(),
      message,
      type,
      read: false,
      timestamp: new Date(),
    });
  }

  function markAsRead(id: number) {
    const notification = notifications.value.find(
      (n: Notification) => n.id === id,
    );
    if (notification) {
      notification.read = true;
    }
  }

  return {
    // State
    theme,
    isLoading,
    notifications,

    // Getters
    hasNotifications,
    unreadCount,

    // Actions
    toggleTheme,
    addNotification,
    markAsRead,
  };
});
