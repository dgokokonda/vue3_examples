<template>
  <div
    class="virtual-list-item"
    :class="{
      'item-active': active,
      'item-selected': isSelected,
      [`item-${item.status}`]: item.status,
    }"
    @click="handleClick"
  >
    <div class="item-avatar">
      <img :src="item.avatar" :alt="item.name" />
    </div>

    <div class="item-content">
      <div class="item-header">
        <h3 class="item-title">{{ item.name }}</h3>
        <span class="item-badge" :class="`badge-${item.role.toLowerCase()}`">
          {{ item.role }}
        </span>
      </div>

      <div class="item-details">
        <div class="item-email">
          <i class="icon">✉️</i>
          {{ item.email }}
        </div>
        <div class="item-department">
          <i class="icon">🏢</i>
          {{ item.department }}
        </div>
        <div class="item-last-active">
          <i class="icon">🕐</i>
          Был(а) {{ item.lastActive }}
        </div>
      </div>
    </div>

    <div class="item-actions">
      <button
        class="action-btn"
        @click.stop="emit('select', item)"
        title="Выбрать"
      >
        👁️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";

interface ListItem {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  lastActive: string;
  status?: "active" | "inactive";
  [key: string]: any;
}

const props = defineProps({
  item: {
    type: Object as PropType<ListItem>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  selectedId: {
    type: [String, Number],
    default: null,
  },
});

const emit = defineEmits<{
  select: [item: ListItem];
  click: [item: ListItem, index: number];
}>();

const isSelected = computed(() => props.selectedId === props.item.id);

const handleClick = () => {
  emit("click", props.item, props.index);
};
</script>

<style scoped>
.virtual-list-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f2f5;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  position: relative;
}

.virtual-list-item:hover {
  background: #f8f9fa;
  transform: translateX(4px);
}

.virtual-list-item.item-active {
  background: #f0f7ff;
  border-left: 4px solid #4a90e2;
}

.virtual-list-item.item-selected {
  background: #e8f4ff;
  box-shadow: inset 0 0 0 2px #4a90e2;
}

.item-avatar {
  flex-shrink: 0;
  margin-right: 16px;
}

.item-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e1e5e9;
}

.item-content {
  flex: 1;
  min-width: 0; /* Для корректного обрезания текста */
}

.item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.item-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-администратор {
  background: #ff6b6b;
  color: white;
}

.badge-разработчик {
  background: #4ecdc4;
  color: white;
}

.badge-менеджер {
  background: #45b7d1;
  color: white;
}

.badge-дизайнер {
  background: #96ceb4;
  color: white;
}

.badge-аналитик {
  background: #feca57;
  color: white;
}

.item-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.item-email,
.item-department,
.item-last-active {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 12px;
  opacity: 0.7;
}

.item-actions {
  flex-shrink: 0;
  margin-left: 16px;
}

.action-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #e1e5e9;
}

/* Статусы */
.item-active {
  border-left: 4px solid #4a90e2;
}

.item-inactive {
  opacity: 0.7;
}

/* Адаптивность */
@media (max-width: 768px) {
  .virtual-list-item {
    padding: 12px 16px;
  }

  .item-details {
    grid-template-columns: 1fr;
  }

  .item-avatar img {
    width: 40px;
    height: 40px;
  }

  .item-title {
    font-size: 14px;
  }
}
</style>
