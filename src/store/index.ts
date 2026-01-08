// подключает модули и экспортирует настроенный store для всего приложения
import { createStore, createLogger } from "vuex";
import authModule from "./modules/auth.module";
import requestModule from "./modules/request.module";

const plugins = [];
if (import.meta.env.DEV) {
  plugins.push(createLogger());
}

export interface RootState {
  message: string | null;
  // другие модули могут быть добавлены здесь
}

const store = createStore<RootState>({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false,
    };
  },
  mutations: {
    setMessage(state: RootState, message: string) {
      state.message = message;
    },
    clearMessage(state: RootState) {
      state.message = null;
    },
    openSidebar(state: RootState) {
      state.sidebar = true;
    },
    closeSidebar(state: RootState) {
      state.sidebar = false;
    },
  },
  actions: {
    setMessage(
      { commit }: { commit: (mutation: string, payload?: any) => void },
      message: string
    ) {
      commit("setMessage", message);

      setTimeout(() => {
        commit("clearMessage");
      }, 3000);
    },
    clearMessage({
      commit,
    }: {
      commit: (mutation: string, payload?: any) => void;
    }) {
      commit("clearMessage");
    },
  },
  modules: {
    auth: authModule, // Обратите внимание: 'auth' - это ключ модуля
    request: requestModule,
  },
});

export default store;
