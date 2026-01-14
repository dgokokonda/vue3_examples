// directives/uppercase-input.ts
import type { ObjectDirective } from "vue";

interface UppercaseInputElement extends HTMLInputElement {
  _uppercaseHandler?: (event: Event) => void;
}

const uppercaseDirective: ObjectDirective<UppercaseInputElement> = {
  mounted(el: UppercaseInputElement, binding: any) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const cursorPosition = target.selectionStart;

      // Получаем текущее значение
      const currentValue = target.value;
      const uppercaseValue = currentValue.toUpperCase();

      // Если значение изменилось
      if (currentValue !== uppercaseValue) {
        target.value = uppercaseValue;

        // Восстанавливаем позицию курсора
        target.setSelectionRange(cursorPosition, cursorPosition);

        // Эмитим событие для v-model
        target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    el._uppercaseHandler = handleInput;
    el.addEventListener("input", handleInput);

    // Применяем к начальному значению
    if (el.value) {
      el.value = el.value.toUpperCase();
    }
  },

  unmounted(el: UppercaseInputElement) {
    if (el._uppercaseHandler) {
      el.removeEventListener("input", el._uppercaseHandler);
    }
  },
};

export default uppercaseDirective;
