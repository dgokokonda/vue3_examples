// Экспортируем все сторе
export { useAppStore } from "./app.store";
export { useAuthStore } from "./auth.store";
// export { useProductsStore } from "./products.store";
export { useRequestStore } from "./request.store";
export { useUserStore } from "./user.store";
// import { devtools } from "pinia-plugin-devtools";

// Опционально: можно добавить хук для единой инициализации
import { createPinia } from "pinia";

const pinia = createPinia();

// При необходимости можно добавить плагины
// if (import.meta.env.DEV) {
//   pinia.use(devtoolsPlugin)
// }
if (import.meta.env.DEV) {
  // Pinia DevTools уже встроены в Vue DevTools

  // Если нужен логгер как в Vuex:
  pinia.use(({ store }) => {
    // Кастомный логгер плагин
    store.$onAction(({ name, store, args, after, onError }) => {
      // console.group(`🔄 Action: ${name}`, args)
      // console.log('📦 Store:', store.$id)

      after((result) => {
        // console.log('✅ Success:', result)
        // console.groupEnd()
      });

      onError((error) => {
        // console.error('❌ Error:', error)
        // console.groupEnd()
      });
    });

    // Логгирование изменений состояния
    store.$subscribe((mutation, state) => {
      // console.log(`🔄 Mutation in ${store.$id}:`, {
      //   type: mutation.type,
      //   storeId: mutation.storeId,
      //   events: mutation.events,
      //   oldState: mutation.events?.oldValue,
      //   newState: mutation.events?.newValue,
      // })
    });
  });
}

export default pinia;
