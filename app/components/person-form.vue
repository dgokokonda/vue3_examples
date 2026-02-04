<template>
  <div class="form">
    <Form
      :fields="fields"
      form-name="Person Form"
      @validation="onValidate"
      @submit="onSubmit"
    ></Form>
  </div>
</template>
<script setup lang="ts">
// import fieldsMock from "~/mock/fields.json";
import type { Field } from "./person-form.types";

const fields = computed(() => personStore.fields as Field[]);
const personStore = usePersonStore();
try {
  await personStore.getFields();
} catch (error) {
  console.error("Ошибка загрузки данных");
}

const onSubmit = async (data: any, valid: boolean) => {
  // console.log("submit", data, valid);
  if (!valid) {
    console.error("Form isn't valid!");
    return;
  }

  await personStore.savePersonForm(data);
};

const onValidate = (valid: boolean, fields: Record<string, string>) => {
  console.log("validate", valid, fields);
};
</script>
