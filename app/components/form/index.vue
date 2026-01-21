<template>
  <form @submit.prevent="handleSubmitWithValidation" novalidate>
    <p>{{ formName }}</p>
    <div v-if="submitError" class="error-msg text-red-700">
      {{ submitError }}
    </div>
    <div class="fields">
      <div
        v-for="field in fields"
        :key="field.id"
        :class="['field-item mb-4', { error: formErrors[field.name] }]"
      >
        <label :for="field.name">{{ field.label }}</label>
        <field
          :field="field"
          :form-value="form[field.name]"
          @updateForm="(event) => setValue(event.value, event.field)"
        ></field>

        <div
          v-if="formErrors[field.name]"
          :key="formErrors[field.name]"
          class="error-msg text-red-700"
        >
          {{ formErrors[field.name] }}
        </div>
      </div>
    </div>
    <button :disabled="isSubmitting" class="btn primary bg-green-700 py-2 px-4">
      Submit
    </button>
  </form>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import type { Field, FieldItem } from "../person-form.types";
import { personFormSchema } from "../../utils/validation/schemas";
import {
  isMultiSelect,
  isNumberField,
  isCheckboxField,
  hasValue,
} from "~/utils/fieldGuards";
interface Props {
  fields: FieldItem[];
  formName: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  submit: [formData: Record<string, any>, isValid: boolean];
  validation: [isValid: boolean, errors: Record<string, string>];
}>();
const form = reactive<Record<string, any>>({});
const formErrors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const fieldDefaults = computed(() => {
  const defaults: Record<string, any> = {};

  props.fields.forEach((field) => {
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
  initialValues: props.fields.reduce(
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
    // const errorMessages = Object.values(validationErrors);
    // const errorFields = Object.keys(validationErrors)
    //   .filter(Boolean)
    //   .map((error, index) => ({ [errorFields[index]]: String(error) }));

    formErrors.value = validationErrors;

    // Скроллим к первой ошибке
    scrollToFirstError();

    emit("validation", false, validationErrors);
    return;
  }

  // Если форма валидна, вызываем onSubmit
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
    setFieldValue(fieldName, form[fieldName]);
  }
};

// const resetForm = () => {
//   for (let key in form) {
//     form[key] = fieldDefaults.value[key];
//     setFieldValue(key, form[key]);
//   }
// };

// const validateField = async (fieldName: string) => {
//   const { valid } = await validate({ mode: "single", fields: [fieldName] });
//   return valid;
// };

// pre-render
props.fields.forEach((field: Field) => {
  setValue(field.value, field);
});

// with async fetch data
// onMounted(() => {
//   props.fields.forEach((field: Field) => {
//     setValue(field.value, field);
//   });
// });
</script>
<style scoped lang="scss">
.error ::v-deep input,
.error ::v-deep select,
.error ::v-deep textarea,
.error ::v-deep option {
  background-color: var(--error-color) !important;
  border-color: var(--error-color) !important;
}
</style>
