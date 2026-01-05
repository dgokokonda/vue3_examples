// подключает модули и экспортирует настроенный store для всего приложения
import { createStore, createLogger } from "vuex";
import authModule from "./modules/auth.module";

const plugins = [];
if (import.meta.env.DEV) {
  plugins.push(createLogger());
}

export interface RootState {
  // другие модули могут быть добавлены здесь
}

const store = createStore<RootState>({
  plugins,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule, // Обратите внимание: 'auth' - это ключ модуля
  },
});

export default store;
