export default defineNuxtRouteMiddleware((to, from) => {
  const isAuth = true; // если бы были авторизованы

  if (!isAuth && to.fullPath !== "/") {
    return navigateTo("/");
  }
});
