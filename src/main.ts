import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/main.scss";
import router from "./router";
import store from "./store";
import * as VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

const app = createApp(App);

// Создаем объект плагина
const VueVirtualScrollerPlugin = {
  install(app: any) {
    app.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
  },
};

// Регистрируем глобальную директиву
// app.directive('uppercase', {
//   mounted(el, binding) {
//     if (binding.modifiers.input) {
//       el.addEventListener('input', (e: Event) => {
//         const target = e.target as HTMLInputElement
//         target.value = target.value.toUpperCase()
//         // Эмитим событие для v-model
//         target.dispatchEvent(new Event('input'))
//       })
//     }
//   }
// })

app.use(store).use(router).use(VueVirtualScrollerPlugin).mount("#app");
