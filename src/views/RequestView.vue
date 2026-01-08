<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import AppHeader from "@/components/layout/AppHeader.vue";
import Page from "@/components/ui/Page/Page.vue";
import Status from "@/components/ui/Status/Status.vue";
import { currency } from "@/utils/currency";
import Loader from "@/components/ui/Loader/Loader.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const loading = ref(false);
const request = ref<{
  id: string;
  fio: string;
  phone: string;
  amount: number;
  status: string;
}>({ id: "", fio: "", phone: "", amount: 0, status: "" });
const status = ref("");

onMounted(async () => {
  loading.value = true;
  request.value = await store.dispatch(
    "request/loadById",
    route.params.id as string
  );
  status.value = request.value?.status;
  loading.value = false;
});

const removeRequest = async () => {
  await store.dispatch("request/remove", route.params.id as string);
  router.push("/");
};

const updateRequest = async () => {
  const data = {
    ...request.value,
    id: route.params.id as string,
    status: status.value,
  };
  await store.dispatch("request/update", data);
  request.value.status = status.value;
};

const hasChanges = computed(() => {
  return request.value.status !== status.value;
});
</script>

<template>
  <AppHeader />
  <Page title="Детали заявки">
    <template #header>
      <button class="btn" @click="router.back()">Назад</button>
    </template>
    <div v-if="request && !loading" class="request-details">
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
    <loader v-else-if="loading" />
    <div v-else class="not-found">
      <p>Заявка не найдена</p>
      <button class="btn primary" @click="router.push('/')">
        Вернуться на главную
      </button>
    </div>
    <label for="status">Статус:</label>
    <select v-model="status" id="status">
      <option value=""></option>
      <option value="active">Активен</option>
      <option value="done">Завершен</option>
      <option value="cancelled">Отменен</option>
      <option value="pending">Выполняется</option>
    </select>
    <div class="request-actions">
      <button class="btn danger" @click="removeRequest">Удалить заявку</button>
      <button v-if="hasChanges" class="btn primary" @click="updateRequest">
        Обновить заявку
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

.btn.danger {
  background-color: #ff6b6b;
  color: white;
}

.request-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
