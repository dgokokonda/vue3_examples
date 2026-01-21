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
import type { FieldItem } from "../person-form.types";
import { useUserForm } from "~/composables/useUserForm";

const props = defineProps<{
  fields: FieldItem[];
  formName: string;
}>();

const emit = defineEmits<{
  submit: [formData: Record<string, any>, isValid: boolean];
}>();

const {
  form,
  formErrors,
  isSubmitting,
  submitError,
  handleSubmitWithValidation,
  setValue,
} = useUserForm(props.fields, props.formName, emit);
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
