<template>
  <h4 v-if="requests.length === 0" class="requests">Заявок пока нет</h4>
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
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
interface Props {
  requests: {
    type: any;
    default: () => [];
  };
}
const { requests } = defineProps<Props>();
</script>
