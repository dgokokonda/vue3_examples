import { createApp } from "vue";
import App from "./App.vue";
import '@/assets/styles/main.scss'
import router from './router'

const app = createApp(App)

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

app.use(router).mount("#app");