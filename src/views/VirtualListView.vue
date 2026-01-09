<template>
  <div class="virtual-list-page">
    <VirtualList :initial-items="initialUsers" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VirtualList from "@/components/ui/VirtualList/VirtualList.vue";
import type { User } from "@/types/user";

const initialUsers = ref<User[]>([
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    department: "Разработка",
    role: "Разработчик",
    lastActive: "10.12.2023",
    status: "active",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    department: "Маркетинг",
    role: "Менеджер",
    lastActive: "09.12.2023",
    status: "active",
  },
]);
</script>
