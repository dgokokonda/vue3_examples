export default defineNuxtPlugin((nuxtApp) => {
  // console.dir(nuxtApp);
  nuxtApp.provide("hello", (name: string) => console.log(name));
});
