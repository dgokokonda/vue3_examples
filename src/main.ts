import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/main.scss";
import router from "./router";
import store from "./store";
import * as VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { mask } from "vue-the-mask";

const app = createApp(App);

app.directive("mask", mask as any);

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

app.directive("click-outside", {
  mounted(el, binding) {
    // Создаем обработчик
    el.__vueClickOutside__ = (event: any) => {
      // Если клик был вне элемента — вызываем функцию
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.__vueClickOutside__);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  },
});

app.use(store).use(router).use(VueVirtualScrollerPlugin).mount("#app");
