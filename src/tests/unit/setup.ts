import { config } from "@vue/test-utils";
import { vi } from "vitest";
import { createPinia } from "pinia";

// Глобальные моки
vi.stubGlobal("console", {
  ...console,
  error: vi.fn(),
});

// Глобальные конфигурации
config.global.stubs = {
  Transition: false,
  TransitionGroup: false,
};

// Глобальные настройки для тестов
const pinia = createPinia();
config.global.plugins = [pinia];
