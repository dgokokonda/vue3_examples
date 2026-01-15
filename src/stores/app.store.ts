import { defineStore } from "pinia";
import { reactive, computed, toRefs } from "vue";
import type { Notification, AppMessage } from "./types/notification";

export const useAppStore = defineStore("app", () => {
  // State
  const state = reactive({
    theme: "light" as "light" | "dark",
    isLoading: false,
    notifications: [] as Notification[],
    message: null as AppMessage | null,
    sidebar: false,
  });
  // const theme = ref<"light" | "dark">("light");
  // const isLoading = ref(false);
  // const notifications = ref<Notification[]>([]);
  let timeoutId: NodeJS.Timeout | null = null;

  // Getters
  const hasNotifications = computed(() => state.notifications.length > 0);
  const unreadCount = computed(
    () => state.notifications.filter((n: Notification) => !n.read).length
  );

  // Actions
  function toggleTheme() {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
  }

  function addNotification(
    message: string,
    type: "info" | "success" | "error"
  ) {
    state.notifications.push({
      id: Date.now(),
      message,
      type,
      read: false,
      timestamp: new Date(),
    });
  }

  function markAsRead(id: number) {
    const notification = state.notifications.find(
      (n: Notification) => n.id === id
    );
    if (notification) {
      notification.read = true;
    }
  }

  function clearAllNotifications() {
    state.notifications = [];
  }

  function setLoading(loading: boolean) {
    state.isLoading = loading;
  }

  function setMessage(message: AppMessage) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    state.message = message;
    timeoutId = setTimeout(() => clearMessage(), 3000);
  }

  function clearMessage() {
    state.message = null;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function openSidebar() {
    state.sidebar = true;
  }

  function closeSidebar() {
    state.sidebar = false;
  }

  return {
    // State
    // theme,
    // isLoading,
    // notifications,
    ...toRefs(state),

    // Getters
    hasNotifications,
    unreadCount,

    // Actions
    toggleTheme,
    addNotification,
    markAsRead,
    clearAllNotifications,
    setLoading,
    setMessage,
    clearMessage,
    openSidebar,
    closeSidebar,
  };
});
