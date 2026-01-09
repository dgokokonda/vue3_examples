<!-- <template><AuthLayout /></template>
<script setup>
import AuthLayout from "@/components/layout/AuthLayout.vue";
</script> -->
<template>
  <div class="auth">
    <form @submit.prevent="onSubmit">
      <h1>Log in</h1>
      <div :class="['form-control', { invalid: eError }]">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" @blur="eBlur" />
        <small v-if="eError">{{ eError }}</small>
      </div>
      <div :class="['form-control', { invalid: pError }]">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" @blur="pBlur" />
        <small v-if="pError">{{ pError }}</small>
      </div>

      <button
        class="btn primary"
        type="submit"
        :disabled="isSubmitting || isTooManyAttempts"
      >
        Log in
      </button>
      <button class="btn warning" @click="redirect">Sign up</button>
      <span v-if="isTooManyAttempts" class="danger-text"
        >Временно заблокирована возможность входа</span
      >
    </form>
  </div>
</template>
<script setup lang="ts">
import { useLoginForm } from "@/composables/useLoginForm";
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
  isTooManyAttempts,
} = useLoginForm();

const redirect = () => router.push("/createUser");
</script>
<!-- <script>
import { useLoginForm } from "@/composables/useLoginForm";

export default {
  setup() {
    return { ...useLoginForm() };
  },
};
</script> -->
<style>
.btn.warning {
  background-color: lightblue;
  margin-left: 10px;
}
</style>
