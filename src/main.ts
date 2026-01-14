import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/main.scss";
import router from "./router";
import store from "./store";
import * as VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { mask } from "vue-the-mask";
import clickOutsideDirective from "./directives/click-outside";

const app = createApp(App);

app.directive("mask", mask as any);
app.directive("click-outside", clickOutsideDirective);

// Создаем объект плагина
const VueVirtualScrollerPlugin = {
  install(app: any) {
    app.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
  },
};

app.use(store).use(router).use(VueVirtualScrollerPlugin).mount("#app");
