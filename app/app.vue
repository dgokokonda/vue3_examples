<template>
  <Header></Header>
  <div class="container bg-gray-50 w-full max-w-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Footer></Footer>
</template>
<script setup lang="ts">
// import { ref } from "vue";
console.log("test", useNuxtApp());

const globalTheme = useState("theme", () => "light");
// setTimeout(() => {
//   console.log(2, globalTheme.value); // dark, т.к. изменили в другом компоненте
// }, 10000);

// const title = ref("Приложение на Nuxt");
</script>
