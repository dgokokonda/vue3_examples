import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useRequestForm(fn: any) {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: {
      status: "active",
    },
  });
  const {
    value: fio,
    errorMessage: fError,
    handleBlur: fBlur,
  } = useField(
    "fio",
    yup.string().trim().required("Обязательно для заполнения")
  );
  const {
    value: phone,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    "phone",
    yup.string().trim().required("Обязательно для заполнения")
  );
  const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur,
  } = useField(
    "amount",
    yup
      .number()
      .required("Обязательно для заполнения")
      .min(0, "Сумма не может быть меньше 0")
  );
  const { value: status } = useField("status");

  const onSubmit = handleSubmit(fn);

  return {
    isSubmitting,
    onSubmit,
    fio,
    phone,
    amount,
    status,
    fError,
    pError,
    aError,
    fBlur,
    pBlur,
    aBlur,
  };
}
