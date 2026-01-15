import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/main.scss";
import router from "./router";
import pinia from "./stores";
import * as VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { mask } from "vue-the-mask";
import clickOutsideDirective from "./directives/click-outside";
import uppercaseDirective from "./directives/uppercase";

const app = createApp(App);

app.directive("mask", mask as any);
app.directive("click-outside", clickOutsideDirective);
app.directive("uppercase", uppercaseDirective);

// Создаем объект плагина
const VueVirtualScrollerPlugin = {
  install(app: any) {
    app.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
  },
};

app.use(pinia).use(router).use(VueVirtualScrollerPlugin).mount("#app");
