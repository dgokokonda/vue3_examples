import { computed, watch } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import type { RootState } from "@/store";

export function useLoginForm() {
  const store = useStore<RootState>();
  const router = useRouter();
  const { handleSubmit, isSubmitting, submitCount } = useForm();
  const MIN_LENGTH = 6;
  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("заполните поле")
      .email("введите корректный емейл")
  );
  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("заполните поле")
      .min(MIN_LENGTH, "длина пароля не менее 6 символов")
  );
  const onSubmit = handleSubmit(async (values: any) => {
    try {
      await store.dispatch("auth/login", values);
      router.push("/");
    } catch (error) {}
  });
  const isTooManyAttempts = computed(() => submitCount.value > 3);

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1000);
    }
  });

  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    submitCount,
    isTooManyAttempts,
  };
}
