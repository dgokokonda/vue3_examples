<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/ui/Page/Page.vue";
import RequestTable from "@/components/ui/Request/RequestTable.vue";
import RequestModal from "@/components/ui/Modal/RequestModal.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const modal = ref(false);
const store = useStore();
const requests = computed(() => store.getters["request/requests"]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await store.dispatch("request/load");
  loading.value = false;
});
</script>
<template>
  <AppHeader />
  <Page title="Заявки">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-table v-loading="loading" :requests="requests" />
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
