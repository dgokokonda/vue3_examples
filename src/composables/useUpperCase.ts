import { ref, computed } from "vue";

export function useUpperCase(initialValue = "") {
  const value = ref(initialValue);

  const upperValue = computed(() => value.value.toUpperCase());

  const setValue = (newValue: string) => {
    value.value = newValue.toUpperCase();
  };

  return {
    value,
    upperValue,
    setValue,
  };
}
