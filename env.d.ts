/// <reference types="vite/client" />

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
