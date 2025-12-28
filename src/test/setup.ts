import { config } from "@vue/test-utils";
import { vi } from "vitest";

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
