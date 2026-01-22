import { useForm } from "vee-validate";
import { ref, reactive, computed, type EmitFn } from "vue";
import type { Field } from "~/components/person-form.types";
import { personFormSchema } from "~/utils/validation/schemas";
import {
  isMultiSelect,
  isNumberField,
  isCheckboxField,
  hasValue,
} from "~/utils/fieldGuards";

type UserFormEmits = {
  submit: [formData: Record<string, any>, isValid: boolean];
  validation: [isValid: boolean, errors: Record<string, string>];
};

export const useUserForm = (fields: Field[], emit: EmitFn<UserFormEmits>) => {
  const form = reactive<Record<string, any>>({});
  const formErrors = ref<Record<string, string>>({});
  const isSubmitting = ref(false);
  const fieldDefaults = computed(() => {
    const defaults: Record<string, any> = {};

    fields.forEach((field: Field) => {
      const fieldName = (field as Field).name;

      if (isMultiSelect(field) || isCheckboxField(field)) {
        defaults[fieldName] = [];
      } else if (isNumberField(field)) {
        defaults[fieldName] = 0;
      } else {
        defaults[fieldName] = "";
      }
    });

    return defaults;
  });
  const {
    errors,
    validate,
    handleSubmit,
    setFieldValue,
    setErrors,
    resetForm,
    // meta,
  } = useForm({
    validationSchema: personFormSchema,
    initialValues: fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.value,
      }),
      {},
    ),
  });
  const submitError = ref("");
  const onSubmit = handleSubmit(async (values, valid) => {
    isSubmitting.value = true;
    try {
      emit("submit", values, true);
      resetForm();
    } catch (error) {
      const apiError = error as { data?: { errors?: Record<string, string> } };
      if (apiError.data?.errors) {
        setErrors(apiError.data.errors);
      } else {
        submitError.value = "Ошибка при отправке формы";
      }
      emit("submit", values, false);
    } finally {
      isSubmitting.value = false;
    }
  });

  const handleSubmitWithValidation = async () => {
    formErrors.value = {};
    const { valid, errors: validationErrors } = await validate();

    if (!valid) {
      formErrors.value = validationErrors;
      scrollToFirstError();

      emit("validation", false, validationErrors);
      return;
    }

    await onSubmit();
  };

  const scrollToFirstError = () => {
    nextTick(() => {
      const firstErrorElement = document.querySelector(".error-msg");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  };

  const setValue = (val: any, field: Field) => {
    const fieldName = field.name;
    if (fieldName) {
      form[fieldName] = hasValue({ ...field, value: val })
        ? val
        : fieldDefaults.value[fieldName];
      setFieldValue(fieldName as string, form[fieldName]);
    }
  };

  // pre-render
  fields.forEach((field: Field) => {
    setValue(field.value, field);
  });

  return {
    form,
    handleSubmitWithValidation,
    submitError,
    formErrors,
    setValue,
    isSubmitting,
  };
};
