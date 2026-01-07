<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/ui/Page/Page.vue";
import RequestTable from "@/components/ui/Request/RequestTable.vue";
import RequestModal from "@/components/ui/Modal/RequestModal.vue";
import { ref } from "vue";

const modal = ref(false);
</script>
<template>
  <AppHeader />
  <Page title="Заявки">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-table :requests="[]" />
    <teleport to="body">
      <request-modal
        :show="modal"
        @close="modal = false"
        @created="modal = false"
      >
        <template #header>Создать заявку</template>
      </request-modal>
    </teleport>
  </Page>
</template>
