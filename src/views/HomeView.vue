<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/ui/Page/Page.vue";
import RequestTable from "@/components/ui/Request/RequestTable.vue";
import RequestModal from "@/components/ui/Modal/RequestModal.vue";
import RequestFilter from "@/components/ui/Request/RequestFilter.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const modal = ref(false);
const store = useStore();
const requests = computed(() =>
  store.getters["request/requests"]
    .filter((request) =>
      filter.value.name
        ? request.fio.toLowerCase().includes(filter.value.name.toLowerCase())
        : true
    )
    .filter((request) =>
      filter.value.status ? request.status === filter.value.status : true
    )
);
const loading = ref(false);
const filter = ref([]);

onMounted(async () => {
  loading.value = true;
  await store.dispatch("request/load");
  loading.value = false;
});

watch(filter, (newFilter) => {
  // console.log(newFilter);
});
</script>
<template>
  <AppHeader />
  <Page title="Заявки">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter" />
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
