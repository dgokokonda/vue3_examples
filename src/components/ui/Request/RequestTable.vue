<template>
  <h4 v-if="props.requests.length === 0" class="requests">Заявок пока нет</h4>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in props.requests" :key="item.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ item.fio }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ currency(item.amount) }}</td>
        <td><Status :type="item.status" /></td>
        <td>
          <router-link
            custom
            :to="{ name: 'Request', params: { id: item.id } }"
            v-slot="{ navigate }"
          >
            <button class="btn primary" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { currency } from "@/utils/currency";
import Status from "@/components/ui/Status/Status.vue";
interface RequestType {
  id: string;
  fio: string;
  amount: number;
  phone: string;
  status: string;
}

interface Props {
  requests: RequestType[];
}

const props = withDefaults(defineProps<Props>(), {
  requests: () => [],
});
// определили данные для передачи родителю
const someData = ref({ test: 'Test' })
const someFunc = () => console.log('func result', someData.value)

// открываем доступ к этим свойствам/методам родителю HomeView
defineExpose({
  someData, someFunc
})
</script>
