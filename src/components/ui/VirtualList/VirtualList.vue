<template>
  <div class="virtual-list-container">
    <h2>Список пользователей (виртуализированный)</h2>

    <div class="controls">
      <input
        v-model="searchQuery"
        placeholder="Поиск пользователей..."
        class="search-input"
      />
      <div class="stats">
        Всего пользователей: {{ filteredItems.length }} | Отображено:
        {{ visibleItems.length }}
      </div>
    </div>

    <!-- Vue Virtual Scroller -->
    <RecycleScroller
      v-if="filteredItems.length > 0"
      ref="scroller"
      class="scroller"
      :items="filteredItems"
      :item-size="itemHeight"
      :buffer="buffer"
      key-field="id"
      @resize="onResize"
      @visible="onVisible"
    >
      <template #default="{ item, index, active }">
        <VirtualListItem
          :item="item"
          :index="index"
          :active="active"
          @select="handleSelect"
        />
      </template>

      <template #before>
        <div v-if="loading" class="loading-indicator">Загрузка...</div>
      </template>

      <template #after>
        <div v-if="hasMore" class="load-more">
          <button @click="loadMore" :disabled="loadingMore">
            {{ loadingMore ? "Загрузка..." : "Загрузить еще" }}
          </button>
        </div>
      </template>
    </RecycleScroller>

    <div v-else class="empty-state">Нет данных для отображения</div>

    <!-- Детали выбранного элемента -->
    <UserDetailsModal
      v-if="selectedUser"
      :user="selectedUser"
      @close="selectedUser = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import VirtualListItem from "./VirtualListItem.vue";
import UserDetailsModal from "./UserDetailsModal.vue";
import type { User } from "@/types/user";

// Типы
interface ListItem extends User {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  lastActive: string;
  [key: string]: any;
}

// Props
interface Props {
  initialItems?: ListItem[];
  pageSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialItems: () => [],
  pageSize: 50,
});

// Emits
const emit = defineEmits<{
  loadMore: [page: number];
  select: [item: ListItem];
  scroll: [event: Event];
}>();

// Реактивные данные
const scroller = ref<InstanceType<typeof RecycleScroller>>();
const loading = ref(false);
const loadingMore = ref(false);
const searchQuery = ref("");
const selectedUser = ref<ListItem | null>(null);
const viewportWidth = ref(window.innerWidth);
const hasMore = ref(true);
const currentPage = ref(1);
const itemCounter = ref(0); // Счетчик для генерации уникальных ID
const visibleRange = ref({ start: 0, end: 0 }); // Отслеживание видимых элементов

// Конфигурация
const itemHeight = 72; // Высота одного элемента в пикселях
const buffer = 200; // Буфер для предзагрузки элементов
const totalItems = 1000; // Общее количество элементов (для пагинации)

