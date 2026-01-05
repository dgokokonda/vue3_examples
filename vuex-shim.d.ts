// Обход проблемы с package.json "exports" в vuex
// Явно указываем на типы vuex
declare module "vuex" {
  import { App, WatchOptions, InjectionKey } from "vue";

  export interface Store<S> {
    readonly state: S;
    readonly getters: any;
    dispatch: any;
    commit: any;
    install(app: App, injectKey?: InjectionKey<Store<any>> | string): void;
  }

  export function useStore<S = any>(
    injectKey?: InjectionKey<Store<S>> | string
  ): Store<S>;
  export function createStore<S>(options: any): Store<S>;
  export function createLogger<S>(option?: any): any;
  export const storeKey: string;
}
