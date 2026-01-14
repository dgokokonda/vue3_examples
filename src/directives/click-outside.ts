import type { DirectiveBinding, ObjectDirective } from "vue";

interface ClickOutsideElement extends HTMLElement {
  _clickOutside?: (event: MouseEvent) => void;
}

const clickOutsideDirective: ObjectDirective<ClickOutsideElement> = {
  beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
    // Функция-обработчик
    el._clickOutside = (event: MouseEvent) => {
      // Проверяем, что клик был вне элемента и элемент виден
      if (!(el === event.target || el.contains(event.target as Node))) {
        // Вызываем переданный колбэк
        binding.value(event);
      }
    };

    // Используем capture для обработки до всплытия
    document.addEventListener("click", el._clickOutside, true);
  },
  unmounted(el: ClickOutsideElement) {
    if (el._clickOutside) {
      document.removeEventListener("click", el._clickOutside, true);
    }
  },
};

export default clickOutsideDirective;
