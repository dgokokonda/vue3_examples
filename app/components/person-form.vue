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
import fieldsMock from "~/mock/fields.json";
import type { Field } from "./person-form.types";

let fields = ref<Field[]>([]);
const response = await new Promise<Field[]>((resolve, reject) =>
  setTimeout(() => {
    try {
      const response: Field[] = fieldsMock as Field[];
      resolve(response);
    } catch (error) {
      reject("Ошибка загрузки данных");
    }
  }, 2000),
);
fields.value = response;

const onSubmit = (data: any, valid: boolean) => {
  console.log("submit", data, valid);
};

const onValidate = (valid: boolean, fields: Record<string, string>) => {
  console.log("validate", valid, fields);
};
</script>
