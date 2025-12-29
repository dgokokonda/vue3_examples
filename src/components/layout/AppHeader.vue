<!-- в layout лежат Header, Footer, Sidebar и др. -->
<!-- это некие “шаблоны” с местами для вложения содержимого -->
<script setup lang="ts">
import { ref } from "vue";
import Title from "../ui/Title/Title.vue";
import Modal from "@/components/ui/Modal/Modal.vue";
const show = ref(false);
</script>
<template>
  <div class="header">
    <Title title="Home page"></Title>
    <button @click="show = true">Открыть модальное окно</button>
    <Teleport to="body">
      <Modal :show="show" @close="show = false">
        <template #header><h1>Заголовок через слот</h1></template>
      </Modal>
    </Teleport>
  </div>
</template>
<style scoped lang="scss"></style>
