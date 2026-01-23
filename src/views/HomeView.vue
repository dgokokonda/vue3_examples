<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/ui/Page/Page.vue";
import RequestTable from "@/components/ui/Request/RequestTable.vue";
import RequestModal from "@/components/ui/Modal/RequestModal.vue";
import RequestFilter from "@/components/ui/Request/RequestFilter.vue";
import { ref, computed, onMounted, watch, provide } from "vue";
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
const filter = ref({});
const someString = ref('')

// 1. Создаем ref для дочернего компонента
let childRef = ref(null)

// проверяем передачу-изменение данных в RequestFilter
provide('provideParam', someString)

onMounted(async () => {
  loading.value = true;
  await store.dispatch("request/load");
  loading.value = false;
  // 2. Доступ к данным дочернего компонента
  childRef.value.someFunc()
  // изменяем значение переменной
  childRef.value.someData = { ...childRef.value.someData, prop: 'test' }
  // console.log(childRef.value.someData) // {"test":"Test","prop":"test"}
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
    <RequestFilter v-model="filter" />
    <RequestTable ref="childRef" v-loading="loading" :requests="requests" />
    <teleport to="body">
      <RequestModal
        :show="modal"
        @close="modal = false"
        @created="modal = false"
      >
        <template #header>Создать заявку</template>
    </RequestModal>
    </teleport>
  </Page>
</template>
