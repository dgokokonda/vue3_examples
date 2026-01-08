<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/ui/Page/Page.vue";
import Status from "@/components/ui/Status/Status.vue";
import { currency } from "@/utils/currency";

const route = useRoute();
const router = useRouter();
const store = useStore();

const requestId = computed(() => route.params.id as string);

const request = computed(() => {
  const requests = store.getters["request/requests"] as any[];
  return requests.find((r: any) => r.id === requestId.value);
});

onMounted(async () => {
  if (store.getters["request/requests"].length === 0) {
    await store.dispatch("request/load");
  }
});
</script>

<template>
  <AppHeader />
  <Page title="Детали заявки">
    <template #header>
      <button class="btn" @click="router.back()">Назад</button>
    </template>
    <div v-if="request" class="request-details">
      <div class="detail-row">
        <span class="label">ФИО:</span>
        <span class="value">{{ request.fio }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Телефон:</span>
        <span class="value">{{ request.phone }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Сумма:</span>
        <span class="value">{{ currency(request.amount) }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Статус:</span>
        <Status :type="request.status" />
      </div>
    </div>
    <div v-else class="not-found">
      <p>Заявка не найдена</p>
      <button class="btn primary" @click="router.push('/')">
        Вернуться на главную
      </button>
    </div>
  </Page>
</template>

<style scoped>
.request-details {
  padding: 20px;
}

.detail-row {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.label {
  font-weight: bold;
  min-width: 120px;
  margin-right: 10px;
}

.value {
  flex: 1;
}

.not-found {
  text-align: center;
  padding: 40px;
}

.not-found p {
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
