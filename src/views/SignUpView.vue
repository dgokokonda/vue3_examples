<template>
  <h1>Sign up</h1>
  <a href="#" @click.prevent="back" style="margin-bottom: 20px; display: block"
    >Sign in</a
  >
  <div class="registration-form">
    <form @submit.prevent="onSubmit">
      <div :class="['form-control', { invalid: eError }]">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          @blur="eBlur"
        />
        <small v-if="eError">{{ eError }}</small>
      </div>
      <div :class="['form-control', { invalid: pError }]">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          @blur="pBlur"
        />
        <small v-if="pError">{{ pError }}</small>
      </div>
      <button :disabled="isSubmitting" class="btn primary">Sign up</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useRegisterForm } from "@/composables/useRegisterForm";
import { useRouter } from "vue-router";

const router = useRouter();
const {
  email,
  password,
  eError,
  pError,
  eBlur,
  pBlur,
  onSubmit,
  isSubmitting,
} = useRegisterForm();

const back = () => router.push("/");
</script>
<style>
.registration-form form {
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.registration-form .form-control {
  width: 180px;
}

.registration-form .form-control {
  gap: 5px;
  display: flex;
  flex-direction: column;
}
</style>