// Генерация тестовых данных (теперь это отдельная функция)
function generateMockData(count: number, startId = 1): ListItem[] {
  const departments = ["Разработка", "Маркетинг", "Продажи", "Поддержка", "HR"];
  const roles = [
    "Администратор",
    "Разработчик",
    "Менеджер",
    "Дизайнер",
    "Аналитик",
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    return {
      id,
      name: `Пользователь ${id}`,
      email: `user${id}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${id % 70}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      lastActive: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("ru-RU"),
      status: Math.random() > 0.5 ? "active" : "inactive",
      phone: `+7 ${Math.floor(9000000000 + Math.random() * 1000000000)}`,
      address: `г. Москва, ул. Примерная, д. ${Math.floor(Math.random() * 100)}`,
    };
  });
}

// Исходные данные - теперь инициализируем после объявления функции
const allItems = ref<ListItem[]>([
  ...props.initialItems,
  ...generateMockData(100), // Генерация тестовых данных
]);

// Обновляем счетчик
itemCounter.value = allItems.value.length;

// Отфильтрованные элементы
const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) {
    return allItems.value;
  }

  const query = searchQuery.value.toLowerCase();
  return allItems.value.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.department.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query)
  );
});

// Видимые элементы (для статистики)
const visibleItems = computed(() => {
  if (!visibleRange.value || filteredItems.value.length === 0) return [];
  const { start, end } = visibleRange.value;
  return filteredItems.value.slice(start, end + 1);
});

// Методы
const handleSelect = (item: ListItem) => {
  selectedUser.value = item;
  emit("select", item);
};

const loadMore = async () => {
  if (loadingMore.value || !hasMore.value) return;

  loadingMore.value = true;

  try {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Генерируем новые данные с учетом текущего количества
    const newItems = generateMockData(props.pageSize, itemCounter.value + 1);
    allItems.value.push(...newItems);

    // Обновляем счетчик
    itemCounter.value += newItems.length;
    currentPage.value++;
    hasMore.value = allItems.value.length < totalItems;

    emit("loadMore", currentPage.value);
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  } finally {
    loadingMore.value = false;
  }
};

const onResize = (size?: { width?: number; height?: number }) => {
  if (size && size.width !== undefined) {
    viewportWidth.value = size.width;
    console.log("Viewport изменился:", size);
  }
};

const onVisible = (range: { start: number; end: number }) => {
  // Сохраняем диапазон видимых элементов
  visibleRange.value = range;

  // Автоподгрузка при прокрутке вниз
  const threshold = filteredItems.value.length - 20;
  if (range.end >= threshold && hasMore.value && !loadingMore.value) {
    loadMore();
  }
};

const scrollToIndex = (index: number) => {
  if (
    scroller.value &&
    typeof (scroller.value as any).scrollToItem === "function"
  ) {
    (scroller.value as any).scrollToItem(index);
  }
};

const scrollToTop = () => {
  if (
    scroller.value &&
    typeof (scroller.value as any).scrollToPosition === "function"
  ) {
    (scroller.value as any).scrollToPosition(0);
  } else if (
    scroller.value &&
    typeof (scroller.value as any).scrollTo === "function"
  ) {
    (scroller.value as any).scrollTo({ top: 0 });
  }
};

// Жизненный цикл
onMounted(() => {
  console.log("VirtualList mounted");
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

function handleResize() {
  // Можно обновить конфигурацию при изменении размера окна
}

// Экспорт методов для родительского компонента
defineExpose({
  scrollToIndex,
  scrollToTop,
  refresh: () => {
    // Сбрасываем счетчик и генерируем новые данные
    itemCounter.value = 0;
    allItems.value = generateMockData(100);
    itemCounter.value = allItems.value.length;
    currentPage.value = 1;
    hasMore.value = true;
  },
  addItem: (item: Omit<ListItem, "id">) => {
    const newItem = {
      ...item,
      id: ++itemCounter.value,
    };
    allItems.value.unshift(newItem);
    return newItem;
  },
});
</script>

<style scoped>
.virtual-list-container {
  width: 100%;
  height: 80vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 300px;
  padding: 10px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #4a90e2;
}

.stats {
  color: #666;
  font-size: 14px;
  white-space: nowrap;
}

.scroller {
  height: calc(80vh - 160px);
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  overflow: auto;
}

.empty-state {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 18px;
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
}

.loading-indicator {
  padding: 20px;
  text-align: center;
  color: #4a90e2;
  font-weight: 500;
}

.load-more {
  padding: 20px;
  text-align: center;
}

.load-more button {
  padding: 10px 24px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.load-more button:hover:not(:disabled) {
  background: #3a7bc8;
}

.load-more button:disabled {
  background: #a0c1e8;
  cursor: not-allowed;
}

/* Адаптивность */
@media (max-width: 768px) {
  .virtual-list-container {
    height: 70vh;
    padding: 15px;
  }

  .scroller {
    height: calc(70vh - 140px);
  }

  .search-input {
    min-width: 100%;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
