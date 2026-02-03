import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Checkbox from "@/components/ui/Checkbox/Checkbox.vue";
import { wrap } from "node:module";

describe("Checkbox.vue", () => {
  const createWrapper = (props = {}, attrs = {}) => {
    return mount(Checkbox, {
      props: {
        modelValue: false,
        ...props,
      },
      attrs: {
        ...attrs,
      },
    });
  };

  describe("Basic rendering", () => {
    it("renders checkbox input element", () => {
      const wrapper = createWrapper();
      const input = wrapper.find('input[type="checkbox"]');
      expect(input.exists()).toBe(true);
    });

    it("renders label when provided", () => {
      const labelText = "Firstname";
      const wrapper = createWrapper({ label: labelText });
      const label = wrapper.find("label");
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(labelText);
    });

    it("does not render label when not provided", () => {
      const wrapper = createWrapper({ label: undefined });
      const label = wrapper.find("label");
      expect(label.exists()).toBe(false);
    });

    it("binds name attribute to input", () => {
      const name = "firstname";
      const wrapper = createWrapper({ name });
      const input = wrapper.find('input[type="checkbox"');
      expect(input.attributes("name")).toBe(name);
      expect(input.attributes("id")).toBe(name);
    });

    it("renders status text with correct value", async () => {
      const wrapper = createWrapper({ modelValue: true });
      const p = wrapper.find("p");
      // console.log("HTML:", wrapper.html());
      // console.log("Input checked:", wrapper.find("input").element.checked);
      // console.log("Computed checked:", (wrapper.vm as any).checked);
      // console.log("Paragraph text:", wrapper.find("p").text());
      expect(p.text()).toBe("Checked: Yes");

      await wrapper.setProps({ modelValue: false });
      expect(p.text()).toBe("Checked: No");
    });
  });

  describe("v-model | two-way binding", () => {
    it("emits update:modelValue when checkbox is clicked", async () => {
      const wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find('input[type="checkbox"]');

      await input.setValue(true); // click

      expect(wrapper.emitted()).toHaveProperty("update:modelValue");
      expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
    });

    it("emits update:modelValue with false when unchecking", async () => {
      const wrapper = createWrapper({ modelValue: true });
      const input = wrapper.find('input[type="checkbox"]');

      await input.setValue(false); // click

      expect(wrapper.emitted("update:modelValue")).toHaveLength(1);
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
    });

    it("syncs checked computed property with modelValue", async () => {
      const wrapper = createWrapper({ modelValue: false });

      // Получаем доступ к computed свойству через компонент
      const vm = wrapper.vm as any;
      expect(vm.checked).toBe(false);

      // Меняем пропс
      await wrapper.setProps({ modelValue: true });
      expect(vm.checked).toBe(true);

      // Меняем v-model
      await wrapper.find("input").setValue(false);
      expect(vm.checked).toBe(true); // Все еще true, ждет обновления от родителя

      // 4. Имитируем реакцию родителя
      await wrapper.setProps({ modelValue: false });
      expect(vm.checked).toBe(false); // Теперь обновилось
      expect(wrapper.find("input").element.checked).toBe(false);
    });
  });

  describe("Change event handling", () => {
    it("emits change event with native event object", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      // Создаем mock события
      const mockEvent = new Event("change", { bubbles: true });
      Object.defineProperty(mockEvent, "target", {
        value: { checked: true },
        writable: true,
      });

      await input.trigger("change");

      expect(wrapper.emitted("change")).toBeTruthy();
      expect(wrapper.emitted("change")![0]).toHaveLength(1);
      expect(wrapper.emitted("change")![0][0]).toBeInstanceOf(Event);
    });

    it("emits both update:modelValue and change events", async () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");

      await input.setValue(true);

      // Проверяем что оба события были эмитнуты
      expect(wrapper.emitted()).toHaveProperty("update:modelValue");
      expect(wrapper.emitted()).toHaveProperty("change");

      // Проверяем порядок (опционально)
      const emittedEvents = Object.keys(wrapper.emitted());
      expect(emittedEvents).toContain("update:modelValue");
      expect(emittedEvents).toContain("change");
    });
  });

  describe("Computed properties", () => {
    it("checked getter returns modelValue", async () => {
      const wrapper = createWrapper({ modelValue: true });
      const vm = wrapper.vm as any;

      expect(vm.checked).toBe(true);

      await wrapper.setProps({ modelValue: false });
      expect(vm.checked).toBe(false);
    });

    it("checked setter emits update:modelValue event", async () => {
      const wrapper = createWrapper();
      const vm = wrapper.vm as any;

      // установка значения через сеттер
      vm.checked = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]); // ![0] - 1 вызов эмит

      vm.checked = false;
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("update:modelValue")![1]).toEqual([false]); // ![1] - 2й вызов эмит
    });

    it("checked computed works with v-model directive", async () => {
      const wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input");

      // Проверяем начальное состояние
      expect((input.element as HTMLInputElement).checked).toBe(false);

      // Изменяем через setValue
      await input.setValue(true);
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);

      // Проверяем через пропс
      await wrapper.setProps({ modelValue: true });
      expect((input.element as HTMLInputElement).checked).toBe(true);
    });
  });

  describe("Attributes and CSS", () => {
    it("has checkbox class on input element", () => {
      const wrapper = createWrapper();
      const input = wrapper.find("input");
      expect(input.classes()).toContain("checkbox");
    });

    // it("applies scoped styles", () => {
    //   const wrapper = createWrapper();
    //   const input = wrapper.find("input");

    //   // Проверяем что стили применяются
    //   const style = window.getComputedStyle(input.element);
    //   expect(style.width).toBe("16px");
    //   expect(style.height).toBe("16px");
    //   expect(style.border).toContain("1px solid");
    //   expect(style.borderRadius).toBe("4px");
    // });
  });

  describe("Крайние кейсы", () => {
    it("handles rapid consecutive clicks", async () => {
      const wrapper = createWrapper({ modelValue: false });
      const input = wrapper.find("input");

      // Быстрые последовательные клики
      await input.setValue(true);
      await input.setValue(false);
      await input.setValue(true);

      // Проверяем что все события были эмитнуты
      expect(wrapper.emitted("update:modelValue")).toHaveLength(3);
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true]);
      expect(wrapper.emitted("update:modelValue")![1]).toEqual([false]);
      expect(wrapper.emitted("update:modelValue")![2]).toEqual([true]);
    });

    it("maintains reactivity when parent component updates modelValue", async () => {
      const wrapper = createWrapper({ modelValue: false });

      // Симулируем изменения от родительского компонента
      await wrapper.setProps({ modelValue: true });
      expect(wrapper.find("input").element.checked).toBe(true);

      await wrapper.setProps({ modelValue: false });
      expect(wrapper.find("input").element.checked).toBe(false);
    });
  });

  // ==================== ИНТЕГРАЦИОННЫЕ ТЕСТЫ ====================
  describe("Integration with parent component", () => {
    it("works correctly in v-model context", async () => {
      // Создаем тестовый родительский компонент
      const ParentComponent = {
        template: `
          <div>
            <Checkbox
              v-model="isChecked"
              name="test"
              label="Test Checkbox"
              @change="onChange"
            />
            <p data-testid="parent-value">Parent value: {{ isChecked }}</p>
          </div>
        `,
        components: { Checkbox },
        data() {
          return { isChecked: false };
        },
        methods: {
          onChange(event: Event) {
            this.$emit("parent-change", event);
          },
        },
      };

      const wrapper = mount(ParentComponent);

      // Находим чекбокс
      const checkbox = wrapper.findComponent(Checkbox);
      const input = checkbox.find("input");

      // Кликаем на чекбокс
      await input.setValue(true);

      // Проверяем что состояние обновилось
      expect(wrapper.vm.isChecked).toBe(true);
      expect(wrapper.find('[data-testid="parent-value"]').text()).toBe(
        "Parent value: true",
      );

      // Проверяем что change event прокидывается
      expect(checkbox.emitted("change")).toBeTruthy();
    });

    it("can be controlled programmatically", async () => {
      const wrapper = createWrapper({ modelValue: false });

      // Меняем через пропсы (имитация родительского контроля)
      await wrapper.setProps({ modelValue: true });
      expect(wrapper.find("input").element.checked).toBe(true);
      expect(wrapper.find("p.checkbox-value").text()).toBe("Checked: Yes");

      // Меняем через пользовательский ввод
      await wrapper.find("input").setValue(false);
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([false]);
    });
  });

  describe("Accessibility (A11Y)", () => {
    it("has proper label association", () => {
      const name = "agreement";
      const labelText = "I agree to terms";
      const wrapper = createWrapper({ name, label: labelText });

      const label = wrapper.find("label");
      const input = wrapper.find("input");

      // Проверяем что label связан с input через for/id
      expect(label.attributes("for")).toBe(name);
      expect(input.attributes("id")).toBe(name);
    });

    it("maintains accessible name when label is present", () => {
      const labelText = "Enable notifications";
      const wrapper = createWrapper({ label: labelText });

      // Находим input по его aria-labelledby (если есть) или проверяем связь с label
      const label = wrapper.find("label");
      const input = wrapper.find("input");

      expect(label.text()).toBe(labelText);
      expect(label.attributes("for")).toBe(input.attributes("id"));
    });

    it("can receive aria-* attributes", () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: false },
        attrs: {
          "aria-describedby": "help-text",
          "aria-required": "true",
          "aria-invalid": "false",
        },
      });

      const input = wrapper.find("input");
      expect(input.attributes("aria-describedby")).toBe("help-text");
      expect(input.attributes("aria-required")).toBe("true");
      expect(input.attributes("aria-invalid")).toBe("false");
    });
  });
});
