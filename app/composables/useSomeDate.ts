export function useSomeDate() {
  const someDate = ref<string>("");
  const isLoading = ref(true);
  // const obj = reactive<Record<string, any>>({});

  // setTimeout(() => (obj.some = 1), 2000);
  // setTimeout(() => (obj.some = 10), 5000);

  // watch(
  //   [obj],
  //   (newVal) => {
  //     // Засчет immediate: false вызывается только при изменении значения (иначе + при создании компонента)
  //     console.log(1, newVal[0].some);
  //   },
  //   { immediate: false },
  // );

  // watchEffect(() => {
  //   // вызывается при создании компонента и изменении значения; повлиять нельзя.
  //   /* if (obj.some) */ console.log(2, obj.some);
  // });

  const { data, error, refresh } = useFetch<{ datetime: string }>(
    "http://localhost:3001/config",
    {
      method: "GET",
      server: true,
      lazy: false,
      key: "config-date",
    },
    // преобразование данных
    // transform: (data: { datetime: string }) => {
    //   const serverDate = new Date(data.datetime);
    //   if (!isNaN(serverDate.getTime())) {
    //     const year = serverDate.getUTCFullYear();
    //     const month = String(serverDate.getUTCMonth() + 1).padStart(2, "0");
    //     const day = String(serverDate.getUTCDate()).padStart(2, "0");
    //     return `${year}-${month}-${day}`;
    //   }
    //   return null;
    // }
  );

  watchEffect(() => {
    if (data.value?.datetime) {
      const serverDate = new Date(data.value.datetime);
      if (!isNaN(serverDate.getTime())) {
        // someDate.value = serverDate.toISOString().split("T")[0];
        const year = serverDate.getUTCFullYear();
        const month = String(serverDate.getUTCMonth() + 1).padStart(2, "0");
        const day = String(serverDate.getUTCDate()).padStart(2, "0");
        someDate.value = `${year}-${month}-${day}`;
      }
      isLoading.value = false;
    }

    if (error.value) {
      console.error("Ошибка загрузки даты:", error.value);
      isLoading.value = false;
    }
  });

  // Форматируем дату одинаково на сервере и клиенте
  const formattedDate = computed(() => {
    if (!someDate.value) return "";

    // Используем фиксированный формат вместо toLocaleDateString
    const date = new Date(someDate.value);
    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  });

  const changeDate = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newDateValue = target.value;

    if (!newDateValue) return;

    const newDate = new Date(newDateValue);
    if (isNaN(newDate.getTime())) return;

    try {
      const res = await $fetch("http://localhost:3001/config", {
        method: "PUT",
        body: { datetime: newDate.toISOString() },
        headers: {
          "Content-Type": "application/json",
        },
        server: false,
      });

      if (!res) return;

      // Обновляем локальное значение
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      someDate.value = `${year}-${month}-${day}`;
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    // Если данные не загрузились через SSR, загружаем на клиенте
    if (!data.value && !error.value) {
      // refresh(); // без refresh работает загрузка
    }
  });

  return {
    someDate,
    formattedDate,
    changeDate,
  };
}
