// composables/usePhoneMask.ts
import { ref, onUnmounted, watch, nextTick, type Ref } from "vue";

export interface PhoneMaskOptions {
  mask?: string;
  placeholderChar?: string;
  lazy?: boolean;
  overwrite?: boolean | "shift";
  autofix?: boolean;
}

export interface UsePhoneMaskReturn {
  // Реактивные значения
  displayValue: Ref<string>;
  isComplete: Ref<boolean>;

  // Методы
  init: (
    element: HTMLInputElement,
    initialValue?: string,
    options?: PhoneMaskOptions,
  ) => Promise<void>;
  update: (value: string) => void;
  getRawValue: () => string;
  destroy: () => void;

  // Для интеграции с событиями
  handleAccept: (
    callback: (rawValue: string, formattedValue: string) => void,
  ) => void;
}

/**
 * Композабл для работы с маской телефона через imask
 */
export const usePhoneMask = (): UsePhoneMaskReturn => {
  const maskInstance = ref<any>(null);
  const displayValue = ref<string>("");
  const isComplete = ref<boolean>(false);
  const isInitialized = ref<boolean>(false);
  const acceptCallbacks = ref<
    Array<(rawValue: string, formattedValue: string) => void>
  >([]);

  /**
   * Инициализация маски на элементе input
   */
  const init = async (
    element: HTMLInputElement,
    initialValue: string = "",
    options: PhoneMaskOptions = {},
  ): Promise<void> => {
    if (isInitialized.value) return;

    try {
      // Динамический импорт imask
      const IMask = (await import("imask")).default;

      // Конфигурация маски
      const maskOptions = {
        mask: options.mask || "+{7} (000) 000-00-00",
        lazy: options.lazy ?? false,
        placeholderChar: options.placeholderChar ?? "_",
        overwrite: options.overwrite ?? "shift",
        autofix: options.autofix ?? true,
        ...options,
      };

      // Создание экземпляра маски
      maskInstance.value = IMask(element, maskOptions);

      // Установка начального значения
      if (initialValue) {
        const digits = initialValue.replace(/\D/g, "");
        maskInstance.value.unmaskedValue = digits;
        displayValue.value = maskInstance.value.value;
        isComplete.value = maskInstance.value.masked.isComplete;
      }

      // Обработка события accept (когда значение меняется)
      maskInstance.value.on("accept", () => {
        if (!maskInstance.value) return;

        const rawValue = maskInstance.value.unmaskedValue;
        const formattedValue = maskInstance.value.value;

        // Обновляем реактивные значения
        displayValue.value = formattedValue;
        isComplete.value = maskInstance.value.masked.isComplete;

        // Вызываем все зарегистрированные коллбэки
        acceptCallbacks.value.forEach((callback) => {
          callback(rawValue, formattedValue);
        });
      });

      // Обработка события complete (когда маска полностью заполнена)
      maskInstance.value.on("complete", () => {
        isComplete.value = true;
      });

      isInitialized.value = true;
    } catch (error) {
      console.error("Ошибка инициализации маски телефона:", error);
      throw error;
    }
  };

  /**
   * Обновление значения маски
   */
  const update = (value: string): void => {
    if (!maskInstance.value || !isInitialized.value) return;

    const digits = value.replace(/\D/g, "");
    const currentValue = maskInstance.value.unmaskedValue;

    // Обновляем только если значение изменилось
    if (digits !== currentValue) {
      maskInstance.value.unmaskedValue = digits;
      displayValue.value = maskInstance.value.value;
      isComplete.value = maskInstance.value.masked.isComplete;
    }
  };

  /**
   * Получение сырого значения (только цифры)
   */
  const getRawValue = (): string => {
    if (!maskInstance.value) return "";
    return maskInstance.value.unmaskedValue;
  };

  /**
   * Получение форматированного значения
   */
  const getFormattedValue = (): string => {
    if (!maskInstance.value) return "";
    return maskInstance.value.value;
  };

  /**
   * Регистрация коллбэка на изменение значения
   */
  const handleAccept = (
    callback: (rawValue: string, formattedValue: string) => void,
  ): void => {
    acceptCallbacks.value.push(callback);
  };

  /**
   * Очистка и уничтожение маски
   */
  const destroy = (): void => {
    if (maskInstance.value) {
      maskInstance.value.destroy();
      maskInstance.value = null;
    }

    displayValue.value = "";
    isComplete.value = false;
    isInitialized.value = false;
    acceptCallbacks.value = [];
  };

  // Автоматическая очистка
  onUnmounted(() => {
    destroy();
  });

  return {
    // Реактивные значения
    displayValue,
    isComplete,

    // Методы
    init,
    update,
    getRawValue,
    destroy,

    // Для интеграции
    handleAccept,
  };
};
