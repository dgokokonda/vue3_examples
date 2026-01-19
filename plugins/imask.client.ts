// plugins/imask.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Создаем безопасную директиву
  const safeDirective = {
    // На сервере ничего не делаем
    mounted(el: HTMLElement, binding: any) {
      if (typeof window === "undefined") return;

      // Асинхронно инициализируем
      setTimeout(() => initIMask(el, binding), 0);
    },

    updated(el: HTMLElement, binding: any) {
      if (typeof window === "undefined") return;

      const mask = (el as any)._mask;
      if (mask) {
        const options =
          typeof binding.value === "string"
            ? { mask: binding.value }
            : binding.value || {};
        mask.updateOptions(options);
      }
    },

    beforeUnmount(el: HTMLElement) {
      if (typeof window === "undefined") return;

      const mask = (el as any)._mask;
      if (mask) {
        mask.destroy();
      }
    },

    // ОБЯЗАТЕЛЬНО для SSR
    getSSRProps() {
      return {};
    },
  };

  nuxtApp.vueApp.directive("imask", safeDirective);
});

async function initIMask(el: HTMLElement, binding: any) {
  try {
    const IMask = (await import("imask")).default;

    const options =
      typeof binding.value === "string"
        ? { mask: binding.value }
        : binding.value || {};

    const mask = IMask(el, {
      ...options,
      lazy: options.lazy ?? true,
    });

    (el as any)._mask = mask;

    // Для v-model поддержки
    if (binding.arg) {
      mask.on("accept", () => {
        el.dispatchEvent(new Event("input"));
      });
    }
  } catch (error) {
    console.error("IMask error:", error);
  }
}
