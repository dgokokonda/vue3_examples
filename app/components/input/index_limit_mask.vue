<template>
  <div class="input-wrapper">
    <!-- Обычные поля (текст, число и т.д.) -->
    <input
      v-if="field.type !== 'phone'"
      v-bind="$attrs"
      v-model="internalValue"
      :type="inputType"
      :name="field.name"
      :id="field.name"
      :required="field.required"
      @input="handleInput"
      @change="handleChange"
    />

    <!-- Телефонное поле -->
    <ClientOnly v-else>
      <div
        class="phone-input-container"
        :class="{ 'mask-complete': phoneMask.isComplete.value }"
      >
        <input
          ref="phoneInputRef"
          v-bind="$attrs"
          :value="phoneMask.displayValue.value"
          @blur="handleBlur"
          @change="handleChange"
          type="tel"
          :name="field.name"
          :id="field.name"
          :placeholder="field.mask || '+7 (___) ___-__-__'"
          :required="field.required"
        />
        <div
          v-if="phoneMask.isComplete.value"
          class="mask-complete-indicator"
          title="Номер введен полностью"
        >
          ✓
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Field } from "../person-form.types";
import { getInputType, isPhoneField, isNumberField } from "~/utils/fieldGuards";
import { usePhoneMask } from "@/composables/usePhoneMask";

interface Props {
  field: Field;
  formValue: string | number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:formValue": [value: string | number];
  input: [event: Event];
  change: [event: Event];
}>();

defineOptions({
  inheritAttrs: false,
});

// Реф для телефонного инпута
const phoneInputRef = ref<HTMLInputElement>();

// Используем композабл для телефонной маски
const phoneMask = usePhoneMask();

// Вычисляемое свойство для обычных полей
const internalValue = computed({
  get: () => {
    if (props.field.type === "number") {
      return String(props.formValue || "");
    }
    return props.formValue;
  },
  set: (value: string) => {
    let newValue: string | number = value;

    if (props.field.type === "number") {
      // Преобразуем строку в число
      if (value === "" || value === null || value === undefined) {
        newValue = "";
      } else {
        const num = parseFloat(value);
        newValue = isNaN(num) ? "" : num;
      }
    }

    emit("update:formValue", newValue);
  },
});

// Тип инпута
const inputType = computed(() => {
  if (isPhoneField(props.field)) return "tel";
  if (isNumberField(props.field)) return "number";
  return getInputType(props.field);
});

// Обработчики событий для обычных полей
const handleInput = (event: Event) => {
  emit("input", event);
};

const handleChange = (event: Event) => {
  emit("change", event);
};

// Обработчик потери фокуса для телефонного поля
const handleBlur = () => {
  emit("change", new Event("change", { bubbles: true }));
};

// Инициализация телефонной маски
const initPhoneMask = async () => {
  if (!phoneInputRef.value || props.field.type !== "phone") return;

  try {
    // Получаем опции маски из поля
    const maskOptions = {
      mask: (props.field as any).mask || "+{7} (000) 000-00-00",
    };

    // Инициализируем маску
    await phoneMask.init(
      phoneInputRef.value,
      String(props.formValue || ""), // Начальное значение
      maskOptions,
    );

    // Регистрируем обработчик изменения значения
    phoneMask.handleAccept((rawValue, formattedValue) => {
      // Эмитим сырое значение (только цифры)
      emit("update:formValue", rawValue);

      // Также эмитим событие input
      emit("input", new Event("input", { bubbles: true }));
    });
  } catch (error) {
    console.error("Ошибка инициализации телефонной маски:", error);
  }
};

// Обновление телефонного поля при изменении значения извне
watch(
  () => props.formValue,
  (newValue) => {
    if (props.field.type === "phone") {
      phoneMask.update(String(newValue || ""));
    }
  },
  { immediate: true },
);

// Инициализация при монтировании
onMounted(() => {
  if (props.field.type === "phone") {
    nextTick(initPhoneMask);
  }
});

// Также инициализируем при изменении ref
watch(
  () => phoneInputRef.value,
  () => {
    if (phoneInputRef.value && props.field.type === "phone") {
      initPhoneMask();
    }
  },
);

// Очистка при размонтировании
onUnmounted(() => {
  if (props.field.type === "phone") {
    phoneMask.destroy();
  }
});
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
}

/* Контейнер для телефонного поля */
.phone-input-container {
  position: relative;
  width: 100%;
}

.phone-input-container.mask-complete input {
  border-color: #27ae60;
  background-color: #f8fff9;
  padding-right: 30px; /* Для индикатора */
}

.mask-complete-indicator {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #27ae60;
  font-size: 16px;
  font-weight: bold;
  pointer-events: none;
}
</style>
