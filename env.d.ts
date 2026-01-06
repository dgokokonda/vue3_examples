/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_FB_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    VUE_APP_FB_KEY: string;
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  const defineProps: <T = any>() => T;
  const defineEmits: <T = any>() => T;
  const defineExpose: (exposed: Record<string, any>) => void;
  const withDefaults: <T, U extends T>(props: T, defaults: U) => T & U;
}
