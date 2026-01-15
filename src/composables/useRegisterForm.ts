import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "@/stores";
import { useRouter } from "vue-router";

export function useRegisterForm() {
  const authStore = useAuthStore();
  const router = useRouter();
  const { handleSubmit, isSubmitting } = useForm();
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
      await authStore.register(values);
      router.push("/");
    } catch (error) {}
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
  };
}
