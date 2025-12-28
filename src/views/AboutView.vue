<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, provide, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount, onErrorCaptured, onRenderTracked, onRenderTriggered, onActivated, onDeactivated } from 'vue';
import OldTitle from '@/components/ui/Title/OldTitle.vue';
import UserName from '@/components/ui/UserName/UserName.vue';
import UserData from '@/components/ui/UserCard/UserCard.vue'
const router = useRouter()

const title = ref('About')
const firstName = ref('')
const lastName = ref('')


const userId = ref('1')
function updateUserId() {
  userId.value = Date.now().toString()
}

function goHome() {
  router.push('/')
}

provide('userId', { userId, updateUserId }) // значение и функция обновления значения

onBeforeMount(() => console.log('before mount'))
onMounted(() => console.log('mounted'))
onBeforeUpdate(() => console.log('before update'))
onUpdated(() => console.log('updated'))
onBeforeUnmount(() => console.log('before unmount'))
onUnmounted(() => console.log('unmounted'))
onErrorCaptured(() => console.log('error captured'))
onRenderTracked(() => console.log('render tracked'))
onRenderTriggered(() => console.log('render triggerred'))
onActivated(() => console.log('activated'))
onDeactivated(() => console.log('deactivated'))
</script>
<template>
  <OldTitle v-model:title="title" />
  <UserName v-model:firstName="firstName" v-model:lastName="lastName" />
  <UserData />
  <button @click="goHome">На главную</button>
  <p>{{ `Полное имя: ${firstName} ${lastName}` }}</p>
</template>