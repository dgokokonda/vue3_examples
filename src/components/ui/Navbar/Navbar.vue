<template>
  <nav class="navbar">
    <h3>Навигация сайта</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>
      <li>
        <router-link to="/help">Помощь</router-link>
      </li>
      <li>
        <router-link to="/list">Виртуализированный список</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="openSidebar">Сообщения</a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { useAuthStore, useAppStore } from "@/stores";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const appStore = useAppStore();

    return {
      logout: async () => {
        await authStore.logout();
        router.push("/auth");
      },
      openSidebar: () => appStore.openSidebar(),
    };
  },
};
</script>
<style>
.navbar {
}
.navbar .exact-active {
  color: green;
}
</style>
