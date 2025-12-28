<template>
  <div>
    <h1>Отладка реактивности</h1>

    <div class="controls">
      <button @click="incrementCounter">
        Увеличить счетчик: {{ counter }}
      </button>
      <button @click="toggleUser">Переключить пользователя</button>
      <button @click="addItem">
        Добавить элемент в список ({{ items.length }})
      </button>
      <button @click="resetTracking">Сбросить логи</button>
    </div>

    <!-- Компоненты для отслеживания -->
    <TrackedComponent :counter="counter" :user="user" :items="items" />

    <ComputedComponent :items="items" />

    <!-- Логи рендеринга -->
    <div class="debug-panels">
      <div class="panel">
        <h3>onRenderTracked (зависимости)</h3>
        <div v-if="trackedLogs.length === 0" class="empty">Нет данных</div>
        <ul>
          <li
            v-for="(log, index) in trackedLogs.slice().reverse()"
            :key="index"
          >
            <strong>{{ log.component }}</strong>
            <div>
              Свойство: <code>{{ log.key }}</code>
            </div>
            <div>
              Тип: <span class="tag">{{ log.type }}</span>
            </div>
            <div>Время: {{ log.timestamp.toLocaleTimeString() }}</div>
          </li>
        </ul>
      </div>

      <div class="panel">
        <h3>onRenderTriggered (изменения)</h3>
        <div v-if="triggeredLogs.length === 0" class="empty">Нет данных</div>
        <ul>
          <li
            v-for="(log, index) in triggeredLogs.slice().reverse()"
            :key="index"
          >
            <strong>{{ log.component }}</strong>
            <div>
              Свойство: <code>{{ log.key }}</code>
            </div>
            <div>
              Тип: <span class="tag">{{ log.type }}</span>
            </div>
            <div>
              Старое: <code>{{ log.oldValue }}</code>
            </div>
            <div>
              Новое: <code>{{ log.newValue }}</code>
            </div>
            <div>Источник: {{ log.source }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onRenderTracked,
  onRenderTriggered,
  defineComponent,
  type DebuggerEvent,
  h, // Добавляем h функцию
} from "vue";

// Типы для логов
interface RenderLog {
  component: string;
  key: string;
  type: string;
  timestamp: Date;
  source?: string;
  oldValue?: any;
  newValue?: any;
}

// Реактивные данные
const counter = ref(0);
const user = ref({ name: "Иван", age: 25 });
const items = ref<string[]>(["Элемент 1", "Элемент 2"]);

// Логи
const trackedLogs = ref<RenderLog[]>([]);
const triggeredLogs = ref<RenderLog[]>([]);

// Компонент с отслеживанием
const TrackedComponent = defineComponent({
  name: "TrackedComponent",
  props: {
    counter: Number,
    user: Object,
    items: Array,
  },

  setup(props) {
    // Локальные вычисляемые свойства
    const userInfo = computed(
      () => `${props.user?.name} (${props.user?.age} лет)`
    );

    const itemsCount = computed(() => props.items?.length || 0);

    // Отслеживание зависимостей
    onRenderTracked((event: DebuggerEvent) => {
      console.log("TrackedComponent tracked:", event);

      trackedLogs.value.push({
        component: "TrackedComponent",
        key: String(event.key),
        type: event.type,
        timestamp: new Date(),
      });

      // Ограничиваем размер логов
      if (trackedLogs.value.length > 50) {
        trackedLogs.value.shift();
      }
    });

    // Отслеживание триггеров изменений
    onRenderTriggered((event: DebuggerEvent) => {
      console.log("TrackedComponent triggered:", event);

      triggeredLogs.value.push({
        component: "TrackedComponent",
        key: String(event.key),
        type: event.type,
        timestamp: new Date(),
        oldValue: event.oldValue,
        newValue: event.newValue,
        source: event.target?.toString(),
      });

      if (triggeredLogs.value.length > 50) {
        triggeredLogs.value.shift();
      }
    });

    return () =>
      h(
        "div",
        {
          style: {
            border: "1px solid #4CAF50",
            padding: "20px",
            margin: "20px 0",
          },
        },
        [
          h("h3", { style: { color: "#4CAF50" } }, "TrackedComponent"),
          h("p", `Счетчик: ${props.counter}`),
          h("p", `Пользователь: ${userInfo.value}`),
          h("p", `Элементов: ${itemsCount.value}`),
        ]
      );
  },
});

// Второй компонент с вычисляемыми свойствами
const ComputedComponent = defineComponent({
  name: "ComputedComponent",
  props: {
    items: Array,
  },

  setup(props) {
    const expensiveComputation = computed(() => {
      // Имитация тяжелой операции
      return props.items
        ? `Суммарная длина: ${props.items.join("").length} символов`
        : "Нет данных";
    });

    onRenderTracked((event) => {
      trackedLogs.value.push({
        component: "ComputedComponent",
        key: String(event.key),
        type: event.type,
        timestamp: new Date(),
      });
    });

    onRenderTriggered((event) => {
      triggeredLogs.value.push({
        component: "ComputedComponent",
        key: String(event.key),
        type: event.type,
        timestamp: new Date(),
        oldValue: event.oldValue,
        newValue: event.newValue,
      });
    });

    return () =>
      h(
        "div",
        {
          style: {
            border: "1px solid #2196F3",
            padding: "20px",
            margin: "20px 0",
          },
        },
        [
          h("h3", { style: { color: "#2196F3" } }, "ComputedComponent"),
          h("p", expensiveComputation.value),
        ]
      );
  },
});

// Методы
const incrementCounter = () => {
  counter.value++;
};

const toggleUser = () => {
  user.value =
    user.value.name === "Иван"
      ? { name: "Мария", age: 30 }
      : { name: "Иван", age: 25 };
};

const addItem = () => {
  items.value.push(`Элемент ${items.value.length + 1}`);
};

const resetTracking = () => {
  trackedLogs.value = [];
  triggeredLogs.value = [];
};

// Также можно отслеживать в корневом компоненте
onRenderTracked((event) => {
  console.log("Root component tracked:", event);
});

onRenderTriggered((event) => {
  console.log("Root component triggered:", event);
});
</script>

<style scoped>
.controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.controls button {
  padding: 10px 15px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background: #1976d2;
}

.debug-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
}

.panel {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
  background: #f9f9f9;
}

.panel h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 8px;
}

.panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.panel li {
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 12px;
}

.panel li strong {
  color: #2196f3;
  display: block;
  margin-bottom: 5px;
}

.panel code {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

.tag {
  display: inline-block;
  padding: 2px 6px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 3px;
  font-size: 11px;
  font-weight: bold;
}

.empty {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 30px;
}
</style>
